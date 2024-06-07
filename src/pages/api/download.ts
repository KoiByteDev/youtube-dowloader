// pages/api/download.ts
import { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

export default async function downloadHandler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.body;

    console.log("Received request")

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const info = await ytdl.getInfo(url);
        console.log(info.videoDetails.title);
        res.status(200).json({ title: info.videoDetails.title });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get video information' });
    }
}