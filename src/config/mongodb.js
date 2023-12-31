import mongoose from 'mongoose'
import config from './config.js'
import CustomError from '../services/error/customError.js';
import EErrors from "../services/error/enumeracionDeError.js";

export default class MongoSingleton {
    static #instance

    constructor(){
        this.#connectMongoDB() 
    }

    static getIntance(){
        if (this.#instance) {
            console.log("ya se conecto a mogno"); 
        }else{
            this.#instance = new MongoSingleton 
        }

        return this.#instance
    }

    #connectMongoDB = async () =>{
            await mongoose.connect(config.MONGO_URL) 
            console.log("conectado a mongo");
 
    }


}