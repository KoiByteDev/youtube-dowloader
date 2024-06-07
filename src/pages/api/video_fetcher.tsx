import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import ytdl from 'ytdl-core';
import path from 'path';

export default async function downloadHandler(req: NextApiRequest, res: NextApiResponse) {
    const url = req.query.url as string;

    const filePath = path.resolve('public/downloads', 'video.mp4');
    const writeStream = fs.createWriteStream(filePath);

    ytdl(url).pipe(writeStream).on('finish', () => {
        res.status(200).json({ message: 'Download Successful', filePath: 'downloads/video.mp4' });
    }).on('error', (error) => {
        res.status(500).json({ error: error.message });
    })
}