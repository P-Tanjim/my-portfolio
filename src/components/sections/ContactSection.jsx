'use client';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const socialLinks = [
  { name: 'GitHub', handle: 'P-tanjim', url: 'https://github.com/P-tanjim', symbol: '⌥', color: '#E8E8FF' },
  { name: 'LinkedIn', handle: 'Tanjim', url: '#', symbol: 'in', color: '#0A66C2' },
  { name: 'YouTube', handle: 'Terminal Threat', url: '#', symbol: '▶', color: '#FF0000' },
  { name: 'Facebook', handle: 'Tanjim', url: '#', symbol: 'f', color: '#1877F2' },
];

function GlassInput({ label, type = 'text', value, onChange, rows, required }) {
  const [focused, setFocused] = useState(false);
  const Tag = rows ? 'textarea' : 'input';

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs"
        style={{ fontFamily: 'Space Mono', color: focused ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.3s', letterSpacing: '0.06em' }}
      >
        {label} {required && <span style={{ color: 'var(--accent-2)' }}>*</span>}
      </label>
      <Tag
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        required={required}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: focused ? '1px solid rgba(91,91,255,0.5)' : '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12,
          padding: rows ? '14px 16px' : '13px 16px',
          color: 'var(--bright)',
          fontFamily: 'Space Mono',
          fontSize: 13,
          outline: 'none',
          width: '100%',
          resize: rows ? 'none' : undefined,
          transition: 'border-color 0.3s, box-shadow 0.3s, background 0.3s',
          boxShadow: focused ? '0 0 0 4px rgba(91,91,255,0.1)' : 'none',
          backdropFilter: focused ? 'blur(8px)' : 'none',
        }}
        placeholder={`Enter your ${label.toLowerCase()}...`}
      />
    </div>
  );
}

function InfoCard({ icon, label, value, href, color }) {
  return (
    <a
      href={href}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl group transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        textDecoration: 'none',
      }}
      onMouseOver={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.border = `1px solid rgba(255,255,255,0.1)`;
      }}
      onMouseOut={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-muted mb-0.5" style={{ fontFamily: 'Space Mono', letterSpacing: '0.06em' }}>{label}</div>
        <div className="text-sm text-bright">{value}</div>
      </div>
      <div className="ml-auto text-muted group-hover:text-bright transition-colors" style={{ fontSize: 16 }}>→</div>
    </a>
  );
}

