const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require('uuid')

router.get('/',(req,res)=>{
    res.render('index',{movies:movies})

})

router.get('/:movieID',(req,res)=>{
    const id = req.params.movieID
    movieDetail= movies.filter(movie=>{
        return movie.id !== id
    })
    res.render('index',{movies:movieDetail})
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

module.exports = router