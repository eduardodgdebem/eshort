import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.includes("_next")) return;

  if (req.nextUrl.pathname.startsWith("/api/get-url")) return;

  const slug = req.nextUrl.pathname.split("/").pop();
  
  const data = await (
    await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
  ).json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}