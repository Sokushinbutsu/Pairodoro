import React from "react";
import Countdown from "react-countdown-now";

const Timer = props => {
  const { end, setModalOpen } = props;
  return (
    <Countdown
      date={Date.now() + end}
      onComplete={() => {
        setModalOpen();
        const audio = new Audio(
          "http://soundbible.com/grab.php?id=2197&type=mp3"
        );
        audio.play();
      }}
    />
  );
};

export default Timer;
