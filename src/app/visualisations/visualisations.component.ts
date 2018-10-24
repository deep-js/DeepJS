import { Component, OnInit } from '@angular/core';
import { Visualisation } from './visualisation';
  
export interface Visualisations {
  clearVisualisations():void; 
  getVisualisations():Visualisation[]; 
  addVisualisation(Visualisation):void;
  removeVisualisation(Visualisation):void;
}


@Component({
  selector: 'app-visualisations',
  templateUrl: './visualisations.component.html',
  styleUrls: ['./visualisations.component.css']
})


export class VisualisationsComponent implements OnInit,Visualisations {

  private visualisations: Visualisation[];
  

  clearVisualisations():void{
    this.visualisations = [];
  } 
  getVisualisations():Visualisation[]{
    return this.visualisations;
  } 
  addVisualisation(v:Visualisation ):void{
    this.visualisations.push(v); 
  }
  removeVisualisation(v:Visualisation):void{
    this.visualisations.splice(this.visualisations.indexOf(v), 1);
  }


  loadComponent(v:Visualisation){

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(v.component);

    let viewContainerRef = this.visualisationContainer.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<Visualisation>componentRef.instance).data = v.data;
    
  }

  constructor() { this.visualisations = { EpochVisualisationComponent, TestNetworkVisualisationComponent}; }

  ngOnInit() {
  }

}
