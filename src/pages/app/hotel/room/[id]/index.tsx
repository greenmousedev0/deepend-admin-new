import { useParams } from "@tanstack/react-router";

export default function index() {
  const { id } = useParams({
    from: "/app/hotel/room/$id",
  });
  return <div></div>;
}
