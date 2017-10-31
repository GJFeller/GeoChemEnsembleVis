import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements OnInit {

  INITIAL_HEIGHT = 250;
  INITIAL_WIDTH = 350;
  MAX_HEIGHT = 620;
  MAX_WIDTH = 1000;
  HEIGHT_ICON = 28;
  WIDTH_ICON = 28;
  window: HTMLElement;

  constructor() { 
    
  }

  ngOnInit() {
    this.window = document.getElementById('windows-system');
  }

}
