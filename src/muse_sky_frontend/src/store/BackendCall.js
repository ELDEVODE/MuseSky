import { useQuery, useMutation } from "@tanstack/react-query";
import { muse_sky_backend } from "../../../declarations/muse_sky_backend";

// Utility function to compress and convert image to vec<u8>
export function compressImage(base64String, maxSizeMB = 0.5) {
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

      // Convert to blob with higher quality (0.9 or 1.0 for the best quality)
      canvas.toBlob(
        async (blob) => {
          try {
            const arrayBuffer = await blob.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            // Convert to array for vec<u8> - using square brackets
            resolve([...uint8Array]);
          } catch (error) {
            reject(error);
          }
        },
        "image/jpeg",
        maxSizeMB
      ); // Set quality to 0.9 for high quality
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

// Utility function to handle optional text fields
function optionalText(value) {
  return value && value.trim() !== "" ? [value] : [];
}

async function fetchBtcPrice() {
  const price = await muse_sky_backend.get_btc_price();
  return price;
}

export function useBtcPrice() {
  return useQuery({
    queryKey: ["btcPrice"],
    queryFn: fetchBtcPrice,
  });
}

async function createCollection(data) {
  try {
    // Compress and convert the image to vec<u8> format
    const imageBytes = await compressImage(data.image);

    const collectionId = await muse_sky_backend.create_collection(
      data.name,
      imageBytes, // Now properly formatted as an array with square brackets
      data.description,
      optionalText(data.website),
      optionalText(data.x),
      optionalText(data.instagram),
      optionalText(data.discord),
      optionalText(data.telegram),
      data.creator_name,
      data.tags
    );
    return collectionId;
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
}

export function useCreateCollection() {
  return useMutation({
    mutationFn: (data) => createCollection(data),
    onSuccess: (data) => {
      console.log("Collection created successfully:", data);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
}

async function fetchAllCollections() {
  try {
    const collections = await muse_sky_backend.get_all_collections();
    console.log("Fetched collections:", collections);
    return collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
}

export function useAllCollections() {
  return useQuery({
    queryKey: ["allCollections"],
    queryFn: fetchAllCollections,
  });
}

// Convert Uint8Array to data URL for direct display
export function uint8ArrayToImageUrl(uint8Array) {
  // Convert Uint8Array to base64
  const base64String = uint8ArrayToBase64(uint8Array);
  // Create data URL
  return `data:image/jpeg;base64,${base64String}`;
}

// Convert Uint8Array to base64
export function uint8ArrayToBase64(uint8Array) {
  // Handle empty or invalid input
  if (!uint8Array || uint8Array.length === 0) {
    throw new Error("Invalid Uint8Array provided");
  }

  // Convert to base64
  let binary = "";
  const len = uint8Array.length;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return window.btoa(binary);
}

async function fetchCollectionDetails(id) {
  try {
    const bigIntId = BigInt(id); // Convert id to BigInt
    console.log("Fetching collection details for id:", bigIntId); // Add logging
    const collectionDetails = await muse_sky_backend.get_collection_details(
      bigIntId
    );
    console.log("Fetched collection details:", collectionDetails);
    return collectionDetails;
  } catch (error) {
    console.error("Error fetching collection details:", error);
    throw error;
  }
}

export function useCollectionDetails(id) {
  return useQuery({
    queryKey: ["collectionDetails", id],
    queryFn: () => fetchCollectionDetails(id),
  });
}

// Utility function to convert a timestamp string with 'n' suffix to BigInt
function convertTimestampToBigInt(timestamp) {
  if (typeof timestamp === "string" && timestamp.endsWith("n")) {
    return BigInt(timestamp.slice(0, -1));
  }
  return BigInt(timestamp);
}

// Utility function to convert a timestamp to normal time
export function convertTimestampToNormalTime(timestamp) {
  const timestampNumber = Number(
    convertTimestampToBigInt(timestamp) / BigInt(1_000_000)
  ); // Convert nanoseconds to milliseconds
  const date = new Date(timestampNumber);
  return date.toLocaleString();
}
