"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePermissionGate } from "../../permissions/PermissionsProvider";
import { adminApi, errorText } from "../../lib/api";
import { capitalize, cx } from "../lib/shared";
import formStyles from "../ProblemForm/ProblemForm.module.css";
import styles from "./ProblemPlacement.module.css";

interface StageOption {
  id: string;
  title: string;
  level: string;
  position: number;
  problemCount: number;
}

interface ModuleOption {
  id: string;
  name: string;
  phase: string;
  stackName: string;
  domainName: string;
  technologySlug: string | null;
  matchesTechnology: boolean;
  problemCount: number;
}

interface Placement {
  technology: { slug: string; name: string };
  stages: StageOption[];
  modules: ModuleOption[];
  stageIds: string[];
  moduleIds: string[];
}

const same = (a: string[], b: string[]) => a.length === b.length && a.every((value) => b.includes(value));

export default function ProblemPlacement({ problemId, published }: { problemId: string; published: boolean }) {
  const gate = usePermissionGate("problems.manage");
  const [data, setData] = useState<Placement | null>(null);
  const [stageIds, setStageIds] = useState<string[]>([]);
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const load = useCallback(async () => {
    try {
      const next = await adminApi<Placement>(`/admin/problems/${problemId}/placement`);
      setData(next);
      setStageIds(next.stageIds);
      setModuleIds(next.moduleIds);
    } catch (error) {
      setMessage({ tone: "error", text: errorText(error) });
    }
  }, [problemId]);

  useEffect(() => {
    void load();
  }, [load]);

  const visibleModules = useMemo(
    () => (data?.modules ?? []).filter((module) => showAll || module.matchesTechnology || moduleIds.includes(module.id)),
    [data, showAll, moduleIds],
  );

  const toggle = (list: string[], set: (next: string[]) => void, id: string) => {
    setMessage(null);
    set(list.includes(id) ? list.filter((value) => value !== id) : [...list, id]);
  };

  const dirty = data ? !same(stageIds, data.stageIds) || !same(moduleIds, data.moduleIds) : false;

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const next = await adminApi<Placement>(`/admin/problems/${problemId}/placement`, { method: "PUT", body: { stageIds, moduleIds } });
      setData(next);
      setStageIds(next.stageIds);
      setModuleIds(next.moduleIds);
      setMessage({ tone: "ok", text: "Placement saved." });
    } catch (error) {
      setMessage({ tone: "error", text: errorText(error) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={cx(formStyles.card, formStyles.section)}>
      <h2 className={formStyles.sectionTitle}>Where learners find it</h2>
      {!published && <p className={formStyles.hint} style={{ marginTop: -12, marginBottom: 20 }}>Learners only see this problem once it is published.</p>}

      {!data ? (
        <p className={formStyles.hint}>{message?.tone === "error" ? message.text : "Loading…"}</p>
      ) : (
        <fieldset className={formStyles.fieldset} disabled={saving || !gate.allowed} title={gate.title}>
          <div className={styles.group}>
            <div className={styles.groupHead}>
              <h3 className={styles.groupTitle}>{`${data.technology.name} practice path`}</h3>
              <span className={formStyles.hint}>Unplaced problems appear under “More problems”.</span>
            </div>
            {data.stages.length === 0 ? (
              <p className={formStyles.hint}>{`No practice stages exist for ${data.technology.name} yet.`}</p>
            ) : (
              <ul className={styles.list}>
                {data.stages.map((stage) => {
                  const checked = stageIds.includes(stage.id);
                  return (
                    <li key={stage.id}>
                      <label className={cx(styles.option, checked && styles.optionChecked)}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(stageIds, setStageIds, stage.id)} />
                        <span>
                          <span className={styles.optionName}>{stage.title}</span>
                          <span className={styles.optionMeta}>{`${capitalize(stage.level.toLowerCase())} · ${stage.problemCount} problem${stage.problemCount === 1 ? "" : "s"}`}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={styles.group}>
            <div className={styles.groupHead}>
              <h3 className={styles.groupTitle}>Targeted Stack modules</h3>
              <label className={styles.toggle}>
                <input type="checkbox" checked={showAll} onChange={(event) => setShowAll(event.target.checked)} />
                {`Show modules for other technologies (${data.modules.length})`}
              </label>
            </div>
            {visibleModules.length === 0 ? (
              <p className={formStyles.hint}>{`No stack module uses ${data.technology.name}. Turn on “Show modules for other technologies” to pick one anyway.`}</p>
            ) : (
              <ul className={styles.list}>
                {visibleModules.map((module) => {
                  const checked = moduleIds.includes(module.id);
                  return (
                    <li key={module.id}>
                      <label className={cx(styles.option, checked && styles.optionChecked)}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(moduleIds, setModuleIds, module.id)} />
                        <span>
                          <span className={styles.optionName}>{module.name}</span>
                          <span className={styles.optionMeta}>{`${module.stackName} · ${module.domainName} · ${module.problemCount} problem${module.problemCount === 1 ? "" : "s"}`}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={styles.footer}>
            <button type="button" className={formStyles.button} disabled={!dirty || saving || !gate.allowed} onClick={save}>
              {saving ? "Saving…" : "Save placement"}
            </button>
            {dirty && (
              <button
                type="button"
                className={cx(formStyles.button, formStyles.buttonGhost)}
                onClick={() => {
                  setStageIds(data.stageIds);
                  setModuleIds(data.moduleIds);
                  setMessage(null);
                }}
              >
                Discard
              </button>
            )}
            {message && <span className={message.tone === "ok" ? styles.ok : styles.error} role={message.tone === "ok" ? "status" : "alert"}>{message.text}</span>}
          </div>
        </fieldset>
      )}
    </div>
  );
}