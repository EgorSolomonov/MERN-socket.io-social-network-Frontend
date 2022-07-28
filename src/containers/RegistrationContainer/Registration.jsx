import React from "react";
import "./Registration.scss";
import { Formik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { RegistrationThunk } from "../../reducers/AuthReducer/AuthReducer";
import CircularProgress from "@mui/material/CircularProgress";
import { connect } from "react-redux";

const Registration = React.memo((props) => {
  const getRegistrationData = (userValues) => {
    props.registrate(userValues);
  };

  const userSchema = yup.object().shape({
    username: yup
      .string()
      .typeError("Must be a string")
      .required("Enter your login"),
    email: yup
      .string()
      .typeError("Must be a string")
      .required("Enter your email"),
    password: yup
      .string()
      .typeError("Must be a string")
      .required("Enter your password"),
    password2: yup
      .string()
      .typeError("Must be a string")
      .required("Repeat your password"),
  });
  return (
    <div className="registration_wrapper">
      <div className="registration">
        <div className="site_info">
          <h1>Welcome to Social Network</h1>
          <p>This web site is a study React app example</p>
        </div>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            password2: "",
          }}
          validateOnBlur
          onSubmit={(values) => getRegistrationData(values)}
          validationSchema={userSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <div className="reg_form_wrapper">
              <div className="reg_form">
                {touched.username && errors.username ? (
                  <TextField
                    error
                    label={errors.username}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your login"
                    name={"username"}
                  />
                ) : (
                  <TextField
                    color="secondary"
                    label="Required"
                    variant="outlined"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your login"
                    name={"username"}
                  />
                )}
                {touched.email && errors.email ? (
                  <TextField
                    type="email"
                    error
                    label={errors.email}
                    placeholder="Enter your email"
                    name={"email"}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ) : (
                  <TextField
                    type="email"
                    color="secondary"
                    label="Required"
                    variant="outlined"
                    placeholder="Enter your email"
                    name={"email"}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
                {touched.password && errors.password ? (
                  <TextField
                    type="password"
                    error
                    label={errors.password}
                    placeholder="Enter your password"
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ) : (
                  <TextField
                    type="password"
                    color="secondary"
                    label="Required"
                    variant="outlined"
                    placeholder="Enter your password"
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
                {touched.password2 && errors.password2 ? (
                  <TextField
                    error
                    label={errors.password2}
                    type="password"
                    placeholder="Copy your password"
                    name={"password2"}
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ) : (
                  <TextField
                    color="secondary"
                    label="Required"
                    variant="outlined"
                    type="password"
                    placeholder="Copy your password"
                    name={"password2"}
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
                {!props.isFetching ? (
                  <Button
                    id="signUp"
                    variant="contained"
                    endIcon={<HowToRegIcon />}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid && !dirty}
                  >
                    Sign up
                  </Button>
                ) : (
                  <Button
                    id="signUp"
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid && !dirty}
                  >
                    <CircularProgress color="secondary" size={24} />
                  </Button>
                )}
                <Link to="/login">
                  <Button
                    id="logIn"
                    variant="contained"
                    endIcon={<ExitToAppIcon />}
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
});

const mapStateToProps = (store) => {
  return {
    signIn: store.login.signIn,
    isFetching: store.login.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registrate: (userValues) => dispatch(RegistrationThunk(userValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
