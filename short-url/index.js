const express = require('express');
require('dotenv').config();
const { connectMongoDB } = require('./connect')
const URL = require('./models/url');

const urlRoute = require('./routes/url')

const app = express();
const PORT = process.env.PORT || 8000;

connectMongoDB(`${process.env.MONGODB_URI}/short-url`)

app.use(express.json())

app.use('/url', urlRoute)

// for dynamic route
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamps: Date.now()
            }
        }
    })

    return res.redirect(entry.redirectURL)
})

app.listen(PORT, () => console.log(`Server Started at Port number ${PORT}`))