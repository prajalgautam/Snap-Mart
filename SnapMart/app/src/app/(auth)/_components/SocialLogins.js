import appleLogo from "@/assets/images/apple.png";
import googleLogo from "@/assets/images/google.png";
import Image from "next/image";
import { toast } from "react-toastify";

const SocialLogins = () => {
  function handleComingSoon(provider) {
    toast.info(`${provider} login coming soon!`);
  }

  return (
    <section className="border-b pb-5 border-gray-200 dark:text-white">
      <div className="flex items-center justify-between gap-5">
        <button
          onClick={() => handleComingSoon("Google")}
          className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <Image
            src={googleLogo}
            height={32}
            width={32}
            alt="google"
            className="h-4 w-auto"
          />
          Login with Google
        </button>
        <button
          onClick={() => handleComingSoon("Apple")}
          className="w-full flex justify-center items-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-xs cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
        >
          <Image
            src={appleLogo}
            height={32}
            width={32}
            alt="apple"
            className="h-4 w-auto"
          />
          Login with Apple
        </button>
      </div>
    </section>
  );
};

export default SocialLogins;
