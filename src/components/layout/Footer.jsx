import React from 'react'

export default function Footer() {
    return (
        <div
            className='relative h-[300px]'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='fixed bottom-0 h-[300px] w-full'>
                <Content />
            </div>
        </div>
    )
}

function Content() {
    return (
        <div className='bg-[#D64545] py-8 px-12 h-full w-full max-w-[1154.91px] mx-auto flex flex-col justify-end gap-10'>
            <Section1 />
            <Section2 />
        </div>
    )
}

const Section1 = () => {
    return (
        <div className='flex gap-20 text-white'>
            <div className='flex flex-col gap-1'>
                <h3 className='mb-2 uppercase text-[#ffffff80] font-medium text-xs'>Navigation</h3>
                <a href="#home" className="hover:underline text-sm">Home</a>
                <a href="#services" className="hover:underline text-sm">Services</a>
                <a href="#portfolio" className="hover:underline text-sm">Portfolio</a>
                <a href="#about" className="hover:underline text-sm">About</a>
                <a href="#contact" className="hover:underline text-sm">Contact</a>
            </div>
            <div className='flex flex-col gap-1'>
                <h3 className='mb-2 uppercase text-[#ffffff80] font-medium text-xs'>Services</h3>
                <a href="#branding" className="hover:underline text-sm">Branding</a>
                <a href="#web-design" className="hover:underline text-sm">Web Design</a>
                <a href="#marketing" className="hover:underline text-sm">Marketing</a>
                <a href="#development" className="hover:underline text-sm">Development</a>
            </div>
            <div className='flex flex-col gap-1'>
                <h3 className='mb-2 uppercase text-[#ffffff80] font-medium text-xs'>Connect</h3>
                <a href="#instagram" className="hover:underline text-sm">Instagram</a>
                <a href="#linkedin" className="hover:underline text-sm">LinkedIn</a>
                <a href="#twitter" className="hover:underline text-sm">Twitter</a>
            </div>
        </div>
    )
}

const Section2 = () => {
    return (
        <div className='flex justify-between items-end'>
            <h1 className='text-[10vw] leading-[0.8] mt-4 font-clash font-bold text-white tracking-tight uppercase'>
                Symbol Advertising
            </h1>
            <p className='text-white/60 mb-2'>©2024</p>
        </div>
    )
}

