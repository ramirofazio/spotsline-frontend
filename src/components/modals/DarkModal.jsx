import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
import AwsImage from "../images/AwsImage";

export function DarkModal({
  children, //! REQUIRED
  title,
  description,
  isOpen, //! REQUIRED
  onOpenChange, //! REQUIRED
  modalClassName,
  isDismissable = true,
  placement = "center",
  backdrop = "blur",
  size = "xl",
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={`rounded-md border-3 border-primary/80 bg-gradient-to-bl from-dark to-secondary/90 p-4 ${modalClassName} text-center`}
      hideCloseButton
      isDismissable={isDismissable}
      placement={placement}
      backdrop={backdrop}
      size={size}
    >
      <ModalContent>
        {() => (
          <main className="relative">
            <ModalHeader className="grid place-items-center text-white">
              <h3 className="text-2xl">{title || "TITLE"}</h3>
              <p className="text-xs font-thin text-white/40">{description}</p>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <div className="absolute -bottom-20 -left-24">
              <AwsImage type="logos" identify="logoWhite" className="w-64 -rotate-12" />
            </div>
          </main>
        )}
      </ModalContent>
    </Modal>
  );
}
