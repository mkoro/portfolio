import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpTopBarComponent } from './sp-top-bar.component';

describe('SpTopBarComponent', () => {
  let component: SpTopBarComponent;
  let fixture: ComponentFixture<SpTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpTopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
