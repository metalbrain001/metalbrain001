// components/GoogleSignInButton.tsx
import { useFirebaseSignIn } from "@/client/hooks/use-firebaselogin";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/client/lib/firebase"; // your Firebase config
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // or your custom GoogleIcon

const GoogleSignInButton = () => {
  const auth = getAuth(app);
  const mutation = useFirebaseSignIn();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const res = await mutation.mutateAsync({ idToken });

      toast("Successfully signed in with Google");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Google Sign-in Error", error);
      toast("Google sign-in failed", {
        description: error?.message || "An error occurred",
      });
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-3 px-4 py-2 w-full bg-white rounded-md shadow text-black font-semibold hover:bg-gray-100 transition"
    >
      <FcGoogle size={20} />
      Continue with Google
    </button>
  );
};

export default GoogleSignInButton;
