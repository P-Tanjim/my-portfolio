import '../styles/globals.css';

export const metadata = {
  title: 'Tanjim | Frontend Developer',
  description: 'Portfolio of Tanjim — Frontend Developer crafting premium digital experiences with React, Next.js, and creative animations.',
  keywords: ['Frontend Developer', 'React Developer', 'Next.js', 'Portfolio', 'Web Developer', 'Bangladesh'],
  openGraph: {
    title: 'Tanjim | Frontend Developer',
    description: 'Premium portfolio showcasing creative web development projects and skills.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Pre-resolve DNS + TCP handshake before Spline JS even requests it */}
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
