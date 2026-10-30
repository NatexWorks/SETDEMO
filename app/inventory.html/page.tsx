import type { Metadata } from "next";
import LegacyPage from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Inventory Management System — Manish / NatexWorks",
  description: "An inventory management system built around the everyday work of small retailers: products, stock visibility, billing workflows, and useful business insights in one place.",
};

export default function InventoryPage() { return <LegacyPage name="inventory.html" />; }
