import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
type Names =
  | "Hotel Booking"
  | "Cinema Ticket"
  | "VR Game ticket"
  | "Studio Booking"
  | "Equipment Booking"
  | "Hotel Booking";
const stats = [
  {
    title: "Food",
    color: "green",
  },
  {
    title: "Studio Booking",
    color: "#c2410c",
  },
  {
    title: "Hotel Booking",
    color: "#0e7490",
  },
  {
    title: "Cinema Ticket",
    color: "mediumpurple",
  },
  {
    title: "VR Game ticket",
    color: "blue",
  },
  {
    title: "Equipment Booking",
    color: "brown",
  },
];
interface Data {
  name: string;
  "Hotel Booking": number;
  "Cinema Ticket": number;
  "VR Game ticket": number;
  "Studio Booking": number;
  "Equipment Booking": number;
  Food: number;
  amount: number;
}
const data: Data[] = [
  {
    name: "Jan",
    "Hotel Booking": 1000,
    "Cinema Ticket": 500,
    "VR Game ticket": 200,
    "Studio Booking": 300,
    "Equipment Booking": 100,
    Food: 400,
    amount: 5000,
  },
  {
    name: "Feb",
    "Hotel Booking": 1200,
    "Cinema Ticket": 600,
    "VR Game ticket": 250,
    "Studio Booking": 350,
    "Equipment Booking": 120,
    Food: 450,
    amount: 5500,
  },
  {
    name: "Mar",
    "Hotel Booking": 1100,
    "Cinema Ticket": 550,
    "VR Game ticket": 220,
    "Studio Booking": 320,
    "Equipment Booking": 110,
    Food: 420,
    amount: 5200,
  },
  {
    name: "Apr",
    "Hotel Booking": 1300,
    "Cinema Ticket": 650,
    "VR Game ticket": 280,
    "Studio Booking": 380,
    "Equipment Booking": 130,
    Food: 480,
    amount: 5800,
  },
  {
    name: "May",
    "Hotel Booking": 1150,
    "Cinema Ticket": 580,
    "VR Game ticket": 230,
    "Studio Booking": 330,
    "Equipment Booking": 115,
    Food: 430,
    amount: 5300,
  },
  {
    name: "Jun",
    "Hotel Booking": 1400,
    "Cinema Ticket": 700,
    "VR Game ticket": 300,
    "Studio Booking": 400,
    "Equipment Booking": 140,
    Food: 500,
    amount: 6000,
  },
  {
    name: "Jul",
    "Hotel Booking": 1250,
    "Cinema Ticket": 620,
    "VR Game ticket": 260,
    "Studio Booking": 360,
    "Equipment Booking": 125,
    Food: 460,
    amount: 5600,
  },
  {
    name: "Aug",
    "Hotel Booking": 1500,
    "Cinema Ticket": 750,
    "VR Game ticket": 320,
    "Studio Booking": 420,
    "Equipment Booking": 150,
    Food: 520,
    amount: 6200,
  },
  {
    name: "Sep",
    "Hotel Booking": 1350,
    "Cinema Ticket": 680,
    "VR Game ticket": 290,
    "Studio Booking": 390,
    "Equipment Booking": 135,
    Food: 490,
    amount: 5900,
  },
  {
    name: "Oct",
    "Hotel Booking": 1600,
    "Cinema Ticket": 800,
    "VR Game ticket": 340,
    "Studio Booking": 440,
    "Equipment Booking": 160,
    Food: 540,
    amount: 6400,
  },
  {
    name: "Nov",
    "Hotel Booking": 1450,
    "Cinema Ticket": 720,
    "VR Game ticket": 310,
    "Studio Booking": 410,
    "Equipment Booking": 145,
    Food: 510,
    amount: 6100,
  },
  {
    name: "Dec",
    "Hotel Booking": 1700,
    "Cinema Ticket": 850,
    "VR Game ticket": 360,
    "Studio Booking": 460,
    "Equipment Booking": 170,
    Food: 560,
    amount: 6600,
  },
];
const renderLegend = (props: any) => {
  const { payload } = props;

  return (
    <ul className="flex flex-wrap justify-center gap-2">
      {payload.map((entry: any, index: number) => (
        <li
          className="text-xs"
          style={{
            color: stats[index].color,
          }}
          key={`item-${index}`}
        >
          {entry.value}
        </li>
      ))}
    </ul>
  );
};
export default function Example() {
  return (
    <div className=" card h-full bg-base-100 shadow-xl p-4 space-y-2 ring rounded-md ring-current/20">
      <h2 className="card-title text-2xl font-bold">Subscription Analysis</h2>
      <ul className="join flex-wrap gap-2">
        {stats.map((item) => {
          return (
            <li
              className="float-left text-sm   badge"
              key={item.title}
              style={{ background: item.color }}
            >
              <span className=""></span>
              {item.title}
            </li>
          );
        })}
      </ul>
      <LineChart
        style={{
          width: "100%",
          // maxWidth: "680px",
          height: "100%",
          maxHeight: "70vh",
          // aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip />
        {stats.map((item) => {
          return (
            <Line
              type={"monotone"}
              key={item.title}
              dataKey={item.title}
              stroke={item.color}
            />
          );
        })}
      </LineChart>
    </div>
  );
}
