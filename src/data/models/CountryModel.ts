import type { ErrorData } from "../../core/domain/DataError";
import type {
  ICountry,
  ICountryResponse,
} from "../../domain/entities/country/CountryEntity";

export class CountryResponseModel {
  public id: number;
  public message: string;
  public data: ICountry[];
  public errors: ErrorData[];
  constructor({
    id,
    message,
    data,
    errors,
  }: {
    id: number;
    message: string;
    data: ICountry[];
    errors: ErrorData[];
  }) {
    this.id = id;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
  static fromJson = (json: any): CountryResponseModel => {
    return new CountryResponseModel({
      id: json.id,
      message: json.message,
      data: json,
      errors: json.errors,
    });
  };
  public toDomain = (): ICountryResponse => {
    return {
      message: this.message,
      data: CountryModel.fromJson(this.data).map((country) =>
        country.toDomain()
      ),
      errors: this.errors,
    };
  };
}

export class CountryModel {
  id: number;
  name: string;
  constructor({ id, name }: ICountry) {
    this.id = id;
    this.name = name;
  }
  static fromJson = (json: ICountry[]): CountryModel[] => {
    return json.map(
      (country) =>
        new CountryModel({
          id: country.id,
          name: country.name,
        })
    );
  };
  public toDomain = (): ICountry => ({
    id: this.id,
    name: this.name,
  });
}
