const path = require("path")
const express = require("express")
const products = require("./data/products")
const connectDb = require("./config/db")
const dotenv = require("dotenv")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")

const {notFound, errorHandler} = require("./middlware/errorMiddleware")
dotenv.config()
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())
connectDb()
const PORT = process.env.PORT


app.use("/api/products", productRoutes)

app.use("/api/users", userRoutes)

app.use("/api/orders",orderRoutes)
app.use("/api/upload", uploadRoutes)


const folder = path.resolve()

app.use("/uploads", express.static(path.join(folder,"/uploads" )))


if (process.env.NODE_ENV ==="production"){

    app.use(express.static(path.join(folder, "/frontend/build")))
    app.get("*", (req,res) => res.sendFile(path.resolve(folder, "frontend", "build", "index.html")))
}else{
    app.get("/", (req,res) =>{
        res.send("Api is running....")
    })
}




app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{

    console.log(`server running in ${PORT}`)
})


