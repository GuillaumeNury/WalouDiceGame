import { Game, IGame, NoopReporter, Player, ScoreStep } from '@core/models';
import { IPlayer } from '../models/player.model';
import { GameService } from './game.service';
import { PlayerService } from './player.service';
import { ScoreStepService } from './score-step.service';

describe('Service: GameService', () => {
  let gameService: GameService;
  let playerService: PlayerService;

  beforeEach(() => {
    const scoreStepService = new ScoreStepService();
    playerService = new PlayerService(scoreStepService);
    gameService = new GameService(new NoopReporter(), playerService);
  });
  describe('Method: scorePoints()', () => {
    it('should throw error when no players', () => {
      const game = new Game();

      expect(() => gameService.scorePoints(game, 42)).toThrow();
    });

    it('should add score when positive points', () => {
      const player = new Player('player');
      let game: IGame = new Game(player);

      game = gameService.setNextPlayer(game);
      game = gameService.scorePoints(game, 42);

      expect(playerService.currentScore(player)).toBe(42);
    });

    it('should not add score when 0 points and score is 0', () => {
      const player = new Player('player');
      let game: IGame = new Game(player);

      game = gameService.setNextPlayer(game);
      game = gameService.scorePoints(game, 0);

      expect(playerService.currentScore(player)).toBe(0);
    });

    it('should not add score when 0 points and score is 0', () => {
      const player = new Player('player');
      let game: IGame = new Game(player);

      game = gameService.setNextPlayer(game);
      game = gameService.scorePoints(game, 0);

      expect(playerService.currentScore(player)).toBe(0);
    });

    it('should add star when 0 points', () => {
      let player: IPlayer = new Player('player');
      player = playerService.addPoints(player, 50);
      let game: IGame = new Game(player);

      game = gameService.setNextPlayer(game);

      expect(player.scoreSteps[0].hasStar).toBe(false);

      game = gameService.scorePoints(game, 0);

      [player] = game.players;
      expect(player.scoreSteps[0].hasStar).toBe(true);
    });

    it('should shot scoreStep when 0 points with starred step', () => {
      let player: IPlayer = new Player('player');
      player.scoreSteps = [{ ...new ScoreStep(50), hasStar: true }];
      let game: IGame = new Game(player);

      game = gameService.setNextPlayer(game);

      let step = game.players[0].scoreSteps[0];
      expect(step.isShot).toBe(false);

      game = gameService.scorePoints(game, 0);

      step = game.players[0].scoreSteps[0];
      expect(step.isShot).toBe(true);
    });

    it('should shot player1 when player2 score same points', () => {
      const player1 = new Player('player1');
      const player2 = new Player('player2');

      let game: IGame = new Game(player1, player2);

      game = gameService.setNextPlayer(game);

      game = gameService.scorePoints(game, 1000);
      game = gameService.setNextPlayer(game);

      expect(playerService.currentScore(player1)).toBe(1000);

      game = gameService.scorePoints(game, 1000);
      expect(playerService.currentScore(player1)).toBe(0);
      expect(playerService.currentScore(player2)).toBe(1000);
    });

    it("should shot player1 when player2 score 0 points and has a new scoreStep with player1's points", () => {
      let player1: IPlayer = new Player('player1');
      let player2: IPlayer = new Player('player2');

      let game: IGame = new Game(player1, player2);

      // Player 2 has 2000pts, with a star on lastScoreStep
      player2.scoreSteps = [
        new ScoreStep(1000),
        { ...new ScoreStep(2000), hasStar: true },
      ];

      game = gameService.setNextPlayer(game);

      // Player1 scores 1000pts
      game = gameService.scorePoints(game, 1000);
      game = gameService.setNextPlayer(game);

      [player1, player2] = game.players;
      expect(playerService.currentScore(player1)).toBe(1000);
      expect(playerService.currentScore(player2)).toBe(2000);

      // Player2 scores 0pts
      game = gameService.scorePoints(game, 0);

      [player1, player2] = game.players;
      expect(playerService.currentScore(player1)).toBe(0);
      expect(playerService.currentScore(player2)).toBe(1000);
    });
  });
  describe('Method: setNextPlayer()', () => {
    it('should not fail if no players', () => {
      const game = new Game();

      expect(() => gameService.setNextPlayer(game)).not.toThrow();
    });

    it('should return player1 when one player', () => {
      const p1 = new Player('p1');
      let game: IGame = new Game(p1);

      game = gameService.setNextPlayer(game);

      expect(game.currentPlayer).toBe(p1);
    });

    it('should return player1 when one player and called twice', () => {
      const p1 = new Player('p1');
      let game: IGame = new Game(p1);

      game = gameService.setNextPlayer(game);
      game = gameService.setNextPlayer(game);

      expect(game.currentPlayer).toBe(p1);
    });

    it('should return player2 when two player and called twice', () => {
      const p1 = new Player('p1');
      const p2 = new Player('p2');
      let game: IGame = new Game(p1, p2);

      game = gameService.setNextPlayer(game);
      game = gameService.setNextPlayer(game);

      expect(game.currentPlayer).toBe(p2);
    });
  });
});
