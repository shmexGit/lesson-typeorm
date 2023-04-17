export interface IResultProperties {
  error?: string;
  data: Array<Record<string, unknown>> | Record<string, unknown> | string;
}
