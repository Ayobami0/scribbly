import { Loader2, LucideProps } from "lucide-react";
import { RefAttributes } from "react";

export default function Spinnner(props: JSX.IntrinsicAttributes & Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>) {
  return <>
    <Loader2 className="animate-spin" {...props} />
  </>
}
