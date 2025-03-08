import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/page/:page": {
    "page": string;
  };
  "/page/:page/details/:name": {
    "page": string;
    "name": string;
  };
};