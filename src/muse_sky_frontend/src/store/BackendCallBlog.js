import {useQuery, useMutation} from "@tanstack/react-query";
import {muse_sky_blog} from "../../../declarations/muse_sky_blog/index.js";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function createPost(username, password, title, content, author) {
    try {
        console.log("Received data:", {
            username,
            password,
            title,
            content,
            author,
        });
        const postId = await muse_sky_blog.create_post(
            username,
            password,
            title,
            content,
            author
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
                "Daniel Egbe"
            );
        },
        onSuccess: (data) => {
            console.log("Post created successfully:", data);
            if (data && data.Err) {
                console.error("Error in response:", data.Err);
            } else {
                navigate("/admin");
                toast.success("Post created successfully")
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
        onError: (error) => {
            console.error("Error fetching posts:", error);
            toast.error("Error fetching posts: " + error.message);
        },
    });
}
