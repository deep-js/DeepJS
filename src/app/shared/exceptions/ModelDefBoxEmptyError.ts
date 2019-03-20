export class ModelDefBoxEmptyError extends Error {
    constructor() {
        super("Please fill the model box !");
        this.name = "ModelDefBoxEmptyError";
    }
}