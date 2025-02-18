import { createClient } from '@supabase/supabase-js';
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

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

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    );

    const body = await request.json()

    // Debug log to see what data is being received
    console.log('Received body:', body);

    // Validate all required fields
    const requiredFields = [
      "businessType",
      "businessName",
      "legalName",
      "userRole",
      "firstName",
      "lastName",
      "email",
      "phone",
    ]
    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate business type
    if (!validBusinessTypes.includes(body.businessType)) {
      console.log('Invalid business type:', body.businessType);
      return NextResponse.json(
        { error: `Invalid business type: ${body.businessType}. Valid types are: ${validBusinessTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Get IP address and user agent from request
    const ip_address = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip")
    const user_agent = request.headers.get("user-agent")

    // Map form field names to database column names
    const providerData = {
      business_type: body.businessType,
      business_name: body.businessName,
      legal_business_name: body.legalName,
      role: body.userRole,
      first_name: body.firstName,
      last_name: body.lastName,
      email: body.email,
      phone: body.phone,
      is_authorized: body.isAuthorized || false,
      status: "pending",
      ip_address,
      user_agent,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      website: body.website || null,
      assessment_score: null,
      assessment_date: null,
      assessment_notes: null,
      verification_documents: null,
    }

    // Debug log to see what data is being sent to Supabase
    console.log('Provider data to insert:', providerData);

    // Insert the provider data
    const { data, error } = await supabase.from("providers").insert([providerData]).select().single()

    if (error) {
      console.error("Error submitting provider:", error)
      return NextResponse.json({ error: "Failed to submit provider", details: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Provider submitted successfully", provider: data }, { status: 201 })
  } catch (error) {
    console.error("Error in submit-provider route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

