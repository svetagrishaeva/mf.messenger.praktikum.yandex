export class Error {
    title: string;
    code: string;
    message: string;
    
    constructor(init?: Partial<Error>) {
        Object.assign(this, init);
   }
}