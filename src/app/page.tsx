import type { Metadata } from "next";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "Andhika Guntur | Aspiring IT Business Analyst & Digital Solutions",
  description: "Explore the portfolio of Andhika Guntur Ramadan, Information Systems undergraduate at UPN \"Veteran\" Yogyakarta with interests in Business Process Analysis (BPMN), Requirements Engineering (SRS/PRD), Database Systems, and Digital Solutions.",
  keywords: [
    "Andhika Guntur",
    "Aspiring IT Business Analyst",
    "IT Business Analyst Intern",
    "Information Systems",
    "Requirements Engineering",
    "Business Process Modeling",
    "BPMN",
    "System Design",
    "UPN Veteran Yogyakarta",
    "Portfolio"
  ],
  openGraph: {
    title: "Andhika Guntur | Aspiring IT Business Analyst & Digital Solutions",
    description: "Information Systems undergraduate specializing in Business Process Analysis, Requirements Engineering, and System Design.",
    url: "https://andhikaguntur.dev",
    siteName: "Andhika Guntur Portfolio",
    locale: "en_US",
    type: "website",
  }
};

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-start">
      <Hero />
    </div>
  );
}
