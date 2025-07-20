type LoadingProps = {
  text: string;
};

const Loading = ({ text }: LoadingProps) => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-gray-300 text-lg font-medium animate-pulse">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Loading;
