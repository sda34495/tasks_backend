export function getHtmlOtpEmailContent(otp: string) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #666666;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>OTP Email</h1>
        <p>Your One-Time Password (OTP) is:</p>
        <p class="otp">${otp}</p>
        <p>Please use this OTP to complete your action.</p>
    </div>
</body>
</html>
`;
    return htmlContent
}



export function getInviteLinkContent(inviteLink: string) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invitation</title>
        <style>
            /* Inline CSS styles */
            body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                padding: 20px;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
    
            .button {
                display: inline-block;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
            }
    
            .button:hover {
                background-color: #0056b3;
            }
    
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #666;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Invitation to Join Our Project</h2>
            </div>
            <p>Hello,</p>
            <p>You have been invited to join our project. Click the button below to accept the invitation:</p>
            <a href=${inviteLink} class="button">Accept Invitation</a>
            <div class="footer">
                <p>This email was sent automatically. Please do not reply to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `
}