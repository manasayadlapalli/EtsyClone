import React, { useState, useEffect,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Select,MenuItem } from '@mui/material';
import countryList from 'react-select-country-list'


import { signup } from "../../slices/auth";
import { clearMessage } from "../../slices/message";


const UpdateProfile = (props) => {
  const [successful, setSuccessful] = useState(false);

  const options = [
    { value: "female", label: "Female" },
    { value: "male", label: "Male" },
    { value: "other", label: "Other" }
  ];

  const [gender, setGender] = useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
  };



  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 5 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
   
  });

  const handleUpdateProfile = (formValue) => {
    const { username, gender, city, country, birthday, about } = formValue;

    setSuccessful(false);

    dispatch(signup({ username, gender, city, country, birthday, about }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  const [value, setValue] = useState('')
  const countryOptions = useMemo(() => countryList().getData(), [])

  const changeCountryHandler = value => {
    setValue(value)
  }



  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
           <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
          >

        <div>
           <h3> Your public profile </h3>
           <p>Everything on this page can be seen by everyone</p><hr/>
           <form className='form'>
             Profile Picture
           </form>
         </div>


          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                <label for="gender"> Select you gender</label>
                 <Select value={gender} onChange={handleChange} >
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  <Field name="gender" type="Select" className="form-control" />
                  <ErrorMessage
                    name="gender"
                    component="div"
                 />      
                 </div>         

                <div className="form-group">
                  <label htmlFor="City">city</label>
                  <Field
                    name="City"
                    type="text"
                    className="form-control"
                  />
                  </div>
                  <div className="form-group">
                  <label htmlFor="password">country</label>
                  <Select options={countryOptions} value={value} onChange={changeCountryHandler} />

                  </div>
                  <div className="form-group">
                  <label htmlFor="password">birthday</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  </div>
                  <div className="form-group">
                  <label htmlFor="About">about</label>
                  <Field
                    name="About"
                    type="text"
                    className="form-control"
                  />
                  
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-secondary btn-block">Sign Up</button>
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={successful ? "alert alert-success" : "alert alert-danger"}
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;