import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <FallbackUI
          error={this.state.error}
          onReset={() => this.setState({ hasError: false, error: null })}
        />
      );
    }
    return this.props.children;
  }
}

const FallbackUI = ({ error, onReset }) => {
  const navigate = useNavigate();
  const [viewDetails, setViewDetails] = useState(false);
  const isDev = import.meta.env.VITE_MODE === "development";

  return (
    <div className="flex flex-col p-4 bg-foreground text-background items-center justify-center min-h-screen text-center space-y-2 px-6">
      <h1 className="text-4xl font-bold">Something went wrong 😢</h1>

      <div className="bg-red-50 border border-red-200 mt-6  text-red-500 text-sm rounded p-3 px-8 text-center">
        <pre className="whitespace-pre-wrap break-words">
          {error.message || "Unknown error"}
        </pre>
      </div>
      <div className="flex gap-4 font-Gilroy text-sm mt-2">
        <button
          onClick={() => window.location.reload()}
          className="bg-neutral-800 cursor-pointer text-white px-5 py-2 rounded-xl"
        >
          Reload Page
        </button>
        <button
          onClick={() => {
            onReset();
            navigate("/");
          }}
          className="bg-neutral-800 cursor-pointer text-neutral-500 font-medium px-5 py-2 rounded-xl"
        >
          Go Home
        </button>
      </div>

      {isDev && (
        <>
          <button
            onClick={() => setViewDetails((prev) => !prev)}
            className="text-xs mt-6 text-rose-400 bg-card/10 px-3 py-1 cursor-pointer  rounded-full hover:text-rose-700"
          >
            {viewDetails ? "Hide Details" : "View Error"}
          </button>

          {viewDetails && error.stack && (
            <pre className="whitespace-pre-wrap break-words text-xs font-mono text-neutral-700 bg-rose-100 font-bold p-3 rounded-lg  w-full overflow-auto">
              {error.stack}
            </pre>
          )}
        </>
      )}
    </div>
  );
};

export default ErrorBoundary;
