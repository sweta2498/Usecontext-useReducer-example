import { Container } from '@mui/material';
import { createContext, useEffect, useReducer, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ActionType } from './Action_Type';
import './App.css';
import Comment from './Component/Comment';
import Editpost from './Component/EditPost';
import Loginuser from './Component/Loginuser';
import Navbar from './Component/Navbar';
import NewPost from './Component/NewPost';
import Posts from './Component/Posts';
import { GetPostReducer, SetCommentReducer } from './Component/Reducer';
import Updatepost from './Component/Updatepost';
export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState({});
  // const [post, setPost] = useState([]);
  // const [comments, setComments] = useState([]);
  useEffect(() => {
    getlogindata();
    getpost();
    getcomments();
  }, [])

  const [postdata, dispatchpost] = useReducer(GetPostReducer, [{}]);
  const [commentsdata, dispatchcomments] = useReducer(SetCommentReducer, [{}]);

  function getlogindata() {
    fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/UserData").then((result) => {
      result.json().then((resp) => {
        setUser(resp)
      })
    })
  }
  
  async function getpost() {
    await fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/post").then((result) => {
      result.json().then((resp) => {
        // setPost(resp)

        dispatchpost({type:ActionType.SET_GETPOST,payload:resp})
      })
    })
  }
  
  function getcomments() {
    fetch("https://62983daaf2decf5bb73ddb37.mockapi.io/comment").then((result) => {
      result.json().then((resp) => {
        // setComments(resp)
        dispatchcomments({type:ActionType.ALL_COMMENT,payload:resp});
      })
    })
  }
    
  return (
    <div className="App">
      {/* <Simpleexample/> */}

      <BrowserRouter>
        <UserContext.Provider value={{ user, postdata, dispatchpost, commentsdata, dispatchcomments }}>
          <Navbar/>
            <Routes>
              <Route path='/' element={<Loginuser />} />
              <Route path='/newpost' element={<NewPost />} />
              <Route path='/posts' element={<Posts />} />
              <Route path='/comment' element={<Comment />} />
              <Route path='/editpost' element={<Editpost />} />
              <Route path='/updatepost/:id' element={<Updatepost />} />
              <Route path='/container' element={<Container />} />
      
            </Routes>
        </UserContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;

