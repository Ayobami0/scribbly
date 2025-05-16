import { Copy, Users } from "lucide-react";
import { Tooltip } from "react-tooltip";

export default function InfoToolBar({ shareLink }: { shareLink: string }) {
  const share = async () => {
    await navigator.clipboard.writeText(shareLink);
  }
  return <>
    <a
      data-tooltip-id="share"
      className="flex absolute right-5 top-5 space-x-3 rounded-xl shadow-xl px-3 py-3 items-center"
    >
      <Users className="w-5 h-5" />
      <p className="text-[15px]">1</p>
    </a >
    <Tooltip id="share" clickable noArrow className="item-tooltip">
      <div className="flex flex-col gap-2">
        Invite participants
        <div className="flex items-center gap-5 rounded-md bg-black/5 px-2">
          {shareLink}
          <Copy onClick={share} width={15} height={15} className="cursor-pointer hover:color-blue-100"/>
        </div>
      </div>
    </Tooltip>
  </>
}
