import React, {useState, useRef, useEffect} from "react";
import {Container} from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';

function ImageUploadBox(){
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            console.log(file);
        }
    };

    useEffect(() => {
        if (!image) {
            setPreviewUrl(null);
            return;
        }
        const url = URL.createObjectURL(image);
        setPreviewUrl(url);

        // clean up the object URL when image changes or component unmounts
        return () => URL.revokeObjectURL(url);
    }, [image])

    return <div className="flex p-4 flex-col border-1 border-black justify-center items-center font-sans">
        {previewUrl ? (
        <img alt="Preview" className="max-w-[200px] max-h-[200px]" src={previewUrl}></img>
        ) : (
            <>
                <input ref={fileInputRef} type={"file"} accept={"image/*"} style={{display:"none"}} onChange={handleChange}></input>
                <button onClick={() => fileInputRef.current.click()}>
                    <Container maxWidth={"sm"}>
                        <AddToPhotosIcon fontSize="large"/>
                    </Container>
                </button>
                <p>Drop your files here</p>
            </>
        )
        }
    </div>
}

export default ImageUploadBox;