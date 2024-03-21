import { ReactNode } from "react";

export function MainContainer({ children }: { children: ReactNode }) {
  return <main className="w-full max-w-7xl mx-auto px-4">{children}</main>;
}
