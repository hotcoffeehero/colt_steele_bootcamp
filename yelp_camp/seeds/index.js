const path = require('path')
const mongoose = require('mongoose')
const connectDB = require('../config/db')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')


connectDB()

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i++ ){
        const random1000 = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random()*20) + 10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Enamel pin stumptown tilde knausgaard. Pour-over man bun synth kitsch sartorial. Put a bird on it leggings truffaut copper mug. Sriracha la croix ugh 90s air plant. Quinoa ennui messenger bag succulents thundercats letterpress prism adaptogen echo park blog.',
            price
        }) 
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})