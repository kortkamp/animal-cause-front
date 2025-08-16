import { RefObject, useEffect, useState } from "react";

function useInView<T extends HTMLElement>(target: RefObject<T | null>, options?: IntersectionObserverInit) {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInViewport(entry.isIntersecting);
    }, options);
    const currentRef = target.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options, target]);

  return inViewport;

}

export { useInView }