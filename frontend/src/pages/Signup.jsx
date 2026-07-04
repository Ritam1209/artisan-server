import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div className="auth-page">
      <SignUp routing="path" path="/signup"
      signInUrl="/login"
      fallbackRedirectUrl="/Home" />
    </div>
  );
}