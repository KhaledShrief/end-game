const mongoose = require('mongoose');
const Tyres = require('../modules/tyres');
const dbUrl = 'mongodb://127.0.0.1:27017/endGame'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const data = [{
    logo: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727753544/LowerEarly/wdu4hfmdy2nyd6otagpu.jpg",
    header: "Need New Tyres and don’t want to pay over the top for them?",
    content: "We offer customers very competitively priced tyres which we will fit using our brand new 3D alignment system Perfectly tracked and balanced to make sure you get the best possible long lasting Why not call us on 0118 931 2220 for a quote today Free Tyre Check We offer a free tyre safety test to all our customers. We will check that your tyres are not below the legal limit, not damaged, showing signs of ageing, wearing abnormally and we ensure that the tyres fitted are suitable for your vehicle.",
    image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727753544/LowerEarly/piadwrypogyvwmsepdvq.jpg",
}
]

const seed = async () => {
    await Tyres.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        // Upload the image to Cloudinary
        const tyres = new Tyres({
            title: data[i].title,
            logo: data[i].logo,
            header: data[i].header,
            content: data[i].content,
            image: data[i].image,
        });
        await tyres.save();
    }

};
seed();