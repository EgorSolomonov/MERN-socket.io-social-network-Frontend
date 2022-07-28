import React from "react";
import "./Login.scss";
import { Formik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { LoginThunk } from "../../reducers/AuthReducer/AuthReducer";
import { connect } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Login = React.memo((props) => {
  const getDataForLogin = (userValues) => {
    props.Login(userValues);
  };

  const userSchema = yup.object().shape({
    email: yup
      .string()
      .typeError("Must be a string")
      .required("Enter your email"),
    password: yup
      .string()
      .typeError("Must be a string")
      .required("Enter your password"),
  });
  return (
    <div className="login_wrapper">
      <div className="login">
        <div className="site_info">
          <h1>Welcome to Social Network</h1>
          <p>This web site is a study React app example</p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnBlur
          onSubmit={(values) => getDataForLogin(values)}
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
            <div className="log_form_wrapper">
              <div className="log_form">
                {touched.email && errors.email ? (
                  <TextField
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
                    error
                    label={errors.password}
                    type="password"
                    placeholder="Enter your password"
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ) : (
                  <TextField
                    color="secondary"
                    label="Required"
                    variant="outlined"
                    type="password"
                    placeholder="Enter your password"
                    name={"password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
                {!props.isFetching ? (
                  <Button
                    id="logIn"
                    variant="contained"
                    endIcon={<ExitToAppIcon />}
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid && !dirty}
                  >
                    Log in
                  </Button>
                ) : (
                  <Button
                    id="logIn"
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!isValid && !dirty}
                  >
                    <CircularProgress color="secondary" size={24} />
                  </Button>
                )}

                <Link to="/registration">
                  <Button
                    id="signUp"
                    variant="contained"
                    endIcon={<HowToRegIcon />}
                  >
                    Create new account
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
    isFetching: store.login.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Login: (userValues) => dispatch(LoginThunk(userValues)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
