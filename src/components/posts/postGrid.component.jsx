import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../common/Loader.component";
import Post from "./Post.component";
import { FcComments, FcLike } from "react-icons/fc";
import { FaShareNodes } from "react-icons/fa6";

const PostGrid = ({ userId }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let func = async () => {
      try {
        let self = true;
        if (userId) self = false;
        const resp = await axios.get("http://localhost:4000/api/post", {
          params: { self, userId },
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (resp.status !== 200) {
          toast.success(resp.message);
          return;
        }
        // setPosts(resp.data.data);
        setPosts(Array(12).fill(resp.data.data[0]));
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
    <div>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <Loader />
        ) : posts?.length > 0 ? (
          posts.map((post) => {
            return (
              <div class="flex items-center h-64 w-64 bg-black border-[1px] border-gray-200 hover:bg-gray-600 bg-opacity-100">
                <img
                  src={post.imageUrl || "/samplePost.jpeg"}
                  class="max-h-full max-w-full"
                  alt="post"
                />
              </div>
            );
          })
        ) : (
          <h1>No posts yet</h1>
        )}
      </div>
    </div>
  );
};

export default PostGrid;
