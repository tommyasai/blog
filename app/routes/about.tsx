import React from "react";

export default function About() {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4">About Me</h1>
      <section className="mb-6">
        <div>
          <p>
            Hi there! I'm Yosuke Tommy Asai, a dedicated Site Reliability
            Engineer with rich experience in management and team building. 📈
          </p>

          <p>
            Known for my excellent communication skills, I believe that clear
            dialogue is crucial for successful projects. One of my primary
            focuses is contributing to profits, ensuring that my technical
            solutions not only resolve issues but also add value. 💰
          </p>

          <p>
            My speciality lies in building robust CI/CD pipelines to automate
            release cycles and speed up deployment frequency. 🚀 I also relish
            the challenge of modernizing older tech stacks to stay ahead of the
            curve.
          </p>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Podcast</h2>
        <p>
          I run a weekly podcast,{" "}
          <a
            href="https://open.spotify.com/show/0J8LZwfrGB9BJLihy4Ldb1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>London Tech Talk</b>
          </a>
          , where we discuss the technology and interview leading experts in the
          field.
          <a
            href="https://open.spotify.com/show/0J8LZwfrGB9BJLihy4Ldb1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/podcast.png"
              alt="London Tech Talk"
              className="w-80 h-auto"
            />
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Readings</h2>
        <p>
          <a
            href="https://dataintensive.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Database-Intensive Application Design (DDIA)
            <img
              src="/images/ddia.png"
              alt="Designing Data-Intensive Applications book-cover"
              className="w-80 h-auto"
            />
          </a>
        </p>
      </section>
    </div>
  );
}
