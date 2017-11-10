import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { WindowComponent } from '../window/window.component';

import { Tree } from '../../libs/tree/tree';

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
    console.log(this.viewContainerRef.element);
    const factory = this.componentFactoryResolver.resolveComponentFactory(WindowComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    const window = ref.injector.get(WindowComponent);
    this.tree = new Tree('painel-1-1');
    window.setTitle('Teste');
    window.setIsRoot(true);
    window.setId('painel-1-1');
    this.windowList.push(window);
    ref.changeDetectorRef.detectChanges();
  }

  private sayHello() {
    console.log(this.windowList);
    const factory = this.componentFactoryResolver.resolveComponentFactory(WindowComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    const window = ref.injector.get(WindowComponent);
    console.log(this.tree);
    let newNode = this.tree.add('painel-', 'painel-1-1', this.tree.traverseBF);
    console.log(this.tree);
    window.setTitle('Teste');
    window.setId(newNode.data);
    this.windowList.push(window);
    ref.changeDetectorRef.detectChanges();
  }

}
