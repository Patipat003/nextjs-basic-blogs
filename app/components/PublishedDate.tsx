"use client";

import React from "react";

interface Props {
  dateString: string;
}

export default function PublishedDate({ dateString }: Props) {
  const date = new Date(dateString);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return <span>{formatted}</span>;
}
