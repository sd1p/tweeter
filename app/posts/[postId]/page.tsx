'use client'
import React from "react";
import { useRouter,useParams,usePathname } from "next/navigation";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {
    const router=useRouter();
    const params=useParams();
    const {postId}=params;

    const {data:fetchedPost,isLoading}=usePost(postId as string)

    if(isLoading||!fetchedPost){
       return (<div className="flex justify-center items-center h-full">
            <ClipLoader color="lightblue" size={80}/>
        </div>)
    }
    
    return (
        <>
        <Header label="Tweet" showBackArrow/>
        <PostItem data={fetchedPost?.post} userId={fetchedPost?.post.userId}/>
        <Form postId={postId as string}
            isComment
            placeholder="Tweet your reply"
        />
        <CommentFeed comments={fetchedPost?.post?.comments}/>
        </>
        );
};

export default PostView;
