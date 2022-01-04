const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const Campground = require('./models/campground')
const campground = require('./models/campground')


connectDB()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//Middleware
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


//Homepage
app.get('/', (req, res) =>{
    res.render('home')
})

//View all the campgrounds
app.get('/campgrounds', async  (req, res) => {
    const campgrounds = await campground.find({})
    res.render('campgrounds/index', { campgrounds })
})

//The form page for adding a new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

//The post request to add a new campground
app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

//View an individual campground by clicking on the link
app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground })
})

//Go to the edit page
app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
})

//Send the edit request
app.put('/campgrounds/:id/', async (req, res) => {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})

//Delete an entry
app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})



// app.get('/makecampground', async (req, res) =>{
//     const camp = new Campground({
//         title: "Greenleaf", 
//         description: "Family-friendly camping at the edge of the Arkansas River."
//     })
//     await camp.save()
//     res.send(camp)
// })


app.listen(3000, () => {
    console.log('App is a go on 3000.')
})