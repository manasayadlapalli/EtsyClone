import React from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { MdEdit } from "react-icons/md";
import { BiImageAdd, BiSearchAlt2 } from "react-icons/bi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import {FiUpload,FiFilter} from "react-icons/fi";
import './Favorites.css';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import ReactRoundedImage from "react-rounded-image";


function Favorites() {
  
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = '/Profile'; 
    navigate(path);
  }
  
  return (
    <div>
     <div className="para">
       <h3> &nbsp;USER NAME &emsp;
          <button onClick={routeChange} >
            <MdEdit/> 
          </button> 
        </h3>    
      </div>
    <div style={{ display: "flex" }}>
      <ReactRoundedImage
      image="https://www.pngitem.com/pimgs/m/214-2145309_blank-profile-picture-circle-hd-png-download.png"
      imageWidth="100"
      imageHeight="100"
      roundedSize="0.1"
    />
  </div><br/>
  <div className="minidiv">&emsp;
  <span>Favorite  Items &emsp;
    <button onClick={routeChange}> 
      <MdEdit/> </button> &emsp;
        <button> <FiUpload/> </button> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    <input type='text' className='searchfav' placeholder='Search your favorites'/> &emsp;
    <button><FiFilter/> Filters</button> </span>

  </div>

  </div>

  );
}


export default Favorites

