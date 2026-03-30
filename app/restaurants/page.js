import { redirect } from "next/navigation";

export default function RestaurantsIndex() {
  redirect("/businesses?cat=restaurants");
}
