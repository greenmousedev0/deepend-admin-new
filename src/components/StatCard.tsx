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
      className="flex flex-col sm:flex-row gap-2 p-4 rounded-md bg-base-200 shadow-xl"
      style={{
        background: props.color,
      }}
    >
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl text-wrap break-words mb-2 font-bold md:mb-0">
          {props.title}
        </h2>
        <h2>{props.main}</h2>
        <p>{props.subtitle}</p>
      </div>
      <div className="sm:flex-none sm:max-w-[50px] grid place-items-center *:size-12">
        {props.icon}
      </div>
    </div>
  );
}
