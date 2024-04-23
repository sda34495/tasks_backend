export interface EmailDetail {
    senderEmail?: string;
    senderName?: string;
    recipientEmail: string;
    recipientName?: string;
    subject: string;
    htmlContent: string;
    textContent?: string;
}
