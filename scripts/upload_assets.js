import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
const CLOUD_NAME = 'dzmaqq0bd';
const API_KEY = '855562385345687';
const API_SECRET = 'y8hKC5Y_NIQ6IR9lLXEon9Q_tYw'; // Keep this safe, do not commit to frontend!

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true
});

const PUBLIC_DIR = path.resolve(__dirname, '../public');

async function uploadAssets() {
    console.log('🚀 Starting Cloudinary upload...');

    // Find all images in public directory
    const files = await glob('**/*.{jpg,jpeg,png,webp,svg}', {
        cwd: PUBLIC_DIR,
        ignore: ['node_modules/**', 'dist/**']
    });

    console.log(`Found ${files.length} images to process.`);

    for (const file of files) {
        const fullPath = path.join(PUBLIC_DIR, file);

        // Create public_id: remove extension and ensure forward slashes
        // e.g. construction\hero.png -> construction/hero
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const publicId = nameWithoutExt.split(path.sep).join('/');

        try {
            // Check if already exists (optional, but saves bandwidth)
            // Ideally we'd check usage or just overwrite: simple approach is overwrite=false

            const result = await cloudinary.uploader.upload(fullPath, {
                public_id: publicId,
                overwrite: false, // Don't re-upload if exists
                resource_type: "auto"
            });
            console.log(`✅ Uploaded: ${file} -> ${result.public_id}`);
        } catch (error) {
            if (error.message.includes('file already exists')) {
                console.log(`⏭️  Skipped (Exists): ${file}`);
            } else {
                console.error(`❌ Error uploading ${file}:`, error.message);
            }
        }
    }

    console.log('✨ Upload process complete!');
}

uploadAssets();
