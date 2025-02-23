export function MetadataItem({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) {
    return (
      <div className="flex h-[52px] flex-col items-center justify-between overflow-hidden rounded-full bg-white/10 p-2 backdrop-blur-sm">
        <div className="font-mono text-xs tracking-[0.2em] text-gray-300">
          {label}
        </div>
        <div className="font-['Roboto'] text-sm tracking-widest text-white">
          {value}
        </div>
      </div>
    );
  }