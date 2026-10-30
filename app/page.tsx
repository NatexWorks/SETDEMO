import type { Metadata } from "next";
import LegacyPage from "@/components/legacy-page";
import "@/app/experience.css";

export const metadata: Metadata = { title: "Manish / NatexWorks — Websites & Custom Solutions" };

export default function HomePage() { return <LegacyPage name="index.html" />; }
