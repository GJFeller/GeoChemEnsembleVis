/*
/// <reference path="./../../libs/tree/tree.d.ts" />*/
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Tree } from '../../libs/tree/tree';
import { WindowService } from '../window.service';
import * as d3 from 'd3';

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
  parentComponent: WindowComponent = null;
  childrenComponent: Array<WindowComponent> = [];

  static getCenter(obj: any) {
    const $this = $('#' + obj);
    const offset = $this.offset();
    const width = $this.width();
    const height = $this.height();
    const getSvg = $('#workspace');
    const centerX = offset.left + width / 2 -  getSvg.offset().left;
    const centerY = offset.top + height / 2 - getSvg.offset().top;
    let arr = [];
    arr['x'] = centerX;
    arr['y'] = centerY;
    return arr;
  }

  static drawLine(component1: WindowComponent, component2: WindowComponent) {
    const svg = d3.select('#workspace');
    console.log(svg);

    const centerX = component1.getCenter();
    const centerY = component2.getCenter();
    const line = svg.append('line')
            .style('stroke', 'black')
            .attr('id', component1.getId() + '_' + component2.getId()) // ex: id = "panel-1-1_panel-2-1"
            .attr('class', 'class-' + component1.getId() + ' class-' + component2.getId()) // ex: class="panel-1-1 panel-2-1"
            .attr('x1', centerX['x'])
            .attr('y1', centerX['y'])
            .attr('x2', centerY['x'])
            .attr('y2', centerY['y']);
  }

  static centerLine(component: WindowComponent, icon: any): void {
    const panelID = component.getId();
    if (typeof icon === 'undefined') { icon = false; }
    let lines = d3.selectAll('line').filter('.class-' + panelID);
    let sizeLines = lines.size();

    for (let _i = 0; _i < sizeLines; _i++) {
      let aLine = $('#' + lines['_groups'][0][_i].id);
      let lineID = lines['_groups'][0][_i].id.split('_');
      if (lineID[0] === panelID) {
        if (!icon) {
          aLine.attr('x1', component.getCenter()['x']);
          aLine.attr('y1', component.getCenter()['y']);
        } else {
          aLine.attr('x1', parseInt(WindowComponent.getCenter('icon-' + lineID[0])['x']));
          aLine.attr('y1', parseInt(WindowComponent.getCenter('icon-' + lineID[0])['y']));
        }
      } else {
        if (!icon) {
          aLine.attr('x2', component.getCenter()['x']);
          aLine.attr('y2', component.getCenter()['y']);
        } else {
          aLine.attr('x2', parseInt(WindowComponent.getCenter('icon-' + lineID[0])['x']));
          aLine.attr('y2', parseInt(WindowComponent.getCenter('icon-' + lineID[0])['y']));
        }
      }

    }
}

  constructor(private windowService: WindowService) { }

  ngAfterViewInit() {
    let workspace = $('#workspace');
    const $this = this;
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
        WindowComponent.centerLine($this, null);
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
    if (this.parentComponent != null) {
      WindowComponent.drawLine(this.parentComponent, this);
    }

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

  setParentComponent(parentComponent: WindowComponent) {
    this.parentComponent = parentComponent;
  }

  getParentComponent() {
    return this.parentComponent;
  }

  addChildComponent(component: WindowComponent) {
    this.childrenComponent.push(component);
  }

  removeChildComponent(component: WindowComponent) {
    let idx = this.childrenComponent.indexOf(component, 0);
    if (idx > -1) {
      this.childrenComponent.splice(idx, 1);
    }
  }

  getCenter() {
    //console.log(this.elementRef);
    //let $this = this.elementRef.nativeElement.offset();
    const $this = $('#' + this.id);
    const offset = $this.offset();
    const width = $this.width();
    const height = $this.height();
    const getSvg = $('#workspace');
    const centerX = offset.left + width / 2 -  getSvg.offset().left;
    const centerY = offset.top + height / 2 - getSvg.offset().top;
    let arr = [];
    arr['x'] = centerX;
    arr['y'] = centerY;
    return arr;
  }

  private getAnswer() {
    return this.windowService.giveMeTheAnswer();
  }

}

