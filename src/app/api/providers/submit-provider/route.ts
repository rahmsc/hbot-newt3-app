import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { geocodeAddress } from "~/actions/geocode-address";

// Define the valid business types to match your database
const validBusinessTypes = [
  "wellness_centre",
  "hospital",
  "medical_practice",
  "chiropractor",
  "physiotherapist",
  "gym",
  "other",
] as const;

const validChamberTypes = [
  "Hard Shell",
  "Soft Shell",
  "Monoplace",
  "Multiplace",
];

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    );

    const body = await request.json();

    // Validate all required fields
    const requiredFields = [
      "business_type",
      "business_name",
      "legal_business_name",
      "your_role",
      "first_name",
      "last_name",
      "email",
      "phone",
      "address",
      "chamber_type",
      "pressure_capacity",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Validate business type
    if (!validBusinessTypes.includes(body.business_type)) {
      return NextResponse.json(
        {
          error: `Invalid business type: ${body.business_type}. Valid types are: ${validBusinessTypes.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Validate chamber type
    if (!validChamberTypes.includes(body.chamber_type)) {
      return NextResponse.json(
        {
          error: `Invalid chamber type: ${body.chamber_type}. Valid types are: ${validChamberTypes.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // Geocode the address to get coordinates
    let latitude = null;
    let longitude = null;
    if (body.address) {
      const coordinates = await geocodeAddress(body.address);
      if (coordinates) {
        latitude = coordinates.lat;
        longitude = coordinates.lng;
      }
    }

    // Get IP address and user agent from request
    const ip_address =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip");
    const user_agent = request.headers.get("user-agent");

    // Map form field names to database column names
    const providerData = {
      business_type: body.business_type,
      business_name: body.business_name,
      legal_business_name: body.legal_business_name,
      your_role: body.your_role,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      website: body.website || null,
      booking_link: body.booking_link || null,
      chamber_type: body.chamber_type,
      pressure_capacity: body.pressure_capacity,
      hours: body.hours,
      approved: body.approved ?? false,
      created_at: new Date().toISOString(),
      latitude,
      longitude,
    };

    // Insert the provider data
    const { data, error } = await supabase
      .from("providers")
      .insert([providerData])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to submit provider", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Provider submitted successfully", provider: data },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server error processing submission",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
