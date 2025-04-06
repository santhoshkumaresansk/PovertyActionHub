import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css/core';
import { FiArrowRight, FiDollarSign, FiGlobe, FiHeart, FiAward, FiUsers } from "react-icons/fi";
import { RiLeafLine, RiWaterFlashLine, RiBookLine } from "react-icons/ri";

const images = [
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "End Poverty",
    subtitle: "Join our mission to eradicate extreme poverty by 2030"
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Quality Education",
    subtitle: "Every child deserves access to quality learning"
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
    title: "Zero Hunger",
    subtitle: "Working towards a world without malnutrition"
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

const Home = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

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
              Ending Poverty Through Collective Action
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
              Join our global movement to eradicate extreme poverty by 2030. Every action counts.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/donation")}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-rose-500/30 transition-all"
              >
                Donate Now <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/projects")}
                className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold flex items-center gap-2 border border-gray-700 transition-all"
              >
                Learn More <FiArrowRight />
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

      {/* Poverty Stats Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400 mb-4">
                700M+
              </div>
              <div className="text-xl text-gray-400">
                People live in extreme poverty
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-4">
                1 in 10
              </div>
              <div className="text-xl text-gray-400">
                People worldwide struggle with hunger
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
                258M
              </div>
              <div className="text-xl text-gray-400">
                Children are out of school
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Data Visualization Section */}
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
              Global Poverty Insights
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Understanding the scale and distribution of poverty is the first step toward effective solutions.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-300">
                Poverty Rates by Country (% of population)
              </h3>
              <div className="h-80">
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
                      label={{ 
                        value: 'Poverty Rate %', 
                        angle: -90, 
                        position: 'insideLeft',
                        fill: '#9CA3AF'
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        background: '#111827',
                        borderColor: '#1F2937',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                      }}
                      itemStyle={{ color: '#F3F4F6' }}
                      formatter={(value) => [`${value}%`, "Poverty Rate"]}
                    />
                    <Bar 
                      dataKey="povertyRate" 
                      name="Poverty Rate"
                      radius={[4, 4, 0, 0]}
                      animationDuration={2000}
                    >
                      {povertyData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-2xl"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-300">
                Population in Poverty (Millions)
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={povertyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      innerRadius={60}
                      paddingAngle={2}
                      dataKey="population"
                      nameKey="country"
                      animationDuration={2000}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {povertyData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: '#111827',
                        borderColor: '#1F2937',
                        borderRadius: '0.5rem',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
                      }}
                      formatter={(value) => [`${value} million`, "Population"]}
                    />
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      wrapperStyle={{ paddingLeft: '20px' }}
                      formatter={(value, entry, index) => (
                        <span className="text-gray-300">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* World Map */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-6 text-gray-300">
              Global Poverty Distribution
            </h3>
            <div className="h-[600px] relative">
              <ComposableMap 
                projection="geoMercator"
                projectionConfig={{
                  scale: 120,
                  center: [20, 10]
                }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1F2937"
                        stroke="#374151"
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#4B5563", outline: "none" },
                          pressed: { fill: "#6B7280", outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {povertyData.map(({ country, coordinates, povertyRate, region }) => (
                  <Marker key={country} coordinates={coordinates}>
                    <motion.circle 
                      r={Math.sqrt(povertyRate) * 2}
                      fill={REGION_COLORS[region]}
                      stroke="#F3F4F6"
                      strokeWidth={1}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ 
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                        delay: 0.5 + Math.random() * 0.5
                      }}
                      whileHover={{ opacity: 1, scale: 1.1 }}
                    />
                    <text
                      textAnchor="middle"
                      y={-Math.sqrt(povertyRate) * 2 - 8}
                      style={{ 
                        fontFamily: "system-ui", 
                        fill: "#F3F4F6", 
                        fontSize: "12px",
                        fontWeight: "bold"
                      }}
                    >
                      {country}
                    </text>
                  </Marker>
                ))}
              </ComposableMap>
              <div className="absolute bottom-4 right-4 bg-gray-800/80 backdrop-blur-sm p-3 rounded-lg text-sm border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                  <span className="text-gray-300">Asia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <span className="text-gray-300">Africa</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SDG Goals Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
              Sustainable Development Goals
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our work aligns with the United Nations SDGs to create a better future for all.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sdgGoals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-emerald-500/30 transition-all group"
              >
                <div className="mb-4 p-4 bg-gray-800 rounded-xl w-max group-hover:bg-emerald-500/10 transition-all">
                  {goal.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-200 group-hover:text-emerald-400 transition-all">
                  {goal.title}
                </h3>
                <p className="text-gray-400">
                  {goal.description}
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
                  Progress Towards 2030 Targets
                </h3>
                <p className="text-gray-300 mb-6">
                  While significant progress has been made in reducing poverty since 1990, the pace has slowed. 
                  Current projections suggest we may miss the SDG target of reducing extreme poverty to below 3% 
                  by 2030 without accelerated action.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>2023 Progress</span>
                    <span>45%</span>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "45%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center">
                    <div className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                      2030
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">
              Take Action Today
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your contribution can make a real difference in the fight against poverty.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionButtons.map((button, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <button
                  onClick={() => navigate(button.path)}
                  className={`w-full h-full p-8 rounded-2xl bg-gradient-to-br ${button.gradient} text-white font-bold flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg hover:shadow-${button.gradient.split(' ')[1]}/30`}
                >
                  <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                    {button.icon}
                  </div>
                  <div className="text-xl">{button.name}</div>
                  <FiArrowRight className="mt-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;