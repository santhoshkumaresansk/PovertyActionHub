import { useState, useEffect } from "react";

const Slider = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const sliderInterval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(sliderInterval);
    }, [images, interval]);

    return (
        <div className="relative w-full md:w-2/3 h-[300px] overflow-hidden">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index}`}
                        className="w-full h-[300px] object-cover flex-shrink-0 rounded-lg shadow-lg"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
