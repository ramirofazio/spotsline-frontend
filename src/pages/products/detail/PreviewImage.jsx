import React from "react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

export function PreviewImage({ description, pathImage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <img
        className="col-span-6 aspect-[10/6] w-full cursor-pointer overflow-hidden rounded-xl bg-gray-100 object-contain p-3"
        title={description}
        alt={description}
        src={pathImage}
        onClick={() => onOpen()}
      />
      <Modal className="bg-black/50 " size="full" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="grid place-content-center">
          {() => <div className="rounded-md bg-background p-4">{description}</div>}
        </ModalContent>
      </Modal>
    </>
  );
}
