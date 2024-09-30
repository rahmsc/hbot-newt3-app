import Airtable from "airtable";
import { notFound } from "next/navigation";
import { RichTextGuide } from "~/components/rich-text-guide";

export interface GuideProp {
  id: string;
  fields: {
    "Guide Title": string;
    Guide: string;
  };
}

async function getGuideById(id: string): Promise<GuideProp | null> {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
  }).base(process.env.AIRTABLE_BASE_ID ?? "");

  return new Promise((resolve, reject) => {
    base("Guides")
      .select({
        filterByFormula: `RECORD_ID() = '${id}'`,
        maxRecords: 1,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error("Error fetching guide:", err);
          reject(new Error(String(err)));
          return;
        }
        if (!records || records.length === 0) {
          resolve(null);
          return;
        }
        const record = records[0];
        if (record) {
          resolve({
            id: record.id,
            fields: record.fields as GuideProp["fields"],
          });
        } else {
          resolve(null);
        }
      });
  });
}

export default async function GuidePage({
  params,
}: {
  params: { id: string };
}) {
  const guide = await getGuideById(params.id);

  if (!guide) {
    notFound();
  }

  return (
    <section className="flex w-full flex-col items-center justify-center pt-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">
          {guide.fields["Guide Title"]}
        </h1>
        <RichTextGuide data={guide} />
      </div>
    </section>
  );
}
