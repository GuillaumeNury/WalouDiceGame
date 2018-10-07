import { IPlayer } from './player.model';

export interface IGame {
  players: IPlayer[];
  currentPlayer: IPlayer | null;
}

export class Game implements IGame {
  public players: IPlayer[];

  public currentPlayer: IPlayer | null;

  public constructor(...players: IPlayer[]) {
    this.players = players;
    this.currentPlayer = null;
  }
}
