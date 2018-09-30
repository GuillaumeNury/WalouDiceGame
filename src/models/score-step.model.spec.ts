import { ScoreStep } from "./score-step.model";

describe("Model: ScoreStep", () => {
  describe("Method: addStar", () => {
    it("should hasStar and no be shot when calling addStar once", () => {
      const step = new ScoreStep(100);

      step.addStar();

      expect(step.hasStar).toBe(true);
      expect(step.isShot).toBe(false);
    });
    it("should hasStar and be shot when calling addStar twice", () => {
      const step = new ScoreStep(100);

      step.addStar();
      step.addStar();

      expect(step.hasStar).toBe(true);
      expect(step.isShot).toBe(true);
    });
  });
});
