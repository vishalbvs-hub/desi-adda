import { redirect } from "next/navigation";
export default function GroceriesIndex() { redirect("/businesses?cat=grocery"); }
