import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    console.error("Missing URL parameter in proxy-image request");
    return new NextResponse("Missing URL parameter", { status: 400 });
  }

  try {
    console.log(`Proxy-image: Fetching ${url}`);
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!response.ok) {
      console.error(
        `Proxy-image: Failed to fetch image, status: ${response.status}`,
      );
      return new NextResponse(`Failed to fetch image: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentType = response.headers.get("Content-Type");
    console.log(
      `Proxy-image: Successfully fetched image, content-type: ${contentType}`,
    );

    const imageBuffer = await response.arrayBuffer();
    console.log(`Proxy-image: Image size: ${imageBuffer.byteLength} bytes`);

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error proxying image:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
