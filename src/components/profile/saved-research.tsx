import { SavedArticles } from "~/components/profile/saved-articles";
import { SavedChambers } from "./saved-chambers";

interface SavedResearchProps {
  userId: string;
}

export function SavedResearch({ userId }: SavedResearchProps) {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Saved Articles</h2>
        <SavedArticles userId={userId} />
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">Saved Chambers</h2>
        <SavedChambers userId={userId} />
      </section>
    </div>
  );
}
