import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSignup = async () => {
        const response = await axios.post("https://noteapi-g1nt.onrender.com/auth/signup", {
            username: username,
            email: email,
            password: password
        })
        if (response.data.signup) {
            return navigate('/login');
        }
        alert(response.data.msg);
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="d-flex justify-content-center align-items-center col-12" style={{ height: "96vh" }}>
                        <div className="d-flex flex-column justify-content-around container w-25 h-75">
                            <h1 className='text-center'>Signup</h1>
                            <div>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input
                                        type="text"
                                        className='form-control mb-5'
                                        id='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                </div>
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
                                    onClick={handleSignup}>SIGNUP</button>
                            </div>
                            <div>
                                <Link to={'/login'}>to Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;