export default function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [form, setForm] = useState({ name: '', email: '', subject: 'Job Opportunity', message: '' });
  const [status, setStatus] = useState('idle');

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 2000));
    setStatus('success');
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(91,91,255,0.06) 1.5px, transparent 1.5px),
            radial-gradient(circle, rgba(91,91,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px, 16px 16px',
          backgroundPosition: '0 0, 8px 8px',
        }}
      />

      <div
        className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(91,91,255,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)', transform: 'translateY(30%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <div className="section-label mb-4">Contact</div>
          <h2 className="heading-lg text-bright">
            Let&apos;s Build
            <br />
            <span className="text-accent-gradient">Something Great</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div
            className="flex flex-col gap-8"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateX(-40px)',
              transition: 'all 0.8s ease',
            }}
          >
            <p className="text-muted leading-relaxed" style={{ fontSize: 16, maxWidth: 440 }}>
              Whether it&apos;s a full-time role, a freelance project, or just a conversation about code —
              I&apos;m all ears. I respond within 24 hours.
            </p>

            <div className="flex flex-col gap-3">
              <InfoCard icon="✉️" label="EMAIL" value="hello@tanjim.dev" href="mailto:hello@tanjim.dev" color="#5B5BFF" />
              <InfoCard icon="📞" label="PHONE / WHATSAPP" value="+880 1XXX-XXXXXX" href="https://wa.me/880" color="#25D366" />
            </div>

            <div>
              <div className="text-xs mb-4" style={{ fontFamily: 'Space Mono', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                // FIND ME ON
              </div>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'var(--muted)',
                      textDecoration: 'none',
                      fontFamily: 'Space Mono', fontSize: 11,
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = 'var(--bright)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.color = 'var(--muted)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    }}
                  >
                    <span style={{ fontSize: 14 }}>{social.symbol}</span>
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl self-start"
              style={{ background: 'rgba(91,255,200,0.06)', border: '1px solid rgba(91,255,200,0.2)' }}
            >
              <div
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#5BFFC8',
                  boxShadow: '0 0 12px rgba(91,255,200,0.6)',
                  animation: 'availPulse 2s ease-in-out infinite',
                }}
              />
              <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: '#5BFFC8' }}>
                Open to Work · Remote & On-site
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'none' : 'translateX(40px)',
              transition: 'all 0.8s ease 0.2s',
            }}
          >
            <div
              className="relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(15,15,26,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(91,91,255,0.5), transparent)',
                }}
              />

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                    style={{ background: 'rgba(91,255,200,0.1)', border: '1px solid rgba(91,255,200,0.3)' }}
                  >
                    ✓
                  </div>
                  <div>
                    <h3 className="text-bright font-bold mb-2" style={{ fontFamily: 'Space Mono', fontSize: 18 }}>
                      Message Received!
                    </h3>
                    <p className="text-muted text-sm">I&apos;ll get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: 'Job Opportunity', message: '' }); }}
                    className="px-6 py-3 rounded-xl text-sm transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--muted)', cursor: 'pointer',
                      fontFamily: 'Space Mono', fontSize: 12,
                    }}
                    onMouseOver={e => { e.currentTarget.style.color = 'var(--bright)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = 'var(--muted)'; }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="text-xs mb-2" style={{ fontFamily: 'Space Mono', color: 'var(--muted)', letterSpacing: '0.1em' }}>
                    // SEND A MESSAGE
                  </div>

                  <GlassInput label="NAME" value={form.name} onChange={update('name')} required />
                  <GlassInput label="EMAIL" type="email" value={form.email} onChange={update('email')} required />

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-muted" style={{ fontFamily: 'Space Mono', letterSpacing: '0.06em' }}>SUBJECT</label>
                    <select
                      value={form.subject}
                      onChange={update('subject')}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: 12,
                        padding: '13px 16px',
                        color: 'var(--bright)',
                        fontFamily: 'Space Mono',
                        fontSize: 13,
                        outline: 'none',
                        cursor: 'pointer',
                        appearance: 'none',
                        width: '100%',
                      }}
                    >
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="Freelance Project">Freelance Project</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Just Saying Hi">Just Saying Hi</option>
                    </select>
                  </div>

                  <GlassInput label="MESSAGE" value={form.message} onChange={update('message')} rows={5} required />

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="relative flex items-center justify-center gap-3 py-4 rounded-xl font-bold transition-all duration-300 overflow-hidden"
                    style={{
                      background: status === 'loading' ? 'rgba(91,91,255,0.3)' : 'rgba(91,91,255,0.9)',
                      border: '1px solid rgba(91,91,255,0.5)',
                      color: '#fff',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      fontFamily: 'Space Mono',
                      fontSize: 13, letterSpacing: '0.06em',
                      boxShadow: status !== 'loading' ? '0 4px 24px rgba(91,91,255,0.3)' : 'none',
                    }}
                    onMouseOver={e => { if (status !== 'loading') e.currentTarget.style.boxShadow = '0 6px 32px rgba(91,91,255,0.5)'; }}
                    onMouseOut={e => { if (status !== 'loading') e.currentTarget.style.boxShadow = '0 4px 24px rgba(91,91,255,0.3)'; }}
                  >
                    {status === 'loading' ? (
                      <>
                        <div
                          style={{
                            width: 16, height: 16, borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTop: '2px solid #fff',
                            animation: 'spin 0.8s linear infinite',
                          }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>Send Message →</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes availPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
