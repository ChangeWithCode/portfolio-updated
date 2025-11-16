import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaReact, FaWordpress, FaPython, FaGithub, FaLinkedin,
  FaEnvelope, FaRocket, FaCode, FaChartLine, FaCheckCircle,
  FaExternalLinkAlt, FaShopify, FaDownload, FaSun, FaMoon
} from 'react-icons/fa'
import {
  SiTailwindcss, SiJavascript, SiWebflow, SiUpwork,
  SiSnowflake
} from 'react-icons/si'
import './App.css'

function App() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // Theme state management
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(!isDark)

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      if (!isVisible) return
      let startTime
      let animationFrame

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = (currentTime - startTime) / duration

        if (progress < 1) {
          setCount(Math.floor(end * progress))
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }, [isVisible, end, duration])

    return [count, setIsVisible]
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Animated background gradient */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
        isDark
          ? 'bg-gradient-to-br from-gray-950 via-blue-950/20 to-cyan-950/20'
          : 'bg-gradient-to-br from-blue-50 via-cyan-50/30 to-purple-50/20'
      }`} />

      {/* Animated grid background */}
      <GridBackground isDark={isDark} />

      {/* Navigation */}
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <HeroSection opacity={opacity} scale={scale} isDark={isDark} />

      {/* Stats Section */}
      <StatsSection useCounter={useCounter} isDark={isDark} />

      {/* About Section */}
      <AboutSection isDark={isDark} />

      {/* Skills Section */}
      <SkillsSection isDark={isDark} />

      {/* Projects Section */}
      <ProjectsSection isDark={isDark} />

      {/* Contact Section */}
      <ContactSection isDark={isDark} />

      {/* Floating particles effect */}
      <ParticlesBackground isDark={isDark} />
    </div>
  )
}

// Grid Background Component
const GridBackground = ({ isDark }) => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      <div className={`absolute inset-0 ${
        isDark
          ? 'bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(rgba(6,182,212,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.2)_1px,transparent_1px)]'
      } bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]`} />
    </div>
  )
}

// Navigation Component
const Navigation = ({ isDark, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-lg py-4' : 'py-6'
      } ${isDark ? 'glass-effect-dark' : 'glass-effect-light'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold gradient-text cursor-pointer"
        >
          MQ
        </motion.div>
        <div className="hidden md:flex gap-8 items-center">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className={`transition-colors relative group ${
                isDark ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-700 hover:text-cyan-600'
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-all ${
              isDark
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isDark ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </motion.button>
        </div>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-white"
        >
          Let's Talk
        </motion.a>
      </div>
    </motion.nav>
  )
}

// Hero Section Component
const HeroSection = ({ opacity, scale, isDark }) => {
  return (
    <motion.section
      id="hero"
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="gradient-text inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Muhammad Qasim
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`text-xl md:text-2xl mb-4 max-w-4xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            I Help SaaS Founders Ship Faster & Scale Smarter
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={`text-lg md:text-xl mb-8 ${
              isDark ? 'text-cyan-400' : 'text-cyan-600'
            }`}
          >
            50+ Web Products Launched | React • WordPress • Performance Expert
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 glow-effect text-white"
          >
            <FaRocket /> Start Your Project
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-cyan-500 transition-all ${
              isDark ? 'glass-effect-dark' : 'glass-effect-light'
            }`}
          >
            <FaCode /> View My Work
          </motion.a>
          <motion.a
            href="/assets/Muhammad_Qasim_Resume.pdf"
            download
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 text-white shadow-lg"
          >
            <FaDownload /> Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 ${
              isDark ? 'border-cyan-400' : 'border-cyan-600'
            }`}
          >
            <div className={`w-1 h-2 rounded-full ${
              isDark ? 'bg-cyan-400' : 'bg-cyan-600'
            }`} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Stats Section Component
const StatsSection = ({ useCounter, isDark }) => {
  const stats = [
    { value: 50, suffix: '+', label: 'Projects Launched', icon: FaRocket },
    { value: 95, suffix: '%', label: 'Client Satisfaction', icon: FaCheckCircle },
    { value: 25, suffix: '%', label: 'Performance Boost', icon: FaChartLine },
    { value: 30, suffix: '%', label: 'Mobile Traffic Increase', icon: FaChartLine },
  ]

  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} useCounter={useCounter} index={index} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  )
}

const StatCard = ({ stat, useCounter, index, isDark }) => {
  const [count, setIsVisible] = useCounter(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{
        y: -15,
        rotateY: 5,
        boxShadow: isDark
          ? "0 20px 60px rgba(6, 182, 212, 0.4)"
          : "0 20px 60px rgba(6, 182, 212, 0.3)"
      }}
      className={`rounded-2xl p-8 text-center hover:border-cyan-500 transition-all ${
        isDark ? 'glass-effect-dark' : 'glass-effect-light'
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <stat.icon className={`text-5xl mx-auto mb-4 ${
          isDark ? 'text-cyan-400' : 'text-cyan-600'
        }`} />
      </motion.div>
      <h3 className="text-4xl font-bold gradient-text mb-2">
        {count}{stat.suffix}
      </h3>
      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</p>
    </motion.div>
  )
}

