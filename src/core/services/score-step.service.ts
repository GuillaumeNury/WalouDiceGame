import { IScoreStep } from '@core/models';

export class ScoreStepService {
  public addStar(step: IScoreStep): IScoreStep {
    if (step.hasStar) {
      return this.shot(step);
    } else {
      return {
        ...step,
        hasStar: true,
      };
    }
  }

  public shot(step: IScoreStep): IScoreStep {
    return {
      ...step,
      isShot: true,
    };
  }
}
