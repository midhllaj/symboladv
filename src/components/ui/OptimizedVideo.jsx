import React, { useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo, lazyload } from '@cloudinary/react';

// Initialize Cloudinary instance
const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzmaqq0bd'
    }
});

/**
 * OptimizedVideo Component
 * 
 * @param {string} publicId - The public ID of the video in Cloudinary (e.g., 'assets/video/desktop')
 * @param {string} className - (Optional) CSS classes
 * @param {boolean} autoPlay - (Optional) Autoplay video
 * @param {boolean} muted - (Optional) Mute video
 * @param {boolean} loop - (Optional) Loop video
 * @param {boolean} controls - (Optional) Show controls
 * @param {object} style - (Optional) Inline styles
 */
const OptimizedVideo = ({
    publicId,
    className,
    autoPlay = true,
    muted = true,
    loop = true,
    controls = false,
    playsInline = true,
    style
}) => {


    // Create the video object from Cloudinary
    const video = cld.video(publicId);

    // Apply automatic format and quality optimization
    video.format('auto').quality('auto');

    return (
        <AdvancedVideo

            cldVid={video}
            className={className}
            style={style}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            controls={controls}
            playsInline={playsInline}
            plugins={[]}
        />
    );
};

export default OptimizedVideo;
