import { ModifParamModelPresenter } from "@api/core";
import { ModifParamModelPresenterImpl } from "./modif-param-model.presenter";

describe('ModifParamModelPresenterImpl', () => {
    let modifPresenter:ModifParamModelPresenter;
    let modelDef:string;

    beforeEach(() => {
        modifPresenter = new ModifParamModelPresenterImpl;
        modelDef = '{"batchSize":250 , "epochs":4000 , "verbose":null , "callbacks":null, "validationSplit":null, "validationData":null, "shuffle":null , "classWeight":null, "sampleWeight":null , "initialEpoch":null, "stepsPerEpoch":null , "validationSteps":null, "yieldEvery":null }';
    });

    it('getModelDef should return the basic modelDef', () => {
        expect(modifPresenter.getModelDef()).toBe(modelDef);
    });

    it('setModelDef should modify the modelDef attribute', () => {
        var testModelDef = '{"batchSize":240 , "epochs":4000 , "verbose":null , "callbacks":null, "validationSplit":null, "validationData":null, "shuffle":null , "classWeight":null, "sampleWeight":null , "initialEpoch":null, "stepsPerEpoch":null , "validationSteps":null, "yieldEvery":null }';
        modifPresenter.setModelDef(testModelDef);
        expect(modifPresenter.getModelDef()).toBe(testModelDef);
        var testModelFitConfig = modifPresenter.getModelFitConfig();
        expect(testModelFitConfig.batchSize).toEqual(240);
        expect(testModelFitConfig.epochs).toEqual(4000);
        expect(testModelFitConfig.verbose).toEqual(null);
        expect(testModelFitConfig.callbacks).toEqual(null);
        expect(testModelFitConfig.validationSplit).toEqual(null);
        expect(testModelFitConfig.validationData).toEqual(null);
        expect(testModelFitConfig.shuffle).toEqual(null);
        expect(testModelFitConfig.classWeight).toEqual(null);
        expect(testModelFitConfig.sampleWeight).toEqual(null);
        expect(testModelFitConfig.initialEpoch).toEqual(null);
        expect(testModelFitConfig.stepsPerEpoch).toEqual(null);
        expect(testModelFitConfig.validationSteps).toEqual(null);
        expect(testModelFitConfig.yieldEvery).toEqual(null);
    });


});
