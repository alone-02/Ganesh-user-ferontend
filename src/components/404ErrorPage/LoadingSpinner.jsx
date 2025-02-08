function LoadingSpinner({
  message = "Loading, please wait...",
  size = "16",
  color = "blue-500",
}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm">
      <div
        className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`}
        style={{ borderWidth: "4px" }}></div>
      <h2 className="mt-4 text-lg font-semibold text-gray-100" aria-live="polite">
        {message}
      </h2>
    </div>
  );
}

export default LoadingSpinner;
