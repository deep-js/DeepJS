import { InputContainerPresenter } from "@api/core/demo/input/input-container.presenter";
import { InputContainerPresenterImpl } from "./input-container.presenter";
import * as fs from "file-saver";
import { JsonInputPresenterImpl } from "./json-input/json-input.presenter";
import { InputData } from "@api/core";
import { InputDataImpl } from "src/app/shared/models/inputData";
import * as tf from '@tensorflow/tfjs';

describe('InputContainerPresenterImpl', () => {
    let inputContainerPresenter:InputContainerPresenter;
    let dataset:string;
    let inputData:InputData;

    beforeEach(() => {
        inputContainerPresenter = new InputContainerPresenterImpl;
        dataset = '{ "x":[[[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[113],[142],[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[254],[11],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[49],[240],[182],[4],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[52],[241],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[88],[142],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[7],[208],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[46],[237],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[255],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[171],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[113],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[210],[35],[30],[30],[30],[30],[19],[28],[250],[255],[157],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[59],[224],[254],[254],[254],[254],[254],[254],[222],[247],[254],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[25],[71],[71],[82],[189],[189],[98],[71],[71],[220],[254],[176],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[76],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]]], "y":[[1,0,0,0,0,0,0,0,0,0]]}';
    });

    it('it should download the json file', () => {
        // FAIRE AVEC UN MOCK
        var testBlob = new Blob([dataset], {type: "text/plain;charset=utf-8"});
        inputContainerPresenter.setInputPresenter(new JsonInputPresenterImpl);
        let fsSpySaveAs = spyOn(fs, 'saveAs');
        let inputSpyData = spyOn(inputContainerPresenter, 'getDataset');
        inputContainerPresenter.exportJson();
        expect(fsSpySaveAs).toHaveBeenCalledTimes(1);
        expect(fsSpySaveAs).toHaveBeenCalledWith(testBlob, "export.json");
        expect(inputSpyData).toHaveBeenCalledTimes(1);
    });
});