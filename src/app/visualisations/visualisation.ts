
export interface Visualisation {

  clean():void; // ngOnDestroy
  getPeriod():number // maybe not if some visualisation use fancy triggers (not periods)
  update(TrainData):void;
}
