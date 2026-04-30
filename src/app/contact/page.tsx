import type { Metadata } from "next";
import { ContactForm, ContactInfo } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: "Contact | Andhika Guntur - Get in Touch",
  description: "Have a project in mind or just want to say hi? Contact Andhika Guntur for software development services and collaborations.",
  keywords: ["Contact Developer", "Hire Software Engineer", "Andhika Guntur Contact", "Project Inquiry"],
};

export default function ContactPage() {
    return (
        <div className="w-full py-12 md:py-20">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                
                <div className="w-full text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16">
                        Let's <span className="text-muted-foreground italic">Connect</span>
                    </h1>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-12">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
