"use client";

import { usePathname } from "next/navigation";
import Filters from "./Filters";
import React from "react";

export default function FiltersWrapper() {
  const pathname = usePathname();

  if (pathname === "/members") return <Filters />;
  else return null;
}
