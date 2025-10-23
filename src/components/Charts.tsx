import TinyBarChart from "./charts/BarChart";
import Example from "./charts/LineChart";

export default function Charts() {
  return (
    <div className="flex gap-3  md:flex-row flex-col mt-12">
      <div className="flex-1">
        <Example />
      </div>
      <div className="flex-1 w-full  md:max-w-80">
        <TinyBarChart />
      </div>
    </div>
  );
}
