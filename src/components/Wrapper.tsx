import type { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return <div className="max-w-[1150px] mx-auto">{children}</div>;
}
