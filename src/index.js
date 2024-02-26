import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cookieParser from 'cookie-parser';
import {connectDB} from './db/index.js';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import apiDocs from '../swagger.json' assert {type:'json'}




// routers
import authRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

const app = express();


// define swagger documentation
app.use('/api/docs', swagger.serve,swagger.setup(apiDocs));

// common middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/', (req, res)=> {
    res.send('Hello World');
})


app.use('/api/auth',authRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order',orderRouter);



connectDB()
.then(()=> {
    app.listen(8000,()=> {
        console.log('Server is running on port:',8000);
    })
})
.catch((err)=> {
    console.log('MongoDB connection failed',err);
})



