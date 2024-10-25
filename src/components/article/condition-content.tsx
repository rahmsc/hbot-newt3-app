import Link from "next/link";
import getArticlesByCondition from "~/utils/airtable/getArticlesByCondition";
import ArticleRow from "./article-preview";
import { sendGAEvent } from "@next/third-parties/google";

export default async function ConditionContent({
  conditionTag,
}: {
  conditionTag: string;
}) {
  const filteredArticles = await getArticlesByCondition(conditionTag);

  if (!filteredArticles || filteredArticles.length === 0) {
    return <div>No articles found for this condition.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      {filteredArticles.map((article) => (
        <Link
          key={article.id}
          href={`/research/${conditionTag}/${article.id}`}
          className="group"
          onClick={() =>
            sendGAEvent("event", "buttonClicked", {
              value: `Research Article ${article.id}`,
            })
          }
        >
          <ArticleRow article={article} />
        </Link>
      ))}
    </div>
  );
}
