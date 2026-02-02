import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/layout/Navbar';

const ErpSolutionPage = () => {
    return (
        <div className="bg-white min-h-screen text-dark-charcoal font-sans selection:bg-purple-500 selection:text-white">
            <SEO
                title="ERP Solutions for Business | Symbol Advertising"
                description="Streamline your business operations with our comprehensive custom ERP solutions. Mobile-first design, real-time dashboards, and integrated systems for modern enterprises."
                canonical="/erp-solutions"
            />
            <Navbar />

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                    Custom <br /> <span className="text-purple-600">ERP Solutions</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    We provide custom ERP solutions tailored to your unique business requirements, streamlining operations and driving growth.
                </p>
            </header>

            {/* Showcase Section */}
            <section className="py-20 bg-light-grey">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <div className="order-2 md:order-1">
                            <h2 className="text-3xl font-bold mb-6">Mobile Accessibility</h2>
                            <p className="text-lg text-dark-charcoal/80 leading-relaxed mb-6">
                                Stay connected to your business from anywhere. Our mobile-first ERP designs ensure that your team can access critical data, manage tasks, and make decisions on the go.
                            </p>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-center"><span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>Real-time dashboards</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>Inventory management</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>Order processing</li>
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 flex justify-center gap-6">
                            <img src="/erp/phone-1.jpg" alt="Mobile ERP Interface 1" className="w-[200px] rounded-3xl shadow-2xl border-8 border-dark-charcoal" />
                            <img src="/erp/phone-2.jpg" alt="Mobile ERP Interface 2" className="w-[200px] rounded-3xl shadow-2xl border-8 border-dark-charcoal mt-12" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-purple-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img src="/erp/desktop-1.jpg" alt="Desktop ERP Interface 1" className="relative w-full rounded-lg shadow-2xl border border-gray-200" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Comprehensive Desktop Control</h2>
                            <p className="text-lg text-dark-charcoal/80 leading-relaxed mb-6">
                                Unlock the full potential of your data with our powerful desktop interfaces. Designed for productivity, our ERP solutions offer deep insights and comprehensive management tools.
                            </p>
                            <p className="text-lg text-dark-charcoal/80 leading-relaxed">
                                From complex financial reporting to supply chain logistics, our custom-built modules integrate seamlessly to provide a unified view of your enterprise.
                            </p>
                        </div>
                    </div>

                    <div className="mt-24">
                        <img src="/erp/desktop-2.jpg" alt="Desktop ERP Interface 2" className="w-full rounded-xl shadow-2xl border border-gray-200" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-dark-charcoal text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Need a solution built just for you?</h2>
                    <p className="text-xl text-white/70 mb-10">
                        Let's discuss how a custom ERP can transform your business efficiency.
                    </p>
                    <a href="/#contact" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-full transition-colors duration-300">
                        Request a Consultation
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ErpSolutionPage;
