/*
/// <reference path="./../../libs/tree/tree.d.ts" />*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Tree } from '../../libs/tree/tree';


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
  @ViewChild('panelcont')
  private elem: ElementRef;
  window: HTMLElement;
  tree: Tree;
  panelList: Array<Object> = [];

  constructor() { 
    //tree.createTree();
  }

  ngOnInit() {
    this.tree = new Tree('painel-1-1');
    this.panelList.push({id: 'painel-1-1', title: 'Teste'});
    //this.window = this.elem.nativeElement;
    this.setUpPanel('painel-1-1');
    //console.log(this.window);
  }

  setUpPanel(id: string): void {
    $('#' + id + ' .btn-default.btn-minimize')
    .mouseenter(function () {
      $(this).css('background', '#e6e6e6');
    })
    .mouseleave(function () {
      $(this).css('background', '#fff');
    });

    let workspace = $('#workspace');

    console.log(id);
    //let win: any = $('#' + id);
    //console.log(win);
    (<any>$('#' + id)).draggable({
      handle: '.panel-heading',
      stack: '.panel, .fa-window-maximize',
      containment: [10, 10, workspace.width() - this.INITIAL_WIDTH - 10 ,
        workspace.height() - this.INITIAL_HEIGHT - 70],
      drag: function(){
        console.log(id);
          this.centerLine(id);
      },
      cancel: '.dropdown-menu'
    })
    .find('.panel-body')
    .css({
      height: this.INITIAL_HEIGHT,
      width: this.INITIAL_WIDTH
    })
    .resizable({
      resize: function(){
        let aPanel = $(this).parents('.panel')[0];
        this.centerLine(aPanel.id);
      },
      aspectRatio: true,
      maxHeight: this.MAX_HEIGHT,
      maxWidth: this.MAX_WIDTH,
      minHeight: this.INITIAL_HEIGHT,
      minWidth: this.INITIAL_WIDTH
    });

    
  }

  centerLine(panelID: string, icon: any): void {
    if (typeof icon === 'undefined') { icon = false; }
    let lines = d3.selectAll('line').filter('.class-' + panelID);
    let sizeLines = lines.size();

    for (let _i = 0; _i < sizeLines; _i++) {
      let aLine = $('#' + lines[0][_i].id);
      let lineID = lines[0][_i].id.split('_');
      if (lineID[0] === panelID) {
        if (!icon) {
          aLine.attr('x1', this.getCenter(lineID[0])['x']);
          aLine.attr('y1', this.getCenter(lineID[0])['y']);
        } else {
          aLine.attr('x1', parseInt(this.getCenter('icon-' + lineID[0])['x']));
          aLine.attr('y1', parseInt(this.getCenter('icon-' + lineID[0])['y']));
        }
      } else {
        if (!icon) {
          aLine.attr('x2', this.getCenter(lineID[0])['x']);
          aLine.attr('y2', this.getCenter(lineID[0])['y']);
        } else {
          aLine.attr('x2', parseInt(this.getCenter('icon-' + lineID[0])['x']));
          aLine.attr('y2', parseInt(this.getCenter('icon-' + lineID[0])['y']));
        }
      }

    }
  }

  getCenter(obj: any) {
    let $this = $('#' + obj);
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

}

