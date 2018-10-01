import { ScoreStep } from "./score-step.model";
export class Player {
  public get name(): string {
    return this._name;
  }

  public get scoreSteps(): ScoreStep[] {
    return this._scoreSteps.filter(step => !step.isShot);
  }

  public get lastScoreStep(): ScoreStep | null {
    return this.scoreSteps.length
      ? this.scoreSteps[this.scoreSteps.length - 1]
      : null;
  }

  public get currentScore(): number {
    const lastScoreStep = this.lastScoreStep;

    return lastScoreStep ? lastScoreStep.points : 0;
  }

  private _name: string;
  private _scoreSteps: ScoreStep[];

  public constructor(name: string) {
    this._name = name;
    this._scoreSteps = [];
  }

  public addScoreStep(scoreStep: ScoreStep) {
    this._scoreSteps = [...this._scoreSteps, scoreStep];
  }
}
