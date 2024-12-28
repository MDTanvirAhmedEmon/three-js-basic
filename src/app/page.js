'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const ThreeJSExample = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    // Scene, Camera, Renderer
    // bydefault scene is dark and black 
    const scene = new THREE.Scene();


    // 2. Create a Camera
    const camera = new THREE.PerspectiveCamera(
      75, // Field of view
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping
      1000 // Far clipping
    );

    // 3. Create a Renderer
    // antialias: true; will make element smooth and remove line
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
    })

    // Attach renderer to the DOM
    mountRef.current.appendChild(renderer.domElement);

    // Geometry and Material (A Cube)
    const geometry = new THREE.BoxGeometry(1, 1, 1); // Shape: Box
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); // Color: Green
    const cube = new THREE.Mesh(geometry, material);  // Combine shape + color

    // set cube/mesh position

    // cube.position.x= 1
    // cube.position.y= 1
    // cube.position.z= 1

    // cube.scale.z= 1
    // cube.scale.x= 1
    // cube.scale.y= 1

    scene.add(cube); // Add cube/mesh to the scene

    // distance of camera from object or Position the Camera
    // camera.position.x = Math.PI / 4; // Move the camera to the right
    // camera.position.y = Math.PI / 4 // Move the camera up
    camera.position.z = 2; // Move the camera further away


    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;

    // Set the damping factor (adjust for desired smoothness)
    controls.dampingFactor = 0.10;
    controls.enableZoom = true;
    
    // Animation Loop
    // renderer.render(scene, camera);
    const animate = () => {
      requestAnimationFrame(animate);
      // 3.14 means pie means 360deg
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.rotation.z += 0.01;

      // Render the Scene
      // Render means take picture every time and print 
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}> </div>;
};

export default ThreeJSExample;
