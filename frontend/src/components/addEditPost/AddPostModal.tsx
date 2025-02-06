import { createPost } from "@/api/posts";
import React, { useState, useRef, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";

type AddPostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  author: number;
};

const AddPostModal: React.FC<AddPostModalProps> = ({
  isOpen,
  onClose,
  author,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewImage(url);
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setFormData((prev) => ({ ...prev, image: objectUrl }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const postData = {
        title: formData.title,
        content: formData.content,
        image: formData.image,
        author: author,
      };
      await createPost(postData);
      setFormData({ title: "", content: "", image: "" });
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Enter Content"
              value={formData.content}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-md"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Image</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Paste Image URL"
                value={formData.image}
                onChange={handleImageUrlChange}
                className="flex-1 p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                title="Upload Image"
              >
                <FaFileUpload className="text-xl text-gray-600" />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-48 object-cover mt-4 rounded"
              />
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostModal;
