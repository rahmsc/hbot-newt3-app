interface TitlePillProps {
  children: React.ReactNode;
}

export default function TitlePill({ children }: TitlePillProps) {
  return (
    <div className="mb-6 w-fit">
      <div className="rounded-full bg-black px-8 py-3">
        <h2 className="text-xl font-medium text-white">{children}</h2>
      </div>
    </div>
  );
}
