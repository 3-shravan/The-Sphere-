import { X } from "lucide-react";

const Modal = ({ children, title = "Share", onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-background relative border shadow-lg p-5 min-w-100 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex-1 text-center text-base font-semibold text-foreground">
            {title}
          </h2>
          <X
            className="absolute right-4 top-5 cursor-pointer text-muted-foreground hover:text-foreground transition"
            size={18}
            onClick={onCancel}
          />
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
