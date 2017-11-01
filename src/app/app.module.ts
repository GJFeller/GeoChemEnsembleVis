import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WindowComponent } from './window/window.component';
import * as $ from 'jquery';
//import 'jquery-ui';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WindowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
