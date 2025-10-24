import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export default function FieldSet(props: Props) {
  return (
    <div className="space-y-2   rounded-md">
      <h2 className="fieldset-label text-xl ">{props.title}</h2>
      <div className="p-4 bg-base-300 rounded-md space-y-4">
        {props.children}
      </div>
    </div>
  );
}
