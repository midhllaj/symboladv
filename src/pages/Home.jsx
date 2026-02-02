import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Work from '../components/sections/Work';
import LeadershipLocation from '../components/sections/LeadershipLocation';
import ClientLogos from '../components/sections/ClientLogos';
import Contact from '../components/sections/Contact';
import { Hook } from '../components/Creativehook/Creativehook/Hook';

const Home = () => {
    return (
        <main>
            <SEO
                title="Symbol Advertising | Premium Creative Agency Since 1999"
                description="Transform your brand with Symbol Advertising. 25+ years of experience, 500+ satisfied clients. Full-service creative agency offering branding, digital experiences, exhibitions, and outdoor advertising."
                canonical="/"
            />
            <Hero />
            <Hook />
            <Services />
            <Work />
            <LeadershipLocation />
            <ClientLogos />
            <Contact />
        </main>
    );
};

export default Home;
