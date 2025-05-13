export default function BoardProgressIndicator() {
  return (
    <div className="flex space-x-1 items-center justify-center w-fit  h-fit">
      <div className="w-3 h-3 bg-black rounded-full flowing-bounce" style={{ animationDelay: "0s" }} />
      <div className="w-3 h-3 bg-red-500 rounded-full flowing-bounce" style={{ animationDelay: "0.15s" }} />
      <div className="w-3 h-3 bg-yellow-500 rounded-full flowing-bounce" style={{ animationDelay: "0.3s" }} />
      <div className="w-3 h-3 bg-blue-500 rounded-full flowing-bounce" style={{ animationDelay: "0.45s" }} />
      <div className="w-3 h-3 bg-green-500 rounded-full flowing-bounce [animation-delay:0.6s]" style={{ animationDelay: "0.6s" }} />
    </div>
  );
}
