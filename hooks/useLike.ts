import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./userLoginModal";
import toast from "react-hot-toast";
import axios from "axios";
import usePost from "./usePost";
import usePosts from "./usePosts";

const useLike = ({postId,userId}:{postId:string,userId?:string}) => {
  const {data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();  
  const {data:fetchedPost,mutate:mutateFetchedPost}=usePost(postId);
  const {mutate: mutateFetchedPosts}=usePosts(userId); // taking userId for liking user posts in user profile

    
  const hasLiked = useMemo(() => {
    const list = fetchedPost?.post?.likedIds || [];
    return list.includes(currentUser?.id);
  }, [currentUser?.id,fetchedPost?.post?.likedIds]);

  
  const toggleLike=useCallback(async() => {
        try {
            let request;
            if(hasLiked){
                request = async() =>await axios.delete("/api/like",{data:{"postId":postId}});
            }else{
                request = async()=> await axios.post('/api/like',{postId})
            }

            const response = await request();
            if(response.status === 200){
              mutateFetchedPost();
              mutateFetchedPosts();
            }
            toast.success(`${hasLiked?"UnLiked":"Liked"}`)
        } catch (error:any) {
            toast.error(error.message);
        }
    },
    [hasLiked,mutateFetchedPost,mutateFetchedPosts,postId],
  )
  return {
    hasLiked,
    toggleLike
  }
};

export default useLike;
