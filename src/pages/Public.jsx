import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Public = () => {    
    const [notes, setNotes] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        axios.get("https://noteapi-g1nt.onrender.com/notes/public/get-all")
            .then((res) => {
                setNotes([...res.data]);
            })
            .catch((err) => {
                console.log(err);
                alert("ERROR fetching")
            })
    }, [])
    return (
        <>
            <h1>Latest public notes</h1>
            <input type="search" className="form-control" placeholder="search public notes" onChange={(e) => setQuery(e.target.value)} />
            <div className="page overflow-y-scroll" style={{ height: "70vh" }}>
                {notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())).map((note) => {
                    return (
                        <div className="card mb-3 bg-transparent text-light" key={note._id}>
                            <div className="row g-0">
                                {note.notePic && <div className="col-md-4">
                                    <img src={note?.notePic} className="img-fluid rounded-start" alt="..." />
                                </div>}
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title"><Link to={`/page/${note._id}`}>{note.title}</Link></h5>
                                        <p className="card-text">
                                            {note?.description}
                                        </p>
                                        <p className="card-text"><small>@{note.authorName}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}       
            </div>
        </>
    );
}

export default Public;