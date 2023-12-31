import {Router} from 'express';
import cookieParser from 'cookie-parser';
import { getLogin, getRegister, getTicket, getUsuario, getcarrito, getproductos } from '../controler/viewsroutes.controler.js';

const router = Router()
router.use(cookieParser("CoderS3cr3tC0d3"));



router.get('/',getLogin);  

router.get("/register", getRegister);

router.get("/current", getUsuario);

router.get("/product", getproductos);

router.get("/carrito", getcarrito);

router.get("/ticket", getTicket);


export default router;