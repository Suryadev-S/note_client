import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useState, useRef, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Mycontext } from '../MyContext';
import MetaNote from '../components/MetaNote';

const Editor = () => {
    const [title, setTitle] = useState("untitled");
    const [desc, setDesc] = useState('');
    const [meta, setMeta] = useState(false);
    const [content, setContent] = useState('');
    const [notePic, setNotePic] = useState('');
    const quillRef = useRef();
    const navigate = useNavigate();
    const { setNotes } = useContext(Mycontext);
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
    const handleImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", "media_preset");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dnxpue9kq/image/upload", formData);
            const imageUrl = response.data.secure_url;
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', imageUrl);
            console.log(response.data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleAddNote = async () => {
        const response = await axios.post(`https://noteapi-g1nt.onrender.com/notes/add/${localStorage.getItem("token")}`, {
            title: title,
            content: content,
            description: desc ? desc : "",
            notePic: notePic ? notePic : ""
        })
        if (response.data) {
            setNotes((prev) => [...prev, response.data]);
            alert("note added");
            navigate('/');
        }
        else {
            alert("ERROR");
        }
    }    
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
                                <button className='btn btn-primary' onClick={handleAddNote}>ADD</button>
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

export default Editor;