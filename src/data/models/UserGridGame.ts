import type { IUserGame } from "../../domain/entities/grid-game/GridGameEntity";

export class UserGridGame {
  userGame: IUserGame;
  constructor(userGame: IUserGame) {
    this.userGame = userGame;
  }
  static fromJson = (json: IUserGame): UserGridGame =>
    new UserGridGame({
      countrySelected: json.countrySelected,
    });
  public toDomain = (): IUserGame => ({
    ...this.userGame,
  });
}
