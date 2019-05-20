import { Component, OnInit } from '@angular/core';

type LinkObject = {
  caption: string;
  url: string;
};

@Component({
  selector: 'sp-left-bar',
  templateUrl: './sp-left-bar.component.html',
  styleUrls: ['./sp-left-bar.component.scss']
})
export class SpLeftBarComponent implements OnInit {

  links: LinkObject[] = [
    { caption: 'Welcome', url: '/welcome' },
    { caption: 'Comms Tool Demo', url: '/comms' },
    { caption: 'Achievement Tracker Demo', url: '/tracker' }
    // { caption: 'Other Projects', url: '/others' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
