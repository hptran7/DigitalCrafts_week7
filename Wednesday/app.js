const express = require("express")
const app = express()
const mustacheExpress = require("mustache-express")
const createRoutes = require('./routes/movies')
const { v4: uuidv4 } = require('uuid')



global.movies = []
global.movieDetail=[]


app.use(express.urlencoded())
app.use('/movies',createRoutes)

app.engine("mustache",mustacheExpress())

app.set('views','./views')
app.set('view engine','mustache')

app.listen(3000,()=>{
    console.log("server is running")
})

app.get('/',(req,res)=>{
    res.render('index',{movies:movies})
})

