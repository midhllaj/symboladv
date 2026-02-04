import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
const CLOUD_NAME = 'dzmaqq0bd';
const API_KEY = '855562385345687';
const API_SECRET = 'y8hKC5Y_NIQ6IR9lLXEon9Q_tYw';

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true
});

const PUBLIC_DIR = path.resolve(__dirname, '../public');

const videosToUpload = [
    'assets/mobile-hero.mp4',
    'assets/video/desktop.mp4'
];

async function uploadVideos() {
    console.log('🚀 Starting targeted video upload...');

    for (const file of videosToUpload) {
        const fullPath = path.join(PUBLIC_DIR, file);
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const publicId = nameWithoutExt.split(path.sep).join('/');

        if (fs.existsSync(fullPath)) {
            try {
                console.log(`Uploading ${file}...`);
                const result = await cloudinary.uploader.upload(fullPath, {
                    public_id: publicId,
                    overwrite: true,
                    resource_type: "video"
                });
                console.log(`✅ Uploaded: ${file} -> ${result.public_id}`);
            } catch (error) {
                console.error(`❌ Error uploading ${file}:`, error.message);
            }
        } else {
            console.error(`❌ File not found: ${fullPath}`);
        }
    }
    console.log('✨ Video upload complete!');
}

uploadVideos();
