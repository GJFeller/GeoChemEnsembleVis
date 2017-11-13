/*
/// <reference path="./../../libs/tree/tree.d.ts" />*/
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Tree } from '../../libs/tree/tree';
import { WindowService } from '../window.service';

//declare var $: any;
//declare var jQuery:any;

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent implements AfterViewInit {

  INITIAL_HEIGHT = 100;
  INITIAL_WIDTH = 350;
  MAX_HEIGHT = 620;
  MAX_WIDTH = 1000;
  HEIGHT_ICON = 28;
  WIDTH_ICON = 28;
  elementRef: ElementRef;
  title: string = 'Novo Painel';
  _isRoot = false;
  id: string;
  parentId: string = null;

  constructor(private windowService: WindowService) {
    
  }

  ngAfterViewInit() {
    let workspace = $('#workspace');
    workspace.height(window.innerHeight);
    //console.log(workspace);
    $('#' + this.id + ' .btn-default.btn-minimize')
    .mouseenter(function () {
      $(this).css('background', '#e6e6e6');
    })
    .mouseleave(function () {
      $(this).css('background', '#fff');
    });
    let win = $('#' + this.id).draggable({
      handle: '.panel-heading',
      stack: '.panel, .fa-window-maximize',
      containment: [10, 10, workspace.width() - this.INITIAL_WIDTH - 10 ,
        workspace.height() - this.INITIAL_HEIGHT - 90],
      drag: function(){
        //console.log(this.id);
          //this.centerLine(this.id);
      },
      cancel: '.dropdown-menu'
    });
    win.find('.panel-body')
    .css({
      height: this.INITIAL_HEIGHT,
      width: this.INITIAL_WIDTH
    })
    .resizable({
      resize: function(){
        let aPanel = $(this).parents('.panel')[0];
        console.log(aPanel);
        //this.centerLine(aPanel.id);
      },
      aspectRatio: true,
      maxHeight: this.MAX_HEIGHT,
      maxWidth: this.MAX_WIDTH,
      minHeight: this.INITIAL_HEIGHT,
      minWidth: this.INITIAL_WIDTH
    });
    console.log(win);

  }

  getId() {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  setIsRoot(isRoot: boolean) {
    this._isRoot = isRoot;
  }

  isRoot(): boolean {
    return this._isRoot;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setParentId(parentId: string) {
    this.parentId = parentId;
  }

  getParentId() {
    return this.parentId;
  }

  getCenter() {
    //console.log(this.elementRef);
    //let $this = this.elementRef.nativeElement.offset();
    let $this = $('#' + this.id);
    
    let offset = $this.offset();
    let width = $this.width();
    let height = $this.height();
    let getSvg = $('#workspace');
    let centerX = offset.left + width / 2 -  getSvg.offset().left;
    let centerY = offset.top + height / 2 - getSvg.offset().top;
    let arr = [];
    arr['x'] = centerX;
    arr['y'] = centerY;
    return arr;
  }

  private getAnswer() {
    return this.windowService.giveMeTheAnswer();
  }

}

