
import express from 'express';
import bodyParser from 'body-parser';
// import productRoutes from './routes/product.js';
import userRoutes from "./routes/users.js";
import mongoose from "mongoose";


const dbUrl="mongodb+srv://mali:ali11@nodelearning.r9j7hop.mongodb.net/database1?retryWrites=true&w=majority";
mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true}).then((result) => app.listen(3000))
.catch((err) => console.log(err));
// const dbUrl=process.env.MONGODB_URL;
// mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true}).then((result) => app.listen(3000))
// .catch((err) => console.log(err));

const app=express();
const PORT=4000;
app.use(bodyParser.json());
app.use('/user',userRoutes);

app.get('/', (req,res) => {
    res.send('welcome page');
});

app.listen(PORT,() => {
    console.log(`Server running on Port: http://localhost:${PORT}`);
});