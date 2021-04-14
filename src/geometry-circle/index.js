import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const circleData = {
    radius: 1,
    segments: 8,
    thetaStart: 0,
    thetaLength: Math.PI * 2.00,
}

const geometry = new THREE.CircleGeometry(circleData.radius, circleData.segments, circleData.thetaStart, circleData.thetaLength);
geometry.name = 'Geometry'
const material = new THREE.MeshStandardMaterial({
    color: 0x4895ef,
    wireframe: true,
});
material.name = 'Material'
const circle = new THREE.Mesh(geometry, material);
circle.name = 'CircleMesh'

scene.add(circle);

function reRenderCircle() {
    const newGeometry = new THREE.CircleGeometry(circleData.radius, circleData.segments, circleData.thetaStart, circleData.thetaLength);

    circle.geometry.dispose();
    circle.geometry = newGeometry;
}

{
    const gui = new GUI();
    gui.add(material, 'wireframe');

    gui.add(circleData, 'radius', 1, 5).onChange(reRenderCircle);
    gui.add(circleData, 'segments', 1, 100).onChange(reRenderCircle);
    gui.add(circleData, 'thetaStart', 0, Math.PI * 2.00).onChange(reRenderCircle);
    gui.add(circleData, 'thetaLength', 1, Math.PI * 2.00).onChange(reRenderCircle);
}

{
    const lightsPosition = [
        {
            x: 0, y: 0, z: 4
        },
        {
            x: 0, y: 0, z: -4
        },
    ];

    lightsPosition.forEach((lightPosition, index) => {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        const { x, y, z } = lightPosition;
        light.position.set(x, y, z);
        light.name = `Light ${index + 1}`;
        
        scene.add(light);
    })
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update(render);
}

render();