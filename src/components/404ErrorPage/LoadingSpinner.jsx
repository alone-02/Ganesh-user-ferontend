function LoadingSpinner({ message = "Loading, please wait..." }) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <h2 className="mt-4 text-lg font-semibold text-gray-700">{message}</h2>
      </div>
    );
  }
  
  export default LoadingSpinner;