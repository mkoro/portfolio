import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpLeftBarComponent } from './sp-left-bar.component';

describe('SpLeftBarComponent', () => {
  let component: SpLeftBarComponent;
  let fixture: ComponentFixture<SpLeftBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpLeftBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpLeftBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
