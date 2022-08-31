
const express = require("express")
const products = require("./data/products")
const connectDb = require("./config/db")
const dotenv = require("dotenv")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")

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


app.use(notFound)
app.use(errorHandler)


app.listen(PORT, ()=>{

    console.log(`server running in ${PORT}`)
})


