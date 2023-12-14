// const { nanoid } = require('nanoid');
const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'Url is Required' })

    // const shortId = nanoid(8)
    const shortId = shortid.generate(8)
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.json({ id: shortId })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({ totalClick: result.visitHistory.length, analytics: result.visitHistory })
}

module.exports = {
    handleGenerateNewURL,
    handleGetAnalytics
}