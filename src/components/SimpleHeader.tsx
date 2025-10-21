import type { JSX } from "react/jsx-runtime";

interface SimpleHeaderProps {
  title: string | JSX.Element;
}

export default function SimpleHeader(props: SimpleHeaderProps) {
  return (
    <div className="h-18 flex items-center ">
      <h2 className="font-bold text-xl ">{props.title}</h2>
    </div>
  );
}
