import { Player } from "./player.model";
import { ScoreStep } from "./score-step.model";

describe("Model: Player", () => {
  describe("Method: score", () => {
    it("should return 0 when no scoreSteps", () => {
      const player = new Player("player");

      expect(player.currentScore).toBe(0);
    });

    it("should return 1000 when two scoreSteps", () => {
      const player = new Player("player");
      player.addScoreStep(new ScoreStep(500));
      player.addScoreStep(new ScoreStep(1000));

      expect(player.currentScore).toBe(1000);
    });

    it("should return 0 when one shot scoreStep", () => {
      const player = new Player("player");
      const step = new ScoreStep(500);
      player.addScoreStep(step);

      step.addStar();
      step.addStar();

      expect(player.currentScore).toBe(0);
    });
  });
});
