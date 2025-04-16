import type { Router } from "vue-router";
import { ploc } from "../../core/ploc";
import type { FetchGridGameUseCase } from "../../domain/use-cases/grid-game/FetchGridGameUseCase";
import type { GridGameStore } from "./gridGameState";
import type { IGridGame } from "../../domain/entities/grid-game/GridGameEntity";

export class GridGameBloc extends ploc<GridGameStore> {
  private fetchGridGameUseCase: FetchGridGameUseCase;

  constructor({
    store,
    router,
    fetchGridGameUseCase,
  }: {
    store: GridGameStore;
    router: Router;
    fetchGridGameUseCase: FetchGridGameUseCase;
  }) {
    super({ store, router });
    this.fetchGridGameUseCase = fetchGridGameUseCase;
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
        console.log(
          "🚀 ~ GridGameBloc ~ initGame= ~ this.store.game:",
          this.store.game
        );
        this.store.loadingRequest = false;
      }
    );
  };
}
