import { useState, useEffect } from "react";

const useImage = (src: string) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false);

  useEffect(() => {
    setHasStartedInitialFetch(true);
    setHasLoaded(false);
    setHasError(false);
    const image = new Image();
    const handleError = () => {
      setHasError(true);
    };
    const handleLoad = () => {
      setHasLoaded(true);
      setHasError(false);
    };
    image.onerror = handleError;
    image.onload = handleLoad;
    image.src = src;
    return () => {
      image.removeEventListener("error", handleError);
      image.removeEventListener("load", handleLoad);
    };
  }, [src]);
  return { 
    hasLoaded, 
    hasError, 
    hasStartedInitialFetch
  };
};
export default useImage;