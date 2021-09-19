import Head from "next/head";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { FiGithub } from "react-icons/fi";

export default function Home({ images }) {
  const [mouseX, setMouseX] = useState("0px");
  const [mouseY, setMouseY] = useState("0px");
  const [isOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState();
  useEffect(() => {
    window.onmousemove = (e) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
      console.log("move");
    };
  }, []);
  return (
    <>
      <main className={"relative overflow-hidden"}>
        <Modal image={modalImage} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={
            "pointer-events-none blur-md fixed z-20 rounded-full h-52 w-52 sm:h-72 sm:w-72 md:h-96 md:w-96 -translate-x-1/2 -translate-y-1/2 bg-blue-300 filter mix-blend-overlay animate-colors"
          }
          style={{ left: mouseX, top: mouseY }}
        />
        <a
          className={
            "absolute right-4 top-4 z-10 p-2 pb-2 bg-purple-100 rounded-full overflow-hidden shadow-md hover:bg-white text-purple-700"
          }
          href="https://github.com/maggie-j-liu/dinos"
          rel="noreferrer"
          target="_blank"
        >
          <FiGithub className={"w-7 h-7 pt-0.5"} />
        </a>
        <div className={"h-80 flex items-center justify-center relative"}>
          <div
            className={
              "absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-500 via-yellow-300 to-green-500"
            }
          />
          <div
            className={
              "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-green-500 via-blue-400 to-purple-500"
            }
          />
          <h1
            className={
              "text-center px-6 text-3xl sm:text-6xl md:text-7xl font-bold relative sm:text-outline text-white"
            }
          >
            Hack Club Dinoooooooooos
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
          {images.map((image, idx) => (
            <button
              key={idx}
              className={"relative flex"}
              onClick={() => {
                setIsOpen(true);
                setModalImage(image);
              }}
            >
              <img
                alt={image.altText ? image.altText : image.url}
                src={`https://raw.githubusercontent.com/hackclub/dinosaurs/main/${image.url}`}
                className={"place-self-center"}
                title={image.altText ? image.altText : image.url}
              />
              <div
                className={
                  "pointer-events-none group absolute inset-0 w-full h-full bg-gray-200 brightness-50 mix-blend-multiply filter"
                }
              ></div>
            </button>
          ))}
        </div>
      </main>
      <footer
        className={
          "h-24 bg-gray-900 text-white flex items-center justify-center"
        }
      >
        <div className={"font-mono"}>
          Dinos sourced from{" "}
          <a
            href="https://github.com/hackclub/dinosaurs"
            rel="noreferrer"
            target="_blank"
            className={"font-bold hover:underline"}
          >
            hackclub/dinosaurs
          </a>
        </div>
      </footer>
    </>
  );
}

const parse = (text) => {
  const imageUrls = [];
  const allLines = text.split("\n");
  const regex = /!\[([^\]]*)\]\(([^\)]+)\)/;
  for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i];
    const match = line.match(regex);
    if (match) {
      let desc = "";
      for (let j = i - 1; j >= 0; j--) {
        const cleaned = allLines[j].replace(/\s/g, "");
        if (cleaned === "---" || allLines[j].match(regex)) break;
        desc = allLines[j] + " " + desc;
      }
      imageUrls.push({
        description: desc.trim(),
        altText: match[1],
        url: match[2].replace("&#32;", " "),
      });
    }
  }
  return imageUrls;
};

export async function getStaticProps() {
  const text = await fetch(
    "https://raw.githubusercontent.com/hackclub/dinosaurs/main/README.md"
  ).then((r) => r.text());
  return {
    props: {
      images: parse(text),
    },
  };
}
