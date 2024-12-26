import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useNavigate } from "react-router-dom";



function CarruselComponent({upComing}) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    const resetTimer = () =>{
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }
        timerRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === upComing.length - 1 ? 0 : prevIndex + 1
            );
          }, 3000);
        
    }

    useEffect(() => {
        if (upComing.length === 0) return;
    
        resetTimer()
    
        return () => clearInterval(timerRef.current);
        }, [upComing.length]);
    
        const goToSlide = (index) => {
        setCurrentIndex(index);
        resetTimer()
        };
    
        const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? upComing.length - 1 : prevIndex - 1
        );
        resetTimer()
        };
    
        const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === upComing.length - 1 ? 0 : prevIndex + 1
        );
        resetTimer()
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
            <div className="relative w-full h-[100vh] bg-[#1a1a1a] flex items-center">
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(${currentMovie?.poster_path})`,
                }}
                />
        
                <div className="relative w-full h-full flex items-center overflow-x-hidden">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 p-4 md:p-8 lg:p-16">
                    <div className="w-[200px] md:w-[256px] h-[250px] md:h-[320px] relative group cursor-pointer shrink-0">
                        <img 
                        src={currentMovie?.poster_path} 
                        alt={currentMovie?.title}
                        className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                        <Play className="w-12 h-12 md:w-16 md:h-16 text-white" />
                        </div>
                    </div>
        
                    <div className="text-white w-full md:max-w-2xl text-center md:text-left">
                        <h1 className="text-xl md:text-4xl font-bold mb-3 md:mb-4">{currentMovie?.title}</h1>
                        <h2 className="text-base md:text-xl text-gray-300 mb-2">{currentMovie?.originalTitle}</h2>
                        <p className="text-sm md:text-lg mb-4 md:mb-6">{currentMovie?.overview}</p>
                        <button 
                        className="bg-white text-black px-3 py-1.5 md:px-6 md:py-2 rounded-full flex items-center hover:bg-gray-200 transition-colors mx-auto md:mx-0"
                        onClick={() => navigate(`/details/${currentMovie.id}`)}
                        >
                        <Play className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Ver más información
                        </button>
        
                        {upComing.length > 1 && (
                        <div className="flex justify-center md:justify-start space-x-1 md:space-x-2 mt-6 md:mt-8">
                            {upComing.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                                index === currentIndex ? 'bg-white' : 'bg-gray-500'
                                }`}
                            />
                            ))}
                        </div>
                        )}
                    </div>
                    </div>
                </div>
        
                {upComing.length > 1 && (
                    <>
                    <button 
                        onClick={goToPrevious}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-75 transition-colors z-10"
                    >
                        <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button 
                        onClick={goToNext}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white hover:bg-opacity-75 transition-colors z-10"
                    >
                        <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    </>
                )}
                </div>
            </div>
        );
    };
    

export default CarruselComponent;