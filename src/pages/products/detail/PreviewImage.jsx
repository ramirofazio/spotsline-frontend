import React from "react";
import { Image, Modal, ModalBody, ModalContent, useDisclosure } from "@nextui-org/react";

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
      <Modal
        size="full"
        placement="center"
        backdrop="blur"
        className="bg-transparent"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <ModalBody className="grid place-content-center">
              <Image src={pathImage} shadow="sm" className="bg-background/50" isZoomed />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
