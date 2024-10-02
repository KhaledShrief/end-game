const mongoose = require('mongoose');
const Carsuel = require('../modules/carsuel');
const dbUrl = 'mongodb://127.0.0.1:27017/endGame'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const data = [
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835153/LowerEarly/ygdhfzxjaaawfvbqhbie.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835153/LowerEarly/hu04ecjrfywzb26nhj4p.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835155/LowerEarly/uikndomoinz5nvidg10w.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727833913/LowerEarly/tbl7pfatwhb5bcsdz8i7.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835154/LowerEarly/y64vud2kamurndvqlajm.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727814237/LowerEarly/jkkajpb0gw4lbp0wbzuw.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835199/LowerEarly/hxrkzoisqvmkbzq3hwuz.png",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835195/LowerEarly/o1rrznhlgjqxgyi1wlqc.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835215/LowerEarly/hzkacb27movqt0ztgjmj.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835195/LowerEarly/wjsovzliuljtbbfpanwm.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835262/LowerEarly/qzy5vqf6dufqlfcrha73.png",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835257/LowerEarly/mz5efxyc6wr7hxhkyslj.jpg",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835262/LowerEarly/tgv1gdiznzz0znsparje.png",
    },
    {
        image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727835594/LowerEarly/vtf2ww6e8romdxvprvjd.jpg",
    },
]

const seed = async () => {
    await Carsuel.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        // Upload the image to Cloudinary
        const carsuel = new Carsuel({
            image: data[i].image,
        });
        await carsuel.save();
    }

};
seed();