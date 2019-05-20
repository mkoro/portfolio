import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sideNavOpen: boolean;
  title = 'ng-portfolio';

  toggleSideNav = () => this.sideNavOpen = !this.sideNavOpen;

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.sideNavOpen = window.innerWidth > 1250;
  }
}
