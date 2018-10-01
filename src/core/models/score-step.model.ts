export class ScoreStep {
  public get points(): number {
    return this._points;
  }

  public get hasStar(): boolean {
    return this._hasStar;
  }

  public get isShot(): boolean {
    return this._isShot;
  }

  private _hasStar: boolean;
  private _isShot: boolean;
  private _points: number;

  public constructor(points: number) {
    this._hasStar = false;
    this._isShot = false;
    this._points = points;
  }

  public addStar(): void {
    if (this._hasStar) {
      this.shot();
    } else {
      this._hasStar = true;
    }
  }

  public shot(): void {
    this._isShot = true;
  }
}
