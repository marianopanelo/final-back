import {Router} from 'express';
import cookieParser from 'cookie-parser';
import { getLogin, getRegister, getTicket, getUsuario, getcarrito, getproductos } from '../controler/viewsroutes.controler.js';
import { auth } from '../controler/autenticate.controler.js';

const router = Router()
router.use(cookieParser("CoderS3cr3tC0d3"));



router.get('/',getLogin);  

router.get("/register", getRegister);

router.get("/current",auth,getUsuario);

router.get("/product",auth,getproductos);

router.get("/carrito",auth,getcarrito);

router.get("/ticket",auth,getTicket);


export default router;