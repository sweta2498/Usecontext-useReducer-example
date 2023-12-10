import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {
    const navigate = useNavigate()
    function newpost() {
        navigate("/newpost")
    }
    function loginbtn() {
        navigate("/")
    }

    function homebtn() {
        navigate("/posts")
    }
    function editpost() {
        navigate("/editpost")
    }

    function logoutbtn() {
        // localStorage.removeItem("login")
        localStorage.removeItem('token');
        navigate("/")
    }
    return (
        <div>
            <AppBar position='fixed'>
                <Toolbar>

                    <Typography variant='h6' flexGrow={1}></Typography>
                    {
                        localStorage.getItem("token") ?
                            <>
                                <Button variant='text' color="inherit" onClick={homebtn}>Home</Button>
                                <Button variant='text' color="inherit" onClick={newpost}>New Post</Button>
                                <Button variant='text' color="inherit" onClick={editpost}>Edit Post</Button>
                            </>
                        :
                        null
                    }
                    {
                        !localStorage.getItem('token') ?
                            <Button variant='text' color="inherit" onClick={loginbtn}>Login</Button>
                            :
                            <Button variant='text' color="inherit" onClick={logoutbtn}>Logout</Button>
                    }

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar