import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const usePreviousRoute = () => {
  const location = useLocation();
  const prevLocationRef = useRef<string | null>(null);

  useEffect(() => {
    prevLocationRef.current = location.pathname;
  }, [location]);

  return prevLocationRef.current;
};

export default usePreviousRoute;
