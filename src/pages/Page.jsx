import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react";
import { Mycontext } from "../MyContext";
import axios from "axios";

const Page = () => {    
    const [note, setNote] = useState({});
    const { notes } = useContext(Mycontext);
    const { id } = useParams();
    const findNote = notes.find((val) => {
        if (val._id == id) {
            return val;
        }
    })   
    useEffect(() => {
        if (findNote === undefined) {
            axios.get(`https://noteapi-g1nt.onrender.com/notes/get/${id}`)
            .then((res)=>{                
                setNote({...res.data});
            })
        }
        else {
            setNote(findNote);
        }
    }, [id])
    return (
        <>
            <div className="page overflow-y-scroll h-100">
                <div className='mb-4'>
                    <div className='mb-1 pb-2 d-flex justify-content-between align-items-center' style={{ borderBottom: '3px solid #1f83f2' }}>
                        <h1 className="mb-0">{note?.title}</h1>
                        <p className="mb-0">@{note?.authorName}</p>
                    </div>
                    <h5 className="fw-light">{new Date(note?.date).toLocaleDateString()}</h5>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: note?.content }} />
                </div>
            </div>
        </>
    );
}

export default Page;