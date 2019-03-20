export class JsonInputEmptyError extends Error {
    constructor () {
        super("Input Json is empty !");
        this.name = "JsonInputEmptyError"
    }
}