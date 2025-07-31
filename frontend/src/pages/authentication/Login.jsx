import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div
      className="bg-[#D9D4D1] text-[#3D444B] w-screen h-screen flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden"
      style={{ backgroundColor: "#D9D4D1" }}
    >
      {/* Icon + Heading */}
      <div className="flex flex-col items-center gap-2">
        <GalleryVerticalEnd className="h-10 w-10 text-[#098698]" />
        <h1 className="text-xl font-semibold tracking-tight">Login to Your Account</h1>
        <p className="text-sm text-[#505A63]">Welcome back! Please enter your credentials.</p>
      </div>

      {/* Login Form */}
      <div className="flex w-full max-w-sm flex-col gap-6 mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
