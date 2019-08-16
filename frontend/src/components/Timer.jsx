import React from "react";
import Countdown from "react-countdown-now";

const Timer = props => {
  const { end } = props;
  return <Countdown date={Date.now() + end} />;
};

export default Timer;
