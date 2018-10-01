import { Game, IReporter, Player, ScoreStep } from '../models';

export class GameService {
  public constructor(private reporter: IReporter) {}
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
      const shotStep = this._tryShoot(playerWithSameScore);
      this.reporter.onPlayerShot(player, playerWithSameScore, shotStep);

      this._shootOtherPlayers(game, playerWithSameScore);
    }
  }

  private _applyPointsOnPlayer(points: number, player: Player) {
    if (points === 0) {
      this.reporter.onZeroScore(player);
      this._tryAddStar(player);
    } else {
      player.addScoreStep(new ScoreStep(player.currentScore + points));
    }
  }

  private _tryAddStar(player: Player): void {
    const lastScoreStep = player.lastScoreStep;

    if (lastScoreStep) {
      lastScoreStep.addStar();

      if (lastScoreStep.isShot) {
        this.reporter.onDoubleStarOnScoreStep(player, lastScoreStep);
      }
    }
  }

  private _tryShoot(player: Player): ScoreStep {
    const step = player.lastScoreStep as ScoreStep;
    step.shot();

    return step;
  }
}
