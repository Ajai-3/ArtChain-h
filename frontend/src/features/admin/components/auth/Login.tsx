import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

export const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginSubmit = () => {
        // handleLogin
    };
  return (
    <div className="flex-col h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="w-[500px] max-w-md bg-card p-6 rounded-xl shadow-xl">
        <h1 className='text-main-color font-logo text-4xl font-bold text-center mb-8'>Admin Login ArtChain</h1>
      <form
        // onSubmit={handleLoginSubmit()}
        className="space-y-4"
        noValidate
      >
        <div>
          <Input
            variant="green-focus"
            placeholder="Email or Username"
            // {...loginRegister("identifier")}
          />
          {/* {loginErrors.identifier && (
            <p className="text-sm text-red-500 mt-1">
              {loginErrors.identifier.message}
            </p>
          )} */}
        </div>

        <div>
          <div className="relative">
            <Input
              variant="green-focus"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pr-10"
            //   {...loginRegister("password")}
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          {/* {loginErrors.password && (
            <p className="text-sm text-red-500 mt-1">
              {loginErrors.password.message}
            </p>
          )} */}
        </div>


        {/* <Button
          variant="main"
          type="submit"
          className="w-full"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Log In"
          )}
        </Button> */}

      </form>
    </div>
    </div>
  );
};
