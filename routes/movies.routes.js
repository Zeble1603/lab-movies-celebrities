const router = require("express").Router();
const { response } = require("../app");
const Celebrity = require('../models/Celebrity.model')
const Movie = require('../models/Movie.model')


router.get('/movie/create', (req,res,next)=>{
    Celebrity.find()
    .then((celebritiesArray)=>{
        res.render('movies/new-movie', {celebritiesArray})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post("/movie/create", (req, res, next) => {
    const {title,genre,plot,celebrities} = req.body
    Movie.create({
        title:title,
        genre:genre,
        plot:plot,
        cast:celebrities,
    })
    .then((response)=>{
        res.redirect('/movies')
    })
    .catch((err)=>{
        next(err)
    })
})  

router.get('/movies', (req, res, next)=>{
    Movie.find()
    .populate("cast")
    .then((response)=>{
        res.render('movies/movies', {response})
    })
    .catch((err)=>{
        next(err)
    })
})

router.get('/movies/:id', (req, res, next)=>{
    const {id} = req.params
    Movie.findById(id)
    .populate("cast")
    .then((movieDetails)=>{
        res.render('movies/movie-details', {movieDetails})
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/movies/:id/delete',(req,res,next)=>{
    const {id} = req.params
    Movie.findByIdAndDelete(id)
    .then((response)=>{
        res.redirect('/movies')
    })
    .catch((err)=>{
        next(err)
    })

})

router.get('/movies/:id/edit',(req,res,next)=>{
    const {id} = req.params
    Movie.findById(id)
    .then((response)=>{
        Celebrity.find()
        .then((celebritiesArray)=>{
            res.render('movies/edit-movie',{response,celebritiesArray})
        })
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/movies/:id/edit',(req,res,next)=>{
    const {id} = req.params
    const {title,genre,plot,celebrities} = req.body
    Movie.findByIdAndUpdate(id,{
        title:title,
        genre:genre,
        plot:plot,
        cast:celebrities,
    },{new:true})
    .then((response)=>{
        res.redirect(`/movies/${id}`)
    })
    .catch((err)=>{
        next(err)
    })
})

module.exports = router;
