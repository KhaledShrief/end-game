const mongoose = require('mongoose');
const Air = require('../modules/air');
const dbUrl = 'mongodb://127.0.0.1:27017/endGame'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const data = [{
    title: "Free Air Con Performance Test",
    content: "If it’s been a few years since you had your air conditioning recharged and you’re not sure whether it’s working as effectively as it could be, why not book your vehicle in for a free air con check at Lower Earley to see if you need a recharge. An Air Con check is also included",


    questionOne: "How much is an air con recharge?",
    answerOne: "The price you pay for an air conditioning recharge depends on the type of refrigerant gas your car uses. We offer an air conditioning regas service from £69.99 plus VAT. The vast majority of cars on the road in the UK use one of two types of refrigerant - R134A and R1234YF. If your air conditioning system requires R134A gas the cost to recharge £69.99 plus VAT. For vehicles that require R1234YF gas the cost is £129.99 plus VAT to recharge when booked online. It is not possible to switch between gases, in fact, the port to recharge R1234YF models is different to the R134A making it impossible to refill with the incorrect gas.",

    questionTwo: "How do I know which air con gas I require?",
    answerTwo: "R134A gas is common in vehicles manufactured before 2014. All vehicles with air conditioning manufactured since 1st January 2017 include the new R1234YF air con gas which is more environmentally friendly. Since this date, manufacturers are no longer allowed to use the older R134A air con gas in a bid to reduce global warming as the old gas is believed to be more damaging to the environment. R1234YF gas was phased in by vehicle manufacturers over time so vehicles rolling off the production line between 2014 and 2016 could require either gas. To find out which type of air conditioning gas your car needs and to start a booking to have your air con gas recharged, enter your registration in the field above.",

    questionThree: "Did you know?",
    answerThree: `Air conditioning doesn’t just provide in-car comfort during
         the hot summer months; 
         it can also be used in winter to demist your windscreen. Air con systems create dry warm air
        rather than the normal humid air from outside which can clear your windscreen much more quickly than your regular blowers. 
        The recharge process is quite simple and involves removing any old refrigerant gas and oil from your air con system before replacing this
         with the correct amount of new refrigerant and lubricant as per your vehicle manufacturer’s recommendation. A vacuum test is also performed
        to ensure there are no cracks or damage in your vehicle air conditioning system that could cause the gas to leak out. Within an hour the whole recharge process is completed
         and you will once again have refreshing cool air on demand. Our trained technicians will show you the difference in your AC before and after recharge. Vehicle air conditioners that are not recharged regularly will be less effective and have
         to work harder to produce cool air. This puts more strain on the engine and uses more fuel. If your air conditioning system has not been recharged in the past two years it will dramatically reduce efficiency. Recharge or No Charge Let Lower Earley recharge your air con while you wait. We will replace and recharge lubricant and refrigerant levels in line with your manufacturer’s recommendation. If we cannot improve the coolest vent temperature from your car by more than 10% when measured in degrees Celsius - then you pay nothing at all.* * Please note if the ambient temperature around the car is less than 9 degrees Celsius it may affect the results of the air con recharge test results. In these circumstances, it is at the manager’s discretion whether to offer a refund with results less than 10% Air Conditioning Cleaning If there are bad odours coming from your air vents when you turn on your car AC, then your car may also benefit from an air con clean, also known as a debug. To learn more about this please see our Air Conditioning Debug page. Electric Vehicle Air Conditioning Recharge Just like cars that run on petrol and diesel, both electric vehicles and hybrids will also require the air con system recharged when the refrigerant gas in the air con system needs replacing. Otherwise, the air con system in your vehicle will not operate effectively and will start to blow warm air. In fact, proactive maintenance of the air conditioning system is even more important here as the air con system in electric cars is also used for thermal management, that is, the cooling of components including the batteries and electric motors, which can become very hot with extended use. By cooling the battery, the air conditioning system supports effective charging processes and contributes significantly to the vehicle's performance and battery life. So regular air con maintenance is no longer just for comfort. In almost all hybrid and electric vehicles, the air conditioning system is also responsible for the Thermal Management of the battery to maintain maximum efficiency and prevent battery damage. Electric vehicles use the same types of refrigerant gas as internal combustion engine vehicles with the majority requiring the newer R1234YF type of gas. At Lower Earley, 
        we have over 400 centres equipped to carry out air con recharge on electric and hybrid vehicles. Enter your vehicle registration above to find out which locations can assist and start a booking`,

    image: "https://res.cloudinary.com/dj7ancs8q/image/upload/v1727754209/LowerEarly/q3kopuln7svacxbcc9mt.jpg",
}
]

const seed = async () => {
    await Air.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        // Upload the image to Cloudinary
        const air = new Air({
            title: data[i].title,
            content: data[i].content,
            questionOne: data[i].questionOne,
            answerOne: data[i].answerOne,
            questionTwo: data[i].questionTwo,
            answerTwo: data[i].answerTwo,
            questionThree: data[i].questionThree,
            answerThree: data[i].answerThree,
            image: data[i].image,
        });
        await air.save();
    }

};
seed();