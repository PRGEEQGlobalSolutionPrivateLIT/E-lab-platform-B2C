'use client';



import { apiFetch } from '@/features/auth/apiFetch';
import './PowerBIWorkspace.css';



import { useRouter } from 'next/navigation';



import {



  ChangeEvent,



  DragEvent,



  useEffect,



  useMemo,



  useRef,



  useState,



  type ReactNode,



} from 'react';



type PowerBITab = 'data' | 'transform' | 'model' | 'dax' | 'report';



type VisualType = 'Bar' | 'Column' | 'Line' | 'Pie' | 'Donut' | 'Card' | 'KPI' | 'Table' | 'Slicer';



type DataRow = Record<string, string | number | null>;



type ProvidedDataset = {

  id: string;

  name: string;

  fileName: string;

  path: string;

  description?: string;

  suggestedTableName?: string;

};



type PowerBIWorkspaceProblem = {



  slug?: string;



  title: string;



  problemStatement: string;



  difficulty?: string;



  estimatedMinutes?: number;



  skills?: string[];



  powerBi?: {

    availableDatasets?: ProvidedDataset[];

    allowCustomUpload?: boolean;

    problemSlug?: string;

  };

};



type PowerBIWorkspaceProps = {



  problem: PowerBIWorkspaceProblem;



  source?: 'practice' | 'stack' | 'challenge';



};



type VisualConfig = {



  type: VisualType;



  xAxis: string;



  yAxis: string;



  legend: string;



  aggregation: 'Sum' | 'Average' | 'Count' | 'Min' | 'Max';



};



type TransformAction =



  | 'None'



  | 'Remove Empty Rows'



  | 'Remove Duplicates'



  | 'Trim Text'



  | 'Uppercase'



  | 'Lowercase'



  | 'Replace Value';



const VISUALS: VisualType[] = [



  'Bar', 'Column', 'Line', 'Pie', 'Donut', 'Card', 'KPI', 'Table', 'Slicer',



];



function splitCsvLine(line: string): string[] {



  const result: string[] = [];



  let value = '';



  let quoted = false;



  for (let i = 0; i < line.length; i += 1) {



    const char = line[i];



    const next = line[i + 1];



    if (char === '"' && quoted && next === '"') {



      value += '"';



      i += 1;



    } else if (char === '"') {



      quoted = !quoted;



    } else if (char === ',' && !quoted) {



      result.push(value.trim());



      value = '';



    } else {



      value += char;



    }



  }



  result.push(value.trim());



  return result;



}



function parseCsv(text: string): { headers: string[]; rows: DataRow[] } {



  const lines = text



    .replace(/^\uFEFF/, '')



    .split(/\r?\n/)



    .filter((line) => line.trim().length > 0);



  if (lines.length < 2) {



    throw new Error('CSV must contain a header row and at least one data row.');



  }



  const headers = splitCsvLine(lines[0]).map((header, index) =>



    header || `Column_${index + 1}`,



  );



  const rows = lines.slice(1).map((line) => {



    const values = splitCsvLine(line);



    const row: DataRow = {};



    headers.forEach((header, index) => {



      const raw = values[index] ?? '';



      const normalized = raw.replace(/,/g, '');



      const numeric = normalized !== '' && Number.isFinite(Number(normalized));



      row[header] = numeric ? Number(normalized) : raw;



    });



    return row;



  });



  return { headers, rows };



}



function toNumber(value: string | number | null | undefined): number {



  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;



  if (value == null) return 0;



  const cleaned = String(value).replace(/[₹$£€,%\s,]/g, '');



  const parsed = Number(cleaned);



  return Number.isFinite(parsed) ? parsed : 0;



}



function isNumericColumn(rows: DataRow[], field: string): boolean {



  const populated = rows



    .map((row) => row[field])



    .filter((value) => value !== '' && value != null);



  if (populated.length === 0) return false;



  return populated.every((value) => Number.isFinite(Number(String(value).replace(/,/g, ''))));



}



function aggregate(



  rows: DataRow[],



  categoryField: string,



  valueField: string,



  method: VisualConfig['aggregation'],



): Array<{ label: string; value: number }> {



  if (!categoryField || !valueField) return [];



  const groups = new Map<string, number[]>();



  rows.forEach((row) => {



    const label = String(row[categoryField] ?? 'Blank');



    const current = groups.get(label) ?? [];



    current.push(toNumber(row[valueField]));



    groups.set(label, current);



  });



  return Array.from(groups.entries()).map(([label, values]) => {



    let value = 0;



    if (method === 'Sum') value = values.reduce((sum, item) => sum + item, 0);



    if (method === 'Average') value = values.reduce((sum, item) => sum + item, 0) / Math.max(values.length, 1);



    if (method === 'Count') value = values.length;



    if (method === 'Min') value = Math.min(...values);



    if (method === 'Max') value = Math.max(...values);



    return { label, value };



  });



}



type BackendValidationResult = {
  label?: string;
  passed?: boolean;
  message?: string;
};

type BackendValidationSummary = {
  passed?: boolean;
  score?: number;
  maxScore?: number;
  percentage?: number;
  results?: BackendValidationResult[];
  validation?: BackendValidationSummary;
  status?: string;
};

const POWER_BI_API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1'
).replace(/\/$/, '');

function slugifyProblemTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function readApiResponse(response: Response) {
  const text = await response.text();
  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data === 'object' && 'message' in data
        ? String((data as { message?: unknown }).message ?? `Request failed (${response.status})`)
        : `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}

export default function PowerBIWorkspace({



  problem,



  source: _source,



}: PowerBIWorkspaceProps) {



  const router = useRouter();



  const fileInputRef = useRef<HTMLInputElement>(null);

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [isApiBusy, setIsApiBusy] = useState(false);

  const problemSlug =
    problem.slug ??
    problem.powerBi?.problemSlug ??
    slugifyProblemTitle(problem.title);



  const availableDatasets: ProvidedDataset[] =

    problem.powerBi?.availableDatasets ?? [];



  const allowCustomUpload =

    problem.powerBi?.allowCustomUpload ?? false;



  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(

    availableDatasets[0]?.id ?? '',

  );



  const [isLoadingDataset, setIsLoadingDataset] = useState<boolean>(false);



  const [validationResults, setValidationResults] = useState<



    Array<{ label: string; passed: boolean }>



  >([]);



  const [hasCheckedSolution, setHasCheckedSolution] = useState(false);



  const [savedAt, setSavedAt] = useState<string | null>(null);



  const [activeTab, setActiveTab] = useState<PowerBITab>('data');



  const [fileName, setFileName] = useState('');



  const [tableName, setTableName] = useState('ImportedData');



  const [headers, setHeaders] = useState<string[]>([]);



  const [rows, setRows] = useState<DataRow[]>([]);



  const [originalRows, setOriginalRows] = useState<DataRow[]>([]);



  const [uploadError, setUploadError] = useState('');



  const [selectedVisual, setSelectedVisual] = useState<VisualType>('Bar');



  const [xAxis, setXAxis] = useState('');



  const [yAxis, setYAxis] = useState('');



  const [legend, setLegend] = useState('');



  const [aggregation, setAggregation] = useState<VisualConfig['aggregation']>('Sum');



  const [filterField, setFilterField] = useState('');



  const [filterValue, setFilterValue] = useState('All');



  const [transformAction, setTransformAction] = useState<TransformAction>('None');



  const [transformColumn, setTransformColumn] = useState('');



  const [findValue, setFindValue] = useState('');



  const [replaceValue, setReplaceValue] = useState('');



  const [daxExpression, setDaxExpression] = useState('');



  const [status, setStatus] = useState('Select one of the provided datasets to begin.');



  const getWorkspacePayload = () => {
    const selectedDataset = availableDatasets.find(
      (dataset) => dataset.id === selectedDatasetId,
    );

    const hasLoadedData = rows.length > 0;

    const transforms =
      transformAction !== 'None'
        ? [
            {
              id: 'current-transform',
              datasetId: selectedDatasetId || undefined,
              tableName: tableName || undefined,
              type: transformAction,
              operation: transformAction,
              column: transformColumn || undefined,
              value: findValue || undefined,
              replacementValue: replaceValue || undefined,
              applied: true,
            },
          ]
        : [];

    const measureName = daxExpression.includes('=')
      ? daxExpression.split('=')[0]?.trim()
      : undefined;

    const measures = daxExpression.trim()
      ? [
          {
            id: 'current-measure',
            name: measureName || 'Measure',
            measureName: measureName || 'Measure',
            expression: daxExpression.trim(),
            tableName: tableName || undefined,
          },
        ]
      : [];

    const visuals =
      hasLoadedData && (xAxis || yAxis)
        ? [
            {
              id: 'current-visual',
              type: selectedVisual,
              visualType: selectedVisual,
              title: `${selectedVisual} visual`,
              tableName: tableName || undefined,
              xAxis: xAxis || undefined,
              yAxis: yAxis || undefined,
              legend: legend || undefined,
              aggregation,
              fields: [xAxis, yAxis, legend].filter(Boolean),
            },
          ]
        : [];

    const filters = filterField
      ? [
          {
            id: 'current-filter',
            tableName: tableName || undefined,
            field: filterField,
            operator: filterValue === 'All' ? 'all' : 'equals',
            value: filterValue === 'All' ? undefined : filterValue,
          },
        ]
      : [];

    return {
      selectedDatasetId: selectedDatasetId || undefined,
      loadedDatasetId: hasLoadedData ? selectedDatasetId || undefined : undefined,
      selectedDatasetIds: selectedDatasetId ? [selectedDatasetId] : [],
      loadedDatasetIds:
        hasLoadedData && selectedDatasetId ? [selectedDatasetId] : [],
      fileName: fileName || selectedDataset?.fileName || undefined,
      tableName: tableName || undefined,
      headers,
      rowCount: rows.length,
      hasData: hasLoadedData,
      datasets: selectedDatasetId
        ? [
            {
              id: selectedDatasetId,
              fileName: fileName || selectedDataset?.fileName,
              loaded: hasLoadedData,
              tableName: tableName || undefined,
              columns: headers,
              rowCount: rows.length,
            },
          ]
        : [],
      tables: hasLoadedData
        ? [
            {
              id: tableName || 'ImportedData',
              datasetId: selectedDatasetId || undefined,
              fileName: fileName || undefined,
              name: tableName || 'ImportedData',
              tableName: tableName || 'ImportedData',
              columns: headers,
              headers,
              rowCount: rows.length,
              loaded: true,
            },
          ]
        : [],
      transforms,
      relationships: [],
      measures,
      daxMeasures: measures,
      visuals,
      filters,
    };
  };

  const ensureAttemptId = async (): Promise<string> => {
    if (attemptId) return attemptId;

    const storageKey = `elab-powerbi-attempt:${problemSlug}`;
    const storedAttemptId = window.localStorage.getItem(storageKey);

    if (storedAttemptId) {
      setAttemptId(storedAttemptId);
      return storedAttemptId;
    }

    const response = await apiFetch(`${POWER_BI_API_BASE}/power-bi-lab/attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problemSlug }),
    });

    const data = (await readApiResponse(response)) as { id?: string; attemptId?: string } | null;
    const createdAttemptId = data?.id ?? data?.attemptId;

    if (!createdAttemptId) {
      throw new Error('The API created an attempt but did not return an attempt ID.');
    }

    window.localStorage.setItem(storageKey, createdAttemptId);
    setAttemptId(createdAttemptId);
    return createdAttemptId;
  };

  const applyBackendValidation = (payload: BackendValidationSummary) => {
    const summary = payload.validation ?? payload;
    const results = summary.results ?? [];

    setValidationResults(
      results.map((result) => ({
        label: result.label ?? result.message ?? 'Validation rule',
        passed: Boolean(result.passed),
      })),
    );
    setHasCheckedSolution(true);

    return summary;
  };

  useEffect(() => {
    const storageKey = `elab-powerbi-attempt:${problemSlug}`;
    const storedAttemptId = window.localStorage.getItem(storageKey);
    if (storedAttemptId) setAttemptId(storedAttemptId);
  }, [problemSlug]);

  const numericFields = useMemo(



    () => headers.filter((field) => isNumericColumn(rows, field)),



    [headers, rows],



  );



  const categoricalFields = useMemo(



    () => headers.filter((field) => !numericFields.includes(field)),



    [headers, numericFields],



  );



  const filterOptions = useMemo(() => {



    if (!filterField) return [];



    return Array.from(



      new Set(rows.map((row) => String(row[filterField] ?? 'Blank'))),



    ).sort();



  }, [filterField, rows]);



  const filteredRows = useMemo(() => {



    if (!filterField || filterValue === 'All') return rows;



    return rows.filter((row) => String(row[filterField] ?? 'Blank') === filterValue);



  }, [filterField, filterValue, rows]);



  const visualData = useMemo(



    () => aggregate(filteredRows, xAxis, yAxis, aggregation),



    [filteredRows, xAxis, yAxis, aggregation],



  );



  const visualConfig: VisualConfig = {



    type: selectedVisual,



    xAxis,



    yAxis,



    legend,



    aggregation,



  };



  const loadParsedDataset = (



    parsed: { headers: string[]; rows: DataRow[] },



    nextFileName: string,



    nextTableName: string,



  ) => {



    setFileName(nextFileName);



    setTableName(nextTableName);



    setHeaders(parsed.headers);



    setRows(parsed.rows);



    setOriginalRows(parsed.rows);



    setFilterField('');



    setFilterValue('All');



    setLegend('');



    setTransformColumn(parsed.headers[0] ?? '');



    const firstCategory =



      parsed.headers.find((field) => !isNumericColumn(parsed.rows, field)) ??



      parsed.headers[0] ??



      '';



    const firstNumeric =



      parsed.headers.find((field) => isNumericColumn(parsed.rows, field)) ??



      parsed.headers[1] ??



      parsed.headers[0] ??



      '';



    setXAxis(firstCategory);



    setYAxis(firstNumeric);



    setDaxExpression(



      firstNumeric



        ? `Total ${firstNumeric} = SUM(${nextTableName}[${firstNumeric}])`



        : '',



    );



    setValidationResults([]);



    setHasCheckedSolution(false);



    setStatus(



      `${nextFileName} loaded successfully: ${parsed.rows.length} rows, ${parsed.headers.length} columns.`,



    );



    setActiveTab('data');



  };



  const loadProvidedDataset = async () => {



    const dataset = availableDatasets.find(



      (item) => item.id === selectedDatasetId,



    );



    if (!dataset) {



      setUploadError('Select a provided dataset first.');



      setStatus('Select a provided dataset to continue.');



      return;



    }



    setIsLoadingDataset(true);



    setUploadError('');



    try {



      const response = await fetch(dataset.path, { cache: 'no-store' });



      if (!response.ok) {



        throw new Error(



          `Unable to load ${dataset.fileName}. Check that ${dataset.path} exists under apps/web/public.`,



        );



      }



      const csvText = await response.text();



      const parsed = parseCsv(csvText);



      loadParsedDataset(



        parsed,



        dataset.fileName,



        dataset.suggestedTableName ||



          dataset.fileName.replace(/\.csv$/i, '') ||



          'ImportedData',



      );



    } catch (error) {



      const message =



        error instanceof Error ? error.message : 'Unable to load dataset.';



      setUploadError(message);



      setStatus('Dataset load failed.');



    } finally {



      setIsLoadingDataset(false);



    }



  };



  const handleCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {



    if (!allowCustomUpload) return;



    const file = event.target.files?.[0];



    if (!file) return;



    setUploadError('');



    const reader = new FileReader();



    reader.onload = () => {



      try {



        const parsed = parseCsv(String(reader.result ?? ''));



        const nextTableName =



          file.name.replace(/\.csv$/i, '') || 'ImportedData';



        loadParsedDataset(parsed, file.name, nextTableName);



      } catch (error) {



        const message =



          error instanceof Error ? error.message : 'Unable to parse CSV.';



        setUploadError(message);



        setStatus('CSV import failed.');



      }



    };



    reader.onerror = () => {



      setUploadError('Unable to read the selected file.');



      setStatus('CSV import failed.');



    };



    reader.readAsText(file);



  };



  const resetData = () => {



    setRows(originalRows);



    setFilterValue('All');



    setStatus(originalRows.length ? 'Dataset reset to its originally loaded state.' : 'Select one of the provided datasets to begin.');



  };



  const applyTransform = () => {



    if (!rows.length) return;



    let nextRows = [...rows];



    if (transformAction === 'Remove Empty Rows') {



      nextRows = rows.filter((row) =>



        headers.some((field) => String(row[field] ?? '').trim() !== ''),



      );



    }



    if (transformAction === 'Remove Duplicates') {



      const seen = new Set<string>();



      nextRows = rows.filter((row) => {



        const key = JSON.stringify(row);



        if (seen.has(key)) return false;



        seen.add(key);



        return true;



      });



    }



    if (



      ['Trim Text', 'Uppercase', 'Lowercase', 'Replace Value'].includes(transformAction) &&



      transformColumn



    ) {



      nextRows = rows.map((row) => {



        const next = { ...row };



        const current = String(row[transformColumn] ?? '');



        if (transformAction === 'Trim Text') next[transformColumn] = current.trim();



        if (transformAction === 'Uppercase') next[transformColumn] = current.toUpperCase();



        if (transformAction === 'Lowercase') next[transformColumn] = current.toLowerCase();



        if (transformAction === 'Replace Value') {



          next[transformColumn] = current.split(findValue).join(replaceValue);



        }



        return next;



      });



    }



    setRows(nextRows);



    setStatus(`${transformAction} applied. ${nextRows.length} rows are now available.`);



  };



  const clearWorkspace = () => {



    setActiveTab('data');



    setFileName('');



    setTableName('ImportedData');



    setHeaders([]);



    setRows([]);



    setOriginalRows([]);



    setUploadError('');



    setSelectedVisual('Bar');



    setXAxis('');



    setYAxis('');



    setLegend('');



    setAggregation('Sum');



    setFilterField('');



    setFilterValue('All');



    setTransformAction('None');



    setTransformColumn('');



    setFindValue('');



    setReplaceValue('');



    setDaxExpression('');



    setValidationResults([]);



    setHasCheckedSolution(false);



    setSavedAt(null);



    setStatus('Select one of the provided datasets to begin.');



    if (fileInputRef.current) {



      fileInputRef.current.value = '';



    }



  };



  const resetAll = () => {



    const confirmed =



      rows.length === 0 ||



      window.confirm(



        'Reset the entire Power BI workspace? This removes the imported dataset, transformations, visual settings and unsaved progress.',



      );



    if (confirmed) {



      clearWorkspace();



    }



  };



  const buildValidationResults = () => {



    const normalizedHeaders = headers.map((header) =>



      header.trim().toLowerCase().replace(/[\s_-]+/g, ''),



    );



    const isSalesProblem =



      /sales/i.test(problem.title) ||



      /sales/i.test(problem.problemStatement);



    const salesColumnAliases = [



      ['date', 'orderdate'],



      ['product', 'productname'],



      ['category'],



      ['region'],



      ['quantity', 'qty'],



      ['price', 'unitprice'],



      ['revenue', 'sales', 'salesamount', 'amount'],



    ];



    const requiredColumnsPassed =



      !isSalesProblem ||



      salesColumnAliases.every((aliases) =>



        aliases.some((alias) => normalizedHeaders.includes(alias)),



      );



    return [



      {



        label: 'Dataset imported',



        passed: rows.length > 0,



      },



      {



        label: 'Column headers correctly detected',



        passed:



          headers.length > 0 &&



          headers.every((header) => header.trim().length > 0),



      },



      {



        label: isSalesProblem



          ? 'Required sales columns detected'



          : 'Dataset columns detected',



        passed: headers.length > 0 && requiredColumnsPassed,



      },



      {



        label: isSalesProblem



          ? 'Table is named Sales'



          : 'Table has a valid name',



        passed: isSalesProblem



          ? tableName.trim().toLowerCase() === 'sales'



          : tableName.trim().length > 0,



      },



      {



        label: 'Dataset ready for analysis',



        passed:



          rows.length > 0 &&



          headers.length > 0 &&



          tableName.trim().length > 0,



      },



    ];



  };



  const checkSolution = async () => {
    if (!rows.length) {
      setStatus('Load a dataset before checking the solution.');
      return;
    }

    setIsApiBusy(true);
    setStatus('Checking solution...');

    try {
      const currentAttemptId = await ensureAttemptId();
      const response = await apiFetch(
        `${POWER_BI_API_BASE}/power-bi-lab/attempts/${currentAttemptId}/check`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problemSlug,
            workspace: getWorkspacePayload(),
          }),
        },
      );

      const data = (await readApiResponse(response)) as BackendValidationSummary;
      const summary = applyBackendValidation(data);
      const passedCount = (summary.results ?? []).filter((result) => result.passed).length;
      const totalCount = summary.results?.length ?? 0;

      setStatus(
        summary.passed
          ? `Solution passed${totalCount ? `: ${passedCount}/${totalCount} checks completed.` : '.'}`
          : `Solution check completed${totalCount ? `: ${passedCount}/${totalCount} requirements passed.` : '.'}`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? `Check Solution failed: ${error.message}`
          : 'Check Solution failed.',
      );
    } finally {
      setIsApiBusy(false);
    }
  };

  const saveProgress = async () => {
    if (!rows.length) {
      setStatus('Load a dataset before saving progress.');
      return;
    }

    setIsApiBusy(true);
    setStatus('Saving progress...');

    try {
      const currentAttemptId = await ensureAttemptId();
      const response = await apiFetch(
        `${POWER_BI_API_BASE}/power-bi-lab/attempts/${currentAttemptId}/save`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problemSlug,
            workspace: getWorkspacePayload(),
            activeTab,
            clientSavedAt: new Date().toISOString(),
          }),
        },
      );

      await readApiResponse(response);

      const saved = new Date();
      const time = saved.toLocaleTimeString();
      setSavedAt(time);
      setStatus(`Progress saved at ${time}.`);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? `Save Progress failed: ${error.message}`
          : 'Save Progress failed.',
      );
    } finally {
      setIsApiBusy(false);
    }
  };

  const submitSolution = async () => {
    if (!rows.length) {
      setStatus('Load a dataset before submitting.');
      return;
    }

    setIsApiBusy(true);
    setStatus('Submitting solution...');

    try {
      const currentAttemptId = await ensureAttemptId();
      const response = await apiFetch(
        `${POWER_BI_API_BASE}/power-bi-lab/attempts/${currentAttemptId}/submit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problemSlug,
            workspace: getWorkspacePayload(),
            activeTab,
            clientSubmittedAt: new Date().toISOString(),
          }),
        },
      );

      const data = (await readApiResponse(response)) as BackendValidationSummary;
      const summary = applyBackendValidation(data);
      const passed = summary.passed ?? data.status === 'PASSED';
      const percentage = summary.percentage;

      setStatus(
        passed
          ? `Submission passed${typeof percentage === 'number' ? ` with ${percentage}%` : ''}.`
          : `Submission failed${typeof percentage === 'number' ? ` with ${percentage}%` : ''}. Fix the failed checks and submit again.`,
      );
    } catch (error) {
      setStatus(
        error instanceof Error
          ? `Submission failed: ${error.message}`
          : 'Submission failed.',
      );
    } finally {
      setIsApiBusy(false);
    }
  };

  const onFieldDrop = (



    event: DragEvent<HTMLSelectElement | HTMLDivElement>,



    setter: (value: string) => void,



  ) => {



    event.preventDefault();



    const field = event.dataTransfer.getData('text/plain');



    if (headers.includes(field)) setter(field);



  };



  const hasData = rows.length > 0;



  return (



    <div className="powerbi-workspace">



      <div className="powerbi-shell">



        <header className="powerbi-header">



          <button



            type="button"



            className="powerbi-button powerbi-back-button"



            onClick={() => router.back()}



            aria-label="Go back"



          >



            ← Back



          </button>



          <div>



            <p className="powerbi-eyebrow">Power BI Practice Workspace</p>



            <h1>{problem.title}</h1>



            <p className="powerbi-status">{status}</p>



          </div>



          <div className="powerbi-header-actions">



              {allowCustomUpload && (



                <>



                  <input



                    ref={fileInputRef}



                    type="file"



                    accept=".csv,text/csv"



                    onChange={handleCsvUpload}



                    className="hidden"



                  />



                  <button



                    type="button"



                    className="powerbi-button powerbi-primary"



                    onClick={() => fileInputRef.current?.click()}



                  >



                    Upload CSV



                  </button>



                </>



              )}



            <button type="button" className="powerbi-button" onClick={resetData}>



              Reset Data



            </button>



          </div>



        </header>



        {uploadError && <div className="powerbi-error">{uploadError}</div>}



        <nav className="powerbi-tabs">



          {(['data', 'transform', 'model', 'dax', 'report'] as PowerBITab[]).map((tab) => (



            <button



              key={tab}



              type="button"



              className={`powerbi-tab ${activeTab === tab ? 'active' : ''}`}



              onClick={() => setActiveTab(tab)}



            >



              {tab === 'dax' ? 'DAX' : tab.charAt(0).toUpperCase() + tab.slice(1)}



            </button>



          ))}



        </nav>



        <div className="powerbi-layout">



          <aside className="powerbi-problem-panel">



            <h2>Problem</h2>



            <p className="powerbi-problem-text">{problem.problemStatement}</p>



            {(problem.difficulty || problem.estimatedMinutes) && (



              <div className="powerbi-chip-row">



                {problem.difficulty && <span className="powerbi-chip">{problem.difficulty}</span>}



                {problem.estimatedMinutes !== undefined && (



                  <span className="powerbi-chip">{problem.estimatedMinutes} min</span>



                )}



              </div>



            )}



            {!!problem.skills?.length && (



              <>



                <h3>Skills</h3>



                <div className="powerbi-chip-row">



                  {problem.skills.map((skill) => (



                    <span className="powerbi-chip" key={skill}>{skill}</span>



                  ))}



                </div>



              </>



            )}



            <h3>Imported Dataset</h3>



            <div className="powerbi-inset-card">



              <strong>{fileName || 'No dataset loaded'}</strong>



              <span>{hasData ? `${rows.length} rows · ${headers.length} columns` : 'Select a provided dataset to start'}</span>



            </div>



            <h3>Table Name</h3>



            <input



              className="powerbi-input"



              value={tableName}



              onChange={(event) => setTableName(event.target.value)}



              disabled={!hasData}



            />



          </aside>



          <main className="powerbi-center">



            {!hasData ? (



              <EmptyWorkspace



                  datasets={availableDatasets}



                  selectedDatasetId={selectedDatasetId}



                  isLoading={isLoadingDataset}



                  allowCustomUpload={allowCustomUpload}



                  onSelect={setSelectedDatasetId}



                  onLoad={loadProvidedDataset}



                  onUpload={() => fileInputRef.current?.click()}



                />



            ) : (



              <>



                {activeTab === 'data' && (



                  <DataView tableName={tableName} headers={headers} rows={rows} />



                )}



                {activeTab === 'transform' && (



                  <TransformView



                    headers={headers}



                    rows={rows}



                    action={transformAction}



                    column={transformColumn}



                    findValue={findValue}



                    replaceValue={replaceValue}



                    onActionChange={setTransformAction}



                    onColumnChange={setTransformColumn}



                    onFindChange={setFindValue}



                    onReplaceChange={setReplaceValue}



                    onApply={applyTransform}



                  />



                )}



                {activeTab === 'model' && (



                  <ModelView tableName={tableName} headers={headers} />



                )}



                {activeTab === 'dax' && (



                  <DaxView



                    value={daxExpression}



                    onChange={setDaxExpression}



                    tableName={tableName}



                    numericFields={numericFields}



                    rows={filteredRows}



                  />



                )}



                {activeTab === 'report' && (



                  <ReportView



                    rows={filteredRows}



                    headers={headers}



                    config={visualConfig}



                    data={visualData}



                    filterField={filterField}



                    filterValue={filterValue}



                    filterOptions={filterOptions}



                    onFilterValueChange={setFilterValue}



                  />



                )}



              </>



            )}



          </main>



          <aside className="powerbi-right-panel">



            <VisualizationsPanel



              disabled={!hasData}



              selectedVisual={selectedVisual}



              headers={headers}



              numericFields={numericFields}



              xAxis={xAxis}



              yAxis={yAxis}



              legend={legend}



              aggregation={aggregation}



              filterField={filterField}



              onVisualChange={(visual) => {



                setSelectedVisual(visual);



                setActiveTab('report');



              }}



              onXAxisChange={setXAxis}



              onYAxisChange={setYAxis}



              onLegendChange={setLegend}



              onAggregationChange={setAggregation}



              onFilterFieldChange={(field) => {



                setFilterField(field);



                setFilterValue('All');



              }}



              onFieldDrop={onFieldDrop}



            />



            <FieldsPanel



              tableName={tableName}



              headers={headers}



              numericFields={numericFields}



            />



            <SolutionPanel



                hasChecked={hasCheckedSolution}



                results={validationResults}



              />



          </aside>



        </div>



        <footer className="powerbi-footer">



          <span>{hasData ? `${rows.length} rows loaded from ${fileName}` : 'No dataset loaded'}</span>



          <div className="powerbi-footer-actions">



            <button



              type="button"



              className="powerbi-button"



              onClick={resetAll}



            >



              Reset All



            </button>



            <button



              type="button"



              className="powerbi-button"



              disabled={!hasData || isApiBusy}



              onClick={checkSolution}



            >



              Check Solution



            </button>



            <button



              type="button"



              className="powerbi-button"



              disabled={!hasData || isApiBusy}



              onClick={saveProgress}



            >



              {savedAt ? `Saved ${savedAt}` : 'Save Progress'}



            </button>



            <button



              type="button"



              className="powerbi-button powerbi-primary"



              disabled={!hasData || isApiBusy}



              onClick={submitSolution}



            >



              Submit



            </button>



          </div>



        </footer>



      </div>



    </div>



  );



}



function EmptyWorkspace({

  datasets,

  selectedDatasetId,

  isLoading,

  allowCustomUpload,

  onSelect,

  onLoad,

  onUpload,

}: {

  datasets: ProvidedDataset[];

  selectedDatasetId: string;

  isLoading: boolean;

  allowCustomUpload: boolean;

  onSelect: (datasetId: string) => void;

  onLoad: () => void;

  onUpload: () => void;

}) {

  return (

    <section className="powerbi-empty">

      <div className="powerbi-empty-icon">

        DATA

      </div>



      <h2>Choose a provided dataset</h2>



      <p>

        Select one of the datasets configured for this Power BI

        exercise. Then load the selected dataset into the workspace.

      </p>



      {datasets.length > 0 ? (

        <>

          <div className="powerbi-dataset-picker">

            {datasets.map((dataset) => {

              const selected =

                selectedDatasetId === dataset.id;



              return (

                <button

                  key={dataset.id}

                  type="button"

                  className={`powerbi-dataset-option ${

                    selected ? 'selected' : ''

                  }`}

                  onClick={() =>

                    onSelect(dataset.id)

                  }

                >

                  <span

                    className={`powerbi-dataset-radio ${

                      selected ? 'selected' : ''

                    }`}

                    aria-hidden="true"

                  >

                    {selected && (

                      <span className="powerbi-dataset-radio-dot" />

                    )}

                  </span>



                  <span className="powerbi-dataset-content">

                    <span className="powerbi-dataset-title">

                      {dataset.name}

                    </span>



                    <span className="powerbi-dataset-file">

                      {dataset.fileName}

                    </span>



                    {dataset.description && (

                      <span className="powerbi-dataset-description">

                        {dataset.description}

                      </span>

                    )}

                  </span>

                </button>

              );

            })}

          </div>



          <div className="powerbi-dataset-load-area">

            <div className="powerbi-selected-dataset">

              {selectedDatasetId

                ? `Selected: ${

                    datasets.find(

                      (dataset) =>

                        dataset.id ===

                        selectedDatasetId,

                    )?.fileName ??

                    selectedDatasetId

                  }`

                : 'Select a dataset first'}

            </div>



            <button

              type="button"

              className="powerbi-button powerbi-primary"

              disabled={

                !selectedDatasetId ||

                isLoading

              }

              onClick={onLoad}

            >

              {isLoading

                ? 'Loading Dataset...'

                : 'Load Selected Dataset'}

            </button>

          </div>

        </>

      ) : (

        <div className="powerbi-note">

          No provided datasets are configured for this problem.

        </div>

      )}



      {allowCustomUpload && (

        <button

          type="button"

          className="powerbi-button"

          onClick={onUpload}

        >

          Upload Custom CSV

        </button>

      )}

    </section>

  );

}



function DataView({



  tableName,



  headers,



  rows,



}: {



  tableName: string;



  headers: string[];



  rows: DataRow[];



}) {



  return (



    <section>



      <SectionHeader



        title="Data"



        description="Inspect the rows and columns loaded from the loaded dataset."



      />



      <div className="powerbi-section-toolbar">



        <span className="powerbi-chip">{tableName}</span>



        <span>{rows.length} rows · {headers.length} columns</span>



      </div>



      <div className="powerbi-table-wrapper">



        <table className="powerbi-table">



          <thead>



            <tr>



              {headers.map((header) => <th key={header}>{header}</th>)}



            </tr>



          </thead>



          <tbody>



            {rows.slice(0, 200).map((row, rowIndex) => (



              <tr key={rowIndex}>



                {headers.map((header) => (



                  <td key={`${rowIndex}-${header}`}>{String(row[header] ?? '')}</td>



                ))}



              </tr>



            ))}



          </tbody>



        </table>



      </div>



      {rows.length > 200 && (



        <p className="powerbi-note">Preview shows the first 200 rows. All {rows.length} rows are used by visuals.</p>



      )}



    </section>



  );



}



function TransformView({



  headers,



  rows,



  action,



  column,



  findValue,



  replaceValue,



  onActionChange,



  onColumnChange,



  onFindChange,



  onReplaceChange,



  onApply,



}: {



  headers: string[];



  rows: DataRow[];



  action: TransformAction;



  column: string;



  findValue: string;



  replaceValue: string;



  onActionChange: (value: TransformAction) => void;



  onColumnChange: (value: string) => void;



  onFindChange: (value: string) => void;



  onReplaceChange: (value: string) => void;



  onApply: () => void;



}) {



  return (



    <section>



      <SectionHeader title="Transform" description="Apply transformations to the currently loaded dataset." />



      <div className="powerbi-transform-grid">



        <label>



          <span>Operation</span>



          <select className="powerbi-select" value={action} onChange={(e) => onActionChange(e.target.value as TransformAction)}>



            <option>None</option>



            <option>Remove Empty Rows</option>



            <option>Remove Duplicates</option>



            <option>Trim Text</option>



            <option>Uppercase</option>



            <option>Lowercase</option>



            <option>Replace Value</option>



          </select>



        </label>



        <label>



          <span>Column</span>



          <select className="powerbi-select" value={column} onChange={(e) => onColumnChange(e.target.value)}>



            {headers.map((header) => <option key={header}>{header}</option>)}



          </select>



        </label>



        {action === 'Replace Value' && (



          <>



            <label>



              <span>Find</span>



              <input className="powerbi-input" value={findValue} onChange={(e) => onFindChange(e.target.value)} />



            </label>



            <label>



              <span>Replace with</span>



              <input className="powerbi-input" value={replaceValue} onChange={(e) => onReplaceChange(e.target.value)} />



            </label>



          </>



        )}



        <button type="button" className="powerbi-button powerbi-primary powerbi-apply" disabled={action === 'None'} onClick={onApply}>



          Apply Transform



        </button>



      </div>



      <div className="powerbi-inset-card powerbi-transform-summary">



        <strong>Current query result</strong>



        <span>{rows.length} rows · {headers.length} columns</span>



      </div>



    </section>



  );



}



function ModelView({ tableName, headers }: { tableName: string; headers: string[] }) {



  return (



    <section>



      <SectionHeader title="Model" description="The imported CSV is represented as a model table using its actual fields." />



      <div className="powerbi-model-canvas">



        <div className="powerbi-model-table">



          <div className="powerbi-model-title">{tableName}</div>



          {headers.map((field) => <div className="powerbi-model-field" key={field}>{field}</div>)}



        </div>



        <div className="powerbi-model-hint">



          Upload additional table support can be connected here later for real relationship joins.



        </div>



      </div>



    </section>



  );



}



function DaxView({



  value,



  onChange,



  tableName,



  numericFields,



  rows,



}: {



  value: string;



  onChange: (value: string) => void;



  tableName: string;



  numericFields: string[];



  rows: DataRow[];



}) {



  const [field, setField] = useState(numericFields[0] ?? '');



  const [method, setMethod] = useState<'SUM' | 'AVERAGE' | 'COUNT' | 'MIN' | 'MAX'>('SUM');



  const result = useMemo(() => {



    if (!field) return 0;



    const values = rows.map((row) => toNumber(row[field]));



    if (method === 'SUM') return values.reduce((sum, item) => sum + item, 0);



    if (method === 'AVERAGE') return values.reduce((sum, item) => sum + item, 0) / Math.max(values.length, 1);



    if (method === 'COUNT') return values.length;



    if (method === 'MIN') return Math.min(...values);



    return Math.max(...values);



  }, [field, method, rows]);



  const buildFormula = () => {



    if (!field) return;



    onChange(`${method === 'COUNT' ? 'Count' : method.charAt(0) + method.slice(1).toLowerCase()} ${field} = ${method}(${tableName}[${field}])`);



  };



  return (



    <section>



      <SectionHeader title="DAX" description="Build a measure from numeric columns detected in the loaded dataset." />



      <div className="powerbi-dax-builder">



        <select className="powerbi-select" value={method} onChange={(e) => setMethod(e.target.value as typeof method)}>



          <option>SUM</option><option>AVERAGE</option><option>COUNT</option><option>MIN</option><option>MAX</option>



        </select>



        <select className="powerbi-select" value={field} onChange={(e) => setField(e.target.value)}>



          {numericFields.map((item) => <option key={item}>{item}</option>)}



        </select>



        <button className="powerbi-button" type="button" onClick={buildFormula}>Build Formula</button>



      </div>



      <textarea className="powerbi-dax-editor" value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false} />



      <div className="powerbi-inset-card">



        <strong>Preview result</strong>



        <span>{Number.isFinite(result) ? result.toLocaleString() : '—'}</span>



      </div>



    </section>



  );



}



function ReportView({



  rows,



  headers,



  config,



  data,



  filterField,



  filterValue,



  filterOptions,



  onFilterValueChange,



}: {



  rows: DataRow[];



  headers: string[];



  config: VisualConfig;



  data: Array<{ label: string; value: number }>;



  filterField: string;



  filterValue: string;



  filterOptions: string[];



  onFilterValueChange: (value: string) => void;



}) {



  return (



    <section>



      <SectionHeader title="Report" description="Visuals are generated from the current loaded dataset and selected fields." />



      <div className="powerbi-report-canvas">



        <div className="powerbi-report-title">



          <div>



            <strong>{config.type} visual</strong>



            <span>{config.xAxis || 'Choose an X-axis'} {config.yAxis ? `· ${config.aggregation} of ${config.yAxis}` : ''}</span>



          </div>



          {filterField && (



            <select className="powerbi-select powerbi-slicer-select" value={filterValue} onChange={(e) => onFilterValueChange(e.target.value)}>



              <option value="All">All {filterField}</option>



              {filterOptions.map((option) => <option key={option}>{option}</option>)}



            </select>



          )}



        </div>



        <VisualRenderer type={config.type} data={data} rows={rows} headers={headers} config={config} />



      </div>



    </section>



  );



}



function VisualRenderer({



  type,



  data,



  rows,



  headers,



  config,



}: {



  type: VisualType;



  data: Array<{ label: string; value: number }>;



  rows: DataRow[];



  headers: string[];



  config: VisualConfig;



}) {



  if (!config.xAxis && !['Card', 'KPI', 'Table'].includes(type)) {



    return <DropHint text="Choose or drag a field into X-axis." />;



  }



  if (!config.yAxis && !['Table', 'Slicer'].includes(type)) {



    return <DropHint text="Choose or drag a numeric field into Y-axis." />;



  }



  if (type === 'Table') {



    return (



      <div className="powerbi-table-wrapper powerbi-report-table">



        <table className="powerbi-table">



          <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>



          <tbody>



            {rows.slice(0, 50).map((row, index) => (



              <tr key={index}>{headers.map((header) => <td key={header}>{String(row[header] ?? '')}</td>)}</tr>



            ))}



          </tbody>



        </table>



      </div>



    );



  }



  if (type === 'Card' || type === 'KPI') {



    const values = rows.map((row) => toNumber(row[config.yAxis]));



    let value = values.reduce((sum, item) => sum + item, 0);



    if (config.aggregation === 'Average') value /= Math.max(values.length, 1);



    if (config.aggregation === 'Count') value = values.length;



    if (config.aggregation === 'Min') value = Math.min(...values);



    if (config.aggregation === 'Max') value = Math.max(...values);



    return (



      <div className="powerbi-kpi-live">



        <span>{config.aggregation} of {config.yAxis}</span>



        <strong>{Number.isFinite(value) ? value.toLocaleString() : '0'}</strong>



      </div>



    );



  }



  if (type === 'Slicer') {



    const options = Array.from(new Set(rows.map((row) => String(row[config.xAxis] ?? 'Blank'))));



    return (



      <div className="powerbi-live-slicer">



        {options.slice(0, 30).map((option) => <span className="powerbi-chip" key={option}>{option}</span>)}



      </div>



    );



  }



  if (type === 'Pie' || type === 'Donut') {



    const total = data.reduce((sum, item) => sum + Math.max(item.value, 0), 0) || 1;



    let cursor = 0;



    const stops = data.map((item, index) => {



      const start = cursor;



      cursor += (Math.max(item.value, 0) / total) * 360;



      return `hsl(${(index * 67) % 360} 35% 55%) ${start}deg ${cursor}deg`;



    });



    return (



      <div className="powerbi-pie-layout">



        <div



          className={`powerbi-pie ${type === 'Donut' ? 'donut' : ''}`}



          style={{ background: `conic-gradient(${stops.join(',')})` }}



        />



        <div className="powerbi-legend">



          {data.slice(0, 12).map((item, index) => (



            <div key={item.label}>



              <i style={{ background: `hsl(${(index * 67) % 360} 35% 55%)` }} />



              <span>{item.label}</span>



              <strong>{item.value.toLocaleString()}</strong>



            </div>



          ))}



        </div>



      </div>



    );



  }



  if (type === 'Line') {



    const max = Math.max(...data.map((item) => item.value), 1);



    const points = data.map((item, index) => {



      const x = data.length <= 1 ? 50 : (index / (data.length - 1)) * 100;



      const y = 100 - (item.value / max) * 85;



      return `${x},${y}`;



    }).join(' ');



    return (



      <div className="powerbi-line-chart">



        <svg viewBox="0 0 100 100" preserveAspectRatio="none">



          <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />



        </svg>



        <div className="powerbi-axis-labels">



          {data.slice(0, 8).map((item) => <span key={item.label}>{item.label}</span>)}



        </div>



      </div>



    );



  }



  const max = Math.max(...data.map((item) => Math.abs(item.value)), 1);



  if (type === 'Column') {



    return (



      <div className="powerbi-column-chart">



        {data.slice(0, 20).map((item) => (



          <div className="powerbi-column-item" key={item.label}>



            <span className="powerbi-column-value">{item.value.toLocaleString()}</span>



            <div className="powerbi-column-bar" style={{ height: `${Math.max(4, Math.abs(item.value) / max * 100)}%` }} />



            <span className="powerbi-column-label">{item.label}</span>



          </div>



        ))}



      </div>



    );



  }



  return (



    <div className="powerbi-bar-chart">



      {data.slice(0, 30).map((item) => (



        <div className="powerbi-bar-row" key={item.label}>



          <span>{item.label}</span>



          <div className="powerbi-bar-track">



            <div className="powerbi-bar-fill" style={{ width: `${Math.max(2, Math.abs(item.value) / max * 100)}%` }} />



          </div>



          <strong>{item.value.toLocaleString()}</strong>



        </div>



      ))}



    </div>



  );



}



function VisualizationsPanel({



  disabled,



  selectedVisual,



  headers,



  numericFields,



  xAxis,



  yAxis,



  legend,



  aggregation,



  filterField,



  onVisualChange,



  onXAxisChange,



  onYAxisChange,



  onLegendChange,



  onAggregationChange,



  onFilterFieldChange,



  onFieldDrop,



}: {



  disabled: boolean;



  selectedVisual: VisualType;



  headers: string[];



  numericFields: string[];



  xAxis: string;



  yAxis: string;



  legend: string;



  aggregation: VisualConfig['aggregation'];



  filterField: string;



  onVisualChange: (value: VisualType) => void;



  onXAxisChange: (value: string) => void;



  onYAxisChange: (value: string) => void;



  onLegendChange: (value: string) => void;



  onAggregationChange: (value: VisualConfig['aggregation']) => void;



  onFilterFieldChange: (value: string) => void;



  onFieldDrop: (event: DragEvent<HTMLSelectElement | HTMLDivElement>, setter: (value: string) => void) => void;



}) {



  return (



    <section className="powerbi-panel">



      <h2>Visualizations</h2>



      <div className="powerbi-visual-grid">



        {VISUALS.map((visual) => (



          <button



            key={visual}



            type="button"



            disabled={disabled}



            className={`powerbi-visual-button ${selectedVisual === visual ? 'selected' : ''}`}



            onClick={() => onVisualChange(visual)}



          >



            {visual}



          </button>



        ))}



      </div>



      <h3>Build Visual</h3>



      <FieldSelect



        label="X-axis"



        value={xAxis}



        fields={headers}



        placeholder="Choose field"



        onChange={onXAxisChange}



        onDrop={onFieldDrop}



      />



      <FieldSelect



        label="Y-axis"



        value={yAxis}



        fields={numericFields}



        placeholder="Choose numeric field"



        onChange={onYAxisChange}



        onDrop={onFieldDrop}



      />



      <FieldSelect



        label="Legend"



        value={legend}



        fields={headers}



        placeholder="Optional"



        onChange={onLegendChange}



        onDrop={onFieldDrop}



      />



      <label className="powerbi-control">



        <span>Aggregation</span>



        <select className="powerbi-select" value={aggregation} onChange={(e) => onAggregationChange(e.target.value as VisualConfig['aggregation'])}>



          <option>Sum</option><option>Average</option><option>Count</option><option>Min</option><option>Max</option>



        </select>



      </label>



      <label className="powerbi-control">



        <span>Report filter / slicer</span>



        <select className="powerbi-select" value={filterField} onChange={(e) => onFilterFieldChange(e.target.value)}>



          <option value="">No filter</option>



          {headers.map((field) => <option key={field}>{field}</option>)}



        </select>



      </label>



    </section>



  );



}



function FieldSelect({



  label,



  value,



  fields,



  placeholder,



  onChange,



  onDrop,



}: {



  label: string;



  value: string;



  fields: string[];



  placeholder: string;



  onChange: (value: string) => void;



  onDrop: (event: DragEvent<HTMLSelectElement>, setter: (value: string) => void) => void;



}) {



  return (



    <label className="powerbi-control">



      <span>{label}</span>



      <select



        className="powerbi-select"



        value={value}



        onChange={(e) => onChange(e.target.value)}



        onDragOver={(e) => e.preventDefault()}



        onDrop={(e) => onDrop(e, onChange)}



      >



        <option value="">{placeholder}</option>



        {fields.map((field) => <option key={field}>{field}</option>)}



      </select>



    </label>



  );



}



function FieldsPanel({



  tableName,



  headers,



  numericFields,



}: {



  tableName: string;



  headers: string[];



  numericFields: string[];



}) {



  return (



    <section className="powerbi-panel">



      <h2>Data</h2>



      <div className="powerbi-field-table">▾ {tableName}</div>



      <div className="powerbi-field-list">



        {headers.length ? headers.map((field) => (



          <div



            key={field}



            draggable



            className="powerbi-field"



            onDragStart={(event) => event.dataTransfer.setData('text/plain', field)}



          >



            <span>{numericFields.includes(field) ? '∑' : '□'}</span>



            {field}



          </div>



        )) : <span className="powerbi-note">Load a dataset to detect fields.</span>}



      </div>



    </section>



  );



}



function SolutionPanel({



  hasChecked,



  results,



}: {



  hasChecked: boolean;



  results: Array<{ label: string; passed: boolean }>;



}) {



  const completed = results.filter((result) => result.passed).length;



  return (



    <section className="powerbi-panel">



      <h2>Solution Check</h2>



      {!hasChecked ? (



        <p className="powerbi-note">



          Click Check Solution to validate the current workspace.



        </p>



      ) : (



        <>



          <div className="powerbi-check-list">



            {results.map((result) => (



              <div key={result.label}>



                <span>{result.passed ? '✓' : '✕'}</span>



                {result.label}



              </div>



            ))}



          </div>



          <div className="powerbi-score">



            {completed} / {results.length}



          </div>



        </>



      )}



    </section>



  );



}



function SectionHeader({ title, description }: { title: string; description: string }) {



  return (



    <div className="powerbi-section-header">



      <h2>{title}</h2>



      <p>{description}</p>



    </div>



  );



}



function DropHint({ text }: { text: string }) {



  return <div className="powerbi-drop-hint">{text}</div>;



}
