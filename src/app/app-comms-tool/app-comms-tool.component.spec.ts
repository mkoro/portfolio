import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCommsToolComponent } from './app-comms-tool.component';

describe('AppCommsToolComponent', () => {
  let component: AppCommsToolComponent;
  let fixture: ComponentFixture<AppCommsToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCommsToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCommsToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
