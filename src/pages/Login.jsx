import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Mycontext } from '../MyContext';

const Login = () => {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const { setNotes } = useContext(Mycontext);

    const handleLogin = async () => {
        if(localStorage.getItem("token")){
            localStorage.removeItem("token");
        }
        const response = await axios.post("https://noteapi-g1nt.onrender.com/auth/login", {
            email: email,
            password: password
        });
        if (response.data.loggedIn) {
            localStorage.setItem("token", response.data.token);
            axios.get(`https://noteapi-g1nt.onrender.com/notes/get-all/${localStorage.getItem("token")}`)
            .then((res) => {
              setNotes([...res.data]);          
            })            
            return navigate("/");
        }
        alert(response.data.msg);
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center col-12" style={{ height: "96vh" }}>
                        <div className="d-flex flex-column justify-content-around container w-25 h-50" >
                            <h1 className='text-center'>Login</h1>
                            <div>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="text"
                                        className='form-control mb-5'
                                        id='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type='password'
                                        className='form-control mb-5'
                                        id='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button
                                    className='btn'
                                    style={{ backgroundColor: "#56aff8" }}
                                    onClick={handleLogin}>LOGIN</button>
                            </div>
                            <div>
                                <Link to={'/signup'}>to Signup</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;