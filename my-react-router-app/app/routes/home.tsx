import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <Link to="/login" className="text-blue-500 underline">
        Ir al Login
      </Link>
      <br />
      <Link to="/login2" className="text-blue-500 underline">
        Ir al Login Desktop
      </Link>
    </div>
  );
}
