"use client"; 
import Image from "next/image";
import styles from "./page.module.css";
import MoviesList from "@/component/movies-list";

export default function Home({children}) {
  return (
    <main className={styles.main}>
         <MoviesList />
    </main>
  );
}
