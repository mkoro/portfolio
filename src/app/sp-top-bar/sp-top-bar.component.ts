import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InfoDialog } from '../info-dialog.component';

@Component({
  selector: 'sp-top-bar',
  templateUrl: './sp-top-bar.component.html',
  styleUrls: ['./sp-top-bar.component.scss']
})
export class SpTopBarComponent implements OnInit {

  @Input()
  toggleSideNav: Function;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  showAppInfo() {
    this.dialog.open(InfoDialog, {
      data: {
        title: 'What am I looking at?',
        content: ['Text will go', 'here.']
      }
    });
  }

  determineCurrentApp(): string {
    const loc = window.location.href.split('/');
    const path = loc[loc.length - 1];
    if (path.substr(0, 5) === 'comms') {
      return 'Comms Tool Demo';
    } else if (path.substr(0, 7) === 'tracker') {
      return 'Achievement Tracker Demo';
    } else {
      return 'Welcome';
    }
  }

}
