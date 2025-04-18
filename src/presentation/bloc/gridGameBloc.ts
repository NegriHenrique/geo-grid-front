import type { Router } from "vue-router";
import { ploc } from "../../core/ploc";
import type { FetchGridGameUseCase } from "../../domain/use-cases/grid-game/FetchGridGameUseCase";
import type { GridGameStore } from "./gridGameState";
import type { IGridGame } from "../../domain/entities/grid-game/GridGameEntity";
import { FetchCountriesUseCase } from "../../domain/use-cases/grid-game/FetchCountriesUseCase";

export class GridGameBloc extends ploc<GridGameStore> {
  private fetchGridGameUseCase: FetchGridGameUseCase;
  private fetchCountries: FetchCountriesUseCase;

  constructor({
    store,
    router,
    fetchGridGameUseCase,
    fetchCountriesUseCase,
  }: {
    store: GridGameStore;
    router: Router;
    fetchGridGameUseCase: FetchGridGameUseCase;
    fetchCountriesUseCase: FetchCountriesUseCase;
  }) {
    super({ store, router });
    this.fetchGridGameUseCase = fetchGridGameUseCase;
    this.fetchCountries = fetchCountriesUseCase;
  }

  initGame = async () => {
    this.store.error = "";
    this.store.loadingRequest = true;

    const result = await this.fetchGridGameUseCase.execute();

    result.fold(
      (error) => {
        this.store.error = this.handleErrors(error);
        console.error(error);
        this.store.loadingRequest = false;
        return null;
      },
      (data: IGridGame) => {
        this.store.game = data;
        this.store.loadingRequest = false;
      }
    );

    const countries = await this.fetchCountries.execute();
    countries.fold(
      (error) => {
        this.store.serverError = error;
        console.error(error);
        return null;
      },
      (data) => {
        this.store.countries = data;
        this.store.successStatus = true;
      }
    );
  };
}
