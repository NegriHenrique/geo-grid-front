import { BaseRepository } from "../../core/data/repository";
import type { DataError } from "../../core/domain/DataError";
import { Either } from "../../core/domain/Either";
import type { IGridGame } from "../../domain/entities/grid-game/GridGameEntity";
import type { IGridGameRepository } from "../../domain/repository/IGridGameRepository";
import { GridGameResponseModel } from "../models/GridGameModel";

export class GridGameRepository
  extends BaseRepository
  implements IGridGameRepository
{
  async fetchGame(): Promise<Either<DataError, IGridGame>> {
    try {
      const { data } = await this.axios.get("/game/new");

      const result = GridGameResponseModel.fromJson(data);
      return Either.right(result.toDomain().data);
    } catch (error) {
      return Either.left(this.handleErrors(error));
    }
  }
}
