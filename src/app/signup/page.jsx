"use client";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "@/service/auth.service";
import { authLogin } from "@/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (data) => {
    try {
      setLoading(true);
      const res = await authService.signUp(data);
      if (res) {
        const request = {
          email: data.email,
          password: data.password,
        };
        const loginRes = await authService.signIn(request);
        setLoading(false);
        if (loginRes?.token) {
          dispatch(authLogin(loginRes));
          router.push("/");
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="auth-form-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col sm={6} lg={4}>
            <h2 className="form-title">Sign up</h2>
            <div>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                  name: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSignUp}
              >
                {() => (
                  <Form className="form-card">
                    <div className="form-group">
                      <Field
                        name="name"
                        className="form-control"
                        placeholder="Enter name"
                      />
                      <span className="error-msg">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                    <div className="form-group">
                      <Field
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                      />
                      <span className="error-msg">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                    <div className="form-group">
                      <Field
                        name="password"
                        className="form-control"
                        placeholder="Enter password"
                      />
                      <span className="error-msg">
                        <ErrorMessage name="password" />
                      </span>
                    </div>
                    <Button type="submit" disabled={loading}>
                      Login
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignUp;
