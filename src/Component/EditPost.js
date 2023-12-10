import { Avatar, Box, Button, Card, CardContent, CardMedia, Checkbox, Stack, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import Comment from './Comment';
import { ActionType } from '../Action_Type';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router';

const id = 2;
// import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const Editpost = () => {
    let { postdata, dispatchpost } = useContext(UserContext);
    const [ldata, setldata] = useState()
    const userid = ldata?.id;
    const username = ldata?.name
    const userphoto = ldata?.profilephoto
    const navigate = useNavigate()
    const [pid, setpid] = useState("")
    const [name, setName] = useState("")
    const [caption, setCaption] = useState("")
    const [photo, setphoto] = useState("")
    const date = new Date().toLocaleDateString();
    postdata = postdata.filter(item => item.userid === ldata?.id);
    // console.log(postdata);

    useEffect(() => {
        let time1 = localStorage.getItem('token');
        const time = JSON.parse(time1);
        setldata(time)
    }, [])

    const editbtn = (id) => {
        navigate("/updatepost/" + id)
    }

    const likePost = (id) => {
        const likesPost = postdata.filter((post) => post.id === id);
        let likedata = likesPost[0].like;
        let index = likedata.indexOf(userid);
        let likedata1 = []
        if (index === -1) likedata1 = [...likedata, userid];
        else likedata1 = likedata.filter((data) => data !== userid);

        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ like: likedata1 })
            }).then(res => res.json())
            .then((result) => {
                console.log(result);
                dispatchpost({ type: ActionType.SET_LIKE, payload: { id, result, postdata } })
            })
    }
    const [popup, setPop] = useState(false)
    function handleClickOpen(id) {
        setPop(!popup)
        const pdata = postdata.filter(pd => pd.id === id)
        console.log(pdata);
        setpid(id)
        pdata?.map((p) => (
            setName(p.name),
            setCaption(p.caption),
            setphoto(p.photo)
        ))

    }
    const closePopup = () => {
        setPop(false)
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setphoto(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function updatepost() {
        // const id = id;
        // console.log("===", pid);
        const data = { id, name, caption, photo, userphoto, userid, username, date };
        // console.log("data post 00--",data);
        if (name === '' || caption === '' || photo === '') {
            console.log("Enter Value");
        }
        else {

            fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post/${pid}`,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .then((result) => {
                    navigate('/posts')
                    dispatchpost({ type: ActionType.EDIT_POST, payload: { pid, result } })
                })
        }
    }

    return (
        <div>
            <Stack direction="row" justifyContent="space-evenly" sx={{ flexWrap: "wrap", mt: 10 }}  >
                {
                    postdata?.map((item, i) => {
                        return (
                            <Card sx={{ width: "320px", my: 2, mx: 10 }} key={item.id}>
                                <CardContent>
                                    <EditIcon sx={{ mr: -35, mb: -3 }} onClick={() => handleClickOpen(item.id)} />
                                    {/* <EditIcon sx={{mr:-35,mb:-3}} onClick={()=>editbtn(item.id)}/> */}
                                    <Avatar sx={{ width: 24, height: 24 }} alt="User" src={item.userphoto} />
                                    <Typography mt={-3.8} ml={4.5} variant='h6' align='left'>{item.name}</Typography>
                                </CardContent>
                                <CardMedia component="img"
                                    height="250"
                                    image={item.photo}
                                    alt='green iguana' />

                                <CardContent>
                                    <Typography mt={-1} variant='subtitle1' align='left'>{item.caption}</Typography>
                                </CardContent>

                                <Checkbox sx={{ mr: 34, mt: -2 }}
                                    onClick={() => { likePost(item.id) }}
                                    icon={<FavoriteBorder />}
                                    checkedIcon={<Favorite />} />
                                <Typography ml={2} mt={-4.5} variant='h6' align='right'>{item.like?.length} likes</Typography>
                                {
                                    <Comment postid={item.id} />
                                }
                            </Card>)
                    })
                }
                <div>
                    {
                        popup ?
                            <div className="main">
                                <div className="popup">
                                    <div className="popup-header">
                                        <h1>Update Post</h1>
                                        <h1 onClick={closePopup}>X</h1>
                                    </div>
                                    <div>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign:'left',
                                            flexDirection: 'column',
                                            width: '70vh',
                                            m: 10,
                                            mt:5,
                                        }}>

                                            <TextField
                                                // label="Name"
                                                value={name}
                                                fullWidth
                                                onChange={e => setName(e.target.value)}
                                                sx={{ m: 1, textAlign:'left' }} />

                                            <TextField
                                                // label="Caption"
                                                value={caption}
                                                fullWidth
                                                onChange={e => setCaption(e.target.value)}
                                                sx={{ m: 1 }} />

                                            <TextField
                                                fullWidth
                                                type='file'
                                                // label='Choose Photo'
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) => {
                                                    uploadImage(e);
                                                }}
                                                sx={{ m: 1 }} />


                                                
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                                width: '70vh',

                                            }}>
                                                <Button
                                                    sx={{ mt: 3 }}
                                                    variant='outlined'
                                                    onClick={updatepost}
                                                >Update Post</Button>
                                            </Box>
                                        </Box>


                                    </div>
                                </div>
                            </div> : ""

                    }
                </div>

            </Stack>
        </div>
    )
}

export default Editpost;




/// click button form popup dialog box open and data set and edit data 