interface HeadersResponseType {
  "content-length": string;
  "content-type": string;
}

interface TransitionalConfigType {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

interface EnvResponseType {}

interface HeadersConfigType {
  Accept: string;
}

interface ParamsConfigType {
  prearrangedDiscount: string;
  type: string;
  viewType: string;
}

interface ConfigResponseType {
  transitional: TransitionalConfigType;
  adapter: string[];
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: string;
  maxBodyLength: string;
  env: EnvResponseType;
  headers: HeadersConfigType;
  url: string;
  method: string;
  params: ParamsConfigType;
}

interface RequestResponseType {}

export interface CommonResponseType {
  status: number;
  statusText: string;
  headers: HeadersResponseType;
  config: ConfigResponseType;
  request: RequestResponseType;
}
