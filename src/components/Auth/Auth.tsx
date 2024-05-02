import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Signin() {
  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center">
      <div>
        <h1>Please sign in</h1>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="bg-gradient-to-tr from-primary via-secondary to-tersier py-2 px-5 w-32 text-white font-bold rounded-md text-center cursor-pointer hover:bg-gradient-to-br transition-all hover:scale-105">
          <SignInButton />
        </div>
        <div className="bg-gradient-to-tr from-primary via-secondary to-tersier py-2 px-5 w-32 text-white font-bold rounded-md text-center cursor-pointer hover:bg-gradient-to-br transition-all hover:scale-105">
          <SignUpButton />
        </div>
      </div>
    </div>
  );
}
