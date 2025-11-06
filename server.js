import express from "express";
import colors from "colors"
import {config} from 'dotenv'
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/autRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"
import path from "path"
const app = express()
config();

app.use(cors())

//db config
connectDB()



// middleware
app.use(morgan('dev'))
app.use(express.json())

///routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)

app.get("/" , (req,res)=>{
    res.send("Welcome ! TO COMMERCE APP ")
})
app.use(express.static(path.join(__dirname,"./client/dist")))
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"./client/dist/index.html"))
})
let port =process.env.PORT
app.listen(port ,()=>{
    console.log(`port  is running on ${process.env.DEV_MODE} mode on port  ${port}`)
})