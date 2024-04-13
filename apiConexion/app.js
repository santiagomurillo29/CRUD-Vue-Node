import express  from 'express'
import router from './routes/router.js'
import cors from 'cors'

const app = express();
const port = 3000;

app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use(express.json())
app.use(router)

app.listen(port, () =>{
    console.log(`http://localhost:${port}/`)
})