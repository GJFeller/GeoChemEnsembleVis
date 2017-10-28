import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ScatterPlotMatrixComponent } from './d3/scatter-plot-matrix/scatter-plot-matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScatterPlotMatrixComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
