import { useEffect, useRef } from "react";

export const useMountEffect = (callback: () => void | (() => void)): void => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      callback();
    }
  }, [callback]);
};
