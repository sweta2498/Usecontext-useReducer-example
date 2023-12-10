import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { ActionType } from '../Action_Type';
import { UserContext } from '../App';

const Updatepost = () => {

    const params = useParams();
    const [name, setName] = useState("")
    const [caption, setCaption] = useState("")
    const [photo, setphoto] = useState("")
    const navigate = useNavigate();
    const date = new Date().toLocaleDateString();
    const [data, setdata] = useState("");
    let { postdata, dispatchpost } = useContext(UserContext);

    postdata = postdata.filter((post) => post.id === params.id);
    // console.log("===========",post[0].photo);

    const userid = data?.id
    const username = data?.name
    const userphoto = data?.profilephoto

    useEffect(() => {
        let time1 = localStorage.getItem('token');
        const time = JSON.parse(time1);
        setdata(time);
        getData();
    }, [])

    function getData() {
        postdata?.map((p) => (
            setName(p.name),
            setCaption(p.caption),
            setphoto(p.photo)
        ))
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
        const id = params.id;
        // console.log("===", id);
        const data = { id, name, caption, photo, userphoto, userid, username, date };
        // console.log("data post 00--",data);
        if (name === '' || caption === '' || photo === '') {
            console.log("Enter Value");
        }
        else {

            fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/post/${params.id}`,
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
                    dispatchpost({ type: ActionType.EDIT_POST, payload: { id, result } })                    
                })
        }
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '70vh',
                m: 10
            }}>

                <TextField
                    label="Name"
                    value={name}
                    fullWidth
                    onChange={e => setName(e.target.value)}
                    sx={{ m: 1 }} />

                <TextField
                    label="Caption"
                    value={caption}
                    fullWidth
                    onChange={e => setCaption(e.target.value)}
                    sx={{ m: 1 }} />

                <TextField
                    fullWidth
                    type='file'
                    label='Choose Photo'
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                        uploadImage(e);
                    }}
                    sx={{ m: 1 }} />

            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '70vh',
                m: 5

            }}>
                <Button
                    sx={{ mt: -6 }}
                    variant='outlined'
                    onClick={updatepost}>Update Post</Button>
            </Box>
        </div>
    )
}

export default Updatepost