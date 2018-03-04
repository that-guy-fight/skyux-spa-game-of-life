import {
  Component, OnInit, Input
} from '@angular/core';

@Component({
  selector: 'app-blinky',
  templateUrl: './blinky.component.html',
  styleUrls: ['./blinky.component.scss']
})
export class BlinkyComponent implements OnInit {
  @Input('reference') private reference: any;
  @Input('isRunning') private isRunning: any;
  private alive: boolean;

  constructor() { }

  public ngOnInit() {
    this.alive = false;
  }

  private toggleBlinker() {
    this.reference.alive = !this.reference.alive;
  }
}
