import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { WindowComponent } from '../window/window.component';

import { Tree } from '../../libs/tree/tree';
import * as d3 from 'd3';

@Component({
  selector: 'app-windows-system',
  templateUrl: './windows-system.component.html',
  styleUrls: ['./windows-system.component.css']
})
export class WindowsSystemComponent implements OnInit {

  windowList: Array<WindowComponent> = [];
  tree: Tree;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    //console.log(this.viewContainerRef.element);
    const factory = this.componentFactoryResolver.resolveComponentFactory(WindowComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    const window = ref.injector.get(WindowComponent);
    this.tree = new Tree('painel-1-1');
    window.setTitle('Teste');
    window.setIsRoot(true);
    window.setId('painel-1-1');
    this.windowList.push(window);
    //ref.changeDetectorRef.detectChanges();
    console.log(ref.instance.getId());
  }

  private sayHello() {
    //console.log(this.windowList);
    const factory = this.componentFactoryResolver.resolveComponentFactory(WindowComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    const window = ref.injector.get(WindowComponent);
    //console.log(this.tree);
    const newNode = this.tree.add('painel-', 'painel-1-1', this.tree.traverseBF);
    //console.log(this.tree);
    window.setTitle('Teste');
    window.setId(newNode.data);
    window.setParentId('painel-1-1');
    let parentComponent: WindowComponent = null;
    this.windowList.forEach(element => {
      if (element.getId() === window.getParentId()) {
        parentComponent = element;
      }
    });
    if (parentComponent != null) {
      this.drawLine(parentComponent, window);
    }
    this.windowList.push(window);
    //ref.changeDetectorRef.detectChanges();
    //console.log(ref.instance.getId());
  }

  drawLine(component1: WindowComponent, component2: WindowComponent) {
    const svg = d3.select('#workspace');
    console.log(svg);

    const centerX = component1.getCenter();
    const centerY = component2.getCenter();
    const line = svg.append('line')
            .style('stroke', 'black')
            .attr('id', component1.getId() + '_'+ component2.getId()) //ex: id = "panel-1-1_panel-2-1"
            .attr('class', 'class-' + component1.getId() + ' class-' + component2.getId()) //ex: class="panel-1-1 panel-2-1"
            .attr('x1', centerX['x'])
            .attr('y1', centerX['y'])
            .attr('x2', centerY['x'])
            .attr('y2', centerY['y']);
  }

}
