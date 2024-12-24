import { useEffect, useState } from "react";
import NavBarComponent from "../components/NavBarComponent"
import CarruselComponent from "../components/CarruselComponent";
import FooterComponent from "../components/FooterComponent";

function Home() {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTg3ZWEyZjdjNWU4MGIxMzhkMGE0ZjAwZWZkMmIxNCIsIm5iZiI6MTY5NTUxNjMzNC43ODgsInN1YiI6IjY1MGY4NmFlMjZkYWMxMDEwYzc1MjQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aX7K-6rJ23r4WD77hsJFSvwJV5k4vUCxe13xZkpnl20'
            }
        };


    const [upComing, setUpcoming] = useState({});

    useEffect(() => {
      // async-await
    
        async function callUpcoming() {
            try {
            let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-MX&page=1', options)
            let responseJson = await response.json();
            const frist12Results = responseJson.results.slice(0,12).map((movie) => ({
                id: movie.id,
                title: movie.title,
                originalTitle: movie.original_title,
                overview: movie.overview,
                poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }))
            console.log(frist12Results);
            setUpcoming(frist12Results);
            console.log(upComing)
            } catch (e) {
            console.log(`Ocurrió un error`);
            console.log(e);
            }
        }
    
        callUpcoming();
    }, []);


    const videoTrailer = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTg3ZWEyZjdjNWU4MGIxMzhkMGE0ZjAwZWZkMmIxNCIsIm5iZiI6MTY5NTUxNjMzNC43ODgsInN1YiI6IjY1MGY4NmFlMjZkYWMxMDEwYzc1MjQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aX7K-6rJ23r4WD77hsJFSvwJV5k4vUCxe13xZkpnl20'
            }
        };


    const [video, setVideo] = useState([]);

    useEffect(() => {
      // async-await
    
        async function trailer() {
            try {
            let response = await fetch('https://api.themoviedb.org/3/movie/845781/videos?language=en-US', options)
            let responseJson = await response.json();
            console.log(responseJson);
            } catch (e) {
            console.log(`Ocurrió un error`);
            console.log(e);
            }
        }
    
        trailer();
    }, []);
    return(
        <>
        <NavBarComponent />
        <CarruselComponent upComing={upComing}/>
        <FooterComponent/>
        </>
    )
}

export default Home