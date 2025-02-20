import { NextRequest, NextResponse } from "next/server";
import {
  incrementBlogViewCount,
  updateLastViewed,
} from "./app/(portfolio)/blog/actions";

export const config = {
  matcher: "/blog/:path*",
};

export async function middleware(request: NextRequest) {
  return blogViewMiddleware(request);
}

const blogViewMiddleware = async (request: NextRequest) => {
  // get the path from the request
  const path = request.nextUrl;
  // check if the path is a blog post
  if (path.pathname.includes("/blog/")) {
    // get the blog title from the pathname
    const title = path.pathname.replace("/blog/", "");

    const response = NextResponse.next();
    // Check if they have a viewed cookie for this blog post
    const blogCookie = request.cookies.get(title);
    if (!blogCookie || blogCookie.value !== "viewed") {
      // increment the view count for the blog post
      await incrementBlogViewCount(title);
      response.cookies.set(title, "viewed");
    }
    await updateLastViewed(title);
    return response;
  }
};
