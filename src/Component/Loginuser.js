import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../App';

const Loginuser = () => {
    const { user } = useContext(UserContext);
    const [email, setemail] = useState("")
    const [pwd, setpwd] = useState("");
    const navigate = useNavigate()

    function loginbtn() {

        let data = user.find(us => us.email === email && us.password === pwd);

        if (data) {
            alert("login success...!!")
            localStorage.setItem('token',  JSON.stringify(data));
            navigate("/posts")
        }
        else alert("login again...!!")
        setemail("")
        setpwd("")
    }

    return (
        <div className='App'><br />LOGIN <br/><br/>
            <input type="text" value={email} onChange={e => setemail(e.target.value)} placeholder="Enter Email...."/><br /><br />
            <input type="text" value={pwd} onChange={e => setpwd(e.target.value)} placeholder="Enter Password...."/><br /><br />
            <button onClick={loginbtn}>login</button>       
        </div>
    )
}

export default Loginuser