import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css/core';
import { FiArrowRight, FiDollarSign, FiGlobe, FiHeart, FiAward, FiUsers, FiCheck, FiShield, FiTrendingUp } from "react-icons/fi";
import { RiLeafLine, RiWaterFlashLine, RiBookLine, RiTeamLine, RiMedalLine } from "react-icons/ri";
import { FaTshirt, FaBookOpen, FaUtensils, FaHandHoldingUsd } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { MdLocationCity, MdVerified } from "react-icons/md";
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const images = [
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Turn Compassion into Action",
    subtitle: "Empowering individuals and NGOs to fight poverty through tech, transparency, and community-driven support"
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Donate More Than Just Money",
    subtitle: "Give items you no longer need and earn credit points for your contributions"
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
    title: "See Your Real Impact",
    subtitle: "Track exactly how your donations are helping communities in need"
  }
];

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const povertyData = [
  { country: "India", povertyRate: 21.9, population: 1400, coordinates: [78.9629, 20.5937], region: "Asia" },
  { country: "Nigeria", povertyRate: 40.1, population: 206, coordinates: [8.6753, 9.082], region: "Africa" },
  { country: "Bangladesh", povertyRate: 14.3, population: 165, coordinates: [90.3563, 23.685], region: "Asia" },
  { country: "DR Congo", povertyRate: 72.0, population: 90, coordinates: [23.6436, -2.8775], region: "Africa" },
  { country: "Ethiopia", povertyRate: 23.5, population: 117, coordinates: [40.4897, 9.1450], region: "Africa" },
];

const COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];
const REGION_COLORS = {
  Asia: '#6366F1',
  Africa: '#EC4899',
  Americas: '#10B981',
  Europe: '#F59E0B',
  Oceania: '#3B82F6'
};

