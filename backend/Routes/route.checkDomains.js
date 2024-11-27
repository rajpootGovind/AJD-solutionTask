const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
    const { names } = req.body;

    try {
        const promises = names.map(name =>
            axios.get(`https://www.whoisxmlapi.com/whoisserver/WhoisService`, {
                headers: { Authorization: `Bearer ${process.env.WHOISXML_API_KEY}` },
            })
        );

        const results = await Promise.all(promises);

        const availability = results.map((result, idx) => ({
            name: names[idx],
            available: result.data.available, // Replace with actual API response
        }));

        res.json({ success: true, availability });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to check domains' });
    }
});

module.exports = router;
