import { useEffect } from "react";

const useDisableDraggableChildren = (targetRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const targetElement = targetRef.current;

    if (targetElement) {
      const children = targetElement.querySelectorAll<HTMLElement>("*");
      children.forEach((child) => {
        child.setAttribute("draggable", "false");
      });
    }
  }, [targetRef]);
};

export default useDisableDraggableChildren;
