import { useState } from 'react';
import { FiSave, FiImage, FiX } from 'react-icons/fi';

const BlogCreator = ({ onSave }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    image: '',
    content: '',
    author: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !blogData.tags.includes(newTag.trim())) {
      setBlogData({
        ...blogData,
        tags: [...blogData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setBlogData({
      ...blogData,
      tags: blogData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (blogData.title && blogData.content) {
      const completeBlog = {
        ...blogData,
        date: new Date().toISOString().split('T')[0],
        id: Date.now()
      };
      onSave(completeBlog);
      // Reset form
      setBlogData({
        title: '',
        image: '',
        content: '',
        author: '',
        tags: []
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Blog post title"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
          <div className="flex items-center">
            <input
              type="text"
              name="image"
              value={blogData.image}
              onChange={handleChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            <span className="ml-2 text-gray-500">
              <FiImage size={20} />
            </span>
          </div>
          {blogData.image && (
            <div className="mt-2">
              <img 
                src={blogData.image} 
                alt="Preview" 
                className="h-32 object-cover rounded-lg border"
                onError={(e) => e.target.src = 'https://via.placeholder.com/500x300?text=Image+not+found'}
              />
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            name="content"
            value={blogData.content}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px]"
            placeholder="Write your blog post content here..."
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Author name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add tag (e.g., poverty)"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {blogData.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                {tag}
                <button 
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setBlogData({
                title: '',
                image: '',
                content: '',
                author: '',
                tags: []
              });
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FiSave /> Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreator;