import React, { useRef, useState } from 'react'
import '../Register/register.css'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { saveCroppedImage } from '../../service';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const EditImage = ({ profile, profilePreview }) => {
    const cropperRef = useRef(null);
    const navigate = useNavigate();

    const [croppedImg, setCroppedImg] = useState('');
    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;
        setCroppedImg(cropper.getCroppedCanvas().toDataURL())
    };

    const handleSave = async () => {
        const resp = await saveCroppedImage({image: croppedImg, name: profile.name});
        if (resp.data.success) {
            toast.success("Cropped Image Saved!!");
            navigate('/');
        } else {
            toast.error("Failed to Save Image!")
        }
    }

    return (
        <div className='register-container'>
            <div className='register-box'>
                <h2 className='register-heading'>Crop Image</h2>
                <Cropper
                    src={profilePreview}
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={16 / 9}
                    guides={false}
                    crop={onCrop}
                    ref={cropperRef}
                />
                <button className='submit-btn' onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default EditImage