export default class CustomError {
    
    
    static createError({ name = "Error", cause, message, code = 1 }) {
        const error = new Error(message, { cause: new Error(cause) });
        console.log("holaaaaaaaa");
        error.name = name;
        error.code = code;
        throw error; 
    };
}