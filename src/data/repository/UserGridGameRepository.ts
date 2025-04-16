import { BaseRepository } from "../../core/data/repository";
import type { DataError } from "../../core/domain/DataError";
import { Either } from "../../core/domain/Either";
import type {
  CountrySelectedType,
  IAsignCountry,
  IUserGame,
} from "../../domain/entities/grid-game/GridGameEntity";
import type { IUserGridGameRepository } from "../../domain/repository/IUserGridGameRepository";
import { StorageKeys, StoragePrefix } from "../storage";

export class UserGridGameRepository
  extends BaseRepository
  implements IUserGridGameRepository
{
  private readonly storageName =
    StoragePrefix.SESSION + StorageKeys.USER_SELECTED_COUNTRY_ID;

  fetchUserGridGame(): Either<DataError, IUserGame> {
    try {
      const data = sessionStorage.getItem(this.storageName);
      const countrySelected: CountrySelectedType = data ? JSON.parse(data) : [];

      return Either.right({
        countrySelected,
      });
    } catch (error) {
      return Either.left(this.handleErrors(error));
    }
  }

  async asignCountry({
    countryIdSelected,
    gridRowIndex = 0,
    gridColumnIndex = 0,
  }: IAsignCountry): Promise<Either<DataError, CountrySelectedType>> {
    try {
      const userGridGame = this.fetchUserGridGame();

      return await new Promise((resolve) => {
        userGridGame.fold(
          (error) => {
            resolve(Either.left(error));
          },
          ({ countrySelected }) => {
            if (gridRowIndex < 0 || gridColumnIndex < 0) {
              resolve(Either.left(this.handleErrors("Invalid index")));
            }

            if (!!countrySelected?.[gridRowIndex][gridColumnIndex]) {
              resolve(
                Either.left(this.handleErrors("Country already selected"))
              );
            }

            countrySelected[gridRowIndex][gridColumnIndex] = countryIdSelected;
            sessionStorage.setItem(
              this.storageName,
              JSON.stringify(countrySelected)
            );
            resolve(Either.right(countrySelected));
          }
        );
      });
    } catch (error) {
      return Either.left(this.handleErrors(error));
    }
  }
}
