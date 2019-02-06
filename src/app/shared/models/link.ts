import { Node } from './node';
import * as d3 from 'd3';

export class Link implements d3.Links {
   
    index?: number;
    
    source: Node | string;
    target: Node | string;
    
    constructor(source, target) {
        this.source = source;
        this.target = target;
    }
}