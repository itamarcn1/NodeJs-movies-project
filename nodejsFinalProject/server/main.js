const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./configs/connectDB')
const authRouter = require('./routers/authRouter')
const moviesRouter = require('./routers/moviesRouter')

connectDB()

app.use('./moviesPosters', express.static('./moviesPosters'));
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/movies", moviesRouter)



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})