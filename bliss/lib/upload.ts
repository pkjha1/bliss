import { put } from "@vercel/blob"

export async function uploadFile(file: File, options?: { access?: "public" | "private" }) {
  try {
    const response = await put(file.name, file, {
      access: options?.access || "public",
    })

    return {
      success: true,
      url: response.url,
      size: response.size,
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    return {
      success: false,
      error: "Failed to upload file",
    }
  }
}

