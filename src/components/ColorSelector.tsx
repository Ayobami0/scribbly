function ColorSelector({ color, active, onSelect }: { color: string; active?: boolean; onSelect?: (color: string) => void; }) {
  return (
    <div onClick={() => {
      if (!onSelect) return;
      onSelect(color);
    }}
      className={`rounded-full ${active ? 'p-[1px] border border-dashed' : ''} hover:opacity-60`}
      style={active ? { borderColor: color } : {}}
    >
      <div className='w-4 h-4 rounded-full'
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}

export default ColorSelector;
