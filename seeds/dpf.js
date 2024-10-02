const mongoose = require('mongoose');
const DPF = require('../modules/dpf');
const dbUrl = 'mongodb://127.0.0.1:27017/endGame'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const data = [{
    title: "Our Flagship, Commercial DPF Cleaners",
    header: "",
    content: "Cleaning the DPF – Cost from £150.00 +VAT this is for a DPF already removed from a vehicle Removing the DPF and cleaning can also be done for you but please ring to get a quote",
}, {
    title: "What’s a DPF?",
    header: "The modern diesel vehicles have seemingly vastly improved as they now run without the obligatory ‘black smoke’ which was the signature of the older diesel engines. This has been achieved by the manufacturers adding a Diesel Particulate Filter (DPF) into the exhaust of the modern diesel vehicles, to catch the engine particulates.",
    content: `The particulates are trapped when the car is driven at low speeds in the city centres, and whatever has been collected in the filter would then be blown out and expelled when the car is driven at higher speeds on the outer city roads and motor ways. So the when the modern diesel cars are driven at speed on the motorway, emitting a cloud of smoke, the chances are that its engine is working as it should and that the ECU is performing a ‘regeneration cycle’.`,
}, {
    title: "Why do DPFs get blocked up?",
    header: "There are two most likely causes for a blocked DPF. Firstly and most commonly if you travel relatively short distances in traffic and never take the car on dual carriageways and motorways at higher speeds",
    content: `This will cause the vehicle to eventually slip into ‘Limp Mode’, and warning lights and messages will advise you to take the car to your nearest manufacturer supported dealer. Secondly the DPF may simply come to the end of its natural life. Even if you have driven plenty of motorway miles and you have been lucky to have experienced a chain of successful regenerations, a DPF will not last forever. Each ‘regeneration’ will leave a very fine layer of ash residue behind, and this will eventually become the cause of the ultimate blockage. Further forced regeneration cycles will not clear this. The units will need replacing sooner or later.
A blocked DPF core fills the entire canister, causing the engine to work much harder than needed, in order to push the gasses through it. The more blocked it gets, the more back pressure it causes. The net result of the blockage in this instance was poor fuel economy and performance.
Valve Cleaning Using Valve Clean Technology
The TUNAP System is easy to use and quickly solves the problem without complex disassembly being needed. The microflex® 933 Valve Cleaning Granulate removes all deposits and contamination of valves using compressed air and causes no damage. Used granulate is simultaneously vacuumed off together with the dirt removed. microflex® 936 neutralisation solution dissolves residual granulate particles and prevents them getting into the combustion chamber. cleans rapidly, effectively and gently without complex disassembly being needed The product is not abrasive 70% quicker and £2,000.- cheaper for the end client Does not damage health or contain any allergens Effective cleaning result with reduced risk of damage to the engine`,
}]

const seed = async () => {
    await DPF.deleteMany({});
    for (let i = 0; i < data.length; i++) {
        // Upload the image to Cloudinary
        const dpf = new DPF({
            title: data[i].title,
            header: data[i].header,
            content: data[i].content,
        });
        await dpf.save();
    }

};
seed();