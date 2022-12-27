import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers'
import MovieItem from './MovieItem'

const Movie = () => {
    const [movies,setMovies] = useState([])
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err))

    },[])
  return (
    <>
   <Box margin={"auto"} marginTop={4}>
    <Typography margin={"auto"} variant="h4" padding={2} width="40%" bgcolor={"#900C3F"} textAlign="center" color="white">All Movies</Typography>
   </Box>
   <Box width={"100%"} margin="auto" marginTop={5} display={"flex"} justifyContent="flex-start" flexWrap={"wrap"}>
   {movies && movies.map((movie,index)=><MovieItem id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} key={index} />)}

   </Box>
   </>

  )
}

export default Movie