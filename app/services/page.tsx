import type { Metadata } from "next";
import LegacyPage from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Services — NatexWorks | Websites, Custom Tools & Local SEO",
  description: "Explore NatexWorks services: business websites, custom web applications, local SEO, Google Search and Google Maps visibility.",
};

export default function ServicesPage() { return <LegacyPage name="services.html" />; }
