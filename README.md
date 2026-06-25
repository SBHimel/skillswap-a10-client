# 🚀 SkillSwap - Client Application

<div align="center">
  <a href="https://your-vercel-live-link.vercel.app"><strong>🔗 View Live Website</strong></a>
</div>
<br>

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/HeroUI-000000?style=for-the-badge&logo=figma&logoColor=white" alt="HeroUI" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

## 📖 Project Purpose
**SkillSwap** is a modern, highly responsive skill-sharing and freelancing platform. This client-side application serves as the interactive frontend, allowing users to seamlessly switch between finding freelance talent and offering their own skills. It features dynamic role-based routing, robust authentication, and a premium user interface designed for maximum engagement.

## ✨ Key Features
* **🔒 Secure Authentication:** Powered by Better Auth, supporting both Email/Password and Google OAuth login methods.
* **🎭 Role-Based Access Control (RBAC):** Dynamic dashboards and private routes tailored specifically for `freelancer`, `client`, and `admin` roles.
* **🛡️ Protected Routes & Session Persistence:** Custom handlers ensure private dashboards never crash or lose state upon page reloads.
* **🛑 Real-time Account Status:** Immediate interception of blocked users right at the sign-in phase, preventing unauthorized access.
* **🎨 Premium UI/UX Layout:** Built with HeroUI and Tailwind CSS, featuring smooth transitions, aesthetic glass-morphism inputs, clean colors, proper text spacing, and a fully responsive layout for mobile, tablet, and desktop screens.
* **🔔 Interactive Error Handling:** Beautiful, user-friendly error messages across all forms, input fields, and router paths.

## 🛠️ Tech Stack & NPM Packages
* **Framework:** Next.js (App Router)
* **UI Components:** `@heroui/react`
* **Styling:** Tailwind CSS (`tailwindcss`)
* **Icons:** `lucide-react`
* **Authentication:** `@better-auth/react`

## 🔐 Environment Variables (.env.local)
All frontend secret keys are kept safe. To run this project locally, create a `.env.local` file in the root directory and add the following secure keys:

```env
# Better Auth Configuration
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_super_secret_key

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

🚀 Run Locally
Follow these steps to run the client-side application on your local machine:

1. Clone the repository:

Bash
git clone <your-github-repo-link>


2. Navigate to the client folder:

Bash
cd skillswap-client


3. Install dependencies:

Bash
npm install


4. Start the development server:

Bash
npm run dev


5. Open your browser: Navigate to http://localhost:3000


শুধু পেস্ট করার পর **`https://your-vercel-live-link.vercel.app`** এর জায়গায় তোমার আসল লাইভ লিংকটা