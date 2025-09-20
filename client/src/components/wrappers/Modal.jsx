import { X } from "lucide-react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  title,
  onCancel,
  darkModal = false,
}) {
  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center z-[998] backdrop-blur-xs 
        ${darkModal ? "bg-black/90" : "bg-black/60"}`}
    >
      <div className="bg-background relative rounded-xl shadow-lg p-4 w-[85%] md:p-6 md:w-[40%] z-[999] ">
        <div className="flex items-center justify-between mb-3">
          {title && (
            <h2 className="flex-1 text-center text-base font-semibold text-foreground">
              {title}
            </h2>
          )}
          {onCancel && (
            <X
              className="absolute right-4 top-5 cursor-pointer text-muted-foreground hover:text-foreground transition"
              size={18}
              onClick={onCancel}
            />
          )}
        </div>
        {/* Specific Modal */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}
