import React from "react";
import { Pagination, PaginationItemType } from "@nextui-org/react";

export function PaginationComponent({ qty = 10, page, onChange }) {
  const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage }) => {
    const className =
      "w-8 aspect-square rounded-full transition-colors ease-in-out" +
      (!isActive && " hover:bg-secondary/50 hover:text-primary ");

    if (value === PaginationItemType.NEXT) {
      return (
        <button key={key} className={className + " aspect-square h-8 rotate-180"} onClick={onNext}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} className={className + " min-w-8 aspect-square h-8 "} onClick={onPrevious}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }
    return (
      <button
        key={key}
        ref={ref}
        className={className + (isActive && " bg-primary font-medium")}
        onClick={() => {
          setPage(value);
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableAnimation
      showControls
      total={qty}
      page={page}
      className="my-5 gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
      onChange={onChange}
    />
  );
}
