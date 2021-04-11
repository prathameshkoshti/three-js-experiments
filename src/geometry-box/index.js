import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

{
    const geometry = new THREE.BoxGeometry(2, 2, 2, 15, 15, 15);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x4895ef,
        wireframe: false
    });
    const box = new THREE.Mesh(geometry, material);
    box.rotation.set(0.85, 2.75, 1.2);
    scene.add(box);

    const gui = new GUI();
    const boxFolder = gui.addFolder('Box');

    const boxPositionFolder = boxFolder.addFolder('Position');
    boxPositionFolder.add(box.position, 'x', -10, 10);
    boxPositionFolder.add(box.position, 'y', -10, 10);
    boxPositionFolder.add(box.position, 'z', -10, 10);
    boxPositionFolder.open();
    
    const boxRotationFolder = boxFolder.addFolder('Rotation');
    boxRotationFolder.add(box.rotation, 'x', 0, Math.PI * 2, 0.01);
    boxRotationFolder.add(box.rotation, 'y', 0, Math.PI * 2, 0.01);
    boxRotationFolder.add(box.rotation, 'z', 0, Math.PI * 2, 0.01);
    boxRotationFolder.open();

    
    const boxScaleFolder = boxFolder.addFolder('Scale');
    boxScaleFolder.add(box.scale, 'x', 1, 2, 0.1);
    boxScaleFolder.add(box.scale, 'y', 1, 2, 0.1);
    boxScaleFolder.add(box.scale, 'z', 1, 2, 0.1);
    boxScaleFolder.open();

    boxFolder.add(material, 'wireframe')
    boxFolder.open();
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

    lightsPosition.forEach(lightPosition => {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        const { x, y, z } = lightPosition;
        light.position.set(x, y, z);
        
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
