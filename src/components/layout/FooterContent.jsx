import React from 'react'

export default function Content() {
    return (
        <div className='bg-[#D64545] py-8 px-12 h-full w-full flex flex-col justify-between'>
            <Section1 />
            <Section2 />
        </div>
    )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}

const Section2 = () => {
    return (
        <div className='flex justify-between items-end'>
            <h1 className='text-[10vw] leading-[0.8] mt-10 text-white font-bold tracking-tighter'>Symbol Advertising</h1>
            <p className="text-white/60">©2024</p>
        </div>
    )
}

const Nav = () => {
    return (
        <div className='flex shrink-0 gap-20'>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>Navigation</h3>
                <a href="/" className="text-white hover:underline">Home</a>
                <a href="/services" className="text-white hover:underline">Services</a>
                <a href="/portfolio" className="text-white hover:underline">Portfolio</a>
                <a href="/about" className="text-white hover:underline">About</a>
                <a href="/#contact" className="text-white hover:underline">Contact</a>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>Services</h3>
                <p className="text-white">Branding</p>
                <p className="text-white">Web Design</p>
                <p className="text-white">Marketing</p>
                <p className="text-white">Development</p>
            </div>
            <div className='flex flex-col gap-2'>
                <h3 className='mb-2 uppercase text-[#ffffff80]'>Connect</h3>
                <p className="text-white">Instagram</p>
                <p className="text-white">LinkedIn</p>
                <p className="text-white">Twitter</p>
            </div>
        </div>
    )
}
