export default function ResearchArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      {children}
    </div>
  );
}
