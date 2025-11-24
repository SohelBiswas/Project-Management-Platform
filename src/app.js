import dotenv from "dotenv"
import express from "express"

const app = express()
// dotenv.config({
//     "path" : "./.env"
// }); 

export default app
app.get('/', (req, res) => {
  res.send('This is my first project!')
})

let myUserName = process.env.CUSTOMUSERNAME

app.get('/sohel', (req, res) => {
  res.send(`Owner of the page is ${myUserName}`)
})

app.get('/instagram', (req, res) => {
  res.send("The website is instagram")
})

