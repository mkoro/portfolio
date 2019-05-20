import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSidenavModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatListModule,
  MatRadioModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InfoDialog } from './info-dialog.component';
import { SpTopBarComponent } from './sp-top-bar/sp-top-bar.component';
import { SpLeftBarComponent } from './sp-left-bar/sp-left-bar.component';
import { AppWelcomeComponent } from './app-welcome/app-welcome.component';
import { AppCommsToolComponent } from './app-comms-tool/app-comms-tool.component';
import { AppTrackerComponent } from './app-tracker/app-tracker.component';
import { GaugeComponent } from './app-tracker/gauge/gauge.component';
import { OrderDetailComponent } from './app-tracker/order-detail/order-detail.component';
import { OrderAddComponent } from './app-tracker/order-add/order-add.component';
import { AppOthersComponent } from './app-others/app-others.component';

@NgModule({
  declarations: [
    AppComponent,
    SpTopBarComponent,
    SpLeftBarComponent,
    AppWelcomeComponent,
    AppCommsToolComponent,
    InfoDialog,
    AppTrackerComponent,
    GaugeComponent,
    OrderDetailComponent,
    OrderAddComponent,
    AppOthersComponent
  ],
  entryComponents: [InfoDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
