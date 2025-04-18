export interface ErrorData {
  message: string;
  source: string;
  value: string;
}

export interface ICountryResponse {
  message: string;
  data: ICountry[];
  errors: ErrorData[];
}

export interface ICountry {
  id: number;
  name: string;
}
