import type { IUserGridGameRepository } from "../../repository/IUserGridGameRepository";

export class FetchUserGridGameUseCase {
  private userGridGameRepository: IUserGridGameRepository;

  constructor({
    UserGridGameRepository,
  }: {
    UserGridGameRepository: IUserGridGameRepository;
  }) {
    this.userGridGameRepository = UserGridGameRepository;
  }

  execute() {
    return this.userGridGameRepository.fetchUserGridGame();
  }
}
