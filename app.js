const ytdl = require('ytdl-core');
const express = require('express');
const app = express();
const port = 8000;

app.get('/download', (req, res) => {
    let url = req.query.url;
    if (url) {
        ytdl.getInfo(url).then(info => {
            let formats = ytdl.filterFormats(info.formats, 'audioandvideo');
            res.json(formats.map(format => {
                return {
                    format: format.container,
                    quality: format.qualityLabel,
                    size: format.contentLength,
                    url: format.url
                };
            }));
        }).catch(err => {
            res.status(500).json({ error: 'Failed to fetch video info.' });
        });
    } else {
        res.status(400).json({ error: 'Video URL is missing.' });
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
