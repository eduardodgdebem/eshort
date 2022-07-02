import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes("_next")) return;

  if (req.nextUrl.pathname.startsWith("/api/get-url")) return;

  const slug = req.nextUrl.pathname.split("/").pop();

  if(!slug) return;

  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  
  if (slugFetch.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin);
  }

  const data = await slugFetch.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}
