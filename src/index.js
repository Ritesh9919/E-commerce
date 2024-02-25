import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cookieParser from 'cookie-parser';
import {connectDB} from './db/index.js';

// routers
import authRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';

const app = express();

// common middlewares
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



connectDB()
.then(()=> {
    app.listen(8000,()=> {
        console.log('Server is running on port:',8000);
    })
})
.catch((err)=> {
    console.log('MongoDB connection failed',err);
})



