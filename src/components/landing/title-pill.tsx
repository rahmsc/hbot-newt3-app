interface TitlePillProps {
  children: React.ReactNode;
}

export default function TitlePill({ children }: TitlePillProps) {
  return (
    <div className="w-fit">
      <div className="rounded-xl bg-black px-4 py-1">
        <h2 className="text-xl font-medium tracking-widest text-white">
          {children}
        </h2>
      </div>
    </div>
  );
}
