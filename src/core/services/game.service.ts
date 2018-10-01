import { Game, Player, ScoreStep } from '../models';

export class GameService {
  public scorePoints(game: Game, points: number): void {
    const player = game.currentPlayer;

    if (!player) {
      throw new Error('[GameService] No current player.');
    }

    this._applyPointsOnPlayer(points, player);
    this._shootOtherPlayers(game, player);
  }

  private _shootOtherPlayers(game: Game, player: Player): void {
    const [playerWithSameScore] = game.players
      // Try to shoot other player only
      .filter(p => p !== player)
      // Player with a score of 0 cannot be shot
      .filter(p => p.currentScore > 0)
      // get players with same score
      .filter(p => p.currentScore === player.currentScore);

    if (playerWithSameScore) {
      this._tryShoot(playerWithSameScore);
      this._shootOtherPlayers(game, playerWithSameScore);
    }
  }

  private _applyPointsOnPlayer(points: number, player: Player) {
    if (points === 0) {
      this._tryAddStar(player);
    } else {
      player.addScoreStep(new ScoreStep(player.currentScore + points));
    }
  }

  private _tryAddStar(player: Player): void {
    if (player.lastScoreStep) {
      player.lastScoreStep.addStar();
    }
  }

  private _tryShoot(player: Player): void {
    if (player.lastScoreStep) {
      player.lastScoreStep.shot();
    }
  }
}
