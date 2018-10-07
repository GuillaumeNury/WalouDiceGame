import { IPlayer, IReporter, IScoreStep } from '@core/models';
import { PlayerService } from '@core/services';

const getLossString = (currentScore: number, shotScoreStep: IScoreStep) =>
  `redescend à ${currentScore} points (-${shotScoreStep.points -
    currentScore} pts)`;

export class Reporter implements IReporter {
  public constructor(private playerService: PlayerService) {}

  onPlayerShot = (
    player: IPlayer,
    shotPlayer: IPlayer,
    shotScoreStep: IScoreStep,
  ) =>
    console.log(
      `${player.name} shoot ${shotPlayer.name} qui ${getLossString(
        this.playerService.currentScore(shotPlayer),
        shotScoreStep,
      )} !`,
    );
  onZeroScore = (player: IPlayer) =>
    console.log(`Pour ${player.name}, c'est WALOOOOO !`);
  onDoubleStarOnScoreStep = (player: IPlayer, shotScoreStep: IScoreStep) =>
    console.log(
      `Et deux étoiles pour ${player.name} qui ${getLossString(
        this.playerService.currentScore(player),
        shotScoreStep,
      )} !`,
    );
}
