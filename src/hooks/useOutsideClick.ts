import { RefObject, useEffect } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void,
  isOpen: boolean
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClick);
    } else {
      document.removeEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, ref, callback]);
};

export default useOutsideClick;
