import React from 'react';
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
