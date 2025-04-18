import type { Either } from "../../core/domain/Either";
import type { DataError } from "../../core/domain/DataError";
import type { ICountry } from "../entities/country/CountryEntity";

export interface ICountryRepository {
  fetchCountries(): Promise<Either<DataError, ICountry[]>>;
}
