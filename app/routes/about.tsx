import React from "react";

const PODCAST_URL = "https://london-tech-talk.com/";

export default function About() {
  return (
    <div className="w-full">
      <h1 className="font-bold mb-4 lg:mx-24">About Me</h1>
      <section className="mb-6 lg:mx-24">
        <div>
          <p>
            Hi there! I'm Yosuke Tommy Asai, a dedicated Site Reliability
            Engineer with rich experience in management and team building. 📈
          </p>

          <p>
            My speciality lies in building robust CI/CD pipelines to automate
            release cycles and speed up deployment frequency, especially on
            <b> Kubernetes</b>. 🚀 I also relish the challenge of modernizing
            older tech stacks to stay ahead of the curve.
          </p>
        </div>
      </section>

      <section className="mb-6 lg:mx-24">
        <h2 className="text-xl font-semibold mb-2">Podcast</h2>
        <a href={PODCAST_URL} target="_blank" rel="noopener noreferrer">
          <img
            src="/images/podcast.png"
            alt="London Tech Talk"
            className="w-80 h-auto"
          />
        </a>
        <p>
          I run a weekly podcast,{" "}
          <a href={PODCAST_URL} target="_blank" rel="noopener noreferrer">
            <b>London Tech Talk</b>
          </a>
          , where we discuss the technology and interview leading experts in the
          field.
        </p>
      </section>

      <section className="mb-6 lg:mx-24">
        <h2 className="text-xl font-semibold mb-2">Readings</h2>
        <ul>
          <li>
            <a
              href="https://www.manning.com/books/software-mistakes-and-tradeoffs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Software Mistakes and Tradeoffs
            </a>
          </li>
          <li>
            <a
              href="https://dataintensive.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Designing Data-Intensive Applications
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
