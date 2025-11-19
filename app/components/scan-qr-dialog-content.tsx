import Image from "next/image";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

function ScanQrToDownloadDialogContent() {
  return (
    <DialogContent className="bg-surface-bright max-w-[90%] sm:max-w-[400px]">
      <DialogHeader className="text-left space-y-2">
        <DialogTitle>Scan QR to Download App</DialogTitle>
        <DialogDescription>
          A real-time, human way to shop locally — connecting customers and
          sellers within minutes.
        </DialogDescription>
      </DialogHeader>
      <figure className="size-[200px] bg-gray-200 rounded-lg">
        <Image width={200} height={200} src="/qr.png" alt="karobar qr" />
      </figure>
    </DialogContent>
  );
}

export default ScanQrToDownloadDialogContent;
