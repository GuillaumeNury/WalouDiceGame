import { IReporter, Player, ScoreStep } from '../core/models';

const getLossString = (player: Player, shotScoreStep: ScoreStep) =>
  `redescend à ${player.currentScore} points (-${shotScoreStep.points -
    player.currentScore} pts)`;

export class Reporter implements IReporter {
  onPlayerShot = (
    player: Player,
    shotPlayer: Player,
    shotScoreStep: ScoreStep,
  ) =>
    console.log(
      `${player.name} shoot ${shotPlayer.name} qui ${getLossString(
        shotPlayer,
        shotScoreStep,
      )} !`,
    );
  onZeroScore = (player: Player) =>
    console.log(`Pour ${player.name}, c'est WALOOOOO !`);
  onDoubleStarOnScoreStep = (player: Player, shotScoreStep: ScoreStep) =>
    console.log(
      `Et deux étoiles pour ${player.name} qui ${getLossString(
        player,
        shotScoreStep,
      )} !`,
    );
}
