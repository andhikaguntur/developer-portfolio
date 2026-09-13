import type { Metadata } from "next";
import { ContactForm, ContactInfo } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: "Contact | Andhika Guntur - Get in Touch",
  description: "Connect with Andhika Guntur Ramadan for IT business analysis, requirements engineering, system design, and digital solution development opportunities.",
  keywords: [
    "Contact Andhika Guntur",
    "IT Business Analyst Contact",
    "Requirements Engineer",
    "Andhika Guntur Ramadan",
    "UPN Veteran Yogyakarta",
    "Project Inquiry"
  ],
};

export default function ContactPage() {
    return (
        <div className="w-full py-12 md:py-20">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                
                <div className="w-full text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                        Let&apos;s <span className="text-muted-foreground italic">Connect</span>
                    </h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                        Available for Opportunities & Collaborations
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-12">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
