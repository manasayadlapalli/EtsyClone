import React from 'react';
import {BsPencil} from 'react-icons/bs';
import { Link } from "react-router-dom";
//import { Formik, Field, Form,} from "formik";

function UserProfilePage() {

  
  return (
    <div>
     
        <div className="form-group">
                  <label htmlFor="username">USER NAME  </label>
                  <li><Link to='/updateprofile'><BsPencil size={20}/></Link></li>
                  <input name="username" type="text" className="form-control" />
                  
        </div>

    </div>
  )
}

export default UserProfilePage