import Airtable from "airtable";
import { NextResponse } from "next/server";

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
const base = airtable.base(process.env.AIRTABLE_BASE_ID ?? "");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const recordId = searchParams.get("id");

  try {
    if (!recordId) {
      return NextResponse.json(
        { error: "Record ID is required" },
        { status: 400 },
      );
    }

    console.log(`Fetching record with ID: ${recordId}`);

    const record = await base("Guides").find(recordId);

    console.log("Fetched record:", record);

    if (!record) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 });
    }

    // Return the record data
    return NextResponse.json(
      {
        id: record.id,
        fields: record.fields,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching guide:", error);
    return NextResponse.json(
      { error: "Error fetching guide data" },
      { status: 500 },
    );
  }
}
