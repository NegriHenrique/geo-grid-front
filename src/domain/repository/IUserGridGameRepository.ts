import type {
  IAsignCountry,
  IUserGame,
} from "./../entities/grid-game/GridGameEntity";
import type { Either } from "../../core/domain/Either";
import type { DataError } from "../../core/domain/DataError";

export interface IUserGridGameRepository {
  fetchUserGridGame(): Either<DataError, IUserGame>;
  asignCountry(
    asignContry: IAsignCountry
  ): Promise<Either<DataError, number[][]>>;
}
