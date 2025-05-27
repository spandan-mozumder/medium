import { useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import { Appbar } from "../components/Appbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
      <Appbar />

      <div className="flex flex-row items-center justify-between pt-20">
        <div className="flex flex-col justify-center items-start pl-60">
          <h1 className="text-9xl">Human</h1>
          <h2 className="text-7xl">stories & ideas</h2>
          <p className="text-xl pt-7">
            A place to read, write, and deepen your understanding
          </p>
          <button
            className="mt-10 px-7 py-2 rounded-full bg-black text-white border-white"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </button>
        </div>

        <div className="h-lg w-lg">
          <img src={image} />
        </div>
      </div>
    </div>
  );
};

export default Home;
