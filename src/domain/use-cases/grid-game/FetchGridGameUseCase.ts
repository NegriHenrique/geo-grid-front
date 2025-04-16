import type { IGridGameRepository } from "../../repository/IGridGameRepository";

export class FetchGridGameUseCase {
  private gridGameRepository: IGridGameRepository;

  constructor({
    gridGameRepository,
  }: {
    gridGameRepository: IGridGameRepository;
  }) {
    this.gridGameRepository = gridGameRepository;
  }

  execute() {
    return this.gridGameRepository.fetchGame();
  }
}
