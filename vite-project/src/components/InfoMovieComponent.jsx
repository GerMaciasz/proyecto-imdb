import React from "react";

function MovieDetails({ info }) {
    if (!info || Object.keys(info).length === 0) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center text-white">
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                <h1 className="text-2xl md:text-4xl font-bold">{info.title}</h1>
                {info.originalTitle !== info.title && (
                    <h2 className="text-lg md:text-xl text-gray-400">
                    {`Titulo original: ${info.originalTitle}`}
                    </h2>
                )}
                <h2 className="text-base md:text-lg text-gray-400 py-0">
                    {`Año: ${new Date(info.releaseDate).getFullYear()}`}
                </h2>
                </div>
    
                <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-[300px] flex-shrink-0">
                    <div className="relative group">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${info.poster}`}
                        alt={info.title}
                        className="w-full rounded shadow-lg"
                    />
                    </div>
                </div>
    
                <div className="flex-1">
                    <div className="relative aspect-video bg-[#252525] rounded overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <iframe
                        src={info.trailerUrl ? `https://www.youtube.com/embed/${info.trailerUrl.split("v=")[1]}` : ""}
                        title="Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                        />
                    </div>
                    </div>
                </div>
                </div>
    
                <div className="bg-[#252525] mt-8 rounded-lg">
                <div className="p-4 md:p-6">
                    <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-2">
                        {info.genres.map((genre) => (
                        <span
                            key={genre}
                            className="inline-flex px-4 py-1 rounded-full bg-zinc-900 text-gray-200 text-sm border border-zinc-700 hover:bg-zinc-800 transition-colors duration-200"
                        >
                            {genre}
                        </span>
                        ))}
                    </div>
    
                    {info.tagLine && (
                        <div>
                        <p className="text-base md:text-lg italic text-gray-400">"{info.tagLine}"</p>
                        </div>
                    )}
    
                    <div>
                        <p className="text-sm md:text-base text-gray-300">{info.overview}</p>
                    </div>
    
                    <div className="py-1 bg-[#252525] rounded">
                        Idioma original: {info.originalLanguage.toUpperCase()}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default MovieDetails;