const Injector = require('../modules/injector');
require("dotenv").config();

const mongoose = require("mongoose");
const dbUrl = 'mongodb://127.0.0.1:27017/endGame'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const data = [{
    title: "Injector Testing",
    content: "We are pleased to be able to now offer testing of diesel injectors £25+vat per injector and can do the majority of injectors (diesel only) on this machine",
    image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727566329/LowerEarly/otsrywiclsq1g5dvva1d.jpg",
}
]

const seed = async () => {
    await Injector.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        // Upload the image to Cloudinary
        const injector = new Injector({
            title: data[i].title,
            content: data[i].content,
            image: data[i].image,
        });
        await injector.save();
    }

};
seed();