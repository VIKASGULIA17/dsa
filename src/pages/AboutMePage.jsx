import React from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  BookOpen,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Star,
  Users,
  Coffee,
  Heart,
  ExternalLink,
  Download,
  Send,
  Instagram
} from 'lucide-react'
import vikasAvatar from '../asset/VikasBhai.png'

const AboutMePage = () => {
  const techStack = [
    { name: 'React.js', icon: '⚛️', category: 'Frontend' },
    { name: 'Node.js', icon: '🟢', category: 'Backend' },
    { name: 'Python', icon: '🐍', category: 'Language' },
    { name: 'JavaScript', icon: '🟡', category: 'Language' },
    { name: 'Git', icon: '📂', category: 'Tools' },
    { name: 'Tailwind CSS', icon: '🎨', category: 'Styling' },
    { name: 'React-syntax-highlighter', icon: '⚡', category: 'Frontend' },
    { name: 'React-copy-to-clipboard', icon: '📋', category: 'Frontend' }

  ]

  const projects = [

    {
      "title": "DSA Learning Hub",
      "description": "An all-in-one platform for mastering DSA with an integrated code editor, test case runner, and interactive algorithm visualizers.",
      "tech": ["React", "Vite", "Tailwind CSS", "Monaco Editor", "d3.js"],
      "status": "In Progress",
    },
    {
      "title": "Cloud-Based Test Case Runner",
      "description": "A backend service that securely executes user-submitted code against predefined test cases for instant feedback.",
      "tech": ["Node.js", "Express", "Docker", "REST API"],
      "status": "In Progress",
    },
    {
      "title": "Competitive Programming Toolkit",
      "description": "A collection of resources, problem sets, and advanced code templates for competitive programming contests.",
      "tech": ["Python", "Flask", "PostgreSQL"],
      "status": "In Progress",

    }

  ]

  const achievements = [
    { icon: "🏆", title: "370+ Problems Solved", description: "Across various coding platforms" },
    { icon: "📚", title: "BCA 3rd Year", description: "Computer Science & Application" },
    { icon: "💡", title: "Sap Dev", description: "Got an offer from sap labs" },
    { icon: "🎯", title: "Problem Solver", description: "Passionate about algorithmic challenges" }
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">

        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-red-600 rounded-full flex items-center justify-center mb-6">
              <img src={vikasAvatar} alt="" srcset="" className='w-full h-full p-3'/>
            </div>
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Vikas Gulia
            </span>
          </h1>

          <p className="text-2xl text-neutral-300 mb-4">Full-Stack Developer & DSA Enthusiast</p>

          <div className="flex items-center justify-center space-x-6 text-neutral-400 mb-8">
            <div className="flex items-center">
              <MapPin size={16} className="mr-2" />
              <span>New Delhi ,India</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>2+ years experience</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:vikasgulia17@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              data-testid="contact-btn"
            >
              <Mail className="mr-2" size={20} />
              Get In Touch
            </a>
            <button className="inline-flex items-center px-6 py-3 border-2 border-neutral-600 text-neutral-300 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-400 transition-all">
              <Download className="mr-2" size={20} />
              Download Resume
            </button>
          </div>
        </section>

        {/* My Story Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Story & Mission
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-800/30">
                <h3 className="text-2xl font-bold text-white mb-4">The Journey</h3>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  My programming journey started in college when I struggled with Data Structures and Algorithms.
                  Like many students, I found the concepts challenging and the available resources scattered and difficult to follow.
                </p>
                <p className="text-neutral-300 leading-relaxed">
                  After years of practice, solving 370+ problems, and helping peers, I realized the need for a
                  comprehensive, beginner-friendly platform that makes DSA accessible to everyone.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-8 border border-green-800/30">
                <h3 className="text-2xl font-bold text-white mb-4">The Mission</h3>
                <p className="text-neutral-300 leading-relaxed mb-4">
                  This DSA Hub is my contribution to the programming community. My goal is to provide:
                </p>
                <ul className="text-neutral-300 space-y-2">
                  <li className="flex items-start">
                    <Heart className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Clear, intuitive explanations with real-world analogies</span>
                  </li>
                  <li className="flex items-start">
                    <Code2 className="text-blue-400 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Ready-to-use code templates in multiple languages</span>
                  </li>
                  <li className="flex items-start">
                    <BookOpen className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Comprehensive theory with practical applications</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Achievements & Background</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-neutral-900/30 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-all">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                <p className="text-sm text-neutral-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Tech Stack & Tools</h2>
          <p className="text-center text-neutral-400 mb-12 max-w-2xl mx-auto">
            Technologies I use to build this platform and other projects. Always learning and exploring new tools!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all group">
                <span className="text-2xl">{tech.icon}</span>
                <div>
                  <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-xs text-neutral-500">{tech.category}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Feature to implement in future*/}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Feature to be implemented in future</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-6 border border-neutral-700 hover:border-neutral-600 transition-all group">
                <div className="flex items-start justify-around mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${project.status === 'Active' ? 'bg-green-900 text-green-300' :
                      project.status === 'In Progress' ? 'bg-blue-400 text-blue-100' :
                        'bg-yellow-900 text-yellow-300'
                    }`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-neutral-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>


              </div>
            ))}
          </div>
        </section>

        {/* Connect Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-800/50">
            <Users className="mx-auto mb-6 text-blue-400" size={48} />
            <h2 className="text-3xl font-bold text-white mb-4">Let's Connect!</h2>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              I love connecting with fellow developers, students, and anyone passionate about programming.
              Feel free to reach out for collaboration, questions, or just a friendly chat!
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://github.com/vikasgulia17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-all"
                data-testid="github-link"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vikas-gulia-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-all"
                data-testid="linkedin-link"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/__vikas17_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-all"
                data-testid="twitter-link"
              >
                <Instagram size={20} />
                <span>Instagram</span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-4">Send a Quick Message</h3>
              <form className="space-y-4" data-testid="contact-form">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none"
                  data-testid="email-input"
                />
                <textarea
                  placeholder="Your message..."
                  rows="4"
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-blue-500 focus:outline-none resize-none"
                  data-testid="message-input"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  data-testid="send-message-btn"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-700">
              <p className="text-neutral-400 text-sm">
                Built with <Coffee className="inline text-amber-400 mx-1" size={16} /> and lots of passion.
                <br />
                <Link to="/dsa-hub" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Explore the DSA Hub
                </Link> to start your learning journey!
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutMePage