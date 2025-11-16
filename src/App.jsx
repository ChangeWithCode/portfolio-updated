import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  FaReact, FaWordpress, FaPython, FaGithub, FaLinkedin,
  FaEnvelope, FaRocket, FaCode, FaChartLine, FaCheckCircle,
  FaExternalLinkAlt, FaShopify
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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-blue-950/20 to-cyan-950/20 pointer-events-none" />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection opacity={opacity} scale={scale} />

      {/* Stats Section */}
      <StatsSection useCounter={useCounter} />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Floating particles effect */}
      <ParticlesBackground />
    </div>
  )
}

// Navigation Component
const Navigation = () => {
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
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold gradient-text"
        >
          MQ
        </motion.div>
        <div className="hidden md:flex gap-8">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
        >
          Let's Talk
        </motion.a>
      </div>
    </motion.nav>
  )
}

// Hero Section Component
const HeroSection = ({ opacity, scale }) => {
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
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Muhammad Qasim</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto"
          >
            I Help SaaS Founders Ship Faster & Scale Smarter
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-cyan-400 mb-8"
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
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 glow-effect"
          >
            <FaRocket /> Start Your Project
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-effect px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:border-cyan-500"
          >
            <FaCode /> View My Work
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
            className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-cyan-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

// Stats Section Component
const StatsSection = ({ useCounter }) => {
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
            <StatCard key={index} stat={stat} useCounter={useCounter} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const StatCard = ({ stat, useCounter, index }) => {
  const [count, setIsVisible] = useCounter(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onViewportEnter={() => setIsVisible(true)}
      whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(6, 182, 212, 0.3)" }}
      className="glass-effect rounded-2xl p-8 text-center hover:border-cyan-500 transition-all"
    >
      <stat.icon className="text-5xl text-cyan-400 mx-auto mb-4" />
      <h3 className="text-4xl font-bold gradient-text mb-2">
        {count}{stat.suffix}
      </h3>
      <p className="text-gray-400">{stat.label}</p>
    </motion.div>
  )
}

// About Section Component
const AboutSection = () => {
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

          <div className="glass-effect rounded-3xl p-8 md:p-12 space-y-6">
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
              className="text-lg text-gray-300 leading-relaxed"
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
              <p className="text-gray-300">I don't just write code—I solve business problems:</p>
              <ul className="space-y-2 text-gray-300">
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
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>SaaS founders preparing for launch or scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>Agencies needing reliable frontend execution</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
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
const SkillsSection = () => {
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
                className="glass-effect rounded-2xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer"
              >
                <skill.icon className={`text-5xl ${skill.color} mx-auto mb-3`} />
                <p className="font-semibold text-gray-200">{skill.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Expertise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
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
const ProjectsSection = () => {
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
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            A showcase of impactful solutions that drive real business results
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="glass-effect rounded-2xl overflow-hidden hover:border-cyan-500 transition-all group"
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
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
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
const ContactSection = () => {
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
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto text-lg">
            Ready to turn your web product from "okay" into "customers can't stop talking about it"?
          </p>

          <div className="glass-effect rounded-3xl p-8 md:p-12">
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
                  className={`glass-effect rounded-xl p-6 flex items-center gap-4 hover:border-cyan-500 transition-all group ${link.color}`}
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
              <p className="text-xl text-gray-300 mb-6">
                💬 Let's talk if you're ready to:
              </p>
              <ul className="space-y-3 text-left max-w-xl mx-auto text-gray-400">
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
        className="text-center mt-16 text-gray-500"
      >
        <p>© 2024 Muhammad Qasim. Built with React & Tailwind CSS</p>
      </motion.footer>
    </section>
  )
}

// Particles Background Component
const ParticlesBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

export default App
