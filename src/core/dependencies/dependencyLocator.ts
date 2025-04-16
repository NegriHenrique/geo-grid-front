import { useRouter } from "vue-router";
import CustomAxios from "../utility/customAxios";
import type { GridGameStore } from "../../presentation/bloc/gridGameState";
import { GridGameBloc } from "../../presentation/bloc/gridGameBloc";
import useGameState from "../../presentation/bloc/gridGameState";
import { FetchGridGameUseCase } from "../../domain/use-cases/grid-game/FetchGridGameUseCase";
import { GridGameRepository } from "../../data/repository/GridGameRepository";

const provAxiosInstance = () => {
  const userData = localStorage.getItem("userData");
  const user = userData ? JSON.parse(userData) : "";

  const axios = new CustomAxios({ ...(user && { userId: user["user-id"] }) });
  return axios;
};

const provideAccessControlPloc = (store: {}) => {
  const router = useRouter();
  const axios = provAxiosInstance();
  return { store, router, axios };
};

const provideGridGameBloc = (store: GridGameStore) => {
  const router = useRouter();
  const axios = provAxiosInstance();

  if (!store) {
    store = useGameState();
  }
  const gridGameRepository = new GridGameRepository({ axios });
  const fetchGridGameUseCase = new FetchGridGameUseCase({ gridGameRepository });

  return new GridGameBloc({ store, router, fetchGridGameUseCase });
};

export const dependencyLocator = {
  provideAccessControlPloc,
  provideGridGameBloc,
};
