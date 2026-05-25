'use client';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const education = [
  {
    id: 1,
    institution: 'East West University',
    degree: 'B.Sc. in Computer Science & Engineering',
    duration: '2023 — Present',
    highlight: 'Competed in NRF26/EWU National RoboFest with CascadAI platform',
    emoji: '🎓',
    color: '#5B5BFF',
    side: 'right',
    tags: ['CSE', 'Dhaka', 'Ongoing'],
  },
  {
    id: 2,
    institution: 'Higher Secondary Certificate',
    degree: 'Science Stream — HSC',
    duration: '2020 — 2022',
    highlight: 'Completed with Physics, Chemistry & Mathematics focus',
    emoji: '📚',
    color: '#FF5B8D',
    side: 'left',
    tags: ['Science', 'HSC'],
  },
  {
    id: 3,
    institution: 'Self-Learning Journey',
    degree: 'Frontend Development',
    duration: '2022 — Present',
    highlight: 'HTML → CSS → JS → React → Next.js. 3+ years, zero shortcuts',
    emoji: '💻',
    color: '#5BFFC8',
    side: 'right',
    tags: ['React', 'Next.js', 'GSAP', 'Self-Taught'],
  },
];

function TimelineCard({ item, index, visible }) {
  const isLeft = item.side === 'left';

  return (
    <div
      className={`relative flex items-center gap-0 ${isLeft ? 'flex-row-reverse' : 'flex-row'} md:flex-row`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateX(${isLeft ? '40px' : '-40px'})`,
        transition: `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`,
      }}
    >
      <div className={`flex-1 ${isLeft ? 'mr-8 text-right' : 'ml-8'} md:max-w-sm`} style={{ maxWidth: '100%' }}>
        <div
          className="relative p-6 rounded-2xl overflow-hidden transition-all duration-300"
          style={{ background: 'rgba(19,19,31,0.9)', border: `1px solid rgba(255,255,255,0.06)` }}
          onMouseOver={e => {
            e.currentTarget.style.border = `1px solid rgba(255,255,255,0.12)`;
            e.currentTarget.style.boxShadow = `0 8px 32px rgba(0,0,0,0.3)`;
          }}
          onMouseOut={e => {
            e.currentTarget.style.border = `1px solid rgba(255,255,255,0.06)`;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
              opacity: 0.6,
            }}
          />

          <div className={`flex flex-col gap-3 ${isLeft ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `rgba(255,255,255,0.04)`, border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {item.emoji}
              </div>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  fontFamily: 'Space Mono',
                  background: `rgba(255,255,255,0.04)`,
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: item.color,
                  fontSize: 10,
                }}
              >
                {item.duration}
              </span>
            </div>

            <div>
              <h3 className="text-bright font-bold leading-snug" style={{ fontFamily: 'Space Mono', fontSize: 15 }}>
                {item.institution}
              </h3>
              <p className="text-muted text-sm mt-1">{item.degree}</p>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
              {item.highlight}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    background: `rgba(255,255,255,0.04)`,
                    border: `1px solid rgba(255,255,255,0.07)`,
                    color: 'var(--muted)',
                    fontFamily: 'Space Mono', fontSize: 10,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center flex-shrink-0" style={{ zIndex: 10 }}>
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center"
          style={{
            background: item.color,
            boxShadow: `0 0 16px ${item.color}80`,
            transition: `all 0.3s ease ${index * 0.2 + 0.4}s`,
            transform: visible ? 'scale(1)' : 'scale(0)',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ink)' }} />
        </div>
      </div>

      <div className="hidden md:block flex-1" />
    </div>
  );
}

export default function EducationSection() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const lineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const totalDuration = 1500;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / totalDuration, 1);
      setLineHeight(progress * 100);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const timeoutId = setTimeout(() => requestAnimationFrame(animate), 300);
    return () => clearTimeout(timeoutId);
  }, [inView]);

  return (
    <section
      id="education"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91,91,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,91,255,0.04) 1px, transparent 1px),
            linear-gradient(rgba(91,91,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,91,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(91,255,200,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(30%, 30%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="section-label mb-4">Education</div>
          <h2 className="heading-lg text-bright">
            The Journey
            <br />
            <span className="text-accent-gradient">So Far</span>
          </h2>
        </div>

        <div className="relative">
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0"
            style={{ transform: 'translateX(-50%)', width: 1, background: 'rgba(255,255,255,0.05)' }}
          >
            <div
              ref={lineRef}
              style={{
                width: '100%',
                height: `${lineHeight}%`,
                background: `linear-gradient(to bottom, #5B5BFF, #FF5B8D, #5BFFC8)`,
                transition: 'none',
                boxShadow: '0 0 8px rgba(91,91,255,0.4)',
              }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {education.map((item, idx) => (
              <TimelineCard key={item.id} item={item} index={idx} visible={inView} />
            ))}
          </div>
        </div>

        <div
          className="mt-20 flex justify-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.8s',
          }}
        >
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full"
            style={{
              background: 'rgba(91,91,255,0.08)',
              border: '1px solid rgba(91,91,255,0.2)',
              fontFamily: 'Space Mono', fontSize: 12, color: 'var(--accent)',
            }}
          >
            <span style={{ fontSize: 14 }}>📍</span>
            Dhaka, Bangladesh · Available for Remote Work
          </div>
        </div>
      </div>
    </section>
  );
}
