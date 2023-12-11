import { IoMdCloudUpload } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoMdCloudDone } from "react-icons/io";
import { Link } from 'react-router-dom'
import { Mycontext } from "../MyContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Nav = () => {    
    const [query, setQuery] = useState("");
    const { notes, setNotes } = useContext(Mycontext);
    const navigate = useNavigate();

    const filteredNotes = (id) => {
        return notes.filter((note) => note._id != id)
    }

    const handleDelete = async (id) => {
        const response = await axios.delete(`https://noteapi-g1nt.onrender.com/notes/delete/${id}`);
        if (response.data) {
            setNotes([...filteredNotes(response.data._id)])
            alert("Note Deleted");
            navigate('/');
        }
        else {
            alert("ERROR");
        }
    }
    const handlePrivate = async (id, pri) => {
        const response = await axios.put("https://noteapi-g1nt.onrender.com/notes/access", { id: id, private: pri });
        if (response.data) {
            setNotes([response.data.note,...filteredNotes(response.data.note._id)]);
            alert(response.data.msg);
        }
        else {
            alert("error");
        }
    }
    return (
        <>
            <div className="d-flex flex-column justify-content-between rounded-5" style={{ height: "96vh" }} id="nav">
                <div className="d-flex justify-content-between">
                    <h1><Link to={'/'}>Notes</Link></h1>
                    <h1><Link to={'/editor'} ><FaCirclePlus /></Link></h1>
                </div>
                <div>
                    <input
                        type="search"
                        placeholder="search your notes"
                        className="form-control"
                        onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="noteList flex-grow-1 overflow-y-scroll">
                    {notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())).map((note, index) => {
                        return (
                            <div className="list d-flex justify-content-between align-items-center p-2 my-4" key={note._id}>
                                <div className="rank"><span></span></div>
                                <div className="creator">
                                    <h4><Link to={`/page/${note._id}`}>{note.title}</Link></h4>
                                    <p>{new Date(note.date).toLocaleDateString()}</p>
                                </div>
                                <div className="dropend">
                                    <button type="button" className="btn dropdown-toggle dropdown-toggle-split"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="visually-hidden">Toggle Dropend</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item"><Link to={`/editor/${note._id}`}><FaPen /> Edit</Link></li>
                                        <li className="dropdown-item" onClick={()=>handleDelete(note._id)}><FaRegTrashAlt /> Delete</li>
                                        {note.private && <li className="dropdown-item" onClick={()=> handlePrivate(note._id,note.private)}><IoMdCloudUpload />Private</li>}                                        
                                        {!note.private && <li className="dropdown-item" onClick={()=> handlePrivate(note._id,note.private)}><IoMdCloudDone />Public</li>}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h2><Link to={'/profile'}><IoPersonCircleSharp /></Link></h2>
                    <h2><Link to={'/public'}><FaGlobeAmericas /></Link></h2>
                </div>
            </div>
        </>
    );
}

export default Nav;