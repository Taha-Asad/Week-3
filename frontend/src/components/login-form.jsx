import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/store/feature/auth/authSlice";

import { Mail, Lock, Apple, CircleUser } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(input))
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message, { autoClose: 2000 });
        } else {
          toast.error(res?.message, { autoClose: 2000 });
        }
      })
      .catch((err) => {
        toast.error("Error logging in");
        console.error(err);
      });
  };

  return (
    <div className={cn("flex flex-col justify-center w-full h-full", className)} {...props}>

      <Card className="w-full bg-[#D9D4D1] text-[#3D444B] border-none shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>

        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#505A63]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={input.email || ""}
                  onChange={handleChange}
                  className="pl-10 bg-[#AEC0C2] border-none text-[#3D444B] placeholder:text-[#505A63]"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-[#098698] hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#505A63]" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={input.password || ""}
                  onChange={handleChange}
                  className="pl-10 bg-[#AEC0C2] border-none text-[#3D444B] placeholder:text-[#505A63]"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#098698] text-white hover:bg-[#08707e]"
            >
              Login
            </Button>

            <p className="text-center text-sm text-[#505A63]">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="underline text-[#098698]">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-[#505A63] mt-4 px-4 pb-2 mb-0">
        By clicking continue, you agree to our{' '}
        <a href="#" className="underline text-[#098698]">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline text-[#098698]">
          Privacy Policy
        </a>.
      </div>
    </div>
  );
}
