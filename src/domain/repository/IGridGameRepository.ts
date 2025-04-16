import type { Either } from "../../core/domain/Either";
import type { DataError } from "../../core/domain/DataError";
import type { IGridGame } from "../entities/grid-game/GridGameEntity";

export interface IGridGameRepository {
  fetchGame(): Promise<Either<DataError, IGridGame>>;
}
