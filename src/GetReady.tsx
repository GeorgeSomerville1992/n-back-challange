import { useEffect, useState } from "react";

interface GetReadyProps {
  handleGameReady: () => void;
}

export const GetReady: React.FC<GetReadyProps> = ({ handleGameReady }) => {
  const [countDown, setCountDown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);

    if (countDown === 0) {
      clearInterval(timer);
      handleGameReady();
    }

    return () => clearInterval(timer);
  }, [countDown, handleGameReady]);

  return (
    <div className="grow">
      <h2 className="text-3xl">Get Ready!</h2>
      <p className="mt-4">
        The game will start shortly. Prepare yourself to focus and remember the
        sequence of letters.
      </p>
      <p>{countDown}</p>
    </div>
  );
};
