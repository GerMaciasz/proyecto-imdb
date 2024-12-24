import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from "react-router-dom";



function CarruselComponent({upComing}) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (upComing.length === 0) return;
    
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
            prevIndex === upComing.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
    
        return () => clearInterval(timer);
        }, [upComing.length]);
    
        const goToSlide = (index) => {
        setCurrentIndex(index);
        };
    
        const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? upComing.length - 1 : prevIndex - 1
        );
        };
    
        const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === upComing.length - 1 ? 0 : prevIndex + 1
        );
        };
    
        if (upComing.length === 0) {
        return (
            <div className="w-full h-[500px] bg-black flex items-center justify-center">
            <p className="text-white text-xl">Loading movies...</p>
            </div>
        );
        }
    
        const currentMovie = upComing[currentIndex];
    
        return (
        <div className=" relative w-full h-[500px] bg-black min-h-screen bg-[#1a1a1a]">
            <div 
            className=" absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${currentMovie?.poster_path})`,
            }}
            />
    
            <div className="relative h-full flex items-center px-16">
            <div className="w-64 h-80 relative group cursor-pointer mr-8">
                <img 
                src={currentMovie?.poster_path} 
                alt={currentMovie?.title}
                className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <Play className="w-16 h-16 text-white" />
                </div>
            </div>

            <div className="text-white max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">{currentMovie?.title}</h1>
                <h2 className="text-xl text-gray-300 mb-2">{currentMovie?.originalTitle}</h2>
                <p className="text-lg mb-6">{currentMovie?.overview}</p>
                <button className="bg-white text-black px-6 py-2 rounded-full flex items-center hover:bg-gray-200 transition-colors"
                onClick={() => navigate(`/details/${currentMovie.id}`)}>
                <Play className="w-5 h-5 mr-2" />
                Ver más información
                </button>
            </div>
    
            {upComing.length > 1 && (
                <>
                <button 
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-75 transition-colors"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-75 transition-colors"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
                </>
            )}
    
            {upComing.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {upComing.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-white' : 'bg-gray-500'
                    }`}
                    />
                ))}
                </div>
            )}
            </div>
        </div>
        );
    };
    

export default CarruselComponent;