class GenericClientError extends Error {
    private readonly type: "FORBIDDEN";

    constructor(type: "FORBIDDEN" , message: string) {
        super(message);
        this.type = type;
        console.log(this.type)
    }
}

export default GenericClientError;