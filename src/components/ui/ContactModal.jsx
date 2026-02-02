import React, { useEffect, useState } from 'react';
import { useModal } from '../../context/ModalContext';
import { X } from 'lucide-react';

const ContactModal = () => {
    const { isOpen, closeModal, initialService } = useModal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setFormData(prev => ({ ...prev, service: initialService || '' }));
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, initialService]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Thank you for your enquiry. We will get back to you soon.');
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={closeModal}
            ></div>

            <div className="relative bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-zinc-950/50">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                        <p className="text-white/50 text-sm mt-1">Let's build something extraordinary together.</p>
                    </div>
                    <button
                        onClick={closeModal}
                        className="p-2 text-white/50 hover:text-primary-red transition-colors rounded-full hover:bg-white/5"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red transition-all"
                                placeholder="+971 50 000 0000"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red transition-all"
                                placeholder="john@company.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white/60 mb-2">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red transition-all"
                                placeholder="Your Company Ltd."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Interested Service</label>
                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red transition-all appearance-none"
                        >
                            <option value="">Select a service...</option>
                            <option value="Construction">Construction & Fit-out</option>
                            <option value="Exhibitions">Exhibition Stands</option>
                            <option value="Signboards">Signage & Outdoor</option>
                            <option value="Digital">Digital Experiences</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-white/60 mb-2">Message</label>
                        <textarea
                            name="message"
                            rows="4"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary-red focus:outline-none focus:ring-1 focus:ring-primary-red transition-all resize-none"
                            placeholder="Tell us about your project requirements..."
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-primary-red hover:bg-[#b03535] text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary-red/20"
                        >
                            Submit Enquiry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactModal;