// About Section Component
const AboutSection = ({ isDark }) => {
  return (
    <section id="about" className="relative py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="gradient-text">About Me</span>
          </h2>

          <div className={`rounded-3xl p-8 md:p-12 space-y-6 ${isDark ? 'glass-effect-dark' : 'glass-effect-light'}`}>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-cyan-400 font-semibold"
            >
              🚀 Your web product is too slow. Users are bouncing. You're losing revenue.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            >
              I've spent 5+ years solving exactly this problem for startups and SaaS companies—
              turning sluggish, underperforming websites into conversion machines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <FaChartLine /> TRACK RECORD:
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>50+ web products launched (95% client satisfaction)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>Average 25% faster load times = better UX + higher conversions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>30% increase in mobile traffic through responsive optimization</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <FaCode /> HOW I HELP:
              </h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>I don't just write code—I solve business problems:</p>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Launching MVPs that attract investors</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Scaling platforms that handle 10x user growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Optimizing checkout flows that recover abandoned carts</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Building dashboards that turn data into decisions</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                <FaRocket /> IDEAL FOR:
              </h3>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <li className="flex items-start gap-2">
                  <span className={`mt-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>→</span>
                  <span>SaaS founders preparing for launch or scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`mt-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>→</span>
                  <span>Agencies needing reliable frontend execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={`mt-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>→</span>
                  <span>Businesses migrating from legacy systems</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Skills Section Component
const SkillsSection = ({ isDark }) => {
  const skills = [
    { name: 'React.js', icon: FaReact, color: 'text-cyan-400' },
    { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-400' },
    { name: 'WordPress', icon: FaWordpress, color: 'text-blue-400' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-cyan-400' },
    { name: 'Python', icon: FaPython, color: 'text-blue-400' },
    { name: 'Webflow', icon: SiWebflow, color: 'text-blue-500' },
    { name: 'Shopify', icon: FaShopify, color: 'text-green-400' },
    { name: 'Snowflake', icon: SiSnowflake, color: 'text-cyan-300' },
  ]

  const expertise = [
    'REST APIs',
    'Performance Optimization',
    'QA/TDD',
    'GoHighLevel (GHL)',
    'Responsive Design',
    'E-commerce Solutions',
    'Database Design',
    'CI/CD',
  ]

  return (
    <section id="skills" className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="gradient-text">Technical Stack</span>
          </h2>

          {/* Main Technologies */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 40px rgba(6, 182, 212, 0.3)",
                  scale: 1.05
                }}
                className={`rounded-2xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer ${
                  isDark ? 'glass-effect-dark' : 'glass-effect-light'
                }`}
              >
                <skill.icon className={`text-5xl ${skill.color} mx-auto mb-3`} />
                <p className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{skill.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`rounded-2xl p-8 ${isDark ? 'glass-effect-dark' : 'glass-effect-light'}`}
          >
            <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
              Additional Expertise
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {expertise.map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 px-4 py-2 rounded-full text-sm font-medium hover:border-cyan-400 transition-all cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Projects Section Component
const ProjectsSection = ({ isDark }) => {
  const projects = [
    {
      title: 'SaaS Analytics Dashboard',
      description: 'Real-time analytics platform for SaaS startups that increased user engagement by 40% through intuitive data visualization.',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      image: 'https://via.placeholder.com/600x400/0a0a0a/06b6d4?text=SaaS+Dashboard',
      link: '#',
    },
    {
      title: 'E-commerce Performance Boost',
      description: 'Optimized Shopify store achieving 25% faster load times and 30% increase in mobile conversions.',
      tech: ['Shopify', 'JavaScript', 'Performance Optimization'],
      image: 'https://via.placeholder.com/600x400/0a0a0a/3b82f6?text=E-commerce+Site',
      link: '#',
    },
    {
      title: 'Enterprise WordPress Solution',
      description: 'Custom WordPress platform handling 100K+ monthly visitors with advanced caching and CDN integration.',
      tech: ['WordPress', 'PHP', 'MySQL', 'Redis'],
      image: 'https://via.placeholder.com/600x400/0a0a0a/8b5cf6?text=WordPress+Enterprise',
      link: '#',
    },
    {
      title: 'GoHighLevel Automation',
      description: 'Marketing automation workflows saving clients 20+ hours weekly through intelligent campaign management.',
      tech: ['GoHighLevel', 'Zapier', 'REST APIs'],
      image: 'https://via.placeholder.com/600x400/0a0a0a/06b6d4?text=GHL+Automation',
      link: '#',
    },
    {
      title: 'Webflow Portfolio Sites',
      description: 'Created stunning portfolio websites for creative agencies with custom animations and CMS integration.',
      tech: ['Webflow', 'JavaScript', 'Custom Code'],
      image: 'https://via.placeholder.com/600x400/0a0a0a/3b82f6?text=Webflow+Portfolio',
      link: '#',
    },
    {
      title: 'Data Visualization Platform',
      description: 'Interactive dashboards connecting to Snowflake data warehouse for enterprise business intelligence.',
      tech: ['React', 'Snowflake', 'Python', 'D3.js'],
      image: 'https://via.placeholder.com/600x400/0a0a0a/8b5cf6?text=Data+Platform',
      link: '#',
    },
  ]

  return (
    <section id="projects" className="relative py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            A showcase of impactful solutions that drive real business results
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} isDark={isDark} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className={`rounded-2xl overflow-hidden hover:border-cyan-500 transition-all group ${
        isDark ? 'glass-effect-dark' : 'glass-effect-light'
      }`}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{project.title}</h3>
        <p className={`text-sm mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-xs border border-cyan-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <motion.a
          href={project.link}
          whileHover={{ x: 5 }}
          className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 text-sm"
        >
          View Project <FaExternalLinkAlt className="text-xs" />
        </motion.a>
      </div>
    </motion.div>
  )
}

// Contact Section Component
const ContactSection = ({ isDark }) => {
  const socialLinks = [
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:qasimriaz814@gmail.com',
      label: 'qasimriaz814@gmail.com',
      color: 'hover:text-red-400'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/muhammad-qasim10/',
      label: 'muhammad-qasim10',
      color: 'hover:text-blue-400'
    },
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/ChangeWithCode',
      label: 'ChangeWithCode',
      color: 'hover:text-purple-400'
    },
    {
      name: 'Upwork',
      icon: SiUpwork,
      url: 'https://www.upwork.com/freelancers/~01dafd319a0f5979c6',
      label: 'View Profile',
      color: 'hover:text-green-400'
    },
  ]

  return (
    <section id="contact" className="relative py-20 px-6 mb-20">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="gradient-text">Let's Work Together</span>
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Ready to turn your web product from "okay" into "customers can't stop talking about it"?
          </p>

          <div className={`rounded-3xl p-8 md:p-12 ${isDark ? 'glass-effect-dark' : 'glass-effect-light'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(6, 182, 212, 0.3)"
                  }}
                  className={`rounded-xl p-6 flex items-center gap-4 hover:border-cyan-500 transition-all group ${
                    isDark ? 'glass-effect-dark' : 'glass-effect-light'
                  } ${link.color}`}
                >
                  <link.icon className="text-4xl text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-lg">{link.name}</p>
                    <p className="text-sm text-gray-400">{link.label}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className={`text-xl mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                💬 Let's talk if you're ready to:
              </p>
              <ul className={`space-y-3 text-left max-w-xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Launch your MVP and attract investors</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Scale your platform for 10x growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Optimize performance and boost conversions</span>
                </li>
              </ul>

              <motion.a
                href="mailto:qasimriaz814@gmail.com"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg glow-effect"
              >
                Start Your Project Today
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className={`text-center mt-16 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
      >
        <p>© 2024 Muhammad Qasim. Built with React & Tailwind CSS</p>
      </motion.footer>
    </section>
  )
}

// Particles Background Component
const ParticlesBackground = ({ isDark }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            isDark ? 'bg-cyan-400' : 'bg-cyan-600'
          }`}
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -(Math.random() * 40 + 20), 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Larger floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className={`absolute rounded-full blur-xl ${
            isDark
              ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
              : 'bg-gradient-to-r from-cyan-400/30 to-blue-400/30'
          }`}
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -(Math.random() * 50 + 25), 0],
            x: [0, (Math.random() - 0.5) * 50, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export default App
