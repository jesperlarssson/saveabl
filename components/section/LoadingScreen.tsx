import LottieAnimation from "../ui/LottieAnimation";
import matkasse from "../../public/anim/Matkasse.json";
import klocka from "../../public/anim/Klocka.json";
import jordklot from "../../public/anim/Jordklot.json";

const LoadingScreen = () => {
  const animationComponent = [
    <LottieAnimation animationData={matkasse} />,
    <LottieAnimation animationData={klocka} />,
    <LottieAnimation animationData={jordklot} />,
  ];

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-96 h-96">
        {animationComponent[Math.floor(Math.random() * animationComponent.length)]}
      </div>
    </div>
  );
};

export default LoadingScreen;
