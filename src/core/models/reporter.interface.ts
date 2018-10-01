import { Player } from './player.model';
import { ScoreStep } from './score-step.model';

export interface IReporter {
  onPlayerShot: (
    player: Player,
    shotPlayer: Player,
    shotScoreStep: ScoreStep,
  ) => void;
  onZeroScore: (player: Player) => void;
  onDoubleStarOnScoreStep: (player: Player, shotScoreStep: ScoreStep) => void;
}

export class NoopReporter implements IReporter {
  onPlayerShot = (
    _player: Player,
    _shotPlayer: Player,
    _shotScoreStep: ScoreStep,
  ) => undefined;
  onZeroScore = (_player: Player) => undefined;
  onDoubleStarOnScoreStep = (_player: Player, _shotScoreStep: ScoreStep) =>
    undefined;
}
