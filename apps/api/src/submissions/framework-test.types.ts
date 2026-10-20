export type FrameworkSourceCheck = {
  filePath: string;
  pattern: string;
  flags?: string;
  message: string;
};

export type SourceCheckedHiddenTestCase = {
  id: string;
  title: string;
  requiredFiles?: string[];
  requiredSourceChecks?: FrameworkSourceCheck[];
  forbiddenSourceChecks?: FrameworkSourceCheck[];
};

export type NextJsHiddenTestCase = SourceCheckedHiddenTestCase;
export type NestJsHiddenTestCase = SourceCheckedHiddenTestCase;
export type DjangoHiddenTestCase = SourceCheckedHiddenTestCase;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type SpringBootHiddenTestCase = {
  method: HttpMethod;
  path: string;
  body?: string;
  expectedStatus?: number;
  expectedOutput?: string;
};

export type AspNetCoreHiddenTestCase = {
  id: string;
  method: HttpMethod;
  path: string;
  expectedStatus: number;
  expectedOutput?: string;
  body?: string;
  headers?: Record<string, string>;
  requiredFiles?: string[];
};

export type FastApiHiddenTestCase = {
  type: 'http';
  method: HttpMethod;
  path: string;
  expectedStatus: number;
  expectedJson?: unknown;
  body?: unknown;
  name?: string;
};