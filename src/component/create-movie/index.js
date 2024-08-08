"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactDropzone from "../dropzone/reactDropzone";
import authService from "@/service/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PageLoading from "../pageLoading/pageLoading";

const initialVal = {
  title: "",
  publishingYear: "",
};
const currentYear = new Date().getFullYear();

const CreateMovie = ({ id }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState()
  const [preview, setPreview] = useState(null)
  const [initialValues, setInitialValues] = useState(initialVal)

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    publishingYear: Yup.number()
      .typeError("Year must be a number")
      .min(1900, "Year must be at least 1900")
      .max(currentYear, `Year cannot be more than ${currentYear}`)
      .required("Publishing year is required")
  });

  const handleSubmit = async (data) => {
    let formData = new FormData();
    formData.append('film[title]', data.title);
    if (image) {
      formData.append('film[poster]', image);
    }
    formData.append('film[publishing_year]', data.publishingYear);
    let res = null;
    let message = ''
    if (id) {
      formData.append('_method', 'post');
      res = await authService.updateMovie(id, formData);
      message = "Movie updated successfully"
    } else {
      res = await authService.createMovie(formData);
      message = "Movie created successfully"
    }
    if (res) {
      toast.success(message)
      setTimeout(() => {
        handleNavigate()
      }, [1500])
    }

  }

  useEffect(() => {
    if (id) {
      fetchMovie()
    }
  }, [id])

  const fetchMovie = async () => {
    setLoading(true)
    const res = await authService.movieDetails(id);
    setLoading(false)
    if (res) {
      setInitialValues({
        title: res?.title,
        publishingYear: res?.publishing_year
      })
      setPreview(res?.poster_url)
      setImage(res?.poster_url)
    }
  }

  const handleDrop = (files) => {
    const file = files[0]
    setImage(file)
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }

  const handleNavigate = (id) => {
    router.push(`/`)
  }

  return (
    <section className="movie-wrapper">
      <PageLoading loading={loading} />
      <Container>
        <Row className="align-items-center justify-content-between movie-header">
          <Col xs={12}>
            <div className="page-head">
              <h4 className="page-title">{id ? "Edit" : "Create a new movie"}</h4>
            </div>
          </Col>
        </Row>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form encType='multipart/form-data'>
              <Row className="justify-content-between">
                <Col sm={5}>
                  <ReactDropzone handleDrop={handleDrop} preview={preview} />
                </Col>
                <Col sm={5}>
                  <div className="form-card" >
                    <div className="form-group">
                      <Field
                        name="title"
                        type="text"
                        placeholder="Title"
                        className={`form-control ${errors.title && touched.title ? "is-invalid" : ""
                          }`}
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <Field
                        name="publishingYear"
                        type="text"
                        placeholder="Publishing year"
                        className={`form-control ${errors.publishingYear && touched.publishingYear
                          ? "is-invalid"
                          : ""
                          }`}
                      />
                      <ErrorMessage
                        name="publishingYear"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="btn-wrapper me-auto mt-5">
                      <Button variant="secondary" type="button" onClick={handleNavigate}>
                        Cancel
                      </Button>
                      <Button type="submit">{id ? "Update" : "Submit"}</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </section>
  );
};

export default CreateMovie;
