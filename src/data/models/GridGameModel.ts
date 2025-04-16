import type { ErrorData } from "../../core/domain/DataError";
import type {
  IColumnCondition,
  IGridGame,
  IGridGameResponse,
  IGridGameRow,
  IRowCondition,
} from "../../domain/entities/grid-game/GridGameEntity";

export class GridGameResponseModel {
  public id: number;
  public message: string;
  public data: IGridGame;
  public errors: ErrorData[];
  constructor({
    id,
    message,
    data,
    errors,
  }: {
    id: number;
    message: string;
    data: IGridGame;
    errors: ErrorData[];
  }) {
    this.id = id;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
  static fromJson = (json: any): GridGameResponseModel => {
    return new GridGameResponseModel({
      id: json.id,
      message: json.message,
      data: json.payload,
      errors: json.errors,
    });
  };
  public toDomain = (): IGridGameResponse => ({
    message: this.message,
    data: GridGameModel.fromJson(this.data).toDomain(),
    errors: this.errors,
  });
}

export class GridGameModel {
  board: IGridGameRow[];
  row_conditions: IRowCondition[];
  column_conditions: IColumnCondition[];
  constructor({ board, row_conditions, column_conditions }: IGridGame) {
    this.board = board;
    this.row_conditions = row_conditions;
    this.column_conditions = column_conditions;
  }
  static fromJson = (json: any): GridGameModel =>
    new GridGameModel({
      board: json.board,
      row_conditions: json.row_conditions,
      column_conditions: json.column_conditions,
    });
  public toDomain = (): IGridGame => ({
    board: this.board,
    row_conditions: this.row_conditions,
    column_conditions: this.column_conditions,
  });
}
