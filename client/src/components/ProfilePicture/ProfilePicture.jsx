import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineEdit } from "react-icons/md";
import { uploadToS3 } from "../../utils/gameFuncs";
import './ProfilePicture.css'

const ProfilePicture = () => {
    const name = sessionStorage.getItem('name');
    const [image, setImage] = useState(`https://bingo-profiles.s3.ap-south-1.amazonaws.com/${name}.jpeg`);
    const [add, setAdd] = useState(true)
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        try {
            const response = await uploadToS3(file, name);
            if(response.ok){
                    setImage(`https://bingo-profiles.s3.ap-south-1.amazonaws.com/${name}.jpeg`);
                    setAdd(true);
                    alert("Profile picture Updated");
            }
            else{
                alert(response.error)
            }
          } catch (error) {
            console.error('Error uploading file to S3:', error);
          }
    };

    return (
        <div className="profile-container">
            <div className="profile-div">
                <img
                    className="profile-pic"
                    src={image}
                    onError={(e)=>{
                        setImage("https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png")
                        e.target.src={image}
                        setAdd(false)
                    }}
                    alt="Profile"
                />
                <label
                    className="profile-label"
                    htmlFor="profile-picture-input"
                >
                    <input
                        id="profile-picture-input"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                    {add ? <MdOutlineEdit style={{ fontSize: '2em' }}/> : <IoIosAddCircle style={{ fontSize: '2em' }}/>}
                </label>
            </div>
        </div>
    );
};

export default ProfilePicture;
