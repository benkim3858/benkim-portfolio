import * as THREE from 'three';
import { ref } from 'vue';

export function useThreeScene() {
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;
  let starField: THREE.Points;
  let galaxyPoints: THREE.Points;
  
  const mouseX = ref(0);
  const mouseY = ref(0);

  const createStarField = () => {
    const geometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    const scales = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 1000 + 200;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);
      
      scales[i] = Math.random() * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x64ffda) }
      },
      vertexShader: `
        attribute float scale;
        varying float vAlpha;
        uniform float time;
        
        void main() {
          vAlpha = 0.5 + 0.5 * sin(time + position.x * 0.05);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        
        void main() {
          vec2 center = 2.0 * gl_PointCoord - 1.0;
          float dist = length(center);
          float alpha = (1.0 - smoothstep(0.0, 1.0, dist)) * vAlpha;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return new THREE.Points(geometry, material);
  };

  const createGalaxy = () => {
    const geometry = new THREE.BufferGeometry();
    const galaxyCount = 1000;
    const positions = new Float32Array(galaxyCount * 3);
    const colors = new Float32Array(galaxyCount * 3);

    for (let i = 0; i < galaxyCount; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 400 + 100;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = Math.sin(angle) * radius;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.8);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(time * 0.5 + position.z * 0.02) * 10.0;
          pos.z += cos(time * 0.5 + position.x * 0.02) * 10.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.0 * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          vec2 center = 2.0 * gl_PointCoord - 1.0;
          float dist = length(center);
          float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    return new THREE.Points(geometry, material);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    if (starField?.material instanceof THREE.ShaderMaterial) {
      starField.material.uniforms.time.value = time;
    }
    
    if (galaxyPoints?.material instanceof THREE.ShaderMaterial) {
      galaxyPoints.material.uniforms.time.value = time;
    }

    const targetX = mouseX.value * 0.0002;
    const targetY = mouseY.value * 0.0002;
    
    if (scene) {
      scene.rotation.y += (targetX - scene.rotation.y) * 0.01;
      scene.rotation.x += (targetY - scene.rotation.x) * 0.01;
    }

    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouseX.value = event.clientX - window.innerWidth / 2;
    mouseY.value = event.clientY - window.innerHeight / 2;
  };

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const initScene = (container: HTMLElement) => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    starField = createStarField();
    galaxyPoints = createGalaxy();
    
    scene.add(starField);
    scene.add(galaxyPoints);
    
    camera.position.z = 1000;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    animate();
  };

  const cleanupScene = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('resize', handleResize);
    
    if (renderer) {
      renderer.dispose();
    }
  };

  return {
    initScene,
    cleanupScene
  };
} 