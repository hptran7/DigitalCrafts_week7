const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

router.get('/',(req,res)=>{
    res.render('index',{movies:movies})

})


router.post('/create',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const genre = req.body.genre;
    let movie ={
        id:uuidv4(),
        title:title,
        description:description,
        genre:genre
    } 
    movies.push(movie)
    console.log(movies)
    res.redirect('/movies')
})

router.post('/delete',(req,res)=>{
    const id = req.body.id;
    movies= movies.filter(movie=>{
        return movie.id !== id
    })
    res.redirect('/movies')
})

router.post('/end',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router