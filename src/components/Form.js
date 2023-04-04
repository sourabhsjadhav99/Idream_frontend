import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const [data, setData] = useState({
        photo: "",
        name: "",
    });
    let [postFormData, setPostFormData] = useState([])


    let navigate = useNavigate()


    const fetchData = () => {
        axios.get("http://localhost:8000/newimage")
            .then((data) => {
                console.log(data.data.data);
                setPostFormData(data.data.data);
            });
    };

    let formData = new FormData()
    formData.append("photo", data.photo)
    formData.append("name", data.name)

    let config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    let postData = () => {
        axios.post('http://localhost:8000/newimage', formData, config)
            .then(function (response) {
                fetchData()
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    let submitHandler = (e) => {
        e.preventDefault()
        if (data.name && data.photo) {
            postData()
            navigate("/")
        } else {
            toast.error("All fields required",{
                position: "top-center"
              })
        }



    }
    return (
        <div>

            <form className="form-container" onSubmit={submitHandler}>
                <h2>Add a new photo</h2>
                <div>
                    <div><label htmlFor="">Label</label></div>
                    <input type="text"
                        id="author-box" placeholder="Suspendisse elit massa" onChange={(e) => {
                            setData({ ...data, name: e.target.value })
                        }} />

                </div>
                <div>
                    <div><label htmlFor="">Photo</label></div>

                    <input type="file" id="formFile"
                        name="photo"
                        onChange={(e) => {
                            setData({ ...data, photo: e.target.files[0] });
                        }} />
                </div>
                <div className="btns">
                    <button className="can-btn" onClick={()=>{
                        navigate(-1)
                    }}>Cancel</button>
                    <button className="sub-btn" type="submit" >Post</button>
                </div>

            </form>
            <ToastContainer />
        </div>
    );
};

export default Form;