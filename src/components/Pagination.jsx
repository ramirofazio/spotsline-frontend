import React from "react";
import { Pagination, PaginationItemType } from "@nextui-org/react";

export function PaginationComponent({ qty = 10, page, setCurrentPage }) {
  const className = "w-8 aspect-square rounded-full transition-colors ease-in-out";

  const renderItem = ({ ref, key, value, isActive, onNext, onPrevious, setPage }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={className + " aspect-square h-8 rotate-180"}
          onClick={() => {
            setCurrentPage(Math.min(qty, page + 1));
            onNext();
          }}
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={className + " min-w-8 aspect-square h-8 "}
          onClick={() => {
            setCurrentPage(Math.max(1, page - 1));
            onPrevious();
          }}
        >
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
          setCurrentPage(value);
          setPage(value);
        }}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={qty}
      initialPage={1}
      className="my-5 gap-2"
      radius="full"
      renderItem={renderItem}
      variant="light"
    />
  );
}
