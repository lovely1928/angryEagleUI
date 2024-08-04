import React, { useEffect, useState } from "react";
import Button from "../common/Button.component";
import Pagination from "../common/Pagination.component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import { FaShareNodes } from "react-icons/fa6";

import Loader from "../common/Loader.component";
import { FcComments } from "react-icons/fc";
import Post from "./Post.component";
import CustomModal from "../common/Modal.component";
import PostForm from "./PostForm.component";
const posts = [
  { title: "hi", imageUrl: "google.com" },
  { title: "hi", imageUrl: "google.com" },
  { title: "hi", imageUrl: "google.com" },
];
const PostList = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let func = async () => {
      try {
        setIsLoading(true);
        const resp = await axios.get("http://localhost:4000/api/post", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.status !== 200) {
          toast.error(resp.message);
          return;
        }
        setIsLoading(false);
        setPosts(resp.data.data);
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      } finally {
        setIsLoading((x) => false);
      }
    };
    func();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="pl-2 max-h-screen overflow-auto m-auto">
          <div className="border-bottom border-grey flex my-[6px] flex-row justify-between items-center">
            <h1 className="text-xl font-bold">Posts</h1>
            <Button text="Add" onClick={() => setShowPostForm((x) => !x)} />
          </div>
          <div className="flex flex-wrap">
            {loading ? (
              <Loader />
            ) : (
              posts.map((post) => {
                return <Post post={post} />;
              })
            )}
          </div>
          <CustomModal
             isOpen={showPostForm}
             customStyles={{
               width: "30%",
               "box-shadow": "2px 2px 7px -3px black",
               margin: "auto",
               height: "auto"
             }}
             onClose2={() => {
               setShowPostForm(false);
             }}
          >
            <PostForm setPopUpState={setShowPostForm} />
          </CustomModal>
        </div>
      )}
    </>
  );
};

export default PostList;
