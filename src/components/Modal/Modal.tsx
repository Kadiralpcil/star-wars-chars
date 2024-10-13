import { FC, ReactNode, useEffect, useRef } from "react";
import "./modal.scss";
import { MdOutlineClose } from "react-icons/md";

import useOverlayScrollLock from "../../hooks/useOverlayScrollLock";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  outsideClickAction?: boolean;
}

export const Modal: FC<ModalProps> = ({
  show,
  onClose,
  children,
  className,
  outsideClickAction = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [show, onClose]);

  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.focus();
    }
  }, [show]);

  useOverlayScrollLock(show);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      outsideClickAction
    ) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal ${className ?? ""}`} ref={modalRef} tabIndex={-1}>
        <div className="close-button" onClick={onClose}>
          <MdOutlineClose />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
