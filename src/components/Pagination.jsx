import React, { useState } from "react";
import { Pagination } from "@nextui-org/react";

export function PaginationComponent({ qty }) {
  const [page, setPage] = useState(1);

  console.log(page);

  return <Pagination isCompact showControls total={qty} initialPage={1} page={page} onChange={(e) => setPage(e)} />;
}
