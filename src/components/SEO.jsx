import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for managing page-specific meta tags
 * Uses react-helmet-async for dynamic meta tag management in React SPA
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (will be appended with " | Symbol Advertising")
 * @param {string} props.description - Meta description (155-160 chars recommended)
 * @param {string} props.canonical - Canonical URL path (e.g., "/about")
 * @param {string} props.type - Open Graph type (default: "website")
 * @param {string} props.image - Open Graph image URL (default: logo)
 */
const SEO = ({
    title = "Premium Creative Agency Since 1999",
    description = "Transform your brand with Symbol Advertising. 25+ years of experience, 500+ satisfied clients. Full-service creative agency offering branding, digital experiences, and outdoor advertising.",
    canonical = "",
    type = "website",
    image = "/logo.png"
}) => {
    const siteUrl = "https://symboladvertising.com";
    const fullTitle = title.includes("Symbol") ? title : `${title} | Symbol Advertising`;
    const canonicalUrl = `${siteUrl}${canonical}`;
    const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={imageUrl} />
        </Helmet>
    );
};

export default SEO;
