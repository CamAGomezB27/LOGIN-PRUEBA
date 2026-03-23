import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/login", "routes/loginMobile.tsx"),
  route("/login2", "routes/loginDesktop.tsx"),
] satisfies RouteConfig;
