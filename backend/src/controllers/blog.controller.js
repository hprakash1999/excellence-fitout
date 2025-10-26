// Utils
import { ApiError } from "../utils/apiError.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";

// Validators

// Reporitories
import { blogRepo } from "../repositories/blog.repo.js";

/**
 * @module controllers/blog
 * Controllers for blog related operations
 *
 * Includes:
 * - create: Create a new blog
 * - fetchAll: Get all blogs with pagination
 * - fetch: Get blog by id
 * - updateInfo: Update blog by id
 * - updateImage: Update blog image by id
 * - updatePublish: Update blog publish status by id
 * - remove: Delete blog by id
 */

// Create new blog
export const create = asyncHandler(async (req, res) => {
  console.log("creating new blog---->")
  if (!req.file) {
    throw new ApiError(400, "Image is missing. Please upload a valid image and try again.");
  }

  // Upload single image
  const cloudinaryRes = await uploadOnCloudinary(req.file.path, "uploads/blogs");

  // Create blog
  const blog = await blogRepo.insert({
    ...req.body,
    image: cloudinaryRes.secure_url,
  });

  res.status(200).json(new ApiResponse(200, blog, "Blog created successfully!"));
});

export const fetchAll = asyncHandler(async (req, res) => {
  // Parse query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (page <= 0 || limit <= 0) {
    throw new ApiError(400, "Page and limit must be positive integers.");
  }

  const data = await blogRepo.findAll({ page, limit });

  res.status(200).json(new ApiResponse(200, data, "All blogs fetched successfully!"));
});

// Get blog by id
export const fetch = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await blogRepo.findById(id);

  if (!blog) {
    throw new ApiError(404, "Blog not found. Please try again.");
  }

  res.status(200).json(new ApiResponse(200, blog, "Blog details fetched successfully!"));
});

// Update blog info by id
export const updateInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  if (!title && !content && !tags) {
    throw new ApiError(400, "No valid fields provided for update.");
  }

  if (tags && typeof tags === "string") {
    try {
      req.body.tags = JSON.parse(tags);
    } catch {
      throw new ApiError(400, "Invalid tags.");
    }
  }

  const updatedBlog = await blogRepo.update(id, { title, content, tags });

  if (!updatedBlog) {
    throw new ApiError(404, "Blog not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedBlog, "Blog details updated successfully!"));
});

export const updatePublish = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isPublished } = req.body;
  console.log("id", id);
  console.log("isPublished", isPublished);

  if (typeof isPublished !== "boolean") {
    throw new ApiError(400, "isPublished must be a boolean.");
  }

  const updatedBlog = await blogRepo.update(id, { isPublished });

  if (!updatedBlog) {
    throw new ApiError(404, "Blog not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedBlog, "Blog details updated successfully!"));
});

export const updateImage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    throw new ApiError(400, "Image is missing. Please upload a valid image.");
  }

  const cloudinaryRes = await uploadOnCloudinary(req.file.path, "uploads/blogs");

  const updatedBlog = await blogRepo.update(id, { image: cloudinaryRes.secure_url });

  if (!updatedBlog) {
    throw new ApiError(404, "Blog not found.");
  }

  res.status(200).json(new ApiResponse(200, updatedBlog, "Blog image updated successfully!"));
});

// Delete blog by id
export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await blogRepo.delete(id);

  if (!blog) {
    throw new ApiError(404, "Blog not found. Please try again.");
  }

  res.status(200).json(new ApiResponse(200, blog, "Blog deleted successfully!"));
});
