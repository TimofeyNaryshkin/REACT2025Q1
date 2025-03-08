import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index('./home.tsx'),
  route("page/:page", "./routes/page.tsx", [
    route('details/:id', './routes/details.tsx')
  ]),
  // pattern ^           ^ module file
] satisfies RouteConfig;
