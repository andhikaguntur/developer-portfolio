'use server';

import { Resend } from 'resend';

// Initialize Resend with API Key from environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    // Basic validation
    if (!name || !email || !subject || !message) {
        return { error: 'Please fill in all fields.' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['andhikaguntur77.ag@gmail.com'],
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Message from Portfolio</h2>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                        <p style="margin: 0; font-weight: bold; margin-bottom: 10px;">Message:</p>
                        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
                    </div>
                    <p style="font-size: 12px; color: #999; margin-top: 20px; text-align: center;">
                        This email was sent from your portfolio contact form.
                    </p>
                </div>
            `
        });

        if (error) {
            console.error('Resend Error:', error);
            return { error: 'Failed to send email. Please try again later.' };
        }

        return { success: true };
    } catch (err) {
        console.error('Server Error:', err);
        return { error: 'An unexpected error occurred. Please try again.' };
    }
}
