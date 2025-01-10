const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 9000
const db = require("./config/mongoConnection")
const {connectCloudinary} = require("./config/cloudinaryConfiguration")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes") 
const adminRoutes = require("./routes/adminRoutes")
const orderRoutes = require("./routes/orderRoutes")
const contactRoutes = require("./routes/contactRoutes")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
connectCloudinary()
app.use("/user",userRoutes)
app.use("/product",productRoutes)
app.use("/admin",adminRoutes)
app.use("/order",orderRoutes)
app.use("/contact",contactRoutes)

app.get("/",(req, res) =>{
    res.send("Welcome to Flone-Ecommerce Backend") 
})

app.listen(port,()=>{
    console.log(`Server run at http://localhost:${port}`)
})