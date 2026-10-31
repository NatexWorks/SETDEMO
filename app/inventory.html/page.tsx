import { redirect } from "next/navigation";

export default function LegacyInventoryRedirect(): never {
  redirect("/work/inventory-management");
}
