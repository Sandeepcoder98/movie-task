'use client'
// import { Inter } from "next/font/google";
import "./global.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/component/layout/Layout";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from "@/Redux/Store";


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="page-wrapper">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Layout>
              {children}
            </Layout>
          </PersistGate>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
