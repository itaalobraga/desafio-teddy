import React from "react";

export type PropsWithChildren<T = unknown> = T & {
  children: React.ReactNode;
};
