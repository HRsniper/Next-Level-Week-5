import { GetStaticProps } from "next";

function Home({ episodes }) {
  return <div>{JSON.stringify(episodes)}</div>;
}

const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  };
};

export default Home;
export { getStaticProps };
