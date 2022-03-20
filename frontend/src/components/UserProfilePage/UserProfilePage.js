import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { createprofile } from "../../slices/user";
import { clearMessage } from "../../slices/message";

const UserProfilePage = (props) => {
  const [successful, setSuccessful] = useState(false);
  
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    name: "",
    address: "",
    city: "",
    zipcode: "",
    country: "",
    image: "",
    description: "",
    gender: "",
    dateofbirth: "",
    phonenumber: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The name must not be more than 40 characters.",
        (val) =>
          val &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
    address: Yup.string().required(),
    city: Yup.string().required(),
    zipcode: Yup.number().positive().required(),
    country: Yup.string().required(),
    dateofbirth: Yup.string().required(),
    phonenumber: Yup.number().positive().required(),
  });

  const handleUserProfileCreate = (formValue) => {
    const { name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber } = formValue;

    setSuccessful(false);

    dispatch(createprofile({ name, address, city, zipcode, country, image, description, gender, dateofbirth, phonenumber }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
           <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUserProfileCreate}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <Field name="address" type="text" className="form-control" />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <Field name="city" type="text" className="form-control" />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zipcode">Zipcode</label>
                  <Field name="zipcode" type="number" className="form-control" />
                  <ErrorMessage
                    name="zipcode"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Field name="country" type="text" className="form-control" />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="alert alert-danger"
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

export default UserProfilePage;
