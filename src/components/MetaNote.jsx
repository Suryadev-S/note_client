import axios from "axios";
import { useState, useRef } from 'react';

const MetaNote = ({ setMeta, desc, setDesc, setNotePic }) => {
    const imageRef = useRef();
    const handleImage = async () => {
        try {
            const formData = new FormData();
            formData.append('file', imageRef.current?.files[0]);
            formData.append("upload_preset", "media_preset");
            const response = await axios.post("https://api.cloudinary.com/v1_1/dnxpue9kq/image/upload", formData);
            setNotePic(response.data.secure_url);
            alert("image uploaded successfully");
        }
        catch (err) {
            alert("error uploading notepic");
        }
    }
    return (
        <>
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="my-2">Add a description to your note</h1>
                </div>
                <div className="form-floating">
                    <textarea
                        value={desc}
                        className="form-control bg-transparent text-light"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: "100px" }}
                        onChange={(e) => setDesc(e.target.value)}></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                </div>
                <h2 className="my-2">Add a background pic to your note</h2>
                <div className="input-group mb-3">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="inputGroupFileAddon03"
                        onClick={handleImage}>upload</button>
                    <input
                        ref={imageRef}
                        type="file"
                        className="form-control"
                        id="inputGroupFile03"
                        aria-describedby="inputGroupFileAddon03"
                        aria-label="Upload" />
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setMeta(false)}>back</button>
            </div>
        </>
    );
}

export default MetaNote;