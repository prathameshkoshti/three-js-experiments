import { CylinderGeometry, DirectionalLight, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const scene = new Scene();

const camera = new PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 8;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const cylinderObj = {
    radiusTop: 1,
    radiusBottom: 1,
    height: 4,
    radialSegments: 10,
    heightSegments: 10,
    openEnded: true,
    thetaStart: Math.PI * 2,
    thetaLength: Math.PI * 2,
}

const geometry = new CylinderGeometry(
    cylinderObj.radiusTop,
    cylinderObj.radiusBottom,
    cylinderObj.height,
    cylinderObj.radialSegments,
    cylinderObj.heightSegments,
    cylinderObj.openEnded,
    cylinderObj.thetaStart,
    cylinderObj.thetaLength
);
const material = new MeshStandardMaterial({
    color: 0x4895ef,
    wireframe: false
})

const cylinder = new Mesh(geometry, material);
scene.add(cylinder);

function reRenderCylinder() {
    const geometry = new CylinderGeometry(
        cylinderObj.radiusTop,
        cylinderObj.radiusBottom,
        cylinderObj.height,
        cylinderObj.radialSegments,
        cylinderObj.heightSegments,
        cylinderObj.openEnded,
        cylinderObj.thetaStart,
        cylinderObj.thetaLength
    );
    
    cylinder.geometry.dispose();
    cylinder.geometry = geometry;
}

{
    // add gui
    const gui = new GUI();
    gui.add(material, 'wireframe');
    gui.add(cylinderObj, 'radiusTop', 1, 5).onChange(reRenderCylinder);
    gui.add(cylinderObj, 'radiusBottom', 1, 5).onChange(reRenderCylinder);
    gui.add(cylinderObj, 'height', 1, 7).onChange(reRenderCylinder);
    gui.add(cylinderObj, 'radialSegments', 1, 30).onChange(reRenderCylinder);
    gui.add(cylinderObj, 'heightSegments', 1, 30).onChange(reRenderCylinder);
    gui.add(cylinderObj, 'openEnded').onChange(reRenderCylinder);
    gui.add(cylinderObj, 'thetaStart', 0.1, Math.PI * 2).onChange(reRenderCylinder);
    gui.add(cylinderObj, 'thetaLength', 0.1, Math.PI * 2).onChange(reRenderCylinder);
}

{
    // add lights
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

    lightsPosition.forEach(position => {
        const { x, y, z } = position;
        const light = new DirectionalLight(0xffffff, 1);
        light.position.set(x, y, z);
        scene.add(light);
    })
}

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

render();
