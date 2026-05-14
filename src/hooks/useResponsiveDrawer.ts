import { useEffect, useState } from "react";

export function useResponsiveDrawer() {
  const [width, setWidth] = useState<string | number>(window.innerWidth < 768 ? "100%" : 740);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth < 768 ? "100%" : 740);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}
