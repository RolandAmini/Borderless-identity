The Borderless Identity
This is the official repository for The Borderless Identity web application, built with Next.js and deployed via Vercel.

## Live Production

The project is officially live and secured at:
https://theborderlessidentity.com

## Tech Stack

Framework: Next.js (App Router)

Deployment: Vercel

Domain Management: Namecheap with custom DNS configuration

Networking: Configured with A Record (216.198.79.1) and CNAME Record (cname.vercel-dns.com)

Optimization: Uses next/font to automatically load and optimize the Geist font family.

## Local Development

Follow these steps to run the project locally:
git clone https://github.com/your-username/borderless-identity.git

Install dependencies:
npm install
# or
yarn install

Run the development server:
npm run dev

Open http://localhost:3000 with your browser to see the result

## Project Structure

app/: Contains the main application logic, routes, and components.

public/: Static assets including images and icons.

DNS Configuration: The domain is pointed to Vercel's edge network for high performance and global availability.

## Deployment & CI/CD

The project features a continuous deployment pipeline through Vercel. Every push to the main branch triggers an automatic production build and update.

Main Domain: theborderlessidentity.com

Vercel URL: borderless-identity.vercel.app

Developed by Roland Amini
