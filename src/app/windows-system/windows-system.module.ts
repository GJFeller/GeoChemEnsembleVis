import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowsSystemComponent } from './windows-system.component';
import { WindowComponent } from '../window/window.component';
import { WindowService } from '../window.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WindowsSystemComponent,
    WindowComponent],
    entryComponents: [WindowComponent],
  providers: [WindowService],
  exports: [WindowsSystemComponent]
})
export class WindowsSystemModule { }
