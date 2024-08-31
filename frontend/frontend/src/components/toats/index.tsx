import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "SUCCESS" | "ERROR";
  onclose: () => void;
}

const Toast = ({ message, type, onclose }: ToastProps) => {
  useEffect(() => {
    const time = setTimeout(() => {
      onclose();
    }, 1500);
    return () => {
      clearTimeout(time);
    };
  }, [onclose]);
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 x-index-50 rounded-md bg-green-600 text-white max-w-md p-5"
      : "fixed top-4 right-4 x-index-50 rounded-md bg-red-600 text-white max-w-md p-5";
  return (
    <div>
      <div className="flex justify-center items-center">
        <span className={`text-lg font-semibold ${styles}`}>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
