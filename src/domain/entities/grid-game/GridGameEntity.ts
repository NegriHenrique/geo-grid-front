export interface ErrorData {
  message: string;
  source: string;
  value: string;
}

export interface IGridGameResponse {
  message: string;
  data: IGridGame;
  errors: ErrorData[];
}

export interface IGridGame {
  board: IGridGameRow[];
  row_conditions: IRowCondition[];
  column_conditions: IColumnCondition[];
}

export interface IGridGameRow extends Array<IGridGameCell> {}

export interface IGridGameCell {
  row_condition: IRowCondition;
  column_condition: IColumnCondition;
  possible_answers: IPossibleAnswer[];
  is_answered: boolean;
  country_asigned_index?: number;
}

export interface IRowCondition {
  scope: string;
  arg: number;
  descricao: string;
  possible_answers_count: number;
}

export interface IColumnCondition {
  scope: string;
  arg: string;
  descricao: string;
  possible_answers_count: number;
}

export interface IPossibleAnswer {
  name: string;
  flag: string;
  id: number;
}

export type CountrySelectedType = number[][];

export interface IUserGame {
  countrySelected: CountrySelectedType;
}

export interface IAsignCountry {
  countryIdSelected: number;
  gridRowIndex: number;
  gridColumnIndex: number;
}
