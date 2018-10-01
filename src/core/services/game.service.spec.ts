import { Game, NoopReporter, Player } from '../models';
import { ScoreStep } from '../models/score-step.model';
import { GameService } from './game.service';

describe('Service: GameService', () => {
  let gameService: GameService;

  beforeEach(() => {
    gameService = new GameService(new NoopReporter());
  });
  describe('Method: play()', () => {
    it('should throw error when no players', () => {
      const game = new Game();

      expect(() => gameService.scorePoints(game, 42)).toThrow();
    });

    it('should add score when positive points', () => {
      const game = new Game();
      const player = new Player('player');
      game.addPlayers(player);
      game.setNextPlayer();

      gameService.scorePoints(game, 42);

      expect(player.currentScore).toBe(42);
    });

    it('should not add score when 0 points and score is 0', () => {
      const game = new Game();
      const player = new Player('player');
      game.addPlayers(player);
      game.setNextPlayer();

      gameService.scorePoints(game, 0);

      expect(player.currentScore).toBe(0);
    });

    it('should not add score when 0 points and score is 0', () => {
      const game = new Game();
      const player = new Player('player');
      game.addPlayers(player);
      game.setNextPlayer();

      gameService.scorePoints(game, 0);

      expect(player.currentScore).toBe(0);
    });

    it('should add star when 0 points', () => {
      const game = new Game();
      const step = new ScoreStep(50);
      const player = new Player('player');

      player.addScoreStep(step);
      game.addPlayers(player);
      game.setNextPlayer();

      expect(step.hasStar).toBe(false);

      gameService.scorePoints(game, 0);

      expect(step.hasStar).toBe(true);
    });

    it('should shot scoreStep when 0 points with starred step', () => {
      const game = new Game();
      const step = new ScoreStep(50);
      const player = new Player('player');

      player.addScoreStep(step);
      game.addPlayers(player);
      game.setNextPlayer();
      step.addStar();

      expect(step.isShot).toBe(false);

      gameService.scorePoints(game, 0);

      expect(step.isShot).toBe(true);
    });

    it('should shot player1 when player2 score same points', () => {
      const game = new Game();

      const player1 = new Player('player1');
      const player2 = new Player('player2');

      game.addPlayers(player1, player2);
      game.setNextPlayer();

      gameService.scorePoints(game, 1000);
      game.setNextPlayer();

      expect(player1.currentScore).toBe(1000);

      gameService.scorePoints(game, 1000);
      expect(player1.currentScore).toBe(0);
      expect(player2.currentScore).toBe(1000);
    });

    it("should shot player1 when player2 score 0 points and has a new scoreStep with player1's points", () => {
      const game = new Game();

      const player1 = new Player('player1');
      const player2 = new Player('player2');

      game.addPlayers(player1, player2);

      // Player 2 has 2000pts, with a star on lastScoreStep
      player2.addScoreStep(new ScoreStep(1000));
      player2.addScoreStep(new ScoreStep(2000));
      const scoreStep = player2.lastScoreStep as ScoreStep;
      scoreStep.addStar();

      game.setNextPlayer();

      // Player1 scores 1000pts
      gameService.scorePoints(game, 1000);
      game.setNextPlayer();

      expect(player1.currentScore).toBe(1000);
      expect(player2.currentScore).toBe(2000);

      // Player2 scores 0pts
      gameService.scorePoints(game, 0);

      expect(player1.currentScore).toBe(0);
      expect(player2.currentScore).toBe(1000);
    });
  });
});
