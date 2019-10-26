import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldPlayerComponent } from './old-player.component';

describe('OldPlayerComponent', () => {
  let component: OldPlayerComponent;
  let fixture: ComponentFixture<OldPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
