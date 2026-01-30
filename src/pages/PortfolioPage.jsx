import React, { useState } from 'react';

// All portfolio images - combined from both folders
const allImages = [
    // Main grid folder images
    '20220111_194253.jpg',
    '20220121_123605.jpg',
    '20220203_132255.jpg',
    '20220203_132857.jpg',
    '20221128_180459.jpg',
    '20230228_165052.jpg',
    '20230228_165612.jpg',
    '20230316_020436.jpg',
    '20230405_092631.jpg',
    '20230529_191052.jpg',
    '20230919_191343.jpg',
    '20231101_103129.jpg',
    '20231122_071700.jpg',
    '20240115_022840.jpg',
    '20250126_063902.jpg',
    'IMG_20191123_152433.jpg',
    'IMG_20191213_072738.jpg',
    'IMG_20191215_160206.jpg',
    'IMG_20200419_094130.jpg',
    'IMG_20201206_084250.jpg',
    'IMG_20201206_091708.jpg',
    'IMG_20201222_124316.jpg',
    'IMG_20201225_150134.jpg',
    'IMG_20210202_062442.jpg',
    'IMG_20210415_165321.jpg',
    'IMG_20210912_182420.jpg',
    'IMG_20211208_220959.jpg',
    'IMG_20221126_034905.jpg',
    'IMG_20221224_140542.jpg',
    // Scrolling image 30 folder images
    '20160117_142604.jpg',
    '20180423_120941.jpg',
    '20191113_082054.jpg',
    '20220203_132818.jpg',
    '20221023_084834.jpg',
    '20221030_202153 (1).jpg',
    '20221114_132822.jpg',
    '20221128_013637.jpg',
    '20221128_043332.jpg',
    '20230228_165047.jpg',
    '20230306_230725.jpg',
    '20230411_175500.jpg',
    '20230529_185208.jpg',
    '20231122_075853.jpg',
    '20231208_092657.jpg',
    'IMG_20160601_172626.jpg',
    'IMG_20161101_071006.jpg',
    'IMG_20190502_082559.jpg',
    'IMG_20191118_041131.jpg',
    'IMG_20191206_071303.jpg',
    'IMG_20191215_160222.jpg',
    'IMG_20191215_195130.jpg',
    'IMG_20200304_073219.jpg',
    'IMG_20201206_165356.jpg',
    'IMG_20201214_095841.jpg',
    'IMG_20210125_142419.jpg',
    'IMG_20210301_145855.jpg',
    'IMG_20210405_145653.jpg',
    'IMG_20210411_142210.jpg',
    'IMG_20211024_173021.jpg',
    'IMG_20211116_025328.jpg',
    'IMG_20220108_213042.jpg',
    'IMG_20220531_163729.jpg',
    'IMG-20161022-WA0021.jpg',
    'IMG-20161024-WA0025.jpg',
    'WhatsApp Image 2026-01-19 at 1.09.02 AM.jpeg',
];

const ITEMS_PER_PAGE = 10;

const PortfolioPage = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(allImages.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentImages = allImages.slice(startIndex, endIndex);

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 7;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-dark-charcoal mb-6">Our Portfolio</h1>
                    <div className="max-w-4xl mx-auto text-medium-grey leading-relaxed space-y-4">
                        <p>
                            With the principle of valuing clients as the foundation of any business, Symbol Advertising has not only completed innovative and impressive structures but also gained reliable clients who have become key pillars of the brand. Since our establishment in 2000, we have successfully completed numerous projects that serve as a testament to our core values of delivering high-quality work, exceptional design, a commitment to on-time delivery and hassle-free installation processes.
                        </p>
                        <p>
                            Our work showcases some of the brilliant signage pieces crafted from a variety of materials, including composite aluminum panels, stainless steel sheets, molded frames, glass films, <span className="text-primary-red font-medium">polymetal sheets</span>, acrylic structures, and more. With the help of these materials, we have been able to turn creative ideas into billboards, pylons, totems, <span className="text-primary-red font-medium">wall branding</span>, and standalone building facades that are well-known for our timely delivery and simple installation processes.
                        </p>
                    </div>
                </div>

                {/* Portfolio Grid - Masonry Style */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {currentImages.map((image, index) => {
                        // Create varied layout - some images span 2 columns/rows for visual interest
                        const isLarge = index % 5 === 0;
                        return (
                            <div
                                key={`${image}-${index}`}
                                className={`${isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'} overflow-hidden rounded-lg`}
                            >
                                <img
                                    src={`/portfolio/${image}`}
                                    alt={`Portfolio project ${startIndex + index + 1}`}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-12">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="w-8 h-8 flex items-center justify-center text-sm text-medium-grey hover:text-dark-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        «
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return (
                                <span key={`ellipsis-${index}`} className="w-8 h-8 flex items-center justify-center text-gray-400">
                                    ...
                                </span>
                            );
                        }
                        return (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 flex items-center justify-center text-sm rounded transition-colors ${currentPage === page
                                    ? 'bg-primary-red text-white'
                                    : 'text-medium-grey hover:text-dark-charcoal hover:bg-light-grey'
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="w-8 h-8 flex items-center justify-center text-sm text-medium-grey hover:text-dark-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        »
                    </button>
                </div>

                {/* Page Info */}
                <div className="text-center mt-4 text-sm text-medium-grey">
                    Page {currentPage} of {totalPages} ({allImages.length} projects total)
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
