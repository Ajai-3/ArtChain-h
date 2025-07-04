import React, { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

const Auth: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in:", form.email, form.password);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup requested for:", {
      name: form.name,
      username: form.username,
      email: form.email,
    });
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forgot password email sent to:", form.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-full max-w-md bg-card p-6 rounded-xl shadow-xl min-h-[500px]">
        {!forgotMode ? (
          <Tabs defaultValue="login" className="w-full h-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN TAB */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="pr-10"
                    required
                  />
                  <div
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>

                <p
                  className="text-sm text-muted-foreground text-end cursor-pointer hover:underline"
                  onClick={() => setForgotMode(true)}
                >
                  Forgot Password?
                </p>

                <Button type="submit" className="w-full">
                  Log In
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full flex items-center gap-2 justify-center"
                >
                  <Mail className="w-4 h-4" />
                  Continue with Google
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP TAB */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />

                <p className="text-sm text-muted-foreground">
                  A verification link will be sent to your email. Please click
                  the link to complete account setup.
                </p>

                <Button type="submit" className="w-full">
                  Send Verification Link
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full flex items-center gap-2 justify-center"
                >
                  <Mail className="w-4 h-4" />
                  Continue with Google
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        ) : (
          <form
            onSubmit={handleForgot}
            className="space-y-4 w-full max-w-md mx-auto"
          >
            <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
            <p className="text-sm text-muted-foreground text-center">
              Enter your registered email. We’ll send a reset link.
            </p>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
            <p
              className="text-sm text-center cursor-pointer text-blue-500 hover:underline"
              onClick={() => setForgotMode(false)}
            >
              Back to login
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
