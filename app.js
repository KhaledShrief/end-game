if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
};
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const Auth = require('./modules/auth');
const frontEndUrl = process.env.FRONTEND_URL;
const session = process.env.SESSION;
const multer = require('multer');
const Injector = require('./modules/injector');
const MainData = require('./modules/mainData');
const { storage } = require('./cloudinary');
const upload = multer({ storage });
const Tyres = require('./modules/tyres');
const Dev = require('./modules/dev');
const Air = require('./modules/air');
const Carsuel = require('./modules/carsuel');
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/endGame'

app.use(cors());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/main-user', async (req, res) => {
    const { username, password } = req.body;
    if (username === "gamaleto" && password === "anagamal@123") {
        const auth = await Auth.findByIdAndUpdate(`${session}`, {
            isLoggedIn: true,
        });
        console.log(auth);

        res.redirect(`${frontEndUrl}/`);
    } else {
        console.log(false);
        res.redirect(`${frontEndUrl}/main-user`);
    }


});
app.get("/home", async (req, res) => {
    const data = await MainData.find({});
    res.json(data);
});
app.get('/main-user', async (req, res) => {
    const auth = await Auth.findById(`${session}`);
    res.json(auth);
});

app.post('/logout', async (req, res) => {
    await Auth.findByIdAndUpdate(`${session}`, {
        isLoggedIn: false,
    });
    res.redirect(`${frontEndUrl}/`);
});

const { cloudinary } = require('./cloudinary');

app.put("/main-data/:id", upload.single('new-image'), async (req, res) => {
    const { title, header, content, advise } = req.body;
    const id = req.params.id;
    console.log(req.body)
    try {
        // Fetch existing data from the database
        const existingData = await MainData.findById(id);
        if (!existingData) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Set default image URL as the existing image
        let imageUrl = existingData.image;

        // If a new image is uploaded, upload it to Cloudinary
        if (req.file) {
            console.log("New image file detected, uploading...");
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'LowerEarly'
            });
            imageUrl = uploadResult.secure_url;
            console.log(imageUrl, "imageUrl");

            if (existingData.image) {
                // Extract the publicId from the Cloudinary URL (assuming it's a standard format)
                const publicId = existingData.image.match(/\/(LowerEarly\/[^\/]+)\.[a-z]+$/)[1];
                if (publicId) {
                    console.log("Deleting old image from Cloudinary with publicId:", publicId);
                    try {
                        const result = await cloudinary.uploader.destroy(publicId);
                        console.log("Cloudinary destroy result:", result);
                    } catch (error) {
                        console.error("Error deleting image from Cloudinary:", error);
                    }
                } else {
                    console.error("Failed to extract publicId from image URL");
                }
            }

        }

        // Update the document in MongoDB with new data, including the new image URL
        const updatedData = await MainData.findByIdAndUpdate(
            id,
            { title, header, content, image: imageUrl, advise }, // Ensure image is stored as an array
            { new: true } // Return the updated document
        );
        await updatedData.save();
        console.log(updatedData, "updatedData");
        res.json(updatedData);

    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: "Error updating data", error });
    }
});
app.get('/injector-testing', async (req, res) => {
    const data = await Injector.find({});
    res.json(data);
});
app.put('/injector-testing/:id', upload.single('new-image'), async (req, res) => {
    const { title, content, image } = req.body;
    const id = req.params.id;

    try {
        // Fetch existing data from the database
        const existingData = await Injector.findById(id);
        if (!existingData) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Set default image URL as the existing image
        let imageUrl = existingData.image;

        // If a new image is uploaded, upload it to Cloudinary
        if (req.file) {
            console.log("New image file detected, uploading...");
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'LowerEarly'
            });
            imageUrl = uploadResult.secure_url;
            console.log(imageUrl, "imageUrl");

            if (existingData.image && existingData.image.length > 0) {
                // Extract the publicId from the Cloudinary URL (assuming it's a standard format)
                const publicId = existingData.image.match(/\/(LowerEarly\/[^\/]+)\.[a-z]+$/)[1];
                if (publicId) {
                    console.log("Deleting old image from Cloudinary with publicId:", publicId);
                    try {
                        const result = await cloudinary.uploader.destroy(publicId);
                        console.log("Cloudinary destroy result:", result);
                    } catch (error) {
                        console.error("Error deleting image from Cloudinary:", error);
                    }
                } else {
                    console.error("Failed to extract publicId from image URL");
                }
            }

        }

        // Update the document in MongoDB with new data, including the new image URL
        const updatedData = await Injector.findByIdAndUpdate(
            id,
            { title, content, image: imageUrl }, // Ensure image is stored as an array
            { new: true } // Return the updated document
        );
        await updatedData.save();
        console.log(updatedData, "updatedData");
        res.json(updatedData);

    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: "Error updating data", error });
    }
});
app.get('/tyres', async (req, res) => {
    const data = await Tyres.find({});
    res.json(data);
});
app.put('/tyres/:id', upload.single('new-image'), async (req, res) => {
    const { header, content, image } = req.body;
    const id = req.params.id;

    try {
        // Fetch existing data from the database
        const existingData = await Tyres.findById(id);
        if (!existingData) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Set default image URL as the existing image
        let imageUrl = existingData.image;

        // If a new image is uploaded, upload it to Cloudinary
        if (req.file) {
            console.log("New image file detected, uploading...");
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'LowerEarly'
            });
            imageUrl = uploadResult.secure_url;
            console.log(imageUrl, "imageUrl");

            if (existingData.image && existingData.image.length > 0) {
                // Extract the publicId from the Cloudinary URL (assuming it's a standard format)
                const publicId = existingData.image.match(/\/(LowerEarly\/[^\/]+)\.[a-z]+$/)[1];
                if (publicId) {
                    console.log("Deleting old image from Cloudinary with publicId:", publicId);
                    try {
                        const result = await cloudinary.uploader.destroy(publicId);
                        console.log("Cloudinary destroy result:", result);
                    } catch (error) {
                        console.error("Error deleting image from Cloudinary:", error);
                    }
                } else {
                    console.error("Failed to extract publicId from image URL");
                }
            }

        }

        // Update the document in MongoDB with new data, including the new image URL
        const updatedData = await Tyres.findByIdAndUpdate(
            id,
            { header, content, image: imageUrl }, // Ensure image is stored as an array
            { new: true } // Return the updated document
        );
        await updatedData.save();
        console.log(updatedData, "updatedData");
        res.json(updatedData);

    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: "Error updating data", error });
    }
});

