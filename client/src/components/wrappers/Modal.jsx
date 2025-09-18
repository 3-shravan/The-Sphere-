import { X } from "lucide-react";

export default function Modal({
  children,
  title,
  onCancel,
  darkModal = false,
}) {
  return (
    <div
      className={`fixed inset-0 not-[]:backdrop-blur-xs flex items-center justify-center z-50
        ${darkModal ? "bg-black" : "bg-black/60"}`}
    >
      <div className="bg-background rounded-xl shadow-lg p-4 md:p-6 min-w-80 max-h-[70vh] overflow-y-auto">
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
    </div>
  );
}
