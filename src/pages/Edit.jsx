import { useParams } from "react-router-dom";
import { Mycontext } from "../MyContext";
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import MetaNote from "../components/MetaNote";

const Edit = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [meta, setMeta] = useState(false);
    const [desc, setDesc] = useState('');
    const [notePic, setNotePic] = useState('');
    const { notes, setNotes } = useContext(Mycontext);
    const { id } = useParams();
    const quillRef = useRef();
    const navigate = useNavigate();

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: () => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        const file = input.files[0];

                        if (file) {
                            handleImage(file);
                        }
                    };
                }
            }
        }
    }), []);

    const filteredNotes = (id) => {
        return notes.filter((note) => note._id != id)
    }

    const handleEditNote = async () => {
        const response = await axios.put("https://noteapi-g1nt.onrender.com/notes/edit", {
            id: id,
            title: title,
            content: content,
            description: desc ? desc : "",
            notePic: notePic ? notePic : ""
        })
        if (response.data) {
            setNotes([response.data, ...filteredNotes(response.data._id)]);
            alert("note edited");
            navigate('/');
        }
        else {
            alert("ERROR");
        }
    }

    useEffect(() => {
        notes.find((note) => {
            if (note._id === id) {
                setTitle(note.title);
                setContent(note.content);
                setDesc(note.description);
                setNotePic(note.notePic);
            }
        })
    }, [])
    return (
        <>

            {
                meta ?
                    <MetaNote
                        setMeta={setMeta}
                        desc={desc}
                        setDesc={setDesc}
                        setNotePic={setNotePic}
                    /> :
                    <>
                        <div className='mb-4'>
                            <div className='mb-1 pb-2 d-flex justify-content-between' style={{ borderBottom: '3px solid #1f83f2' }}>
                                <input
                                    type="text"
                                    className='form-control  w-25 fs-4'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <button className='btn btn-primary' onClick={handleEditNote}>SAVE</button>
                            </div>
                            <div className="fs-5">
                                date
                                <button className='btn btn-primary' onClick={() => setMeta(true)} >meta</button>
                            </div>
                        </div>
                        <ReactQuill
                            ref={quillRef}
                            value={content}
                            onChange={(value) => { setContent(value) }}
                            modules={modules}
                        />
                    </>
            }
        </>
    );
}

export default Edit;