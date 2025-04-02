// This hook connects to Firebase and retrieves the current user
import { useQuery } from "@tanstack/react-query";
import { FirebaseApi } from "@/client/api/firebase/FirebaseAPI";
import { getFirebaseUserUseCase } from "@/client/api/firebase/FirebaseUseCase";
import axiosInstance from "@/client/api/axios";
import { FirebaseQueryKeys } from "@/client/api/firebase/FirebaseQueryKeys";

export const useGetFirebaseUser = () => {
  const firebaseApi = new FirebaseApi(axiosInstance);

  return useQuery({
    queryKey: [FirebaseQueryKeys.FIREBASE_USER],
    queryFn: () => getFirebaseUserUseCase(firebaseApi),
    enabled: true,
  });
};
