export class ModelDefBoxEmptyError extends Error {
    constructor(s:string) {
        super(s);
        this.name = "ModelDefBoxEmptyError";
    }
}
