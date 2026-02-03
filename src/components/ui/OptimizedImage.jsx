import React from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage, responsive, placeholder, lazyload } from '@cloudinary/react';

// Initialize Cloudinary instance
const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzmaqq0bd'
    }
});

/**
 * OptimizedImage Component
 * 
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {string} alt - Alt text for the image
 * @param {number} width - (Optional) Width to resize to
 * @param {number} height - (Optional) Height to resize to
 * @param {string} className - (Optional) CSS classes
 * @param {object} styles - (Optional) Inline styles
 */
const OptimizedImage = ({ publicId, alt, width, height, className, style }) => {
    let img = cld.image(publicId)
        .format('auto')
        .quality('auto');

    if (width || height) {
        img = img.resize(auto().gravity(autoGravity()).width(width).height(height));
    }

    return (
        <AdvancedImage
            cldImg={img}
            plugins={[lazyload(), placeholder({ mode: 'blur' })]}
            alt={alt}
            className={className}
            style={style}
        />
    );
};

export default OptimizedImage;
