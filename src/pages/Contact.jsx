import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaPaperPlane } from 'react-icons/fa';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({ 
        success: true, 
        message: 'Message sent successfully! I (Rithesh) will respond within 24 hours.' 
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({ 
        success: false, 
        message: `Failed to send. Please email ritheshjayapal@gmail.com directly. Error: ${error.text || 'Unknown error'}`
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 8000);
    }
  };

  const inputVariants = {
    focus: { 
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)',
      borderColor: '#6366f1'
    },
    blur: {
      boxShadow: 'none',
      borderColor: '#e5e7eb'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Rithesh</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have a question or want to collaborate? I'll respond to your message within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Send a Message</h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  animate={activeField === 'name' ? 'focus' : 'blur'}
                  variants={inputVariants}
                  className="relative border rounded-lg transition-all"
                >
                  <label 
                    htmlFor="name" 
                    className={`absolute left-4 transition-all duration-200 ${
                      activeField === 'name' || formData.name 
                        ? 'top-1 text-xs text-indigo-600' 
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pt-6 pb-2 px-4 bg-transparent outline-none"
                    required
                    minLength={2}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  animate={activeField === 'email' ? 'focus' : 'blur'}
                  variants={inputVariants}
                  className="relative border rounded-lg transition-all"
                >
                  <label 
                    htmlFor="email" 
                    className={`absolute left-4 transition-all duration-200 ${
                      activeField === 'email' || formData.email 
                        ? 'top-1 text-xs text-indigo-600' 
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pt-6 pb-2 px-4 bg-transparent outline-none"
                    required
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  animate={activeField === 'message' ? 'focus' : 'blur'}
                  variants={inputVariants}
                  className="relative border rounded-lg transition-all"
                >
                  <label 
                    htmlFor="message" 
                    className={`absolute left-4 transition-all duration-200 ${
                      activeField === 'message' || formData.message 
                        ? 'top-1 text-xs text-indigo-600' 
                        : 'top-4 text-gray-500'
                    }`}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    className="w-full pt-6 pb-2 px-4 bg-transparent outline-none resize-none"
                    required
                    minLength={10}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Message */}
                <AnimatePresence>
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-lg flex items-center space-x-3 ${
                        submitStatus.success 
                          ? 'bg-green-50 text-green-800' 
                          : 'bg-red-50 text-red-800'
                      }`}
                    >
                      {submitStatus.success ? (
                        <FiCheckCircle className="h-6 w-6 flex-shrink-0" />
                      ) : (
                        <svg className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <span className="text-sm">{submitStatus.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                    <FiMail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <a 
                      href="mailto:ritheshjayapal@gmail.com" 
                      className="text-indigo-600 hover:text-indigo-700 transition-colors break-all"
                    >
                      ritheshjayapal@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                    <FiPhone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <a 
                      href="tel:+919876543210" 
                      className="text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full text-indigo-600">
                    <FiMapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 sm:p-10 text-white">
              <h2 className="text-2xl font-bold mb-4">Let's Collaborate</h2>
              <p className="mb-6 opacity-90">
                I'm available for freelance projects and full-time opportunities. Let's discuss how I can help with your next project.
              </p>
              <motion.a
                href="https://calendly.com/rithesh"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block bg-white text-indigo-600 font-medium py-3 px-6 rounded-lg transition-all flex items-center space-x-2"
              >
                <FiSend className="h-5 w-5" />
                <span>Schedule a Call</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;