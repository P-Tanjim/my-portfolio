'use client';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import BorderGlow from '../effects/BorderGlow';

// ── Project Data ───────────────────────────────────────────────────────────────
const featuredProjects = [
  {
    id: 1,
    num: '01',
    name: 'Nebula Dashboard',
    description: 'Built a comprehensive analytics platform featuring real-time data streams, interactive charts, and customizable widgets. Implemented WebSocket connections for live updates and complex data aggregations.',
    stack: ['Next.js', 'TypeScript', 'D3.js', 'WebSocket'],
    color: '#00E5FF',
    colorRgb: '0, 229, 255',
    logo: 'N',
    live: '#',
    github: '#',
  },
  {
    id: 2,
    num: '02',
    name: 'Pulse Social',
    description: 'Developed a full-featured social networking application with real-time chat, post sharing, and activity feeds. Features include end-to-end encryption and optimistic UI updates.',
    stack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    color: '#FF3366',
    colorRgb: '255, 51, 102',
    logo: 'P',
    live: '#',
    github: '#',
  },
  {
    id: 3,
    num: '03',
    name: 'Aurora Store',
    description: 'Created an innovative e-commerce experience featuring 3D product visualization, AR try-on features, and seamless checkout flow. Integrated with Stripe for payments.',
    stack: ['Next.js', 'Three.js', 'Stripe', 'Prisma'],
    color: '#FF6B00',
    colorRgb: '255, 107, 0',
    logo: 'A',
    live: '#',
    github: '#',
  }
];

const otherProjects = [
  {
    id: 1,
    name: 'DevFlow',
    description: 'Developer productivity tool with AI assistance',
    stack: ['TypeScript', 'OpenAI', 'VS Code'],
    logo: 'D',
    color: '#00E5FF',
    colorRgb: '0, 229, 255',
    live: '#',
    github: '#'
  },
  {
    id: 2,
    name: 'Harmony Music',
    description: 'Music streaming app with social features',
    stack: ['React Native', 'Firebase', 'Spotify API'],
    logo: 'M',
    color: '#FF3366',
    colorRgb: '255, 51, 102',
    live: '#',
    github: '#'
  },
  {
    id: 3,
    name: 'Quantum Tasks',
    description: 'AI-powered task management system',
    stack: ['Next.js', 'GPT-4', 'Supabase'],
    logo: 'Q',
    color: '#FF6B00',
    colorRgb: '255, 107, 0',
    live: '#',
    github: '#'
  }
];

// ── Icons ──────────────────────────────────────────────────────────────────────
const ExternalLinkIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const FolderIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

// ── Components ─────────────────────────────────────────────────────────────────
function FeaturedProjectCard({ project, index, inView }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`group flex flex-col md:flex-row w-full rounded-3xl overflow-hidden border border-white/5 mb-12 transition-colors duration-500 hover:border-white/10`}
      style={{ background: 'rgba(19,19,31,0.6)', backdropFilter: 'blur(10px)' }}
    >
      {/* Visual Side */}
      <div 
        className={`w-full md:w-1/2 relative min-h-[300px] md:max-h-[360px] flex-shrink-0 ${isEven ? 'order-1 md:order-1' : 'order-1 md:order-2'}`}
        style={{ 
          background: `linear-gradient(${isEven ? 'to bottom right' : 'to bottom left'}, rgba(${project.colorRgb}, 0.2) 0%, rgba(10,10,15,0.8) 100%)`
        }}
      >
        
        <div 
          className="absolute top-8 left-8"
          style={{ 
            fontFamily: 'Space Mono', 
            fontSize: '8rem', 
            fontWeight: 800, 
            lineHeight: 0.8,
            color: `rgba(${project.colorRgb}, 0.2)`
          }}
        >
          {project.num}
        </div>

        <div 
          className="absolute bottom-8 right-8 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
          style={{ 
            background: `rgba(${project.colorRgb}, 0.1)`, 
            border: `1px solid rgba(${project.colorRgb}, 0.2)`,
            color: project.color,
            fontFamily: 'Space Mono'
          }}
        >
          {project.logo}
        </div>
      </div>

      {/* Content Side */}
      <div 
        className={`w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center transition-transform duration-500 ease-out group-hover:translate-x-4 ${isEven ? 'order-2 md:order-2' : 'order-2 md:order-1'}`}
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: `rgba(${project.colorRgb}, 0.1)`,
                border: `1px solid rgba(${project.colorRgb}, 0.2)`,
                color: project.color,
                fontFamily: 'Space Mono',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Space Mono', letterSpacing: '-0.02em' }}>
          {project.name}
        </h3>

        <p className="text-muted text-[14px] leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-4 mt-auto">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-transform hover:-translate-y-1"
            style={{
              background: project.color,
              color: '#000',
              fontFamily: 'Space Mono',
            }}
          >
            Live Demo <ExternalLinkIcon />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-transform hover:-translate-y-1"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--muted)',
              fontFamily: 'Space Mono',
            }}
          >
            <GithubIcon /> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function OtherProjectCard({ project, index, inView }) {
  let glowColor = "40 80 80";
  let borderColors = ['#c084fc', '#f472b6', '#38bdf8'];
  if (project.id === 1) { 
    glowColor = "186 100 50";
    borderColors = ['#00E5FF', '#00B4D8', '#0077B6'];
  } else if (project.id === 2) { 
    glowColor = "345 100 60";
    borderColors = ['#FF3366', '#FF0055', '#C1121F'];
  } else if (project.id === 3) { 
    glowColor = "25 100 50";
    borderColors = ['#FF6B00', '#FF8A00', '#E85D04'];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      className="group cursor-pointer h-full"
    >
      <BorderGlow
        className="h-full"
        backgroundColor="#13131f"
        borderRadius={16}
        glowColor={glowColor}
        colors={borderColors}
        edgeSensitivity={30}
        glowRadius={40}
        glowIntensity={1.0}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-6">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold"
              style={{ 
                background: `rgba(${project.colorRgb}, 0.1)`, 
                color: project.color,
                fontFamily: 'Space Mono'
              }}
            >
              {project.logo}
            </div>
            <div className="flex gap-3 text-muted relative z-10">
              <a href={project.github} className="hover:text-white transition-colors"><GithubIcon /></a>
              <a href={project.live} className="hover:text-white transition-colors"><ExternalLinkIcon /></a>
            </div>
          </div>

          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-accent-gradient transition-colors" style={{ fontFamily: 'Space Mono' }}>
            {project.name}
          </h4>
          
          <p className="text-sm text-muted mb-6 flex-grow">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto text-xs text-muted/60" style={{ fontFamily: 'Space Mono' }}>
            {project.stack.map(tech => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

// ── Main Section ───────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="section-label mb-4"
          >
            Projects
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-lg text-bright"
          >
            Things I&apos;ve <span className="text-accent-gradient">Built</span>
          </motion.h2>
        </div>

        {/* Featured Projects */}
        <div className="flex flex-col">
          {featuredProjects.map((project, idx) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={idx}
              inView={inView}
            />
          ))}
        </div>

        {/* Other Projects */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'Space Mono' }}>
            Other Noteworthy Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((project, idx) => (
              <OtherProjectCard
                key={project.id}
                project={project}
                index={idx}
                inView={inView}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="https://github.com/P-tanjim"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center text-sm text-muted hover:text-white transition-colors py-2 px-1"
            style={{ fontFamily: 'Space Mono' }}
          >
            <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-3">
              View All Projects on GitHub &gt;
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left transform scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"></span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
