import { IScoreStep, ScoreStep } from './score-step.model';

export interface IPlayer {
  name: string;
  scoreSteps: IScoreStep[];
}

export class Player implements IPlayer {
  public name: string;
  public scoreSteps: ScoreStep[];

  public constructor(name: string) {
    this.name = name;
    this.scoreSteps = [];
  }
}
