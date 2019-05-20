import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppWelcomeComponent } from './app-welcome/app-welcome.component';
import { AppCommsToolComponent } from './app-comms-tool/app-comms-tool.component';
import { AppTrackerComponent } from './app-tracker/app-tracker.component';
import { AppOthersComponent } from './app-others/app-others.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: AppWelcomeComponent
  },
  {
    path: 'comms',
    component: AppCommsToolComponent
  },{
    path: 'tracker',
    component: AppTrackerComponent
  },{
    path: 'others',
    component: AppOthersComponent
  },
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
