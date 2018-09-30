import { Game } from "./game.model";
import { Player } from "./player.model";

describe("Model: Game", () => {
  describe("Method: setNextPlayer()", () => {
    it("should not fail if no players", () => {
      const game = new Game();

      expect(() => game.setNextPlayer()).not.toThrow();
    });

    it("should return player1 when one player", () => {
      const game = new Game();
      const p1 = new Player("p1");

      game.addPlayers(p1);
      game.setNextPlayer();

      expect(game.currentPlayer).toBe(p1);
    });

    it("should return player1 when one player and called twice", () => {
      const game = new Game();
      const p1 = new Player("p1");

      game.addPlayers(p1);
      game.setNextPlayer();
      game.setNextPlayer();

      expect(game.currentPlayer).toBe(p1);
    });

    it("should return player2 when two player and called twice", () => {
      const game = new Game();
      const p1 = new Player("p1");
      const p2 = new Player("p2");

      game.addPlayers(p1, p2);
      game.setNextPlayer();
      game.setNextPlayer();

      expect(game.currentPlayer).toBe(p2);
    });
  });
});
