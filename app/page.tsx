import Head from "next/head";
import styles from "./page.module.css";
import Quiz from "./components/Quiz";

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
        <title>Quiz App</title>
      </Head>
      <h1 className="quiz-app-heading">Quiz App</h1>
      <Quiz />
    </div>
  );
}
