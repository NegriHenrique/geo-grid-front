import { dependencyLocator } from "./../../core/dependencies/dependencyLocator";
import { defineStore } from "pinia";
import type {
  CountrySelectedType,
  IGridGame,
  IUserGame,
} from "../../domain/entities/grid-game/GridGameEntity";
import type { DataError } from "../../core/domain/DataError";

interface State {
  game: IGridGame;
  userGame: IUserGame;
  error?: string;
  serverError?: DataError;
  successStatus: boolean;
  loadingRequest: boolean;
}

const useGameState = defineStore("GameState", {
  state: (): State => {
    return {
      game: {} as IGridGame,
      userGame: {
        countrySelected: [],
      },
      loadingRequest: false,
      successStatus: false,
      error: undefined,
      serverError: undefined,
    };
  },
  getters: {
    getGameSet(): IGridGame {
      return this.game;
    },
  },
  actions: {
    async initGame(): Promise<void> {
      const gridGameBloc = dependencyLocator.provideGridGameBloc(this);

      await gridGameBloc.initGame();

      this.game = gridGameBloc.store.game;
      this.error = gridGameBloc.store.error;
    },

    selectCountry(countrySelected: CountrySelectedType): void {
      localStorage.setItem("countrySelected", JSON.stringify(countrySelected));
      this.userGame.countrySelected = countrySelected;
    },

    getCountrySelected(): CountrySelectedType {
      return this.userGame.countrySelected;
    },
  },
});

export default useGameState;

export type GridGameStore = Omit<
  ReturnType<typeof useGameState>,
  keyof ReturnType<typeof defineStore>
>;
