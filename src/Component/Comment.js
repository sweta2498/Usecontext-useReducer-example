import { Avatar, Box, Button, CardContent, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ActionType } from '../Action_Type';
import { UserContext } from '../App';

const Comment = ({ postid }) => {

    const { commentsdata, dispatchcomments } = useContext(UserContext)
    const date = new Date().toLocaleDateString();
    const [ldata, setldata] = useState()
    const [comment, setComment] = useState("")
    // console.log(commentsdata);

    const userid = ldata?.id
    const username = ldata?.name
    const userphoto = ldata?.profilephoto

    useEffect(() => {
        let time1 = localStorage.getItem('token');
        const time = JSON.parse(time1);
        setldata(time)
        // dispatchcomments({type:ActionType.ALL_COMMENT,payload:comments})
    }, [])

    const makeComment = () => {
        const commentdata = { userid, username, postid, comment, date, userphoto };
        fetch('https://62983daaf2decf5bb73ddb37.mockapi.io/comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(commentdata)
        }).then(res => res.json())
            .then((result) => {
                setComment("")
                dispatchcomments({ type: ActionType.SET_COMMENT, payload: result })
            })
    }

    const DeleteComment = (id) => {

        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/comment/${id}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then((result) => {
                dispatchcomments({ type: ActionType.SET_DELETE_COMMENT, payload: id })
            })
    }

    const EditComment = (idd) => {
        const index = commentsdata.findIndex((data) => data.id === idd);
        let item = commentsdata[index]
        setComment(item?.comment)
    }

    const UpdateComment = (id) => {

        const cmtdata = { id, userid, username, postid, comment, date };
        fetch(`https://62983daaf2decf5bb73ddb37.mockapi.io/comment/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(cmtdata)

        }).then(res => res.json())
            .then((result) => {
                dispatchcomments({ type: ActionType.EDIT_COMMENT, payload: { id, result } })
                setComment("")
            })
    }

    return (
        <div>
            <TextField
                sx={{ mb: 2, mt: 2 }}
                type="text"
                name="name"
                value={comment}
                placeholder='Add Comment'
                onChange={(e) => { setComment(e.target.value) }} />

            <Button variant='outlined' onClick={() => makeComment()} sx={{ mt: 3, ml: 1 }} >Add</Button>
            {
                commentsdata?.map((cd) => (
                    // console.log(cd.postid===postid),
                    cd?.postid === postid &&

                    <Box sx={{ display: 'flex', m: 1 }} key={cd.id + "-" + postid}>
                        <CardContent>
                            <Avatar sx={{ width: 40, height: 40, mt: -1, ml: -1.5 }} alt="User" src={cd.userphoto} />
                        </CardContent>

                        <CardContent>
                            <Typography mt={-1.5} ml={-2.5} color="primary.main" variant='body1' align='left'>{cd.username} </Typography>
                            <Typography mt={-2.5} ml={19} color="primary.main" variant='subtitle2' align='right'>{cd.date} </Typography>
                            <Typography mt={0} ml={-2.5} variant='subtitle2' align='left'>{cd.comment}</Typography>
                        </CardContent>
                        <Box sx={{ mt: 6, mb: 1, ml: -32 }}>
                            {/* <Button size='small' sx={{ fontSize: 12 }}>reply</Button> */}
                            {cd.userid === userid &&
                                <Button onClick={() => EditComment(cd.id)} size='small' sx={{ ml: -2, fontSize: 12 }}>Edit</Button>
                            }
                            {comment &&
                                <Button onClick={() => UpdateComment(cd.id)} size='small' sx={{ ml: -2, fontSize: 12 }}>Update</Button>
                            }
                            {cd.userid === userid &&
                                <Button onClick={() => DeleteComment(cd.id)} size='small' sx={{ fontSize: 12 }}>Delete</Button>
                            }
                        </Box>
                    </Box>
                ))
            }
        </div>
    )
}

export default Comment
