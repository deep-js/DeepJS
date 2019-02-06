import * as d3 from 'd3';

export class Node extends d3.Symbol {

    index?: number;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    
    id: string;
    
    constructor(id) {
    	super();
        this.id = id;
    }
}