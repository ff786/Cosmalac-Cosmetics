import { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children,
                   size = "medium",
                   showClose = true,
                   className = "",
               }) => {
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.body.classList.add("modal-open");
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.classList.remove("modal-open");
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const classes = [
        "nuvia-modal",
        `nuvia-modal--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose?.();
        }
    };

    return (
        <div
            className="nuvia-modal-overlay"
            role="presentation"
            onMouseDown={handleOverlayClick}
        >
            <div
                className={classes}
                role="dialog"
                aria-modal="true"
                aria-labelledby={
                    title ? "nuvia-modal-title" : undefined
                }
            >
                {(title || showClose) && (
                    <div className="nuvia-modal__header">
                        {title && (
                            <h2 id="nuvia-modal-title">
                                {title}
                            </h2>
                        )}

                        {showClose && (
                            <button
                                type="button"
                                className="nuvia-modal__close"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                )}

                <div className="nuvia-modal__body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;