import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';
import fs from 'fs';

export default async function downloadHandler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.body;
    const filePath = 'public/downloads/video.mp4';
    const urlIsValid = ytdl.validateURL(url);

    console.log("URL Received")

    if (!urlIsValid) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        ytdl(url)
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
                console.log('Video downloaded successfully!');
            })
            .on('error', (err) => {
                console.error('Error downloading video: ', err);
            });
        const info = await ytdl.getInfo(url);
        console.log(info.videoDetails.title);
        res.status(200).json({ title: info.videoDetails.title });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get video information' });
    }
}