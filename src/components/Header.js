import React, { useEffect, useState } from 'react'
import {AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar} from "@mui/material"
import MovieIcon from "@mui/icons-material/Movie"
import { getAllMovies } from '../api-helpers/api-helpers'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminActions,userActions } from '../store'




const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAdminLoggedIn = useSelector((state)=>state.admin.isLoggedIn)
    const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn)
    const [value,setValue] = useState(0)
    const [movies,setMovies] = useState([])
    const [selectedMovie,setSelectedMovie] = useState()
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err))
    },[])

    const logout = (isAdmin) => {
        dispatch(isAdmin?adminActions.logout():userActions.logout())
    }
    const handleChange = (e,val) => {
        setSelectedMovie(val);
        const movie = movies.find((m) => m.title === val)
        console.log(movie)
        if(!isUserLoggedIn){
            navigate(`/booking/${movie._id}`)

        }
    }
  return (
  <AppBar position="sticky" sx={{bgcolor:"#2b2d42"}}>
    <Toolbar>
        <Box width={"20%"}>
            <IconButton LinkComponent={Link} to="/">
            <MovieIcon />
            </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
        <Autocomplete
        onChange={handleChange}   
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => <TextField 
            sx={{input:{color:"white"}}}
            variant="standard"
            {...params} 
            placeholder="Search Movies" />}
      />

        </Box>
        <Box display={"flex"}>
            <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>setValue(val)}>
                <Tab LinkComponent={Link} to="/movies" label="Movies" />
                {!isAdminLoggedIn && !isUserLoggedIn && <>
                <Tab LinkComponent={Link} to="/admin" label="Admin" />
                <Tab LinkComponent={Link} to="/auth" label="Auth" />
                
                </>}
                {isUserLoggedIn && <>
                <Tab LinkComponent={Link} to="/user" label="Profile" />
                <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/" label="Logout" />

                </>}
                {isAdminLoggedIn && <>
                <Tab LinkComponent={Link} to="/add" label="Add Movie" />
                <Tab LinkComponent={Link} to="/user-admin" label="Profile" />
                <Tab onClick={()=>logout(true)} LinkComponent={Link} to="/" label="Logout" />

                </>}

            </Tabs>

        </Box>
    </Toolbar>
  </AppBar>
  )
}

export default Header