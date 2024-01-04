export default class ticketDto {
    constructor(productos) {
        this.purchase_deletime = productos.purchase_deletime;
        this.amount = productos.amount;
        this.purchaser = usuario.email;
    }
}