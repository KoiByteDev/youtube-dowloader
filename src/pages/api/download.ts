import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';

export default async function downloadHandler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.body;
    const urlIsValid = ytdl.validateURL(url);

    console.log("URL Received");

    if (!urlIsValid) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const filePath = path.join(process.cwd(), 'public', 'downloads', `${info.videoDetails.title}.mp4`);
        ytdl(url)
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => {
                console.log('Video downloaded successfully!');
            })
            .on('error', (err) => {
                console.error('Error downloading video: ', err);
                res.status(500).json({ error: 'Error downloading video' });
            });
        const { title, description, thumbnails } = info.videoDetails;
        const thumbnail = thumbnails[thumbnails.length - 1].url;

        res.status(200).json({ title, description, thumbnail, id: path.basename(filePath, '.mp4') });
    } catch (err: any) {
        console.error(err);
        if (err.statusCode === 410) {
            res.status(410).json({ error: 'The requested video is no longer available.' });
        } else {
            res.status(500).json({ error: 'Failed to get video information' });
        }
    }
}
