import { useState, useCallback, useEffect } from "react";

export const useMediaQuery = (width: number) => {
  //! Esto se usa para saber en que medida estamos dinamicamente. Por props le pasas el breakpoint que queres usar como condicion.
  //!
  //! const isMobile = useMediaQuery(800) // `true` si el viewport es menos a 800px. `false` si es mayor a 800px
  const [targetReached, setTargetReached] = useState<boolean>(false);

  const updateTarget = useCallback((e: any) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
      return () => media.removeListener(updateTarget);
    }

    setTargetReached(false);

    return () => media.removeListener(updateTarget);
  }, [updateTarget, width]);

  return targetReached;
};
