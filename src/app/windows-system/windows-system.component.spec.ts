import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowsSystemComponent } from './windows-system.component';

describe('WindowsSystemComponent', () => {
  let component: WindowsSystemComponent;
  let fixture: ComponentFixture<WindowsSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowsSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowsSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
