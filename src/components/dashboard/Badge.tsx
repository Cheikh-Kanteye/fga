/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Download, Share2 } from "lucide-react";
import { Participant } from "@/types";

interface BadgeProps {
  participant: Participant;
  className?: string;
}

const Badge = ({ participant, className }: BadgeProps) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const getParticipantTypeColor = () => {
    switch (participant.type) {
      case "panelist":
        return "bg-[#FEF7CD] text-galien-blue";
      case "student":
        return "bg-[#E5DEFF] text-galien-blue";
      case "press":
        return "bg-[#FDE1D3] text-galien-blue";
      default:
        return "bg-[#D3E4FD] text-galien-blue";
    }
  };

  const qrValue = `https://forumgalien.com/participants/${participant.id}`;

  const handleDownload = async () => {
    try {
      // Check if html2canvas is available, if not, dynamically import it
      if (!(window as any).html2canvas) {
        const html2canvasModule = await import("html2canvas");
        (window as any).html2canvas = html2canvasModule.default;
      }

      if (badgeRef.current && (window as any).html2canvas) {
        // Create a deep clone of the badge to manipulate for download
        const badgeClone = badgeRef.current.cloneNode(true) as HTMLDivElement;

        // Set explicit dimensions and styling for the clone
        badgeClone.style.width = "400px";
        badgeClone.style.height = "auto";
        badgeClone.style.position = "absolute";
        badgeClone.style.left = "-9999px";
        badgeClone.style.top = "-9999px";
        badgeClone.style.opacity = "1";
        badgeClone.style.visibility = "visible";

        // Remove any transformations that could affect rendering
        badgeClone.style.transform = "none";
        badgeClone.style.transition = "none";

        // Ensure all elements inside the clone have full opacity
        const allElements = badgeClone.querySelectorAll("*");
        allElements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.opacity = "1";
            el.style.visibility = "visible";

            // Remove any classes that might affect opacity or visibility
            el.classList.remove(
              "bg-opacity-50",
              "text-opacity-50",
              "opacity-50",
              "opacity-75",
              "animate-fade-in",
              "animate-scale-in"
            );

            // Remove any animations or transitions
            el.style.animation = "none";
            el.style.transition = "none";
            el.style.transform = "none";
          }
        });

        // Add the clone to the body temporarily
        document.body.appendChild(badgeClone);

        // Capture the badge with html2canvas
        // @typescript-eslint/no-explicit-any
        const canvas = await (window as any).html2canvas(badgeClone, {
          scale: 3, // Higher scale for better quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          removeContainer: true, // Remove the container after rendering
          logging: false,
          onclone: (clonedDoc) => {
            // Make sure everything in the cloned document is fully opaque
            const clonedBadge = clonedDoc.querySelector(
              '[data-badge-clone="true"]'
            );
            if (clonedBadge instanceof HTMLElement) {
              clonedBadge.style.opacity = "1";

              // Force all child elements to be fully opaque
              const elements = clonedBadge.querySelectorAll("*");
              elements.forEach((el) => {
                if (el instanceof HTMLElement) {
                  el.style.opacity = "1";
                  el.style.visibility = "visible";
                }
              });
            }
          },
        });

        // Remove the clone from the DOM
        document.body.removeChild(badgeClone);

        // Create and trigger download
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${participant.lastName}-${participant.firstName}-badge.png`;
        link.href = url;
        link.click();
        toast.success("Badge downloaded successfully!");
      }
    } catch (error) {
      console.error("Error downloading badge:", error);
      toast.error("Failed to download badge");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        // For actual implementation, we would need to convert the badge to a file
        await navigator.share({
          title: `${participant.firstName} ${participant.lastName} - Forum du Galien Badge`,
          text: "Here is my Forum du Galien badge!",
          url: window.location.href,
        });
        toast.success("Badge shared successfully!");
      } catch (error) {
        console.error("Error sharing badge:", error);
        toast.error("Failed to share badge");
      }
    } else {
      toast.info("Sharing is not available on this device");
    }
  };

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <div
        ref={badgeRef}
        data-badge-clone="true"
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-md mx-auto border border-gray-100 relative"
      >
        {/* Header - Updated with Galien blue */}
        <div className="bg-galien-blue p-4 text-white text-center relative">
          <h2 className="text-xl font-display font-semibold">
            Forum du Galien
          </h2>
        </div>

        {/* Badge content */}
        <div className="p-6 flex flex-col items-center space-y-4">
          {/* Participant type pill */}
          <div
            className={cn(
              "px-4 py-1 rounded-full text-sm font-medium",
              getParticipantTypeColor()
            )}
          >
            {participant.type.charAt(0).toUpperCase() +
              participant.type.slice(1)}
          </div>

          {/* Name */}
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-display font-bold text-galien-blue">
              {participant.firstName} {participant.lastName}
            </h3>
            <p className="text-sm text-gray-500">{participant.organization}</p>
          </div>

          {/* QR Code */}
          <div className="bg-white p-3 rounded-xl border border-gray-100">
            <QRCodeSVG
              value={qrValue}
              size={180}
              bgColor="#FFFFFF"
              fgColor="#13214a"
              level="H"
              includeMargin={false}
            />
          </div>

          {/* ID */}
          <div className="text-sm text-gray-400">
            ID: {participant.id.substring(0, 8)}
          </div>
        </div>

        {/* Footer - Updated with Galien blue */}
        <div className="bg-galien-blue p-3 text-center text-xs text-white">
          Scan to verify authenticity
        </div>
      </div>

      {/* Badge Actions */}
      <div className="flex justify-center space-x-3">
        <Button
          onClick={handleDownload}
          className="bg-white border border-galien-blue text-galien-blue hover:bg-galien-blue hover:text-white transition-colors"
          size="sm"
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="border-gray-200 text-gray-600 hover:bg-gray-50"
          size="sm"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  );
};

export default Badge;
