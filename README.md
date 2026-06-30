# Premium Full-Stack Dashboard

A production-ready Next.js 15 template designed for premium SaaS and admin dashboards. Built with modern UI patterns, dark mode support, and role-based access control (RBAC).

## Features

- **Next.js 15 App Router**
- **Tailwind CSS 4** (with custom minimal design system)
- **NextAuth.js** Authentication
- **Role-Based Access Control (RBAC)** Middleware (Admin vs Client routing)
- **Recharts** interactive data visualizations
- **Lucide Icons**
- **Dynamic Dark/Light Themes**

## 🚀 Getting Started

### 1. Environment Setup (Critical)

This project uses NextAuth.js for secure authentication. You **must** set up your environment variables before running the development server.

Create a `.env` file in the root of your project:

```bash
touch .env
```

Add the following secret keys to your `.env` file:

```env
# NextAuth Secret is required for signing JWT tokens and cookies.
# You can generate a random secret by running this command in your terminal:
# openssl rand -base64 32
AUTH_SECRET="your-super-secret-32-character-string"

# Optional: Set the NextAuth URL (defaults to localhost in dev)
# NEXTAUTH_URL="http://localhost:3000"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication System

The template includes two pre-configured mock users to test the RBAC (Role-Based Access Control) system:

- **Admin Login:**
  - Email: `admin@example.com`
  - Password: `password`
  - Routes to: `/dashboard/admin`

- **Client Login:**
  - Email: `client@example.com`
  - Password: `password`
  - Routes to: `/dashboard/client`

The `middleware.ts` file automatically protects routes and ensures users can only access pages assigned to their specific roles.
