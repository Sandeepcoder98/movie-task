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
    dispatch(authLogin({ token: "fdfsd" }));
    router.push("/");
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
                {({ errors, touched }) => (
                  <Form className="form-card">
                    <div className="form-group">
                      <Field
                        name="email"
                        className={`form-control ${
                          errors.email && touched.email ? "is-invalid" : ""
                        }`}
                        placeholder="Enter email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <Button type="submit" disabled={loading}>
                      Login
                    </Button>
                    <h4 className="already-account">
                      Don't have an account?
                      <Button
                        onClick={() => router.push("/signup")}
                        variant="plain"
                      >
                        Sign up here
                      </Button>
                    </h4>
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
