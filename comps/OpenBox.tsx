// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

import Carosel from "comps/Carosel";
import BreadCrumbs from "comps/BreadCrumbs";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};
function getAnimationSettings(angle, originX) {
  return {
    particleCount: 3,
    angle,
    spread: 55,
    origin: { x: originX },
    colors: ["#bb0000", "#ffffff"],
  };
}

export default function SgProfile({ content, hook, errorMsg }) {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    console.log("modal loaded");
    if (!errorMsg) {
      startAnimation();
      setTimeout(function () {
        console.log("stopping animation");

        pauseAnimation();
      }, 1000);
    }
  }, []);

  return (
    <>
      <BreadCrumbs
        path={["wallet", "Opened Box"]}
        icon={false}
        hook={hook}
        buttonText="Close"
      />
      {errorMsg ? (
        <p className="error-wrapper">⛔ {errorMsg}</p>
      ) : (
        <Carosel slides={content} />
      )}

      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  );
}
