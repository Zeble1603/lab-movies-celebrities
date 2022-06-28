const router = require("express").Router();
const { response } = require("../app");
const Celebrity = require('../models/Celebrity.model')

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
  });

router.post("/celebrities/create", (req, res, next) => {
    const {name,occupation,catchPhrase} = req.body
    Celebrity.create({
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,
    })
    .then((response)=>{
        res.redirect('/celebrities')
    })
    .catch((err)=>{
        next(err)
        res.redirect('/celebrities/create')
    })
  })  

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then((celebArray)=>{
        res.render("celebrities/celebrities", {celebArray});
    })  
    .catch((err)=>{
        next(err)
    })
})

module.exports = router;
