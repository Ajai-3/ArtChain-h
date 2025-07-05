import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  LoginSchema, 
  SignupSchema, 
  ForgotPasswordSchema,
  type LoginFormInputs,
  type SignupFormInputs,
  type ForgotPasswordFormInputs
} from "../../schemas/authShemas";
import { useLoginMutation, useSignupMutation } from "../../../../api/users/mutations";
import { Eye, EyeOff, Mail } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import Logo from "../navbar/Logo";

const Auth: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);

  // Login form
  const { 
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginSchema),
  });

  // Signup form
  const { 
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(SignupSchema),
  });

  // Forgot password form
  const { 
    register: forgotRegister,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { mutate: loginMutation } = useLoginMutation();

  const handleLogin = (data: LoginFormInputs) => {
    loginMutation(data);
  };

  const { mutate: signupMutation } = useSignupMutation();
  const handleSignup = (data: SignupFormInputs) => {
    signupMutation(data);
    console.log("Signup requested for:", data);
  };

  const handleForgot = (data: ForgotPasswordFormInputs) => {
    console.log("Forgot password email sent to:", data.identifier);
  };

  return (
    <div className="flex-col h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-[500px] max-w-md bg-card p-6 rounded-xl shadow-xl">
        {!forgotMode ? (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold mb-2">
                {forgotMode ? "Reset Password" : "Welcome to Art Chain"}
              </h2>
              <p className="text-muted-foreground">
                {forgotMode 
                  ? "Enter your email to receive a reset link" 
                  : "Secure access to your digital art collection"}
              </p>
            </div>
            
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* LOGIN TAB */}
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-4" noValidate>
                  <div>
                    <Input 
                    variant="green-focus"
                      placeholder="Email or Username" 
                      {...loginRegister("identifier")}
                    />
                    {loginErrors.identifier && (
                      <p className="text-sm text-red-500 mt-1">
                        {loginErrors.identifier.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                      variant="green-focus"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pr-10"
                        {...loginRegister("password")}
                      />
                      <div
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </div>
                    </div>
                    {loginErrors.password && (
                      <p className="text-sm text-red-500 mt-1">
                        {loginErrors.password.message}
                      </p>
                    )}
                  </div>

                  <p
                    className="text-sm text-muted-foreground text-end cursor-pointer hover:underline"
                    onClick={() => setForgotMode(true)}
                  >
                    Forgot Password?
                  </p>

                  <Button variant="main" type="submit" className="w-full">
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
                <form onSubmit={handleSignupSubmit(handleSignup)} className="space-y-4" noValidate>
                  <div>
                    <Input variant="green-focus" placeholder="Full Name" {...signupRegister("name")} />
                    {signupErrors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {signupErrors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input variant="green-focus" placeholder="Username" {...signupRegister("username")} />
                    {signupErrors.username && (
                      <p className="text-sm text-red-500 mt-1">
                        {signupErrors.username.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input variant="green-focus" placeholder="Email" {...signupRegister("email")} />
                    {signupErrors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {signupErrors.email.message}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    A verification link will be sent to your email. Please click
                    the link to complete account setup.
                  </p>

                  <Button variant="main" type="submit" className="w-full">
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
          </>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
              <p className="text-muted-foreground">
                Enter your email to receive a reset link
              </p>
            </div>
            <form
              onSubmit={handleForgotSubmit(handleForgot)}
              className="space-y-4 w-full max-w-md mx-auto" 
              noValidate
            >
              <div>
                <Input variant="green-focus" placeholder="Email or Username" {...forgotRegister("identifier")} />
                {forgotErrors.identifier && (
                  <p className="text-sm text-red-500 mt-1">
                    {forgotErrors.identifier.message}
                  </p>
                )}
              </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;