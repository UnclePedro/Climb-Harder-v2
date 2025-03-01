import Lottie from "react-lottie";

interface LoadingAnimationProps {
  height: number;
  width: number;
  animationData: any;
}

const LoadingAnimation = ({
  height,
  width,
  animationData,
}: LoadingAnimationProps) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LoadingAnimation;
