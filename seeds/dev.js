const mongoose = require('mongoose');
const Dev = require('../modules/dev');
const dbUrl = 'mongodb://127.0.0.1:27017/endGame'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const data = [{
    content: "We are building garage management system and websites to your requirements Please Ask",
    image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727753293/LowerEarly/ee0k0qhvfqzemmettu45.jpg",
}
]

const seed = async () => {
    await Dev.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        // Upload the image to Cloudinary
        const dev = new Dev({
            content: data[i].content,
            image: data[i].image,
        });
        await dev.save();
    }

};
seed();