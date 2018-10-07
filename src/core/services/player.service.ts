import {
  IPlayer,
  IReporter,
  IScoreStep,
  NoopReporter,
  ScoreStep,
} from '@core/models';
import { ScoreStepService } from './score-step.service';

export class PlayerService {
  public constructor(private scoreStepService: ScoreStepService) {}

  public activeScoreSteps(player: IPlayer): IScoreStep[] {
    return player.scoreSteps.filter(step => !step.isShot);
  }

  public lastScoreStep(player: IPlayer): IScoreStep | null {
    const activeScoreSteps = this.activeScoreSteps(player);
    return activeScoreSteps.length
      ? activeScoreSteps[activeScoreSteps.length - 1]
      : null;
  }

  public currentScore(player: IPlayer): number {
    const lastScoreStep = this.lastScoreStep(player);

    return lastScoreStep ? lastScoreStep.points : 0;
  }

  public addScoreStep(player: IPlayer, scoreStep: IScoreStep): IPlayer {
    return {
      ...player,
      scoreSteps: [...player.scoreSteps, scoreStep],
    };
  }

  public addPoints(player: IPlayer, points: number): IPlayer {
    const currentScore = this.currentScore(player);

    return this.addScoreStep(player, new ScoreStep(currentScore + points));
  }

  public addStar(
    player: IPlayer,
    reporter: IReporter = new NoopReporter(),
  ): IPlayer {
    const lastScoreStep = this.lastScoreStep(player);

    if (!lastScoreStep) {
      return player;
    }

    const scoreSteps = player.scoreSteps.map(step => {
      if (step !== lastScoreStep) {
        return step;
      }

      const newStep = this.scoreStepService.addStar(step);

      if (newStep.isShot) {
        reporter.onDoubleStarOnScoreStep(player, newStep);
      }

      return newStep;
    });

    return {
      ...player,
      scoreSteps,
    };
  }

  public shoot(player: IPlayer): IPlayer {
    const lastScoreStep = this.lastScoreStep(player);

    if (!lastScoreStep) {
      return player;
    }

    const scoreSteps = player.scoreSteps.map(step => {
      if (step !== lastScoreStep) {
        return step;
      }

      return this.scoreStepService.shot(step);
    });

    return {
      ...player,
      scoreSteps,
    };
  }
}
