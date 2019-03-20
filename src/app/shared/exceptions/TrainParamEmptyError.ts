export class TrainParamEmptyError extends Error {
    constructor () {
        super("Please fill training parameters box !");
        this.name = "TrainParamEmptyError"
    }
}