import { useEffect, useRef } from "react";

export const useOutsideClick = (closeHandler, listenCapturing = true) => {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          closeHandler();
        }
      }
      document.documentElement.addEventListener(
        "click",
        handleClick,
        listenCapturing
      );
      return () =>
        document.documentElement.removeEventListener(
          "click",
          handleClick,
          listenCapturing
        );
    },
    [closeHandler, listenCapturing]
  );

  return ref;
};
