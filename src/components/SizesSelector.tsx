export default function SizesSelector({ active, color, sizes, onSelect }: { color: string, sizes: number[], onSelect: (size: number) => void, active: number }) {

  return <div className="flex items-center gap-3 max-h-max">{
    sizes.map(size => (
      <button
        key={size}
        onClick={() => { onSelect(size) }}
        className={`rounded-full hover:opacity-75 border-dotted ${active === size ? "ring-[1px] ring-red-400 p-[2px]" : ""}`}
      >
        <div className="rounded-full cursor-pointer"
          style={{
            width: `${size * 2}px`,
            height: `${size * 2}px`,
            backgroundColor: color,
          }}
        />
      </button>
    ))
  }
  </div>;
}
