import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const coneObject = {
    radius: 3,
    height: 3,
    radialSegments: 16,
    heightSegments: 10,
    openEnded: false,
    thetaStart: Math.PI * 2,
    thetaLength: Math.PI * 2,
}
const geometry = new THREE.ConeGeometry(coneObject.radius, coneObject.height, coneObject.radialSegments, coneObject.heightSegments, coneObject.openEnded, coneObject.thetaStart, coneObject. thetaLength);

const material = new THREE.MeshStandardMaterial({
    color: 0x4895ef,
    wireframe: false,
});

const cone = new THREE.Mesh(geometry, material);
scene.add(cone);

function reRenderCone() {
    const newConeGeometry = new THREE.ConeGeometry(coneObject.radius, coneObject.height, coneObject.radialSegments, coneObject.heightSegments, coneObject.openEnded, coneObject.thetaStart, coneObject. thetaLength);

    cone.geometry.dispose();
    cone.geometry = newConeGeometry;
}

{
    const gui = new GUI();
    gui.add(material, 'wireframe');
    gui.add(coneObject, 'radius', 1, 4).onChange(reRenderCone);
    gui.add(coneObject, 'height', 1, 4).onChange(reRenderCone);
    gui.add(coneObject, 'radialSegments', 1, 20).onChange(reRenderCone);
    gui.add(coneObject, 'heightSegments', 1, 20).onChange(reRenderCone);
    gui.add(coneObject, 'openEnded').onChange(reRenderCone);
    gui.add(coneObject, 'thetaStart', 0.1, Math.PI * 2).onChange(reRenderCone);
    gui.add(coneObject, 'thetaLength', 0.1, Math.PI * 2).onChange(reRenderCone);
}

{
    const lightsPosition = [
        {
            x: -4, y: 10, z: 4
        },
        {
            x: 2, y: -2, z: 2
        },
        {
            x: 2, y: -2, z: -5
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

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera)
}

render();