import { useMutation } from "@tanstack/react-query";
import { firebaseSignInUseCase } from "@/client/api/user/UserUsecase";
import { UserRepoApi } from "@/client/api/user/UserRepoApi";
import axiosInstance from "@/client/api/axios";
import { FirebaseSignInProps } from "@/client/types";

export const useFirebaseSignIn = () => {
  const userRepo = new UserRepoApi(axiosInstance);

  return useMutation({
    mutationFn: (props: FirebaseSignInProps) =>
      firebaseSignInUseCase(props, userRepo),
  });
};

export default {
  useFirebaseSignIn,
};
