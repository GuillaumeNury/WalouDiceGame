import { IScoreStep, ScoreStep } from '@core/models';
import { ScoreStepService } from './score-step.service';

describe('Service: ScoreStep', () => {
  let scoreStepService: ScoreStepService;

  beforeEach(() => {
    scoreStepService = new ScoreStepService();
  });

  describe('Method: addStar', () => {
    it('should hasStar and no be shot when calling addStar once', () => {
      let step: IScoreStep = new ScoreStep(100);

      step = scoreStepService.addStar(step);

      expect(step.hasStar).toBe(true);
      expect(step.isShot).toBe(false);
    });
    it('should hasStar and be shot when calling addStar twice', () => {
      let step: IScoreStep = new ScoreStep(100);

      step = scoreStepService.addStar(step);
      step = scoreStepService.addStar(step);

      expect(step.hasStar).toBe(true);
      expect(step.isShot).toBe(true);
    });
  });
});
