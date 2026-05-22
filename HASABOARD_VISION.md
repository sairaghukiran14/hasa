# HasaBoard — Onboard Clients With One Link ⚡

Created by **Sai Raghu krian Avula**, HasaBoard is India's first client onboarding platform built specifically to help freelancers stop the administrative chaos and consolidate their workflow into a single elegant portal.

This project delivers a premium, highly interactive **validation landing page & automated CRM backend** to test and scale the HasaBoard product concept.

---

## 🎯 The Core Problem We Solve
Freelancers lose **3 to 8 hours per client** on manual administrative tasks. HasaBoard replaces a disjointed stack of messy tools (WhatsApp, forms, email chains, payment reminders, files) with a single link that handles:
1. **Upfront Deposits:** Simulating instant UPI advance collection (Razorpay secured).
2. **Legal Agreements:** Simulating instant, digitally signed service agreements (DocuSeal).
3. **Project Intake:** Gathering clear, structured design/dev brief questionnaires.
4. **Brand Assets:** Securely uploading and holding logos and files in a preview-locked vault.

---

## 🚀 Key Achievements of This Project

### 1. High-Converting Interactive Diagnostic Funnel
* **Friction Estimator:** A 4-step wizard that calculates exactly how many administrative hours the freelancer loses each month based on their client volume.
* **Interactive Star Testimonials:** Features active state controls and dynamic client quote variations on the final waitlist form.
* **Aesthetic Spring Motion:** Polished transitions using `framer-motion` and physical trailing cursor models.

### 2. 100% Free & Unlimited Serverless CRM (Google Sheets)
* **Zero Infrastructure Cost:** Connects directly to Google Sheets using a custom, secure Google Apps Script macro.
* **Enterprise Security Protections:** Hardened backend that verifies requests against a pre-authorized secret token and automatically strips spreadsheet/CSV formula injection attacks.
* **LocalStorage Backup:** Integrates automatic browser state serialization as a failsafe to guarantee you never lose a lead, even if offline.

### 3. Fully Automated Email Blueprint Delivery
* **Branded Dispatch:** Automatically sends personalized, responsive HTML onboarding blueprints to new waitlist subscribers immediately upon registration.
* **Strategic Copywriting:** Replaces raw metrics (like the `53` vote counts) with premium, high-converting launch copy.
* **Customer Care Sign-off:** Dispatches emails on behalf of **Sai Raghu krian Avula** with direct replies pointing to `avulasairaghukiran@gmail.com`.

### 4. Interactive SaaS Sandbox Simulator Grid
The page alternates exactly one interactive sandbox widget per section, offering visitors a hands-on preview of the HasaBoard software:
* **UPI Retainer Slider:** Slider dashboard displaying take-home pay, GST adjustments (+18%), and TDS deductions (-10%).
* **WhatsApp Notification Hub:** Real-time push alert simulators triggering progress updates.
* **Workspace Theme Customizer:** Live customizer letting users test workspace color palettes in real-time.

---

## 🛠️ The Technical Stack
* **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide icons, and Framer Motion.
* **Database/Backend:** Google Sheets API & Google Apps Script (JavaScript).
* **Security & Auth:** Vite environment signature tokens & CSV cell sanitation.
* **Hosting & CD:** GitHub repository integration coupled with automatic builds via Vercel CDN.
