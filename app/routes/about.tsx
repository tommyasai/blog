import React from "react";

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
        </p>
      </section>

      <section className="mb-6 lg:mx-24">
        <h2 className="text-xl font-semibold mb-2">Current Interests</h2>
        <ul>
          <li>
            <a
              href="https://www.finops.org/introduction/what-is-finops/"
              target="_blank"
              rel="noopener noreferrer"
            >
              FinOps
            </a>
          </li>
          <li>
            <a
              href="https://cloud.google.com/learn/what-is-cloud-security"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cloud Security
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6 lg:mx-24">
        <h2 className="text-xl font-semibold mb-2">Reading now</h2>
        <p>
          <a
            href="https://dataintensive.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
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
