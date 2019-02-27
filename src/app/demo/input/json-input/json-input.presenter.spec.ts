import { JsonInputPresenter } from '@api/core/demo/input/json-input/json-input.presenter';
import { JsonInputPresenterImpl } from './json-input.presenter';
import { InputData } from '@api/core/inputData';
import { of, BehaviorSubject, Subject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { InputDataImpl } from 'src/app/shared/models/inputData';
import * as tf from '@tensorflow/tfjs';

describe('JsonInputPresenterImpl', () => {
    let inputPresenter:JsonInputPresenter;
    let obsInputData:Observable<InputData>;
    let json:string;
    beforeEach(() => {
        inputPresenter = new JsonInputPresenterImpl;
        json = '{ "x":[[[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[113],[142],[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[254],[11],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[49],[240],[182],[4],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[52],[241],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[88],[142],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[7],[208],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[46],[237],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[255],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[171],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[113],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[210],[35],[30],[30],[30],[30],[19],[28],[250],[255],[157],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[59],[224],[254],[254],[254],[254],[254],[254],[222],[247],[254],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[25],[71],[71],[82],[189],[189],[98],[71],[71],[220],[254],[176],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[76],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]]], "y":[[1,0,0,0,0,0,0,0,0,0]]}';
    });

    it ('#getInputData should create a InputData object with Tensor given thank to json, and return an observable', () => {
        var x = [[[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[113],[142],[1],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[254],[11],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[49],[240],[182],[4],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[52],[241],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[0],[88],[142],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[208],[147],[0],[0],[0],[0],[0],[0],[0],[7],[208],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[46],[237],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[255],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[22],[222],[147],[0],[0],[0],[0],[0],[0],[0],[12],[254],[171],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[113],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[147],[0],[0],[0],[0],[0],[0],[0],[79],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[72],[254],[210],[35],[30],[30],[30],[30],[19],[28],[250],[255],[157],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[59],[224],[254],[254],[254],[254],[254],[254],[222],[247],[254],[254],[207],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[25],[71],[71],[82],[189],[189],[98],[71],[71],[220],[254],[176],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[131],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[76],[254],[89],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]]];
        var y = [[1,0,0,0,0,0,0,0,0,0]];
        inputPresenter.setJSON(json);
        obsInputData = inputPresenter.getInputData();
        expect(typeof(obsInputData)).toBe(typeof(new Observable<InputData>()));
        obsInputData.subscribe(inputData => 
            expect(inputData.getXTensor().toString()).toBe((tf.tensor(x)).toString())
        );
        obsInputData.subscribe(inputData => 
            expect(inputData.getYTensor().toString()).toBe((tf.tensor(y)).toString())
        );
    });

    it('#setJSON should modify json attribute of JsonInputPresenter', () => {
        inputPresenter.setJSON(json);
        expect(inputPresenter.getJSON()).toBe(json);
    });
});