import type { ICountryRepository } from "../../repository/ICountryRepository";

export class FetchCountriesUseCase {
  private countriesRepository: ICountryRepository;

  constructor({
    countryRepository,
  }: {
    countryRepository: ICountryRepository;
  }) {
    this.countriesRepository = countryRepository;
  }

  execute() {
    return this.countriesRepository.fetchCountries();
  }
}
