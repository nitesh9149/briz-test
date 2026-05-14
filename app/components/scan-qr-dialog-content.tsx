import Image from "next/image";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import type { Dictionary } from "@/app/[lang]/dictionaries";

function ScanQrToDownloadDialogContent({ dict }: { dict: Dictionary }) {
  const t = dict.qrDialog;
  return (
    <DialogContent className="bg-surface-bright max-w-[90%] sm:max-w-[400px]">
      <DialogHeader className="text-left space-y-2">
        <DialogTitle>{t.title}</DialogTitle>
        <DialogDescription>{t.description}</DialogDescription>
      </DialogHeader>
      <figure className="size-[200px] bg-gray-200 rounded-lg">
        <Image width={200} height={200} src="/qr.png" alt="karobar qr" />
      </figure>
    </DialogContent>
  );
}

export default ScanQrToDownloadDialogContent;
