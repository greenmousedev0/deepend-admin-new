import TinyBarChart from "./charts/BarChart";
import Example from "./charts/LineChart";

export default function Charts() {
  return (
    <div className="flex gap-3  md:flex-row flex-col mt-12">
      <div className="md:flex-1 h-[450px]">
        <Example />
      </div>
      <div className="md:flex-1 w-full  h-[400px]  md:h-auto md:max-w-96">
        <TinyBarChart />
      </div>
    </div>
  );
}
