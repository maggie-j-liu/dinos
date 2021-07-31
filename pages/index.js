import Head from "next/head";

export default function Home({ text }) {
  return (
    <div>
      <div className={"h-72 flex items-center justify-center relative"}>
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
        <h1 className={"text-6xl font-bold relative text-outline text-white"}>
          Hack Club Dinoooooooooos
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-hidden">
        {text.map((text, idx) => (
          <div className={"relative"}>
            <img
              key={idx}
              src={`https://raw.githubusercontent.com/hackclub/dinosaurs/main/${text}`}
            />
            <div
              className={
                "absolute hover:z-10 hover:-inset-10 hover:blur-xl inset-0 bg-gray-300 hover:bg-blue-300 mix-blend-multiply filter hover:animate-colors brightness-50 hover:brightness-100"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const parse = (text) => {
  const imageUrls = [];
  text.split("\n").forEach((line) => {
    const match = line.match(/!\[\]\(([^\)]+)\)/);
    if (match) {
      console.log(match[1]);
      imageUrls.push(match[1]);
    }
  });
  console.log(imageUrls);
  return imageUrls;
};

export async function getStaticProps() {
  const text = await fetch(
    "https://raw.githubusercontent.com/hackclub/dinosaurs/main/README.md"
  ).then((r) => r.text());
  return {
    props: {
      text: parse(text),
    },
  };
}
