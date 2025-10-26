import { z } from "zod";

// Create blog
export const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").trim(),
  content: z.string().min(10, "Content must be at least 10 characters long").trim(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean(),
});

// Update blog publish
export const updateBlogPublishSchema = z.object({
  isPublished: z.boolean(),
});

// Update blog info
export const updateBlogInfoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  content: z.string().min(10, "Content must be at least 10 characters long").optional(),
  tags: z.array(z.string()).optional(),
});
