"use client";
import { authLogin } from "@/Redux/Slices/authSlice";
import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";

const SignIpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Too Short!")
    .max(15, "Too Long!")
    .required("Required"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setLoading(true);
    const res = await authService.signIn(data);
    setLoading(false);
    if (res) {
      dispatch(authLogin(res));
      router.push("/");
    }
  };

  return (
    <section className="auth-form-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col sm={6} lg={4}>
            <h2 className="form-title">Sign in</h2>
            <div>
              <Formik
                initialValues={{
                  password: "",
                  email: "",
                }}
                validationSchema={SignIpSchema}
                onSubmit={handleLogin}
              >
                {() => (
                  <Form className="form-card">
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
                      <ErrorMessage name="password" />
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

export default SignIn;
