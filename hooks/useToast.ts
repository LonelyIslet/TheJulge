import { useState, useEffect } from "react";

const useToast = () => {
  const [isToastShowing, setIsToastShowing] = useState(false);

  const showToast = () => {
    setIsToastShowing(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isToastShowing) {
      timer = setTimeout(() => {
        setIsToastShowing(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isToastShowing]);

  return { isToastShowing, showToast };
};

export default useToast;
