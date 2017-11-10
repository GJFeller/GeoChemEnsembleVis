import { BrowserModule } from '@angular/platform-browser';
import { WindowsSystemModule } from './windows-system/windows-system.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WindowComponent } from './window/window.component';
//import * as $ from 'jquery';
import 'jquery';
import 'jqueryui';
//import { WindowsSystemComponent, WindowModule } from './windows-system/windows-system.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    WindowsSystemModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
