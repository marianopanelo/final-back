import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const carrito = "carts"

const carritoEsquema = new mongoose.Schema({
    codigo : String,
    cantidad : {
        type: [
            {
                producto: {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "products"
                }
            }
        ],
        default : []
    }
})




carritoEsquema.plugin(mongoosePaginate)

export const carritoModelo = mongoose.model(carrito , carritoEsquema)
