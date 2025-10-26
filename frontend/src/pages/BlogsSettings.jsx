// import { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "../components/ui/Button";

// export default function BlogSetting() {
//   const [blogs, setBlogs] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [deleteConfirm, setDeleteConfirm] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image: "",
//     tags: [],
//     isPublished: true,
//   });

//   const [search, setSearch] = useState("");
//   const [filterPublished, setFilterPublished] = useState("All");

//   // Fetch blogs
//   const fetchBlogs = async () => {
//     const res = await axios.get("http://localhost:8080/api/v1/blog");
//     setBlogs(res.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Handle form change
//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleTagsChange = (e) =>
//     setFormData({ ...formData, tags: e.target.value.split(",") });

//   const handleTogglePublished = () =>
//     setFormData({ ...formData, isPublished: !formData.isPublished });

//   // Open modal for add
//   const openAddModal = () => {
//     setEditing(null);
//     setFormData({
//       title: "",
//       content: "",
//       image: "",
//       tags: [],
//       isPublished: true,
//     });
//     setOpen(true);
//   };

//   // Open modal for edit
//   const openEditModal = (blog) => {
//     setEditing(blog);
//     setFormData({ ...blog });
//     setOpen(true);
//   };

//   // Submit form
//   const handleSubmit = async () => {
//     try {
//       if (editing) {
//         await axios.put(`/api/blog/${editing._id}`, formData);
//       } else {
//         await axios.post("/api/blog", formData);
//       }
//       setOpen(false);
//       setEditing(null);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete
//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`/api/blog/${editing._id}`);
//       setDeleteConfirm(false);
//       setEditing(null);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Derived data
//   const filteredBlogs = blogs.filter((b) => {
//     const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
//     const matchesPublished =
//       filterPublished === "All" ||
//       (filterPublished === "Published" && b.isPublished) ||
//       (filterPublished === "Unpublished" && !b.isPublished);
//     return matchesSearch && matchesPublished;
//   });

//   return (
//     <div className="p-4">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//         <h2 className="text-3xl font-bold">Blog Settings</h2>
//         <div className="flex flex-col sm:flex-row gap-3 mb-4 mt-2">
//           <input
//             type="text"
//             placeholder="Search blogs..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
//           />
//           <select
//             value={filterPublished}
//             onChange={(e) => setFilterPublished(e.target.value)}
//             className="rounded-md border border-gray-300 px-3 py-2 text-sm"
//           >
//             <option>All</option>
//             <option>Published</option>
//             <option>Unpublished</option>
//           </select>
//           <Button onClick={openAddModal}>+ Add New Blog</Button>
//         </div>
//       </div>

//       {/* Table (desktop) */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
//           <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase tracking-wide">
//             <tr>
//               <th className="p-3 text-left">Title</th>
//               <th className="p-3 text-left">Tags</th>
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Published</th>
//               <th className="p-3 text-right">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 text-sm">
//             {filteredBlogs.map((blog, idx) => (
//               <tr
//                 key={idx}
//                 className="hover:bg-gray-50 transition-colors duration-200"
//               >
//                 <td className="p-3 font-semibold text-gray-800">
//                   {blog.title}
//                 </td>
//                 <td className="p-3 text-gray-600">{blog.tags.join(", ")}</td>
//                 <td className="p-3">
//                   <img
//                     src={blog.image}
//                     alt="preview"
//                     className="w-12 h-12 rounded-md object-cover border"
//                   />
//                 </td>
//                 <td className="p-3">
//                   <span
//                     className={`px-2 py-1 text-xs font-medium rounded-lg ${
//                       blog.isPublished
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {blog.isPublished ? "Published" : "Unpublished"}
//                   </span>
//                 </td>
//                 <td className="p-3 text-right flex justify-end gap-2">
//                   <button
//                     onClick={() => openEditModal(blog)}
//                     className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => {
//                       setEditing(blog);
//                       setDeleteConfirm(true);
//                     }}
//                     className="px-3 py-1 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Cards (mobile) */}
//       <div className="md:hidden space-y-4">
//         {filteredBlogs.map((blog, idx) => (
//           <div
//             key={idx}
//             className="rounded-lg border bg-white p-4 shadow-sm"
//           >
//             <h3 className="font-semibold text-lg">{blog.title}</h3>
//             <p className="text-sm text-gray-600">
//               <strong>Tags:</strong> {blog.tags.join(", ")}
//             </p>
//             <img
//               src={blog.image}
//               alt="preview"
//               className="w-full h-40 rounded-md object-cover mt-2"
//             />
//             <p className="text-sm mt-2">
//               Status:{" "}
//               <span
//                 className={`font-medium ${
//                   blog.isPublished ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {blog.isPublished ? "Published" : "Unpublished"}
//               </span>
//             </p>
//             <div className="mt-3 flex gap-3">
//               <button
//                 onClick={() => openEditModal(blog)}
//                 className="text-blue-600 hover:underline"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => {
//                   setEditing(blog);
//                   setDeleteConfirm(true);
//                 }}
//                 className="text-red-600 hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add/Edit Modal */}
//       {open && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">
//               {editing ? "Edit Blog" : "Add New Blog"}
//             </h3>
//             <div className="space-y-3">
//               <input
//                 name="title"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full rounded-md border px-3 py-2 text-sm"
//               />
//               <textarea
//                 name="content"
//                 placeholder="Content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 className="w-full rounded-md border px-3 py-2 text-sm min-h-[100px]"
//               />
//               <input
//                 name="image"
//                 placeholder="Image URL"
//                 value={formData.image}
//                 onChange={handleChange}
//                 className="w-full rounded-md border px-3 py-2 text-sm"
//               />
//               <input
//                 name="tags"
//                 placeholder="Tags (comma separated)"
//                 value={formData.tags.join(",")}
//                 onChange={handleTagsChange}
//                 className="w-full rounded-md border px-3 py-2 text-sm"
//               />

