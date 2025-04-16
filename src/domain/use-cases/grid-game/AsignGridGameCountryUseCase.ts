import type { IAsignCountry } from "../../entities/grid-game/GridGameEntity";
import type { IUserGridGameRepository } from "../../repository/IUserGridGameRepository";

export class AsignGridGameCountryUseCase {
  private userGridGameRepository: IUserGridGameRepository;

  constructor({
    UserGridGameRepository,
  }: {
    UserGridGameRepository: IUserGridGameRepository;
  }) {
    this.userGridGameRepository = UserGridGameRepository;
  }

  execute(asignContry: IAsignCountry) {
    return this.userGridGameRepository.asignCountry(asignContry);
  }
}
