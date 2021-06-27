import { useState, useRef, useEffect } from "react";

const useIsVisible = (options: IntersectionObserverInit) => {
  if (!process.browser){
    return {
      'observer': null, 
      'setElements': null, 
      'entries': []
    };
  }
  const [elements, setElements] = useState<Element[]>([]);
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);

  const observer = useRef(new IntersectionObserver(observedEntries => {
    setEntries(observedEntries);
  }, options));

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();
    if (elements.length) {
      elements.forEach(element => {
        if (element) {
          return currentObserver.observe(element);
        }
      });
    }
    return () => {
      if (currentObserver) {
        currentObserver.disconnect()
      }
    };
  }, [elements]);

  return {
    'observer': observer.current, 
    'setElements': setElements, 
    'entries': entries
  };
}
export default useIsVisible;