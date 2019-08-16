import React from "react";
import Countdown from "react-countdown-now";

const Timer = props => {
  const { end, setModalOpen } = props;
  return (
    <Countdown
      date={Date.now() + end}
      onComplete={() => {
        setModalOpen();
      }}
    />
  );
};

export default Timer;
