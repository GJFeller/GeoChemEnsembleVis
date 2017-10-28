import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterPlotMatrixComponent } from './scatter-plot-matrix.component';

describe('ScatterPlotMatrixComponent', () => {
  let component: ScatterPlotMatrixComponent;
  let fixture: ComponentFixture<ScatterPlotMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterPlotMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlotMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
