'use client';
import { useRef, useEffect, useState } from 'react';

const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const getAnchorAndDir = (origin, w, h) => {
  const outside = 0.2;
  switch (origin) {
    case 'top-left': return { anchor: [0, -outside * h], dir: [0, 1] };
    case 'top-right': return { anchor: [w, -outside * h], dir: [0, 1] };
    case 'left': return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case 'right': return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case 'bottom-left': return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-center': return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case 'bottom-right': return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default: return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = '#fff',
  raysSpeed = 0.8,
  lightSpread = 0.6,
  rayLength = 1.5,
  pulsating = true,
  fadeDistance = 1.0,
  saturation = 0.9,
  followMouse = true,
  mouseInfluence = 0.2,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = '',
}) {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef(null);
  const cleanupRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0].isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; }

    const init = async () => {
      if (!containerRef.current) return;
      await new Promise(r => setTimeout(r, 10));
      if (!containerRef.current) return;

      // Create WebGL canvas manually (no ogl dependency needed for basic implementation)
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';

      while (containerRef.current.firstChild) containerRef.current.removeChild(containerRef.current.firstChild);
      containerRef.current.appendChild(canvas);

      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return;

      rendererRef.current = gl;

      const vert = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const frag = `
        precision highp float;
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec2 rayPos;
        uniform vec2 rayDir;
        uniform vec3 raysColor;
        uniform float raysSpeed;
        uniform float lightSpread;
        uniform float rayLength;
        uniform float pulsating;
        uniform float fadeDistance;
        uniform float saturation;
        uniform vec2 mousePos;
        uniform float mouseInfluence;
        uniform float noiseAmount;
        uniform float distortion;
        varying vec2 vUv;

        float noise(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord, float seedA, float seedB, float speed) {
          vec2 sourceToCoord = coord - raySource;
          vec2 dirNorm = normalize(sourceToCoord);
          float cosAngle = dot(dirNorm, rayRefDirection);
          float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
          float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));
          float distance = length(sourceToCoord);
          float maxDistance = iResolution.x * rayLength;
          float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
          float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
          float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;
          float baseStrength = clamp(
            (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
            (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
            0.0, 1.0
          );
          return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
        }

        void main() {
          vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
          vec2 finalRayDir = rayDir;
          if (mouseInfluence > 0.0) {
            vec2 mouseScreenPos = mousePos * iResolution.xy;
            vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
            finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
          }
          vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
          vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
          vec4 fragColor = rays1 * 0.5 + rays2 * 0.4;
          if (noiseAmount > 0.0) {
            float n = noise(coord * 0.01 + iTime * 0.1);
            fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
          }
          float brightness = 1.0 - (coord.y / iResolution.y);
          fragColor.x *= 0.1 + brightness * 0.8;
          fragColor.y *= 0.3 + brightness * 0.6;
          fragColor.z *= 0.5 + brightness * 0.5;
          if (saturation != 1.0) {
            float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
            fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
          }
          fragColor.rgb *= raysColor;
          gl_FragColor = fragColor;
        }
      `;

      function compileShader(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
      }

      const vs = compileShader(gl.VERTEX_SHADER, vert);
      const fs = compileShader(gl.FRAGMENT_SHADER, frag);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      const u = {
        iTime: gl.getUniformLocation(program, 'iTime'),
        iResolution: gl.getUniformLocation(program, 'iResolution'),
        rayPos: gl.getUniformLocation(program, 'rayPos'),
        rayDir: gl.getUniformLocation(program, 'rayDir'),
        raysColor: gl.getUniformLocation(program, 'raysColor'),
        raysSpeed: gl.getUniformLocation(program, 'raysSpeed'),
        lightSpread: gl.getUniformLocation(program, 'lightSpread'),
        rayLength: gl.getUniformLocation(program, 'rayLength'),
        pulsating: gl.getUniformLocation(program, 'pulsating'),
        fadeDistance: gl.getUniformLocation(program, 'fadeDistance'),
        saturation: gl.getUniformLocation(program, 'saturation'),
        mousePos: gl.getUniformLocation(program, 'mousePos'),
        mouseInfluence: gl.getUniformLocation(program, 'mouseInfluence'),
        noiseAmount: gl.getUniformLocation(program, 'noiseAmount'),
        distortion: gl.getUniformLocation(program, 'distortion'),
      };

      uniformsRef.current = u;
      const rgb = hexToRgb(raysColor);

      const resize = () => {
        // Cap DPR at 1 — rays are blurry by nature, nobody sees the difference
        // but halving DPR cuts pixel count to 1/4 on retina displays
        const dpr = 1;
        const w = containerRef.current?.clientWidth || window.innerWidth;
        const h = containerRef.current?.clientHeight || window.innerHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);
        gl.uniform2f(u.iResolution, canvas.width, canvas.height);
        const { anchor, dir } = getAnchorAndDir(raysOrigin, canvas.width, canvas.height);
        gl.uniform2f(u.rayPos, anchor[0], anchor[1]);
        gl.uniform2f(u.rayDir, dir[0], dir[1]);
      };

      resize();
      gl.uniform3f(u.raysColor, rgb[0], rgb[1], rgb[2]);
      gl.uniform1f(u.raysSpeed, raysSpeed);
      gl.uniform1f(u.lightSpread, lightSpread);
      gl.uniform1f(u.rayLength, rayLength);
      gl.uniform1f(u.pulsating, pulsating ? 1.0 : 0.0);
      gl.uniform1f(u.fadeDistance, fadeDistance);
      gl.uniform1f(u.saturation, saturation);
      gl.uniform1f(u.mouseInfluence, mouseInfluence);
      gl.uniform1f(u.noiseAmount, noiseAmount);
      gl.uniform1f(u.distortion, distortion);

      window.addEventListener('resize', resize);

      // Throttle to 30fps — rays are slow ambient effects, imperceptible at half rate
      let frameCount = 0;
      const loop = (t) => {
        frameCount++;
        // Skip odd frames → ~30fps instead of 60fps
        if (frameCount % 2 === 0) {
          gl.useProgram(program);
          gl.uniform1f(u.iTime, t * 0.001);
          const sm = smoothMouseRef.current;
          const m = mouseRef.current;
          sm.x = sm.x * 0.92 + m.x * 0.08;
          sm.y = sm.y * 0.92 + m.y * 0.08;
          gl.uniform2f(u.mousePos, sm.x, sm.y);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        animationIdRef.current = requestAnimationFrame(loop);
      };
      animationIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
        window.removeEventListener('resize', resize);
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
        rendererRef.current = null;
        uniformsRef.current = null;
      };
    };

    init();
    return () => { if (cleanupRef.current) { cleanupRef.current(); cleanupRef.current = null; } };
  }, [isVisible, raysOrigin, raysColor, raysSpeed, lightSpread, rayLength, pulsating, fadeDistance, saturation, followMouse, mouseInfluence, noiseAmount, distortion]);

  useEffect(() => {
    if (!followMouse) return;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.detail?.x ?? e.clientX;
      const clientY = e.detail?.y ?? e.clientY;
      mouseRef.current = {
        x: (clientX - rect.left) / rect.width,
        y: (clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('hero-mouse', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('hero-mouse', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
