import type { PropsWithChildren, ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";

interface SafeFallbackProps extends PropsWithChildren {
  item: any;
  render?: (item?: any) => ReactNode | JSX.Element;
  children?: ReactNode | any;
}

export default function SafeFallback({
  item,
  render,
  children,
}: SafeFallbackProps) {
  if (!item) return null;

  if (typeof children === "function") {
    return <>{(children as (item: any) => ReactNode)(item)}</>;
  }

  if (render) {
    return <>{render(item)}</>;
  }

  return <>{children}</>;
}
