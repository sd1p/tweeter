import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";
import useLoginModal from "./userLoginModal";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetcheduser } = useUser(userId);

  const loginModal = useLoginModal();
    
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];
    return list.includes(userId);
  }, [userId,currentUser?.followingIds]);
  
  const toggleFollow=useCallback(async() => {
        if(!currentUser)
        return loginModal.onOpen();

        try {
            let request;
            if(await isFollowing){
                request = async() =>await axios.delete("/api/follow",{data:{userId}});
            }else{
                request = async()=> await axios.post('/api/follow',{userId})
            }

            await request();
            mutateCurrentUser();
            mutateFetcheduser();
            toast.success(`${isFollowing?"Unfollwed":"Following"}`)
        } catch (error:any) {
            toast.error(error.message);
        }
    },
    [currentUser,isFollowing,userId,mutateCurrentUser,mutateFetcheduser,loginModal],
  )
  return {
    isFollowing,
    toggleFollow
  }
};

export default useFollow;
