import { IPlayer, IScoreStep, Player, ScoreStep } from '@core/models';
import { ScoreStepService } from '@core/services';
import { PlayerService } from './player.service';

describe('Service: Player', () => {
  let playerService: PlayerService;
  let scoreStepService: ScoreStepService;

  beforeEach(() => {
    scoreStepService = new ScoreStepService();
    playerService = new PlayerService(scoreStepService);
  });

  describe('Method: score', () => {
    it('should return 0 when no scoreSteps', () => {
      const player = new Player('player');

      expect(playerService.currentScore(player)).toBe(0);
    });

    it('should return 1000 when two scoreSteps', () => {
      let player: IPlayer = new Player('player');
      player = playerService.addScoreStep(player, new ScoreStep(500));
      player = playerService.addScoreStep(player, new ScoreStep(1000));

      expect(playerService.currentScore(player)).toBe(1000);
    });

    it('should return 0 when one shot scoreStep', () => {
      let player: IPlayer = new Player('player');
      let step: IScoreStep = new ScoreStep(500);

      player = playerService.addScoreStep(player, step);
      player = playerService.addStar(player);
      player = playerService.addStar(player);

      expect(playerService.currentScore(player)).toBe(0);
    });
  });
});
