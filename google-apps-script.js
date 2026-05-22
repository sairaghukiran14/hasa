/**
 * HasaBoard Serverless Lead Capture & Automated Email Engine
 * Deployed as a Web App in Google Sheets (Extensions > Apps Script)
 * 
 * Features:
 * 1. 100% Free & Unlimited lead storage inside Google Sheets.
 * 2. Pre-authorized Security Token verification to prevent bot/spam triggers.
 * 3. Escapes cells to block CSV Formula Injection vulnerabilities.
 * 4. Automates personalized, high-converting HTML emails to subscribers.
 * 5. Configured with a dedicated support contact (avulasairaghukiran@gmail.com).
 * 
 * Author: Sai Raghu krian Avula (Founder, HasaBoard)
 */

function doPost(e) {
  try {
    // 1. Parse JSON payload
    var data = JSON.parse(e.postData.contents);
    
    // 2. Validate Security Token
    var expectedToken = "hasaboard_waitlist_secure_2026";
    if (data.secret_token !== expectedToken) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Unauthorized request token."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // 3. Select Spreadsheet & Active Sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 4. Safe Escaping to block CSV/Spreadsheet Formula Injection
    function escapeCell(val) {
      if (typeof val === 'string' && val.length > 0) {
        var firstChar = val.charAt(0);
        if (firstChar === '=' || firstChar === '+' || firstChar === '-' || firstChar === '@') {
          return "'" + val; // Escape by prepending a single quote
        }
      }
      return val;
    }
    
    var email = escapeCell(data.email || "");
    var discipline = escapeCell(data.discipline || "");
    var bottleneck = escapeCell(data.bottleneck || "");
    var volume = escapeCell(data.volume || "");
    var hoursSaved = escapeCell(data.hoursSaved || 0);
    var timestamp = escapeCell(data.timestamp || new Date().toISOString());
    
    // 5. Append row to Google Sheet
    sheet.appendRow([timestamp, email, discipline, bottleneck, volume, hoursSaved]);
    
    // 6. Generate Custom Blueprint Advice based on input answers
    var bottleneckTitle = "";
    var bottleneckAdvice = "";
    var disciplineTitle = "";
    
    // Discipline Mapping
    if (discipline === "design") disciplineTitle = "Designer / UI-UX Lead";
    else if (discipline === "development") disciplineTitle = "Developer / Full-Stack Engineer";
    else if (discipline === "writing") disciplineTitle = "Writer & Content Creator";
    else if (discipline === "marketing") disciplineTitle = "Marketer & Brand Strategist";
    else disciplineTitle = "Freelance Specialist";
    
    // Bottleneck mapping
    if (bottleneck === "payments") {
      bottleneckTitle = "Securing Upfront Deposits";
      bottleneckAdvice = 
        "<ul style='margin: 0; padding-left: 20px;'>" +
        "<li style='margin-bottom: 8px;'><b>⚡ Set Up Instant Retainers:</b> Require a 50% advance retainer before sharing any kick-off calendar dates.</li>" +
        "<li style='margin-bottom: 8px;'><b>📱 Auto-Generated Payment Links:</b> Integrate Razorpay or UPI payments directly into your project kickoff page.</li>" +
        "<li style='margin-bottom: 8px;'><b>🔒 Auto-Lock Delivery:</b> Keep assets in a secure preview lock until the final invoice is paid.</li>" +
        "</ul>";
    } else if (bottleneck === "briefs") {
      bottleneckTitle = "Extracting Clear Project Briefs";
      bottleneckAdvice = 
        "<ul style='margin: 0; padding-left: 20px;'>" +
        "<li style='margin-bottom: 8px;'><b>📄 Structure Intake Questionnaires:</b> Use structured forms that don't let the client submit until scope and goals are clear.</li>" +
        "<li style='margin-bottom: 8px;'><b>💬 Async Video Intakes:</b> Provide brief 2-minute video clips walking clients through their answers to prevent confusion.</li>" +
        "<li style='margin-bottom: 8px;'><b>🎯 Strict Scope Alignment:</b> Lock briefs directly to contracts to protect against scope creep.</li>" +
        "</ul>";
    } else if (bottleneck === "contracts") {
      bottleneckTitle = "E-Signature & Contracts Pipeline";
      bottleneckAdvice = 
        "<ul style='margin: 0; padding-left: 20px;'>" +
        "<li style='margin-bottom: 8px;'><b>✍️ Digital Contract Signing:</b> Integrate a digital signer (like DocuSeal or SignWell) straight into the onboarding loop.</li>" +
        "<li style='margin-bottom: 8px;'><b>⏰ Auto-Reminders:</b> Configure a gentle reminder trigger to ping clients if a contract is open for more than 48 hours.</li>" +
        "<li style='margin-bottom: 8px;'><b>💼 Fully Signed Copies:</b> Automatically generate a secure, signed PDF receipt for both you and your client's files.</li>" +
        "</ul>";
    } else if (bottleneck === "assets") {
      bottleneckTitle = "Client Brand Asset Vaults";
      bottleneckAdvice = 
        "<ul style='margin: 0; padding-left: 20px;'>" +
        "<li style='margin-bottom: 8px;'><b>📂 Single Upload Portal:</b> Don't hunt through chat histories. Create a dedicated upload checklist page.</li>" +
        "<li style='margin-bottom: 8px;'><b>📏 Strict Format Validation:</b> Mandate specific formats (e.g. SVG/PNG for logos, Figma links, style guidelines).</li>" +
        "<li style='margin-bottom: 8px;'><b>🔒 Safe Encryption Vaults:</b> Hold sensitive passwords and APIs in secure encrypted containers.</li>" +
        "</ul>";
    } else {
      bottleneckTitle = "Freelance Administrative Pipeline";
      bottleneckAdvice = 
        "<ul style='margin: 0; padding-left: 20px;'>" +
        "<li style='margin-bottom: 8px;'><b>⚡ Streamlined Client Intake:</b> Gather briefs, signed contracts, and upfront retainers under a single unified portal.</li>" +
        "</ul>";
    }
    
    // 7. Compose Premium HTML Email Template
    var subject = "Your HasaBoard Onboarding Blueprint is Here! ⚡";
    
    var htmlBody = 
      "<div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f1f5f9; border-radius: 24px; color: #334155; line-height: 1.6; background-color: #ffffff;\">" +
        "<!-- Header -->" +
        "<div style=\"margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px;\">" +
          "<h2 style=\"font-weight: 900; font-size: 24px; color: #000000; margin: 0; letter-spacing: -0.5px;\">" +
            "Hasa<span style=\"color: #2563eb;\">Board</span>" +
          "</h2>" +
          "<p style=\"font-size: 10px; color: #64748b; margin: 5px 0 0 0; text-transform: uppercase; font-weight: 800; letter-spacing: 1px;\">" +
            "Waitlist Co-Design Campaign" +
          "</p>" +
        "</div>" +
        
        "<!-- Welcome Message -->" +
        "<p style=\"font-size: 15px; margin-top: 0; color: #334155;\">Hi there,</p>" +
        
        "<p style=\"font-size: 15px; color: #334155;\">" +
          "Thanks for casting your vote to help shape <b>HasaBoard</b>! Your vote has been officially registered, and your support helps us build the ultimate freelance client onboarding platform for India." +
        "</p>" +
        
        "<!-- Custom Blueprint Summary -->" +
        "<div style=\"background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px; margin: 25px 0;\">" +
          "<h3 style=\"margin-top: 0; font-weight: 800; color: #1e293b; font-size: 15px; margin-bottom: 12px;\">" +
            "⚡ Your Custom Onboarding Blueprint" +
          "</h3>" +
          "<table style=\"width: 100%; border-collapse: collapse; font-size: 13px;\">" +
            "<tr>" +
              "<td style=\"padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;\">Discipline:</td>" +
              "<td style=\"padding: 6px 0; color: #0f172a; font-weight: 700;\">" + disciplineTitle + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td style=\"padding: 6px 0; color: #64748b; font-weight: 600;\">Main Bottleneck:</td>" +
              "<td style=\"padding: 6px 0; color: #2563eb; font-weight: 700;\">" + bottleneckTitle + "</td>" +
            "</tr>" +
            "<tr>" +
              "<td style=\"padding: 6px 0; color: #64748b; font-weight: 600;\">Monthly Workload:</td>" +
              "<td style=\"padding: 6px 0; color: #0f172a; font-weight: 700;\">" + volume + " clients</td>" +
            "</tr>" +
            "<tr style=\"border-top: 1px solid #e2e8f0;\">" +
              "<td style=\"padding: 10px 0 6px 0; color: #64748b; font-weight: 600;\">Time Recovered:</td>" +
              "<td style=\"padding: 10px 0 6px 0; color: #10b981; font-weight: 800; font-size: 15px;\">Up to " + hoursSaved + " Hours / Month!</td>" +
            "</tr>" +
          "</table>" +
        "</div>" +
        
        "<!-- Actionable Advice -->" +
        "<h4 style=\"color: #0f172a; font-weight: 800; font-size: 13px; margin: 20px 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;\">" +
          "How to eliminate this friction today:" +
        "</h4>" +
        "<div style=\"font-size: 14px; color: #475569; margin-bottom: 20px;\">" +
          bottleneckAdvice +
        "</div>" +
        
        "<p style=\"font-size: 14px; color: #334155;\">" +
          "We are committed to building HasaBoard to automate all of these tasks under a single unified link. Because you voted, we have locked in <b>3 Months of Premium Access 100% Free</b> for your account as soon as we launch!" +
        "</p>" +
        
        "<!-- Support & Footer -->" +
        "<div style=\"margin-top: 35px; border-top: 1px solid #f1f5f9; padding-top: 20px; font-size: 12px; color: #64748b; line-height: 1.5;\">" +
          "<p style=\"margin: 0 0 4px 0; font-weight: 700; color: #0f172a;\">" +
            "Sai Raghu krian Avula" +
          "</p>" +
          "<p style=\"margin: 0 0 15px 0;\">" +
            "Founder, HasaBoard" +
          "</p>" +
          "<p style=\"margin: 0;\">" +
            "Have questions or feedback? Just reply directly to this email or reach us at " +
            "<a href=\"mailto:avulasairaghukiran@gmail.com\" style=\"color: #2563eb; text-decoration: none; font-weight: 600;\">" +
              "avulasairaghukiran@gmail.com" +
            "</a>." +
          "</p>" +
        "</div>" +
      "</div>";
    
    // 8. Execute Email Send through GmailApp
    GmailApp.sendEmail(data.email, subject, "", {
      htmlBody: htmlBody,
      name: "Sai Raghu krian Avula",
      replyTo: "avulasairaghukiran@gmail.com"
    });
    
    // 9. Return success response to the React app
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded and blueprint email sent successfully."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
