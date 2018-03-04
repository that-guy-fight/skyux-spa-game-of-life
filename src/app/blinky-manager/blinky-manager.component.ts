import {
  Component, OnInit, OnDestroy
} from '@angular/core';

@Component({
  selector: 'app-blinky-manager',
  templateUrl: './blinky-manager.component.html',
  styleUrls: ['./blinky-manager.component.scss']
})
export class BlinkyManagerComponent implements OnInit, OnDestroy {
  private userNumber: number;
  private ticSpeed: number;
  private blinkyReferences: any[][];
  private myInterval: any;
  private referencesCopy: any[][];
  private maxRange = 1;
  private canActivate: boolean;
  private hasSubmitted: boolean;
  private invalidInput: boolean;
  private isRunning = { state: false };

  constructor() { }

  public ngOnInit() {
    this.ticSpeed = .25;
    this.blinkyReferences = [];
    this.referencesCopy = [];
    this.canActivate = false;
    this.hasSubmitted = false;
    this.invalidInput = false;
  }

  public ngOnDestroy() {
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  }

  private submitInput() {
    if (!this.checkUserNumberInput()) {
      this.invalidInput = true;
    } else {
      this.invalidInput = false;
      this.canActivate = true;
      this.hasSubmitted = true;
      this.initializeArrays();
    }
  }

  private initializeArrays() {
    this.blinkyReferences = [];
    for (let i = 0; i < this.userNumber; i++) {
      this.blinkyReferences[i] = [];
      for (let j = 0; j < this.userNumber; j++) {
        this.blinkyReferences[i][j] = { x: i, y: j, alive: false };
      }
    }
  }

  private activate() {
    this.canActivate = false;
    this.isRunning.state = true;
    this.referencesCopy = this.cloneObject(this.blinkyReferences);
    this.myInterval = setInterval(() => {
      this.calculate();
    }, this.ticSpeed * 1000);
  }

  private pause() {
    this.canActivate = true;
    this.isRunning.state = false;
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  }

  private reset() {
    this.pause();
    this.userNumber = undefined;
    this.canActivate = false;
    this.invalidInput = false;
    this.referencesCopy = [];
    this.blinkyReferences = [];
  }

  private calculate() {
    for (let i = 0; i < this.referencesCopy.length; i++) {
      for (let j = 0; j < this.referencesCopy[i].length; j++) {
        this.referencesCopy[i][j].alive = this.checkNeighbors(i, j);
      }
    }
    this.blinkyReferences = this.cloneObject(this.referencesCopy);
  }

  private checkNeighbors(i: number, j: number): boolean {
    return this.checkCell(i, j, this.referencesCopy[i][j].alive);
  }

  private checkCell(i: number, j: number, alive: boolean): boolean {
    let count = 0;
    for (let x = i - this.maxRange; x <= i + this.maxRange; x++) {
      if (x < 0 || x >= this.referencesCopy.length) {
        continue;
      }
      for (let y = j - this.maxRange; y <= j + this.maxRange; y++) {
        if (y < 0 || y >= this.referencesCopy[x].length) {
          continue;
        }
        if (this.checkForValidCell(i, j, x, y) && this.blinkyReferences[x][y].alive === true) {
          count++;
        }
        if (count > 3) { return false; }
      }
    }
    if (alive) {
      if (count === 2 || count === 3) { return true; }
    } else {
      if (count === 3) { return true; }
    }
    return false;
  }

  private checkForValidCell(i: number, j: number, x: number, y: number): boolean {
    if ((x !== i || y !== j) && this.referencesCopy[x][y] !== undefined
      && this.referencesCopy[x][y] !== null) {
      return true;
    }
    return false;
  }

  private checkInputKey(event: any) {
    if (event.key === 'Enter' && event.srcElement.name === 'userNumber'
      && this.userNumber !== undefined) {
      this.submitInput();
    } else {
      const numberPattern = /^[0-9]$/;
      if (!numberPattern.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  private checkUserNumberInput(): boolean {
    const validPattern = /^[0-9]+$/;
    if (this.userNumber === undefined || this.userNumber === null
      || !validPattern.test(this.userNumber.toString())) {
      return false;
    }
    return true;
  }

  private cloneObject(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}
