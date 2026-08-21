

export default function getUserOtpHtml(userName, otpCode) {
    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Node-RED — Verification Code</title>
            <style>
                body { 
                    margin: 0; 
                    padding: 0; 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; 
                    background-color: #F4F5F7; 
                    color: #1F2937; 
                    -webkit-font-smoothing: antialiased; 
                }
                table { border-collapse: collapse; }
                .email-container { 
                    max-width: 480px; 
                    margin: 0 auto; 
                    background-color: #FFFFFF; 
                    border: 1px solid #E5E7EB;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
                }
                .header { 
                    padding: 36px 36px 24px 36px; 
                    text-align: left; 
                    border-bottom: 1px solid #F3F4F6;
                }
                .logo { 
                    font-size: 24px; 
                    font-weight: 900; 
                    letter-spacing: -0.5px; 
                    color: #111827; 
                    margin: 0; 
                }
                .logo span { 
                    color: #FF0000; 
                    font-weight: 700; 
                }
                .content { 
                    padding: 36px; 
                }
                .welcome-text { 
                    font-size: 20px; 
                    font-weight: 700; 
                    color: #111827; 
                    margin-top: 0; 
                    margin-bottom: 12px; 
                }
                .instruction-text { 
                    font-size: 14px; 
                    color: #4B5563; 
                    line-height: 1.6; 
                    margin-bottom: 28px; 
                }
                .otp-container { 
                    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
                    border-radius: 12px; 
                    padding: 28px 20px; 
                    text-align: center; 
                    border: 1px solid #E2E8F0;
                    box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
                    margin-bottom: 28px;
                }
                .otp-code { 
                    font-size: 40px; 
                    font-weight: 800; 
                    letter-spacing: 10px; 
                    color: #FF0000; 
                    margin: 0; 
                    padding-left: 10px; 
                }
                .timer-badge {
                    display: inline-block;
                    background-color: #EFF6FF;
                    border: 1px solid #BFDBFE;
                    color: #1D4ED8;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 6px 12px;
                    border-radius: 20px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                .warning-box { 
                    background-color: #FFFBEB;
                    border: 1px solid #FEF3C7;
                    border-left: 3px solid #D97706;
                    border-radius: 8px; 
                    padding: 16px;
                }
                .warning-text { 
                    font-size: 12px; 
                    color: #92400E; 
                    line-height: 1.5; 
                    margin: 0; 
                }
                .footer { 
                    padding: 24px 36px; 
                    font-size: 12px; 
                    color: #9CA3AF; 
                    border-top: 1px solid #F3F4F6; 
                    background-color: #FAFAFA; 
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F5F7; padding: 50px 10px;">
                <tr>
                    <td>
                        <table class="email-container" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                <td class="header">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td>
                                                <h1 class="logo">Node<span>RED</span></h1>
                                            </td>
                                            <td align="right" style="font-size: 11px; color: #6B7280; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px;">
                                                Verification
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="content">
                                    <h2 class="welcome-text">Hello, ${userName}</h2>
                                    
                                    <p class="instruction-text">
                                        You've requested to authenticate your device profile. Enter the secure verification code provided below to proceed:
                                    </p>
                                    
                                    <div class="otp-container">
                                        <h3 class="otp-code">${otpCode}</h3>
                                    </div>
                                    
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                                        <tr>
                                            <td valign="middle" style="font-size: 13px; font-weight: 600; color: #374151;">
                                                Token Expiration:
                                            </td>
                                            <td align="right" valign="middle">
                                                <div class="timer-badge">⏳ Expires in 5m</div>
                                            </td>
                                        </tr>
                                    </table>

                                    <div class="warning-box">
                                        <p class="warning-text">
                                            <strong style="color: #78350F;">Security Note:</strong> If you did not trigger this action, you can safely disregard this email. Your credentials remain safe.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="footer">
                                    <span>&copy; ${new Date().getFullYear()} Node-RED. All rights reserved.</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`
    )
}