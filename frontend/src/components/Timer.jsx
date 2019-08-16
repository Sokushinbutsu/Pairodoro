import React from "react";
import Countdown from "react-countdown-now";

const Timer = props => {
  let { end, setModalOpen, submitted, setSubmitted } = props;

  end *= 60000;
  if (submitted) {
    return (
      <Countdown
        date={Date.now() + end}
        onComplete={() => {
          setModalOpen();
          const audio = new Audio(
            "http://soundbible.com/grab.php?id=2197&type=mp3"
          );
          audio.play();
          setSubmitted();
        }}
      />
    );
  } else {
    return <Countdown date={Date.now()} />;
  }
};

export default Timer;
