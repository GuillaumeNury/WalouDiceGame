import { Player } from "./player.model";

export class Game {
  public get players(): Player[] {
    return this._players;
  }

  public get currentPlayer(): Player | null {
    return this._currentPlayer;
  }

  private _players: Player[];
  private _currentPlayer: Player | null;

  public constructor() {
    this._players = [];
    this._currentPlayer = null;
  }

  public addPlayers(...players: Player[]): void {
    this._players = [...this._players, ...players];
  }

  public setNextPlayer(): void {
    if (!this._players.length) {
      return;
    }

    const currentPlayerIndex = this._currentPlayer
      ? this.players.indexOf(this._currentPlayer)
      : -1;
    const newIndex = (currentPlayerIndex + 1) % this.players.length;

    this._currentPlayer = this.players[newIndex];
  }
}
