import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { confirm } from "react-confirm-box";

function DisplayPage() {

    const [data, setData] = useState([]);
    const [searchApiData, setSearchApiData] = useState([]);
    const [filterVal, setFilterval] = useState("");
    let navigate = useNavigate()
  


    const fetchData = () => {
        axios.get("http://localhost:8000/newimage")
            .then((data) => {
                console.log(data.data.data);
                setData(data.data.data.reverse());
                setSearchApiData(data.data.data);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    const handleFilter = (e) => {
        if (e.target.value === "") {
            setData(searchApiData);
        } else {
            const filterResult = searchApiData.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setData(filterResult);
        }
        setFilterval(e.target.value);
    };

    function handleDelete(_id) {
        if(window.confirm('Are you sure?')){
        axios
            .delete(`http://localhost:8000/newimage/${_id}`)
            .then(() => {
                toast.success("Image deleted",{
                    position: "top-center"
                  })
                fetchData()
            })
    }
}
    let handleAdd = () => {
        navigate(`/form`)
    }

    return (
        <div className="container">
            <div className='header'>
                <div className='id-input'>
                    <div>
                        <b>My Unspalsh</b>
                        <p>sourabh@123.com</p>
                    </div>
                    <div className=''>
                        <input
                            className='search-box'
                            placeholder="Search by name"
                            value={filterVal}
                            onChange={(e) => {
                                handleFilter(e);
                            }}
                        />
                    </div>

                </div>
                <button className='button' onClick={handleAdd}>Add a photo</button>
            </div>

            <div className="img-container">
            {data.map((data, index) => {
                return (
                    <div key={index} className='img-subcontainer'>
                        <div className='name_delButton'>
                            <div><button className='delete-button' onClick={() => { handleDelete(data._id) }}>Delete</button></div>
                            <div><h2>{data.name}</h2></div>
                        </div>

                        <div><img src={`http://localhost:8000/${data.photo}`} alt="" /></div>

                    </div>
                );
            })}
            </div>
            
            
            <ToastContainer />
        </div>
    );
}


export default DisplayPage