const testimonials = [
  {
    quote: "This platform helped our NGO connect with donors we never would have reached otherwise. The transparency features build trust with our supporters.",
    name: "Priya Sharma",
    role: "Director, Hope Foundation",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    quote: "I love being able to donate items I no longer need and seeing exactly how they're helping. The credit points make it fun and rewarding!",
    name: "Rahul Patel",
    role: "Volunteer & Donor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "As a student with limited funds, I appreciate being able to contribute through volunteer work and still earn recognition for my efforts.",
    name: "Ananya Gupta",
    role: "College Volunteer",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const actionButtons = [
    { 
      name: "Donate Now", 
      path: "/donation",
      icon: <FiDollarSign className="text-2xl" />,
      gradient: "from-rose-500 to-pink-500"
    },
    { 
      name: "Our Projects", 
      path: "/projects",
      icon: <FiGlobe className="text-2xl" />,
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      name: "Leaderboard", 
      path: "/leaderboard",
      icon: <FiAward className="text-2xl" />,
      gradient: "from-amber-500 to-orange-500"
    },
    { 
      name: "Get Involved", 
      path: "/weekly-tasks",
      icon: <FiUsers className="text-2xl" />,
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  const sdgGoals = [
    { 
      icon: <FiDollarSign className="text-3xl text-rose-400" />, 
      title: "No Poverty", 
      description: "End poverty in all its forms everywhere" 
    },
    { 
      icon: <RiLeafLine className="text-3xl text-emerald-400" />, 
      title: "Zero Hunger", 
      description: "End hunger and ensure access to safe food" 
    },
    { 
      icon: <RiWaterFlashLine className="text-3xl text-blue-400" />, 
      title: "Clean Water", 
      description: "Ensure access to water and sanitation for all" 
    },
    { 
      icon: <RiBookLine className="text-3xl text-purple-400" />, 
      title: "Quality Education", 
      description: "Inclusive and equitable education for all" 
    },
  ];

  const features = [
    {
      icon: <FiCheck className="text-2xl text-emerald-400" />,
      title: "Multiple Donation Options",
      description: "Donate money, clothes, books, utensils, and more - not just cash"
    },
    {
      icon: <MdVerified className="text-2xl text-blue-400" />,
      title: "AI Verification",
      description: "Our system verifies donations and impact with AI for transparency"
    },
    {
      icon: <RiMedalLine className="text-2xl text-amber-400" />,
      title: "Gamified Rewards",
      description: "Earn credit points, badges, and recognition for your contributions"
    },
    {
      icon: <FiTrendingUp className="text-2xl text-purple-400" />,
      title: "Real-time Tracking",
      description: "See exactly how your donations are being used in real-time"
    },
    {
      icon: <RiTeamLine className="text-2xl text-rose-400" />,
      title: "NGO Collaboration",
      description: "Directly connect with and support verified NGOs"
    },
    {
      icon: <FiShield className="text-2xl text-indigo-400" />,
      title: "Fraud Prevention",
      description: "Blockchain-based tracking ensures your donations reach the right place"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up & Join",
      description: "Create an account or join an existing NGO team",
      icon: <IoMdPeople className="text-3xl" />
    },
    {
      number: "02",
      title: "Donate or Volunteer",
      description: "Give items, money, or your time through tasks",
      icon: <FaHandHoldingUsd className="text-3xl" />
    },
    {
      number: "03",
      title: "Earn Points",
      description: "Get credit points for every contribution you make",
      icon: <FiAward className="text-3xl" />
    },
    {
      number: "04",
      title: "Track Impact",
      description: "See real-time updates on how your help is making a difference",
      icon: <FiTrendingUp className="text-3xl" />
    }
  ];

  const donationTypes = [
    { icon: <FaTshirt className="text-4xl" />, name: "Clothing", count: 1243 },
    { icon: <FaBookOpen className="text-4xl" />, name: "Books", count: 876 },
    { icon: <FaUtensils className="text-4xl" />, name: "Utensils", count: 542 },
    { icon: <FiDollarSign className="text-4xl" />, name: "Monetary", count: 389 }
  ];

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen overflow-x-hidden" ref={containerRef}>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-black/30 z-10"
          style={{ opacity }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-gray-950/70 to-gray-950 z-10"
          style={{ y }}
        />
        
        <Splide 
          options={{
            type: 'fade',
            rewind: true,
            autoplay: true,
            interval: 5000,
            speed: 1000,
            pauseOnHover: false,
            arrows: false,
            pagination: false
          }}
          className="absolute inset-0 h-full w-full"
        >
          {images.map((image, index) => (
            <SplideSlide key={index}>
              <div className="h-full w-full relative">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent" />
              </div>
            </SplideSlide>
          ))}
        </Splide>
        
        <div className="relative z-20 h-full flex flex-col justify-end pb-32 px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
              Turning Compassion into Action
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
              Empowering individuals and NGOs to fight poverty through tech, transparency, and community-driven support
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/donation")}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-rose-500/30 transition-all"
              >
                Start Donating <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/projects")}
                className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center gap-2 border border-gray-700 transition-all"
              >
                Join an NGO <FiArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-300 text-center"
          >
            <div className="text-sm mb-1">Scroll to explore</div>
            <div className="flex justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              More Than Just Donations
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We connect donors with NGOs and volunteers through a transparent, rewarding ecosystem
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-200">Our Unique Approach</h3>
                <p className="text-gray-400">
                  Unlike traditional charity platforms, we enable you to donate not just money but also items you no longer need, while earning recognition for your contributions.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                  <div className="text-rose-400 mb-3">
                    <FiDollarSign className="text-2xl" />
                  </div>
                  <h4 className="font-bold text-gray-200 mb-2">Multiple Donation Types</h4>
                  <p className="text-gray-400 text-sm">Clothes, books, utensils, and monetary donations</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                  <div className="text-emerald-400 mb-3">
                    <FiAward className="text-2xl" />
                  </div>
                  <h4 className="font-bold text-gray-200 mb-2">Credit Points System</h4>
                  <p className="text-gray-400 text-sm">Earn rewards for every contribution</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                  <div className="text-blue-400 mb-3">
                    <FiTrendingUp className="text-2xl" />
                  </div>
                  <h4 className="font-bold text-gray-200 mb-2">Real-time Tracking</h4>
                  <p className="text-gray-400 text-sm">See exactly how your help makes an impact</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                  <div className="text-purple-400 mb-3">
                    <FiShield className="text-2xl" />
                  </div>
                  <h4 className="font-bold text-gray-200 mb-2">Fraud Prevention</h4>
                  <p className="text-gray-400 text-sm">AI verification ensures transparency</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
                <h3 className="text-xl font-bold mb-4 text-gray-200">Poverty Rates by Country</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={povertyData}>
                      <XAxis 
                        dataKey="country" 
                        tick={{ fill: '#9CA3AF' }}
                        axisLine={{ stroke: '#4B5563' }}
                        tickLine={{ stroke: '#4B5563' }}
                      />
                      <YAxis 
                        tick={{ fill: '#9CA3AF' }}
                        axisLine={{ stroke: '#4B5563' }}
                        tickLine={{ stroke: '#4B5563' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: '#111827',
                          borderColor: '#1F2937',
                          borderRadius: '0.5rem'
                        }}
                        formatter={(value) => [`${value}%`, "Poverty Rate"]}
                      />
                      <Bar 
                        dataKey="povertyRate" 
                        name="Poverty Rate"
                        radius={[4, 4, 0, 0]}
                      >
                        {povertyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why We're Different Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Why We're Not Just Another Charity Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We combine technology with compassion to create real, measurable impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/30 transition-all group"
              >
                <div className="mb-4 p-4 bg-gray-700 rounded-xl w-max group-hover:bg-emerald-500/10 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-200 group-hover:text-emerald-400 transition-all">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-8 rounded-2xl border border-indigo-800/50 backdrop-blur-sm"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-100">
                  Our Technology Stack
                </h3>
                <p className="text-gray-300 mb-6">
                  We leverage cutting-edge technology to ensure transparency and efficiency in every donation:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <FiCheck className="text-indigo-400" />
                    </div>
                    <span className="text-gray-300">AI Verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <FiCheck className="text-purple-400" />
                    </div>
                    <span className="text-gray-300">Blockchain Tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <FiCheck className="text-emerald-400" />
                    </div>
                    <span className="text-gray-300">Real-time Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-500/10 rounded-lg">
                      <FiCheck className="text-rose-400" />
                    </div>
                    <span className="text-gray-300">Fraud Detection</span>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center">
                    <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 text-center">
                      Tech for Good
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Together, we're making a real difference in communities worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
              <div className="text-5xl font-bold mb-4 text-rose-400">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <CountUp end={isVisible ? 1243 : 0} duration={2} />
                  )}
                </VisibilitySensor>
                <span className="text-3xl">+</span>
              </div>
              <div className="text-xl text-gray-300">Items Donated</div>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
              <div className="text-5xl font-bold mb-4 text-purple-400">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <CountUp end={isVisible ? 523 : 0} duration={2} />
                  )}
                </VisibilitySensor>
                <span className="text-3xl">+</span>
              </div>
              <div className="text-xl text-gray-300">Active Volunteers</div>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
              <div className="text-5xl font-bold mb-4 text-emerald-400">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <CountUp end={isVisible ? 24 : 0} duration={2} />
                  )}
                </VisibilitySensor>
              </div>
              <div className="text-xl text-gray-300">NGOs Supported</div>
            </div>
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 text-center">
              <div className="text-5xl font-bold mb-4 text-amber-400">
                <VisibilitySensor partialVisibility>
                  {({ isVisible }) => (
                    <CountUp end={isVisible ? 18 : 0} duration={2} />
                  )}
                </VisibilitySensor>
                <span className="text-3xl">+</span>
              </div>
              <div className="text-xl text-gray-300">Cities Served</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-200">Donation Types</h3>
              <div className="grid grid-cols-2 gap-4">
                {donationTypes.map((type, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-xl text-center">
                    <div className="text-rose-400 mb-3 mx-auto w-max">
                      {type.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-200 mb-1">
                      <CountUp end={type.count} duration={2} />
                    </div>
                    <div className="text-gray-400">{type.name}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-200">Global Reach</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={povertyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={2}
                      dataKey="population"
                      nameKey="country"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {povertyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: '#111827',
                        borderColor: '#1F2937',
                        borderRadius: '0.5rem'
                      }}
                      formatter={(value) => [`${value} million`, "Population"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Get started in just a few simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
                <div className="text-5xl font-bold text-gray-700 group-hover:text-indigo-400 transition-all mb-4">
                  {step.number}
                </div>
                <div className="text-indigo-400 mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-2 group-hover:text-indigo-300 transition-all">
                  {step.title}
                </h3>
                <p className="text-gray-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold flex items-center gap-2 mx-auto shadow-lg hover:shadow-indigo-500/30 transition-all"
            >
              Join Us Now <FiArrowRight />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
              Stories of Impact
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hear from those who've made a difference through our platform
            </p>
          </motion.div>

          <div className="relative h-96 mb-16">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                activeTestimonial === index && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-900 p-8 md:p-12 rounded-2xl border border-gray-800 absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="text-2xl md:text-3xl font-medium text-gray-200 mb-8">
                      "{testimonial.quote}"
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-gray-200">{testimonial.name}</div>
                        <div className="text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? 'bg-amber-400 w-6' : 'bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Whether you donate, volunteer, or spread the word - every action counts in the fight against poverty.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/donation")}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all"
              >
                Donate Now <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/volunteer")}
                className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center gap-2 border border-gray-700 transition-all"
              >
                Volunteer <FiArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;