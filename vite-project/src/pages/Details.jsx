import { useState, useEffect } from "react"
import NavBarComponent from "../components/NavBarComponent"
import MovieDetails from "../components/InfoMovieComponent"
import { useParams } from "react-router-dom"


function Details () {

    const [info, setInfo] = useState({})
    const params = useParams()
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTg3ZWEyZjdjNWU4MGIxMzhkMGE0ZjAwZWZkMmIxNCIsIm5iZiI6MTY5NTUxNjMzNC43ODgsInN1YiI6IjY1MGY4NmFlMjZkYWMxMDEwYzc1MjQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aX7K-6rJ23r4WD77hsJFSvwJV5k4vUCxe13xZkpnl20'
            }
        };

    useEffect(() => {

        async function apiCall() {
            try{
                let detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?language=es-MX`, options);
                const detailsJson = await detailsResponse.json();
                setInfo((prevInfo) => ({
                    ...prevInfo,
                    genres: detailsJson.genres.map((genre) => genre.name),
                    originalLanguage: detailsJson.original_language,
                    overview: detailsJson.overview,
                    poster: detailsJson.poster_path,
                    releaseDate: detailsJson.release_date,
                    title: detailsJson.title,
                    originalTitle: detailsJson.original_title,
                    tagLine: detailsJson.tagline,
                }));

                const videoResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${params.id}/videos?language=en-US`,
                    options
                    );
                    const videosJson = await videoResponse.json();
                    const trailer = videosJson.results.find(
                        (video) => video.type === "Trailer" && video.site === "YouTube"
                    );
                    if (trailer) {
                        setInfo((prevInfo) => ({
                            ...prevInfo,
                            trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
                            }));
                        } else {
                            console.log("No se encontró un trailer.");
                        }
            }catch(e){
                console.log("ocurrio un error");
                console.log(e);
            }
        }
        apiCall()
    }, [params.id])

    return (
    <>
        <NavBarComponent />
        <MovieDetails info={info} />
    </>
    );
}

export default Details