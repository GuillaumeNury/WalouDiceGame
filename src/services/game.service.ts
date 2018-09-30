import { Game, Player, ScoreStep } from "../models";

export class GameService {
  public scorePoints(game: Game, points: number): void {
    const player = game.currentPlayer;

    if (!player) {
      throw new Error("[GameService] No current player.");
    }

    this._applyPointsOnPlayer(points, player);
    this._shootOtherPlayers(game, player);
  }

  private _shootOtherPlayers(game: Game, player: Player): void {
    const [playerWithSameScore] = game.players
      .filter(p => p !== player)
      .filter(p => p.currentScore === player.currentScore);

    if (playerWithSameScore) {
      this._tryAddStar(playerWithSameScore);
      this._shootOtherPlayers(game, player);
    }
  }

  private _applyPointsOnPlayer(points: number, player: Player) {
    if (points === 0) {
      this._tryAddStar(player);
    } else {
      player.addScoreStep(new ScoreStep(points));
    }
  }

  private _tryAddStar(player: Player): void {
    if (player.lastScoreStep) {
      player.lastScoreStep.addStar();
    }
  }
}
