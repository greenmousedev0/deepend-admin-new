import type { PropsWithChildren } from "react";
import type { JSX } from "react/jsx-runtime";

interface SimpleHeaderProps extends PropsWithChildren {
  title: string | JSX.Element;
}

export default function SimpleHeader(props: SimpleHeaderProps) {
  return (
    <div className="flex py-2 md:py-0 md:min-h-18 md:items-center justify-between flex-wrap gap-2">
      <h2 className="font-bold text-xl">{props.title}</h2>
      <div className="flex gap-2">{props.children}</div>
    </div>
  );
}