//               {/* Toggle for Published */}
//               <div className="flex items-center gap-2">
//                 <label className="text-sm font-medium">Published:</label>
//                 <button
//                   type="button"
//                   onClick={handleTogglePublished}
//                   className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
//                     formData.isPublished ? "bg-green-500" : "bg-gray-300"
//                   }`}
//                 >
//                   <div
//                     className={`bg-white w-5 h-5 rounded-full shadow-md transform transition ${
//                       formData.isPublished ? "translate-x-7" : "translate-x-0"
//                     }`}
//                   />
//                 </button>
//                 <span className="text-sm">
//                   {formData.isPublished ? "Yes" : "No"}
//                 </span>
//               </div>
//             </div>
//             <div className="flex justify-end gap-2 mt-4">
//               <Button variant="outline" onClick={() => setOpen(false)}>
//                 Cancel
//               </Button>
//               <Button onClick={handleSubmit}>
//                 {editing ? "Update" : "Submit"}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
//             <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
//             <p className="text-sm text-gray-600">
//               Are you sure you want to delete this blog?
//             </p>
//             <div className="flex justify-end gap-2 mt-4">
//               <Button variant="outline" onClick={() => setDeleteConfirm(false)}>
//                 Cancel
//               </Button>
//               <Button variant="destructive" onClick={confirmDelete}>
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import { useBlogs } from "../hook/useBlogs";
import axios from "axios";
import { createBlog, updateBlog, deleteBlog, updateBlogImage, publishBlog } from "../api/blog.api";
import { toast, Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function BlogSetting() {
  const [open, setOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // store File object instead of string
    tags: [],
    isPublished: true,
  });

  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  // blogs data with pagination
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBlogs({ limit: 9 });

  // console.log("BlogSetting data:", data);

  useEffect(() => {
    if (!formData.image) {
      setPreview("");
      return;
    }

    if (formData.image instanceof File) {
      // New file selected
      const objectUrl = URL.createObjectURL(formData.image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof formData.image === "string") {
      // Existing URL (editing)
      setPreview(formData.image);
    }
  }, [formData.image]);


  // ✅ Fix: match API structure
  const blogs = data?.pages.flatMap((page) => page.entries) || [];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleTagsChange = (e) =>
    setFormData({ ...formData, tags: e.target.value.split(",") });

  // const handleTogglePublished = async () => {
  //   try {
  //     // Optimistically update the UI
  //     const newStatus = !formData.isPublished;
  //     setFormData({ ...formData, isPublished: newStatus });

  //     // Call API
  //     const response = await publishBlog(editing._id, newStatus);
  //     toast.success(response.message || `Blog ${newStatus ? "published" : "unpublished"} successfully!`);
  //   } catch (err) {
  //     // Revert UI if API fails
  //     setFormData({ ...formData, isPublished: formData.isPublished });
  //     toast.error(err.message || "Failed to update publish status");
  //   }
  // };


  // Open modal for add



  const handleTogglePublished = async () => {
    const newStatus = !formData.isPublished;
    setFormData({ ...formData, isPublished: newStatus });

    // ✅ Only call API if editing an existing blog
    if (!editing?._id) return;

    try {
      const response = await publishBlog(editing._id, newStatus);
      toast.success(
        response.message ||
        `Blog ${newStatus ? "published" : "unpublished"} successfully!`
      );
    } catch (err) {
      // revert if failed
      setFormData({ ...formData, isPublished: !newStatus });
      toast.error(err.message || "Failed to update publish status");
    }
  };



  const openAddModal = () => {
    setEditing(null);
    setFormData({
      title: "",
      content: "",
      image: "",
      tags: [],
      isPublished: true,
    });
    setOpen(true);
  };

  // Open modal for edit
  const openEditModal = (blog) => {
    setEditing(blog);
    setFormData({ ...blog, tags: blog.tags || [] });
    setOpen(true);
  };

  useEffect(() => {
    if (editing) {
      setFormData({
        title: editing.title,
        content: editing.content,
        image: null, // keep null, only set if user chooses new file
        tags: editing.tags || [],
        isPublished: editing.isPublished,
      });
      setPreview(editing.image || ""); // existing image URL for preview
    }
  }, [editing]);

  const handleSubmit = async () => {

    console.log("formData", formData);
    try {
      const formPayload = new FormData();
      formPayload.append("title", formData.title);
      formPayload.append("content", formData.content);
      formPayload.append("isPublished", formData.isPublished);
      formPayload.append("image", formData.image); // append only if new image selected
      formData.tags.forEach(tag => formPayload.append("tags[]", tag));

      if (editing) {
        if (formData.image instanceof File) {
          const imgRes = await updateBlogImage(editing._id, formData.image);
          if (imgRes?.success !== false) toast.success("Blog image updated successfully!");
        }

        const updateRes = await updateBlog(editing._id, {
          title: formData.title,
          content: formData.content,
          tags: formData.tags,
          isPublished: formData.isPublished,
        });

        if (updateRes?.success !== false) toast.success("Blog updated successfully!");
      } else {

        for (let [key, value] of formPayload.entries()) {
          console.log(`${key}:`, value);
          console.log(`${key} type:`, typeof value);
        }


        const createRes = await createBlog(formPayload);
        if (createRes?.success !== false) toast.success("Blog created successfully!");
      }

      queryClient.invalidateQueries(["blogs"]);
      setOpen(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || err.message || "Something went wrong!");
    }
  };



  // Delete
  const confirmDelete = async () => {
    try {
      await deleteBlog(editing._id);
      toast.success("Blog deleted successfully!");
      queryClient.invalidateQueries(["blogs"]);
      // optionally refresh your blog list
      setDeleteConfirm(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Derived data
  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Header */}
      <div className="flex flex-col pt-4 sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h2 className="text-3xl font-bold">Blog Settings</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-4 mt-2">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <Button onClick={openAddModal}>+ Add New Blog</Button>
        </div>
      </div>

      {/* Table (desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden shadow-md">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Tags</th>
              <th className="p-3 text-left">Published</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredBlogs.map((blog, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-3 font-semibold text-gray-800">
                  {blog.title}
                </td>
                <td className="p-3 text-gray-600">
                  {blog.tags?.join(", ") || "-"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${blog.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3">
                  <img
                    src={blog.image}
                    alt="preview"
                    className="w-12 h-12 rounded-lg object-cover border"
                  />
                </td>
                <td className="p-3 text-right flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="px-3 py-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setEditing(blog);
                      setDeleteConfirm(true);
                    }}
                    className="px-3 py-1 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredBlogs.map((blog, idx) => (
          <div key={idx} className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{blog.title}</h3>
            <p className="text-sm text-gray-600">
              <strong>Tags:</strong> {blog.tags?.join(", ")}
            </p>
            <p className="text-sm">
              <span
                className={`px-2 py-1 text-xs rounded-full ${blog.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {blog.isPublished ? "Published" : "Draft"}
              </span>
            </p>
            <img
              src={blog.image}
              alt="preview"
              className="w-full h-40 object-cover rounded-md mt-2"
            />
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => openEditModal(blog)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setEditing(blog);
                  setDeleteConfirm(true);
                }}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Pagination */}
      <div className="flex justify-center mt-6">
        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>

      {/* Add/Edit Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editing ? "Edit Blog" : "Add New Blog"}
            </h3>
            <div className="space-y-3">
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />
              <textarea
                name="content"
                placeholder="Content"
                value={formData.content}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 text-sm min-h-[100px]"
              />
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                value={formData.tags.join(",")}
                onChange={handleTagsChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />


              {/* File input for new image */}
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full rounded-md border px-3 py-2 text-sm"
              />

              {editing && editing.image && !preview && (
                <div className="mb-3">
                  <p className="text-sm font-medium">Current Image:</p>
                  <img
                    src={editing.image}
                    alt="Current"
                    className="mt-1 w-32 h-32 object-cover rounded"
                  />
                </div>
              )}

              {/* Show preview if new image selected */}
              {preview && (
                <div className="mt-3">
                  <p className="text-sm font-medium">New Image Preview:</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-1 w-32 h-32 object-cover rounded"
                  />
                </div>
              )}

              {/* Toggle for Published */}
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={handleTogglePublished} // calls async API
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 
                    peer-focus:ring-2 peer-focus:ring-blue-300 
                    transition-colors duration-200"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                    peer-checked:translate-x-5 transition-transform duration-200"></div>
                </label>
                <span className="text-sm select-none">
                  {formData.isPublished ? "Published" : "Unpublished"}
                </span>
              </div>

            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editing ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this blog?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

