import { useQuery, useMutation } from "@tanstack/react-query";
import { muse_sky_blog } from "../../../declarations/muse_sky_blog/index.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { compressImage } from "./BackendCall.js";

async function createPost(
  username,
  password,
  title,
  content,
  author,
  imageUrl
) {
  try {
    console.log("Received data:", {
      username,
      password,
      title,
      content,
      author,
      imageUrl,
    });
    console.log("Creating post...", imageUrl);
    const postId = await muse_sky_blog.create_post(
      username,
      password,
      title,
      content,
      author,
      imageUrl
    );
    console.log("Post created with ID:", postId);
    return postId;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export function useCreatePost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => {
      console.log("Data passed to mutationFn:", data);
      return createPost(
        data.username,
        data.password,
        data.title,
        data.content,
        "Daniel Egbe",
        data.imageUrl
      );
    },
    onSuccess: (data) => {
      console.log("Post created successfully:", data);
      if (data && data.Err) {
        console.error("Error in response:", data.Err);
      } else {
        navigate("/admin");
        toast.success("Post created successfully");
      }
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      toast.error("Error creating post: " + error.message);
    },
  });
}

// Function to list posts
async function listPosts() {
  try {
    const response = await muse_sky_blog.list_posts();
    console.log("Fetched posts:", response);
    return response;
  } catch (error) {
    console.error("Error listing posts:", error);
    throw error;
  }
}

// Hook to list posts
export function useListPosts() {
  return useQuery({
    queryKey: ["listPosts"],
    queryFn: listPosts,
  });
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64String = reader.result.split(",")[1];
      const newImg = compressImage(base64String);
      resolve(newImg);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function compressImage2(base64String, maxSizeMB = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64String;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Increase the max dimension for higher quality (e.g., 2048)
      const maxDimension = 2048;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Directly convert to base64 with desired quality
      const compressedBase64 = canvas.toDataURL("image/jpeg", maxSizeMB);
      resolve(compressedBase64);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

// Function to get a post by ID
async function getPost(postId) {
  try {
    const response = await muse_sky_blog.get_post(postId);
    console.log("Fetched post:", response);
    return response;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

// Hook to get a post by ID
export function useGetPost(postId) {
  return useQuery({
    queryKey: ["getPost", postId],
    queryFn: () => getPost(postId),
    enabled: !!postId, // Only run the query if postId is present
  });
}

async function updatePost(
  username,
  password,
  id,
  title,
  content,
  author,
  imageUrl
) {
  try {
    console.log("Updating post with ID:", id);
    const response = await muse_sky_blog.update_post(
      username,
      password,
      id,
      title,
      content,
      author,
      imageUrl
    );
    console.log("Post updated:", response);
    return response;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

export function useUpdatePost() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => {
      console.log("Data passed to mutationFn:", data);
      return updatePost(
        data.username,
        data.password,
        data.id,
        data.title,
        data.content,
        "Daniel Egbe",
        data.imageUrl
      );
    },
    onSuccess: (data) => {
      console.log("Post updated successfully:", data);
      if (data && data.Err) {
        console.error("Error in response:", data.Err);
      } else {
        navigate("/admin");
        toast.success("Post updated successfully");
      }
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      toast.error("Error updating post: " + error.message);
    },
  });
}
