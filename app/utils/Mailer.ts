import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import env from '#start/env'

const mailerSend = new MailerSend({
    apiKey: env.get('MAIL_API_KEY'),
});



interface EmailDetail {
    senderEmail?: string,
    senderName?: string,
    recipientEmail: string
    recipientName?: string
    subject: string,
    htmlContent: string,
    textContent?: string
}
export async function sendEmail(emailsDetails: EmailDetail) {
    const sentFrom = new Sender(env.get('SENDER_MAIL'), emailsDetails.senderName || "Danish Ali");
    const recipient = new Recipient(emailsDetails.recipientEmail, emailsDetails.recipientName || "User")
    const recipients = [recipient];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(emailsDetails.subject)
        .setHtml(emailsDetails.htmlContent)
        .setText(emailsDetails.textContent || "");

    try {
        await mailerSend.email.send(emailParams);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}