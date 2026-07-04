import { SignIn } from "@clerk/clerk-react";

function Login() {
return (

<div className="auth-page">


    <div className="clerk-box">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        fallbackRedirectUrl="/home"
      />
    </div>


</div>

);
}

export default Login;
