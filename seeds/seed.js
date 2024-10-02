if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/endGame'
const MainData = require("../modules/mainData");
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
const data = [{
    title: "Looking after you",
    header: "Lower Earley MOTs is a family run business owned and operated by mother andJulie - Lower Earley MOTs son, Julie Freebody and Andrew Aldridge. Julie is there to take care of customers and runs the office and Andrew is Chief Mechanic and Workshop Manager.",
    content: "Julie is no stranger to the motor trade with her family owning and running a motor repairs and MOT station in Shiplake for the last 40 years. Julie worked as their office manager for the last 16 years and during her time there has enjoyed close working relationships with her customers who return with their cars year on year. Julie prides herself on her willingness to go the extra mile for her customers, nothing is too much trouble. She will do her very best to answer all of your questions and to see that you are properly looked after a while you are visiting Lower Earley MOTs. Julie has created a welcoming reception area at Lower Earley MOTs so that you can relax while your car is being MOT’d or serviced. There is tea and coffee available, TV and Wi-Fi to keep you amused alternatively, if it’s a longer job you might like to take advantage of a courtesy car or bicycle if there is somewhere you need to be.",
    image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727225911/LowerEarly/ewufvwagcns3vmkqthhu.jpg",

},
{
    title: "Looking after your car – our workshop team",
    header: "Andrew Aldridge –Workshop Manager, Chief Mechanic and MOT tester",
    content: "Andrew is highly skilled to NVQ level 3 in Engineering Maintenance in Mechanical and Electrical Engineering. He is an MOT approved tester for class 4 and 7 vehicles and has nearly a decade of experience working in the motor repair industry. Recent experience includes working at a BMW specialist garage where he is particularly well known for his expertise with diagnostics and fault finding.",
    image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727225911/LowerEarly/rmvbgehswy3gpmqspabk.jpg",

},
{
    title: "Service Policy",
    header: "Lower Earley MOTs Ltd offers local people the opportunity to have their cars repaired, serviced, and MOT’d on their doorstep. Just a few minutes’ walk from Asda, Lower Earley MOT ltd can provide all your car servicing needs as well as your annual MOT test.",
    content: `“Why we are not like other garages” – our Servicing Policy by Andrew Aldridge Workshop Manager and Chief Technician
“Whatever you drive Lower Earley Mots can take care of it for you. We keep it simple too”
We offer a high quality Annual Service which is comparable to a full service anywhere else. When your car needs a bit more we simply add what it needs onto the service with our Service +.
If you do very little mileage, we offer “Essential Care” to change the oil and filter and do some basic safety checks. At a cost from £150 plus VAT.
You chose what best suits you and there are no hidden charges. We tell you exactly what it is going to cost you, upfront.
Unlike other garages when you book your vehicle in for a service with Lower Earley MOTs we will send you an email or text confirming the exact cost of the labour and the parts we will require to complete your service. This will include: the supply of the oil, the disposal of your used oil, all filters required, spark plugs, screen wash and antifreeze top up.
We will not waste your money replacing parts that still have plenty of life left in them so you can expect your final bill to be even lower if this is the case.
All labour is charged at £65 plus VAT per hour which we cap to two hours for Annual Servicing which means you never pay more even if it takes us longer!”`,
    advise: ["We are committed to excellence in customer care and aim to never let a customer walk away having experienced less than an excellent service. We want you to enjoy visiting us with your car and try to make the whole process as simple and easy for you as possible.", "Our staff are never too busy to talk through the service and maintenance of your car. All of our technicians work to the highest standards of competency and we guarantee all of our work for 12 months.", "In respect of parts, we only use only the highest-quality parts, manufactured to manufacturers’ original specification and we use high grade oils and fluids. All of our suppliers offer a guarantee and usually this is for 12months. However, this is dependant on the vehicle doing reasonable mileage during that period which is why we keep a note of your mileage on the date of any replacement parts being fitted.", "It doesn’t happen very often but if a part that we have fitted should need to be replaced by one of our suppliers we will deal with this on your behalf and we will not charge to refit the replacement. (This policy does not replace your Consumer rights under the sale of Goods Act)"],

    image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727225911/LowerEarly/zo61kdjvmyf19xxkclda.jpg",



}
]

const seed = async () => {
    await MainData.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        // Upload the image to Cloudinary


        const mainData = new MainData({
            title: data[i].title,
            header: data[i].header,
            content: data[i].content,
            image: data[i].image,
            advise: data[i].advise
        });
        await mainData.save();
    }

};

seed();