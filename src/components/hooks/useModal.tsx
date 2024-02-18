import { X } from "lucide-react";
import { useRef } from "react";
export const useModal = (canClose = true) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    const showModal = () => {
        modalRef.current?.classList.add("show");
    };

    const closeModal = () => {
        modalRef.current?.classList.remove("show");
    };

    const getModalContent = (content: React.ReactNode) => {
        return (
            <div ref={modalRef} className="modalDialog">
                <div className="body">
                    {content}
                    {canClose && (
                        <div className="close">
                            <X onClick={closeModal} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return {
        getModalContent,
        showModal,
        closeModal,
    };
};
