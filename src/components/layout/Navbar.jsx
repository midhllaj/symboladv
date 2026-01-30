import React, { useRef } from 'react';
import MenuButton from '../Header/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ menuActive, setMenuActive }) => {
    const navRef = useRef(null);
    const linksRef = useRef([]);
    const [isVisible, setIsVisible] = React.useState(true);
    const lastScrollY = useRef(0);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if scrolling UP or at the very top
            if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
                // Hide if scrolling DOWN and past threshold
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Updated links to match screenshot style where possible, 
    // while keeping functional project links
    const links = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/#contact' },
    ];

    const handleScrollTo = (e, href) => {
        const targetId = href.replace('/', '');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            ref={navRef}
            className={`fixed ${isVisible ? 'top-4 md:top-6' : '-top-32'} left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 w-auto md:w-full md:max-w-5xl md:px-4`}
        >
            <div
                className="bg-dark-charcoal/90 backdrop-blur-xl border border-white/10 rounded-full flex justify-between items-center shadow-2xl 
                w-[408.5px] h-[66px] max-w-[95vw] px-6
                md:w-full md:h-auto md:px-8 md:py-4"
            >

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <img src="/logo.png" alt="Symbol Advertising" className="h-10 w-auto object-contain" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {links.map((link, index) => (
                        <div key={link.name} className="relative group">
                            <a
                                href={link.href}
                                ref={(el) => (linksRef.current[index] = el)}
                                onClick={(e) => {
                                    if (link.href === '/services' || link.href === '/portfolio' || link.href === '/about' || link.href === '/') {
                                        // Allow default nav for pages
                                        if (link.href === '/' && window.location.pathname === '/') {
                                            e.preventDefault();
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                        return;
                                    }
                                    if (window.location.pathname === '/' && link.href.startsWith('/#')) {
                                        const hash = link.href.substring(1);
                                        const target = document.querySelector(hash);
                                        if (target) {
                                            e.preventDefault();
                                            target.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                }}
                                // Stylized link: White/60 transparent, white on hover, Active color simulation
                                className="text-sm font-medium transition-colors duration-300 text-white/60 hover:text-white"
                            >
                                {link.name}
                            </a>

                            {/* Dropdown Menu for Services only */}
                            {link.name === 'Services' && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-64 bg-black border border-white/20 text-white p-2 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-2xl">
                                    <div className="flex flex-col">
                                        {[
                                            'Contacting & Exhibition',
                                            'Signboard & Outdoor',
                                            'Digital Experiences',
                                            'Construction & Branding'
                                        ].map((item) => (
                                            <a
                                                key={item}
                                                href="/services"
                                                className="block px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                            >
                                                {item}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <MenuButton isActive={menuActive} toggleMenu={() => setMenuActive(!menuActive)} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
