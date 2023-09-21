# TWIDDLE: The Complete Social Media Application 🌟

![TWIDDLE Logo](https://www.svgrepo.com/show/344887/grid-1x2.svg)

## Overview

TWIDDLE is a revolutionary social media platform built using cutting-edge technologies that offer users a seamless and feature-rich experience. Our technology stack includes both backend and frontend components, as well as various integration packages, to ensure a robust and efficient application.

## Overview

- Live link : www.twiddles.online/

## Technologies Used

### Backend
- Node.js and Express for a scalable and maintainable backend, with TypeScript for clean code architecture.
- MongoDB for a flexible and reliable database solution.
- AWS S3 bucket for efficient storage and retrieval of images.

### Frontend
- React, Redux, and Tailwind CSS for a responsive and visually appealing user interface.
- TypeScript EC6 for programming, ensuring type safety and enhanced productivity.
- Axios for handling HTTP requests, providing seamless communication between the frontend and backend.

### Integration Packages
- JSON Web Token (jsonwebtoken) for secure user authentication and authorization.
- Nodemailer for sending registration confirmation emails with login links.
- Google Auth for easy and secure login options.
- Zego Cloud for efficient video call functionality.
- Stripe integration for seamless payment processing and premium account features.

## Features

### 1️⃣ Authentication
- Allow users to log in directly using email credentials.
- Send registration confirmation emails with login links using Nodemailer.

### 2️⃣ Posts
- Empower users to create, edit, and report posts.
- Utilize react-easy-crop for easy image cropping during post uploads.
- Store post images in an AWS S3 bucket for optimal performance and scalability.
- Enable users to like, comment, and save posts.
- Allow users to add and delete comments.

### 3️⃣ Profile
- Enable users to follow/unfollow other users.
- Facilitate direct messaging between users.
- Empower users to edit their bio, change profile photos, and update passwords.
- Display saved posts on the user's profile page.
- Implement Stripe for seamless payment integration for premium accounts.
- Offer a customizable theme with dark mode and light mode options.
- Enable users to search for other users.

### 4️⃣ Messages and Notifications
- Utilize socket.io for real-time messaging and notifications.
- Implement Zego Cloud for efficient video call functionality.

### 5️⃣ Admin Side
- Provide administrators with the ability to block users.
- Allow admins to block posts reported by users and delete them if necessary.
- Enable admin management of verified users from a centralized list.

## Hosting

TWIDDLE is hosted on an AWS instance, leveraging Nginx for optimal performance and reliability. The application is deployed using PM2, ensuring seamless operation and scalability.

## Get Started

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure environment variables (e.g., database connection, Stripe API keys).
4. Run the application using `npm start`.

## Contribute

We welcome developers, designers, and social media enthusiasts to join us in enhancing TWIDDLE. Feel free to submit pull requests and contribute to our exciting journey of redefining social media!

