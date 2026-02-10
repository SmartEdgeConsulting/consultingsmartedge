// proxy.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/services(.*)",
  "/careers(.*)",
  "/events",
  "/contact",
  "/courses",
  "/blog",
  "/unsubscribe",
  "/forgot-password(.*)",
  "/login(.*)",
  "/sign-up(.*)",
  "/sign-up/verify(.*)",
  "/api/subscribe(.*)",
  "/api/unsubscribe(.*)",
  "/api/contact(.*)",
  "/api/uploadthing(.*)",
  "/api/sanity-webhook",
  "/api/webhooks/clerk(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Debug logging
  console.log("Pathname:", request.nextUrl.pathname);
  console.log("Is public route?", isPublicRoute(request));
  console.log("User ID:", userId);

  // If route is public, allow access
  if (isPublicRoute(request)) {
    console.log("Allowing access to public route");
    return NextResponse.next();
  }

  // If user is not signed in and trying to access protected route
  if (!userId) {
    console.log("Redirecting to sign-up");
    const unauthorizedUrl = new URL("/sign-up", request.url);
    return NextResponse.redirect(unauthorizedUrl);
  }

  // User is authenticated, allow access
  console.log("Allowing access to protected route");
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|robots.txt|sitemap.xml|favicon\\.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|jpg|webp|png|gif|svg|ico|ttf|woff2?|eot|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
