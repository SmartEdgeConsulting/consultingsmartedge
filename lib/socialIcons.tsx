// src/lib/icons.tsx
import React from "react";

export const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="#FFFFFF"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5ZM7.059 19H4.142V9h2.917v10ZM5.601 7.682a1.691 1.691 0 1 1 0-3.382 1.691 1.691 0 0 1 0 3.382ZM20 19h-2.917v-4.933c0-1.175-.021-2.687-1.64-2.687-1.642 0-1.893 1.283-1.893 2.606V19h-2.916V9h2.8v1.364h.04c.39-.739 1.342-1.516 2.76-1.516 2.953 0 3.496 1.944 3.496 4.472V19Z" />
  </svg>
);

export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.5" fill="#FFFFFF" />
  </svg>
);


export const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="#FFFFFF"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24h11.495v-9.333H9.847v-3.648h2.973V8.413c0-2.94 1.796-4.547 4.417-4.547 1.255 0 2.333.093 2.646.135v3.068h-1.817c-1.425 0-1.7.677-1.7 1.669v2.186h3.391l-.442 3.648h-2.949V24h5.782C23.403 24 24 23.403 24 22.667V1.333C24 .597 23.403 0 22.675 0Z" />
  </svg>
);

export const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    fill="#FFFFFF"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a2.997 2.997 0 0 0-2.112-2.12C19.396 3.5 12 3.5 12 3.5s-7.396 0-9.386.566a2.997 2.997 0 0 0-2.112 2.12A31.31 31.31 0 0 0 0 12a31.31 31.31 0 0 0 .502 5.814 2.997 2.997 0 0 0 2.112 2.12C4.604 20.5 12 20.5 12 20.5s7.396 0 9.386-.566a2.997 2.997 0 0 0 2.112-2.12A31.31 31.31 0 0 0 24 12a31.31 31.31 0 0 0-.502-5.814ZM9.75 15.5v-7L15.5 12l-5.75 3.5Z" />
  </svg>
);
