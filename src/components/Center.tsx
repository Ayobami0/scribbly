export default function Center({ children }: { children: React.ReactNode }) {
  return <div className="flex size-full justify-center items-center">
    {children}
  </div>
}
