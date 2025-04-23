import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiArrowLeft, FiSave } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessStories = () => {
  // Sample data for success stories
  const initialStories = [
    {
      id: 1,
      title: "From Homeless to Homeowner",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      content: "Maria was living on the streets for 3 years before finding our program. With job training and housing assistance, she now owns a small bakery and employs two other formerly homeless individuals.",
      date: "2023-05-15",
      author: "Sarah Johnson",
      tags: ["housing", "employment"]
    },
    {
      id: 2,
      title: "Breaking the Cycle of Poverty",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      content: "The Rodriguez family participated in our financial literacy program and saved enough to buy their first home. Their children are now the first in the family to attend college.",
      date: "2023-03-22",
      author: "Michael Chen",
      tags: ["education", "financial literacy"]
    },
    {
      id: 3,
      title: "Addiction Recovery Success",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      content: "After 10 years of addiction, James found hope through our recovery program. He's now been sober for 3 years and works as a peer counselor helping others.",
      date: "2023-01-10",
      author: "Lisa Wong",
      tags: ["recovery", "mental health"]
    },
    {
      id: 4,
      title: "Single Mom Builds Business",
      image: "https://images.unsplash.com/photo-1543269665-2d9f9a9d7ab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      content: "With microloans and business training from our program, Aisha launched a successful catering business that now employs 5 other single mothers.",
      date: "2022-11-05",
      author: "David Miller",
      tags: ["entrepreneurship", "women"]
    },
    {
      id: 5,
      title: "Veteran Finds New Purpose",
      image: "https://images.unsplash.com/photo-1580086319619-3ed498161c77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      content: "After struggling with PTSD and unemployment, Mark found support through our veterans program. He now runs a nonprofit helping other vets transition to civilian life.",
      date: "2022-09-18",
      author: "Emily Wilson",
      tags: ["veterans", "mental health"]
    },
    {
      id: 6,
      title: "Youth Education Triumph",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      content: "Despite growing up in extreme poverty, Jamal excelled in our youth education program and earned a full scholarship to university. He's now studying to become a doctor.",
      date: "2022-07-30",
      author: "Robert Garcia",
      tags: ["education", "youth"]
    }
  ];

  // State management
  const [stories, setStories] = useState(initialStories);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    image: '',
    content: '',
    author: '',
    tags: []
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newStory, setNewStory] = useState({
    title: '',
    image: '',
    content: '',
    author: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  // Load saved stories from localStorage
  useEffect(() => {
    const savedStories = localStorage.getItem('successStories');
    if (savedStories) {
      setStories(JSON.parse(savedStories));
    }
  }, []);

  // Save stories to localStorage
  useEffect(() => {
    localStorage.setItem('successStories', JSON.stringify(stories));
  }, [stories]);

  // Handle editing a story
  const handleEditClick = (story) => {
    setEditingId(story.id);
    setEditFormData({
      title: story.title,
      image: story.image,
      content: story.content,
      author: story.author,
      tags: [...story.tags]
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  // Handle saving edits
  const handleSaveEdit = (id) => {
    const updatedStories = stories.map(story => 
      story.id === id ? { 
        ...story, 
        ...editFormData,
        date: new Date().toISOString().split('T')[0] // Update date
      } : story
    );
    setStories(updatedStories);
    setEditingId(null);
  };

  // Handle deleting a story
  const handleDeleteStory = (id) => {
    if (window.confirm("Are you sure you want to delete this success story?")) {
      const updatedStories = stories.filter(story => story.id !== id);
      setStories(updatedStories);
    }
  };

  // Handle creating a new story
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewStory({
      ...newStory,
      [name]: value
    });
  };

  // Add tag to new story
  const handleAddTag = () => {
    if (newTag.trim() && !newStory.tags.includes(newTag.trim())) {
      setNewStory({
        ...newStory,
        tags: [...newStory.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  // Remove tag from new story
  const handleRemoveTag = (tagToRemove) => {
    setNewStory({
      ...newStory,
      tags: newStory.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Save new story
  const handleSaveNewStory = () => {
    if (newStory.title && newStory.content) {
      const storyToAdd = {
        id: Math.max(...stories.map(s => s.id), 0) + 1,
        title: newStory.title,
        image: newStory.image || 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        content: newStory.content,
        author: newStory.author || 'Anonymous',
        date: new Date().toISOString().split('T')[0],
        tags: newStory.tags
      };
      setStories([storyToAdd, ...stories]);
      setIsCreating(false);
      setNewStory({
        title: '',
        image: '',
        content: '',
        author: '',
        tags: []
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Success Stories
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Real people overcoming poverty with help from our community
          </p>
        </div>

        {/* Create New Story Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition"
          >
            <FiPlus /> Add New Success Story
          </button>
        </div>

        {/* Create New Story Form */}
        <AnimatePresence>
          {isCreating && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-6 rounded-xl shadow-lg mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">Create New Success Story</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newStory.title}
                    onChange={handleCreateChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Story title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={newStory.image}
                    onChange={handleCreateChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  name="content"
                  value={newStory.content}
                  onChange={handleCreateChange}
                  className="w-full p-3 border border-gray-300 rounded-lg min-h-[150px]"
                  placeholder="Tell the success story..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={newStory.author}
                    onChange={handleCreateChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="Story author"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-l-lg"
                      placeholder="Add tag (e.g., housing)"
                    />
                    <button
                      onClick={handleAddTag}
                      className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newStory.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center"
                      >
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewStory}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <FiSave /> Save Story
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map(story => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Story Image */}
              <div className="h-48 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Story Content */}
              <div className="p-6 relative">
                {/* Edit/Delete Buttons (for admin) */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(story)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                    title="Edit story"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteStory(story.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                    title="Delete story"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                
                {/* Editing Form */}
                {editingId === story.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="image"
                      value={editFormData.image}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                      name="content"
                      value={editFormData.content}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
                    ></textarea>
                    <input
                      type="text"
                      name="author"
                      value={editFormData.author}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(story.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Story Display */
                  <>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{story.date}</span>
                      <span className="mx-2">•</span>
                      <span>By {story.author}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{story.content}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                      Read full story →
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;