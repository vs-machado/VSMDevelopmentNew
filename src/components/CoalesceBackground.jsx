import React, { useRef, useEffect } from 'react';

// Utilities from util.js
const { PI, cos, sin, abs, sqrt, pow, random, atan2 } = Math;
const HALF_PI = 0.5 * PI;
const rand = n => n * random();
const fadeInOut = (t, m) => {
  let hm = 0.5 * m;
  return abs((t + hm) % m - hm) / (hm);
};
const angle = (x1, y1, x2, y2) => atan2(y2 - y1, x2 - x1);
const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

const CoalesceBackground = () => {
  const containerRef = useRef(null);
  const canvasRefA = useRef(document.createElement('canvas'));
  const canvasRefB = useRef(null);

  useEffect(() => {
    const particleCount = 200; // Reduced from 700 for better legibility
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const baseTTL = 100;
    const rangeTTL = 500;
    const baseSpeed = 0.1;
    const rangeSpeed = 1;
    const baseSize = 2; // Slightly larger particles
    const rangeSize = 8; // Slightly larger range
    const baseHue = 180; // Cyan start
    const rangeHue = 40; // Variation around cyan
    const backgroundColor = '#050505'; // Match application background

    let canvasA = canvasRefA.current;
    let canvasB = canvasRefB.current;
    let ctxA = canvasA.getContext('2d');
    let ctxB = canvasB.getContext('2d');
    let center = [0, 0];
    let tick = 0;
    let particleProps = new Float32Array(particlePropsLength);
    let animationFrameId;

    const initParticle = (i) => {
      let x, y, theta, vx, vy, life, ttl, speed, size, hue;

      x = rand(canvasA.width);
      y = rand(canvasA.height);
      theta = angle(x, y, center[0], center[1]);
      vx = cos(theta) * 6;
      vy = sin(theta) * 6;
      life = 0;
      ttl = baseTTL + rand(rangeTTL);
      speed = baseSpeed + rand(rangeSpeed);
      size = baseSize + rand(rangeSize);
      hue = baseHue + rand(rangeHue);

      particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
    };

    const initParticles = () => {
      tick = 0;
      particleProps = new Float32Array(particlePropsLength);
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    };

    const drawParticle = (x, y, theta, life, ttl, size, hue) => {
      let xRel = x - (0.5 * size), yRel = y - (0.5 * size);
      
      ctxA.save();
      ctxA.lineCap = 'round';
      ctxA.lineWidth = 1;
      ctxA.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctxA.beginPath();
      ctxA.translate(xRel, yRel);
      ctxA.rotate(theta);
      ctxA.translate(-xRel, -yRel);
      ctxA.strokeRect(xRel, yRel, size, size);
      ctxA.closePath();
      ctxA.restore();
    };

    const updateParticle = (i) => {
      let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i;
      let x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue;

      x = particleProps[i];
      y = particleProps[i2];
      theta = angle(x, y, center[0], center[1]) + 0.75 * HALF_PI;
      vx = lerp(particleProps[i3], 2 * cos(theta), 0.05);
      vy = lerp(particleProps[i4], 2 * sin(theta), 0.05);
      life = particleProps[i5];
      ttl = particleProps[i6];
      speed = particleProps[i7];
      x2 = x + vx * speed;
      y2 = y + vy * speed;
      size = particleProps[i8];
      hue = particleProps[i9];

      drawParticle(x, y, theta, life, ttl, size, hue);

      life++;

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life;

      if (life > ttl) initParticle(i);
    };

    const drawParticles = () => {
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }
    };

    const renderGlow = () => {
      ctxB.save();
      ctxB.filter = 'blur(4px) brightness(150%)';
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();
    };

    const render = () => {
      ctxB.save();
      ctxB.globalCompositeOperation = 'lighter';
      ctxB.drawImage(canvasA, 0, 0);
      ctxB.restore();
    };

    const resize = () => {
      const { innerWidth, innerHeight } = window;
      
      canvasA.width = innerWidth;
      canvasA.height = innerHeight;
      canvasB.width = innerWidth;
      canvasB.height = innerHeight;

      center[0] = 0.5 * canvasA.width;
      center[1] = 0.5 * canvasA.height;
    };

    const loop = () => {
      tick++;

      ctxA.clearRect(0, 0, canvasA.width, canvasA.height);

      ctxB.fillStyle = backgroundColor;
      ctxB.fillRect(0, 0, canvasA.width, canvasA.height);

      drawParticles();
      renderGlow();
      render();

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    initParticles();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 pointer-events-none opacity-50">
      <canvas
        ref={canvasRefB}
        className="w-full h-full"
      />
    </div>
  );
};

export default CoalesceBackground;
