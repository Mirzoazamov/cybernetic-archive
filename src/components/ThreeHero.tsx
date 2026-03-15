import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    camera.position.z = 28;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    // Nodes (DAG-like network)
    const NODE_COUNT = 90;
    const positions: THREE.Vector3[] = [];
    const nodeGeo = new THREE.IcosahedronGeometry(0.1, 0);
    const nodeGroup = new THREE.Group();

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 28;
      const z = (Math.random() - 0.5) * 14;
      positions.push(new THREE.Vector3(x, y, z));
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.85 ? 0x9b5de5 : 0xb8ff57,
        transparent: true,
        opacity: Math.random() * 0.5 + 0.2,
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(x, y, z);
      if (Math.random() > 0.85) mesh.scale.setScalar(1.8 + Math.random() * 1.4);
      nodeGroup.add(mesh);
    }
    scene.add(nodeGroup);

    // Edges
    const edgeGroup = new THREE.Group();
    const MAX_DIST = 10;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < MAX_DIST) {
          const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
          const mat = new THREE.LineBasicMaterial({
            color: 0x9b5de5,
            transparent: true,
            opacity: (1 - dist / MAX_DIST) * 0.2,
          });
          edgeGroup.add(new THREE.Line(geo, mat));
        }
      }
    }
    scene.add(edgeGroup);

    // Traveling particles along edges
    const particleGroup = new THREE.Group();
    const particleGeo = new THREE.SphereGeometry(0.04, 4, 4);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.8 });
    const particles: { mesh: THREE.Mesh; from: THREE.Vector3; to: THREE.Vector3; t: number; speed: number }[] = [];

    for (let i = 0; i < 30; i++) {
      const fromIdx = Math.floor(Math.random() * NODE_COUNT);
      let toIdx = Math.floor(Math.random() * NODE_COUNT);
      if (toIdx === fromIdx) toIdx = (toIdx + 1) % NODE_COUNT;
      const mesh = new THREE.Mesh(particleGeo, particleMat.clone());
      particleGroup.add(mesh);
      particles.push({
        mesh,
        from: positions[fromIdx],
        to: positions[toIdx],
        t: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
      });
    }
    scene.add(particleGroup);

    // Mouse parallax
    let targetRotX = 0, targetRotY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetRotY = ((e.clientX / window.innerWidth) - 0.5) * 0.3;
      targetRotX = ((e.clientY / window.innerHeight) - 0.5) * -0.15;
    };
    document.addEventListener('mousemove', onMouseMove);

    let t = 0;
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.003;

      nodeGroup.rotation.y += (targetRotY - nodeGroup.rotation.y) * 0.03;
      nodeGroup.rotation.x += (targetRotX - nodeGroup.rotation.x) * 0.03;
      edgeGroup.rotation.y = nodeGroup.rotation.y;
      edgeGroup.rotation.x = nodeGroup.rotation.x;
      particleGroup.rotation.y = nodeGroup.rotation.y;
      particleGroup.rotation.x = nodeGroup.rotation.x;

      nodeGroup.children.forEach((m, i) => {
        (m as THREE.Mesh).material && ((m as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity !== undefined &&
          ((m as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity !== 0 &&
          (((m as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.abs(Math.sin(t + i * 0.4)) * 0.5);
      });

      particles.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.from = p.to;
          p.to = positions[Math.floor(Math.random() * NODE_COUNT)];
        }
        p.mesh.position.lerpVectors(p.from, p.to, p.t);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
}
