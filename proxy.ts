// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/services",
  "/careers",
  "/events",
  "/contact",
  "/blog",
  "/login(.*)",
  "/sign-up(.*)",
  "/sign-up/verify(.*)",
  "/unauthorized",
  "/api/subscribe(.*)", 
  "/api/webhooks/clerk(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // If route is public, allow access
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // If user is not signed in and trying to access protected route
  if (!userId) {
    const unauthorizedUrl = new URL("/unauthorized", request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // User is authenticated, allow access
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
