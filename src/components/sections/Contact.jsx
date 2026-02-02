import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="pt-12 pb-24 bg-black text-white scroll-mt-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary-red mb-2">Get in Touch</h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-8">Let's start a conversation.</h3>
                        <p className="text-white/60 mb-12 text-lg">
                            Ready to turn your vision into a symbol of success? Reach out to us today.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-6 h-6 mr-4 bg-white/10 rounded-full flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-wider mb-1">Email</p>
                                    <a href="mailto:symboladv66@gmail.com" className="text-xl font-medium hover:text-primary-red transition-colors">symboladv66@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 h-6 mr-4 bg-white/10 rounded-full flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-wider mb-1">Phone</p>
                                    <a href="tel:+971509144500" className="text-xl font-medium hover:text-primary-red transition-colors">+971 50 914 4500</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-6 h-6 mr-4 bg-white/10 rounded-full flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-white/40 uppercase tracking-wider mb-1">Office</p>
                                    <p className="text-lg">123 Creative Avenue, NY 10012</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-black border border-white/10 p-8 rounded-3xl">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-white/50 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-white/5 border border-transparent focus:border-primary-red rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white/50 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-white/5 border border-transparent focus:border-primary-red rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-white/50 mb-2">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full bg-white/5 border border-transparent focus:border-primary-red rounded-lg px-4 py-3 text-white focus:outline-none transition-colors"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary-red hover:bg-[#C03D3D] text-white font-bold py-4 rounded-lg transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
