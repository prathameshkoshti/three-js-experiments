import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/* 
    Three important things to render three elements:

    1. Scene: Where you will create a scene for rendering elements
    2. Camera: Camera will be used to view those elements
    3. Renderer: Rendered will render the elements on the scene
*/

// create a scene
const scene = new THREE.Scene();

/*
    create camera using PerspectiveCamera with following params
      FoV: 75 degree,
      aspect ratio: window width / window height,
      min rendering distance from camera: This will be the lowest value from the camera where rendered objects will be visible,
      max rendering distance from camera: This will be the maximum value from the camera where rendered objects will be visible beyond this value rendering won't be visible
*/
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);

/* 
    create a renderer
    set its size to window width and hight, to acquire whole window size
    and then append it to the body as a child element
*/
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add orbit controls to move camera viewing angle
const controls = new OrbitControls(camera, renderer.domElement);

/* 
    Creating an object
    - create a new geometry using required geometry constructor
    - create materials using required material constructor
    - combine geometry and material using Mesh constructor
    - and add it to the scene
*/
const geometry = new THREE.BoxGeometry();
const material = new THREE.PointsMaterial({ color: 0x888888 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// move the camera to make the rendering visible
camera.position.set(0, 0, 5);

// add this line to make orbit controls functional, must be called after any manual changed to the camera's transform properties
controls.update();

// rotates orbit controls
controls.autoRotate = true;

function animate() {
	requestAnimationFrame(animate);
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
	renderer.render(scene, camera);
}

animate();