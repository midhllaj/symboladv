import React from 'react'
import Content from './FooterContent';

export default function StickyFooter() {
    return (
        <div
            className='relative h-[600px] md:h-[450px]'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='relative h-[calc(100vh+600px)] md:h-[calc(100vh+450px)] -top-[100vh]'>
                <div className='h-[600px] md:h-[450px] sticky top-[calc(100vh-600px)] md:top-[calc(100vh-450px)]'>
                    <Content />
                </div>
            </div>
        </div>
    )
}
