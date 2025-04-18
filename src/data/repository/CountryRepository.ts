import { BaseRepository } from "../../core/data/repository";
import type { DataError } from "../../core/domain/DataError";
import { Either } from "../../core/domain/Either";
import type { ICountry } from "../../domain/entities/country/CountryEntity";
import type { ICountryRepository } from "../../domain/repository/ICountryRepository";
import { CountryResponseModel } from "../models/CountryModel";

export class CountryRepository
  extends BaseRepository
  implements ICountryRepository
{
  async fetchCountries(): Promise<Either<DataError, ICountry[]>> {
    try {
      const { data } = await this.axios.get("/countries/ids");

      const result = CountryResponseModel.fromJson(data);
      return Either.right(result.toDomain().data);
    } catch (error) {
      return Either.left(this.handleErrors(error));
    }
  }
}
