import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import env from '#start/env'
import { EmailDetail } from "../interfaces/EmailDetail.js";

const mailerSend = new MailerSend({
    apiKey: env.get('MAIL_API_KEY'),
});



export async function sendEmail(emailsDetails: EmailDetail) {
    const sentFrom = new Sender(env.get('SENDER_MAIL'), emailsDetails.senderName || "Tasks Sync");
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