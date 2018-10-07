import { IPlayer } from './player.model';
import { IScoreStep } from './score-step.model';

export interface IReporter {
  onPlayerShot: (
    player: IPlayer,
    shotPlayer: IPlayer,
    shotScoreStep: IScoreStep,
  ) => void;
  onZeroScore: (player: IPlayer) => void;
  onDoubleStarOnScoreStep: (player: IPlayer, shotScoreStep: IScoreStep) => void;
}

export class NoopReporter implements IReporter {
  onPlayerShot = (
    _player: IPlayer,
    _shotPlayer: IPlayer,
    _shotScoreStep: IScoreStep,
  ) => undefined;
  onZeroScore = (_player: IPlayer) => undefined;
  onDoubleStarOnScoreStep = (_player: IPlayer, _shotScoreStep: IScoreStep) =>
    undefined;
}
