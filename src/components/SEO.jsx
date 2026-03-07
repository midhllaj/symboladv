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
    description = "Transform your brand with Symbol Advertising. 25+ years of experience, 500+ satisfied clients. Full-service creative agency offering branding, digital experiences, and outdoor advertising in Dubai, UAE.",
    keywords = "symbol advertising, advertising agency dubai, creative agency uae, branding agency dubai",
    canonical = "",
    type = "website",
    image = "/logo.png"
}) => {
    const siteUrl = "https://symboladvertisement.com";
    const fullTitle = title.includes("Symbol") ? title : `${title} | Symbol Advertising`;
    const canonicalUrl = `${siteUrl}${canonical}`;
    const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Geo Meta Tags */}
            <meta name="geo.region" content="AE-DU" />
            <meta name="geo.placename" content="Dubai" />
            <meta name="geo.position" content="25.276987;55.296249" />
            <meta name="ICBM" content="25.276987, 55.296249" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:site_name" content="Symbol Advertising" />
            <meta property="og:locale" content="en_AE" />

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
