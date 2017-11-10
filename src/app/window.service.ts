import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {
  private answerToEverything: number = 42; // of course
  private panelTitle: string

  constructor() { }

  giveMeTheAnswer(): number {
    return this.answerToEverything;
  }
}
