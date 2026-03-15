import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on devices with fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    document.addEventListener('mousemove', onMove);

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    let raf: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + 'px';
        dotRef.current.style.top = mouse.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300"
        style={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          borderColor: hovering ? 'hsl(var(--lime))' : 'hsla(84,100%,67%,0.6)',
          background: hovering ? 'hsla(84,100%,67%,0.06)' : 'transparent',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={dotRef}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 5, height: 5,
          background: 'hsl(var(--lime))',
          boxShadow: '0 0 8px hsl(var(--lime))',
        }}
      />
    </>
  );
}
