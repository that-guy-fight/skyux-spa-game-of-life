import { Component } from '@angular/core';

@Component({
  selector: 'my-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  public team = [
    {
      name: 'Brandon Fightmaster',
      email: 'that.guy.fight@gmail.com'
    }
  ];

  constructor() {}
}
