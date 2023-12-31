import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:{
        type: String,
        unique: true
    },
    age:Number,
    password:String,
    role: {
        type: String,
        default: 'user',
        enum: ['user','userPremiun', 'admin'],
    },
    ultimaConexion: String,
})

const usuarioModel = mongoose.model(collection, schema);

export default usuarioModel;