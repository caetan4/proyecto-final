import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Cargar SplineLoader estable
const loaderModule = await import(
  'https://unpkg.com/@splinetool/loader@0.9.518/build/SplineLoader.js'
);
const SplineLoader = loaderModule.default;

// CAMERA
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  -100000,
  100000
);
camera.position.set(0, 0, 1000);

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color('#2d2e32');

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// Cargar modelo desde Spline
const splineLoader = new SplineLoader();
splineLoader.load(
  'https://prod.spline.design/knpqGkNvBhGAlG-f/scene.splinecode',
  (splineScene) => {
    scene.add(splineScene);
  }
);

// RESIZE
window.addEventListener('resize', () => {
  camera.left = window.innerWidth / -2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / -2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// LOOP
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
