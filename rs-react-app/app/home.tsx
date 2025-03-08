import { redirect } from "react-router";
import getStarships from "../src/API/StarshipService";

export async function loader({ request }) {
  let user = await getStarships(request);
  if (!user) {
    return redirect("/login");
  }
  return { userName: user.name };
}