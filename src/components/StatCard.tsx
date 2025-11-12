import type { JSX } from "react/jsx-runtime";

export interface StatCardProps {
  title: string;
  color: string;
  icon: JSX.Element;
  subtitle: string;
  main: string;
}

export default function StatCard(props: StatCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 p-4 rounded-md shadow-xl bg-current/50`}
      style={{
        background: props.color,
      }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl text-wrap break-words font-bold">
          {props.title}
        </h2>
        <div className="flex-none *:size-12">{props.icon}</div>
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-3xl font-bold">{props.main}</h2>
        <p className="fieldset-label font-bold">{props.subtitle}</p>
      </div>
    </div>
  );
}
