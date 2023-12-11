import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {    
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();
    useEffect(()=>{        
        axios.get(`https://noteapi-g1nt.onrender.com/auth/profile/${localStorage.getItem("token")}`)
        .then((res)=>{
            setProfile({...res.data.user});            
        })
    },[])

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }
    return (
        <>
            <div>
                <div className="row mb-3">
                    <div className="col-6">username</div>
                    <div className="col-6">{profile.username}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">email</div>
                    <div className="col-6">{profile.email}</div>
                </div>
                <div className="row mb-3">
                    <div className="col-6">password</div>
                    <div className="col-6">{profile.password}</div>
                </div>               
                <button className="btn btn-primary mt-5" onClick={handleLogout}>logout</button>
            </div>
        </>
    );
}

export default Profile;