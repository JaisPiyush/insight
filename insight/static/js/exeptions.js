export function IncompleteDataException(){
    const error = new Error(`data is incomplete`);
    error.code = "INCOMPLETE_DATA_CUSTOM_EXCEPTION";
    this.prototype = Object.create(Error.prototype);
    return error;
}

export function BadRequestExcption(){
    const error = new Error('Bad Request');
    error.code = "HTTP_400_BAD_REQUEST";
    this.prototype = Object.create(Error.prototype);
    return error;
}