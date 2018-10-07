export interface IScoreStep {
  points: number;
  hasStar: boolean;
  isShot: boolean;
}

export class ScoreStep implements IScoreStep {
  public hasStar: boolean;
  public isShot: boolean;
  public points: number;

  public constructor(points: number) {
    this.hasStar = false;
    this.isShot = false;
    this.points = points;
  }

  public addStar(): void {
    if (this.hasStar) {
      this.shot();
    } else {
      this.hasStar = true;
    }
  }

  public shot(): void {
    this.isShot = true;
  }
}
