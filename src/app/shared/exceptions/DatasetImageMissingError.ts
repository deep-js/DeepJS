export class DatasetImageMissingError extends Error {
    constructor () {
        super("Please add a dataset image via the 'Browse' button !");
        this.name = "DatasetImageMissingError"
    }
}