app.get('/software', async (req, res) => {
    const data = await Dev.find({});
    res.json(data);
    console.log(data);
})
app.put('/software/:id', upload.single('new-image'), async (req, res) => {
    const { content, image } = req.body;
    const id = req.params.id;

    try {
        // Fetch existing data from the database
        const existingData = await Dev.findById(id);
        if (!existingData) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Set default image URL as the existing image
        let imageUrl = existingData.image;

        // If a new image is uploaded, upload it to Cloudinary
        if (req.file) {
            console.log("New image file detected, uploading...");
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'LowerEarly'
            });
            imageUrl = uploadResult.secure_url;
            console.log(imageUrl, "imageUrl");

            if (existingData.image && existingData.image.length > 0) {
                // Extract the publicId from the Cloudinary URL (assuming it's a standard format)
                const publicId = existingData.image.match(/\/(LowerEarly\/[^\/]+)\.[a-z]+$/)[1];
                if (publicId) {
                    console.log("Deleting old image from Cloudinary with publicId:", publicId);
                    try {
                        const result = await cloudinary.uploader.destroy(publicId);
                        console.log("Cloudinary destroy result:", result);
                    } catch (error) {
                        console.error("Error deleting image from Cloudinary:", error);
                    }
                } else {
                    console.error("Failed to extract publicId from image URL");
                }
            }

        }

        // Update the document in MongoDB with new data, including the new image URL
        const updatedData = await Dev.findByIdAndUpdate(
            id,
            { content, image: imageUrl }, // Ensure image is stored as an array
            { new: true } // Return the updated document
        );
        await updatedData.save();
        console.log(updatedData, "updatedData");
        res.json(updatedData);

    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: "Error updating data", error });
    }
});
app.get("/air", async (req, res) => {
    const data = await Air.find({});
    res.json(data);
});

app.put('/air/:id', upload.single('new-image'), async (req, res) => {
    const { title, content, questionOne, answerOne, questionTwo, answerTwo, questionThree, answerThree } = req.body;
    const id = req.params.id;

    try {
        // Fetch existing data from the database
        const existingData = await Air.findById(id);
        if (!existingData) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Set default image URL as the existing image
        let imageUrl = existingData.image;

        // If a new image is uploaded, upload it to Cloudinary
        if (req.file) {
            console.log("New image file detected, uploading...");
            const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'LowerEarly'
            });
            imageUrl = uploadResult.secure_url;
            console.log(imageUrl, "imageUrl");

            // If an existing image is present, delete it from Cloudinary
            if (existingData.image && existingData.image.length > 0) {
                const publicId = existingData.image.match(/\/(LowerEarly\/[^\/]+)\.[a-z]+$/)[1];
                if (publicId) {
                    console.log("Deleting old image from Cloudinary with publicId:", publicId);
                    try {
                        const result = await cloudinary.uploader.destroy(publicId);
                        console.log("Cloudinary destroy result:", result);
                    } catch (error) {
                        console.error("Error deleting image from Cloudinary:", error);
                    }
                } else {
                    console.error("Failed to extract publicId from image URL");
                }
            }
        }

        // Update the document in MongoDB with new data, including the new image URL
        const updatedData = await Air.findByIdAndUpdate(
            id,
            {
                title,
                content,
                image: imageUrl,
                questionOne,
                answerOne,
                questionTwo,
                answerTwo,
                questionThree,
                answerThree
            },
            { new: true } // Return the updated document
        );
        await updatedData.save();
        console.log(updatedData, "updatedData");
        res.json(updatedData);

    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: "Error updating data", error });
    }
});
app.get('/carsuel', async (req, res) => {
    const data = await Carsuel.find({});
    res.json(data);
});
app.post('/adding-image', upload.single('new-image'), async (req, res) => {
    const data = new Carsuel({
        image: req.file.path,
    });
    await data.save();
    res.json(data);

})
app.put('/replacing-image/:id', upload.single('replace-image'), async (req, res) => {
    try {
        const { id } = req.params;
        const existingData = await Carsuel.findById(id);

        if (!existingData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Extract public_id from the existing image URL
        const publicId = existingData.image.match(/\/(LowerEarly\/[^\/]+)\.[a-z]+$/)[1];

        // Remove the old image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        // Update the existing record with the new image
        existingData.image = req.file.path;
        await existingData.save();

        res.json(existingData);
    } catch (error) {
        res.status(500).json({ message: 'Error updating image', error });
    }
})
app.delete('/delete-image/:id', async (req, res) => {
    const { id } = req.params;
    const existingData = await Carsuel.findById(id);
    const publicId = existingData.image.match(/\/(LowerEarly\/[^\/]+)\.[a-z]+$/)[1];
    await cloudinary.uploader.destroy(publicId);
    await Carsuel.findByIdAndDelete(id);
    res.json({ message: "Image deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});