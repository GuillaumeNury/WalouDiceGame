import { IGame, IPlayer, IReporter, IScoreStep } from '@core/models';
import { replaceItem } from '../utils';
import { PlayerService } from './player.service';

export class GameService {
  public constructor(
    private reporter: IReporter,
    private playerService: PlayerService,
  ) {}

  public setNextPlayer(game: IGame): IGame {
    if (!game.players.length) {
      return game;
    }

    const currentPlayerIndex = game.currentPlayer
      ? game.players.indexOf(game.currentPlayer)
      : -1;
    const newIndex = (currentPlayerIndex + 1) % game.players.length;

    return {
      ...game,
      currentPlayer: game.players[newIndex],
    };
  }

  public scorePoints(game: IGame, points: number): IGame {
    const player = game.currentPlayer;

    if (!player) {
      throw new Error('[GameService] No current player.');
    }

    game = this._applyPointsOnPlayer(game, points, player);
    return this._shootOtherPlayers(game, player);
  }

  private _shootOtherPlayers(game: IGame, player: IPlayer): IGame {
    const [playerWithSameScore] = game.players
      // Try to shoot other player only
      .filter(p => p !== player)
      // Player with a score of 0 cannot be shot
      .filter(p => this.playerService.currentScore(p) > 0)
      // get players with same score
      .filter(
        p =>
          this.playerService.currentScore(p) ===
          this.playerService.currentScore(player),
      );

    if (playerWithSameScore) {
      const shotStep = this.playerService.lastScoreStep(
        playerWithSameScore,
      ) as IScoreStep;
      game = this._tryShoot(game, playerWithSameScore);
      this.reporter.onPlayerShot(player, playerWithSameScore, shotStep);

      return this._shootOtherPlayers(game, playerWithSameScore);
    }

    return game;
  }

  private _applyPointsOnPlayer(
    game: IGame,
    points: number,
    player: IPlayer,
  ): IGame {
    let playerWithPoints: IPlayer;

    if (points === 0) {
      this.reporter.onZeroScore(player);
      playerWithPoints = this.playerService.addStar(player, this.reporter);
    }

    playerWithPoints = this.playerService.addPoints(player, points);

    return {
      ...game,
      players: replaceItem(game.players, player, playerWithPoints),
    };
  }

  private _tryShoot(game: IGame, player: IPlayer): IGame {
    const shotStep = this.playerService.lastScoreStep(player) as IScoreStep;
    const newPlayer = this.playerService.shoot(player);
    this.reporter.onPlayerShot(player, player, shotStep);

    return {
      ...game,
      players: replaceItem(game.players, player, newPlayer),
    };
  }
}
