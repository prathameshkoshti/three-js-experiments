import { Scene, PerspectiveCamera, WebGLRenderer, DodecahedronGeometry, DirectionalLight, Mesh, MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

const scene = new Scene();

const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometryObj = {
    radius: 1,
    detail: 0,
}

const geometry = new DodecahedronGeometry(geometryObj.radius, geometryObj.detail);

const material = new MeshStandardMaterial({
    color: 0x4895ef,
    wireframe: false,
});

const mesh = new Mesh(geometry, material);
scene.add(mesh);

function reRenderGeometry() {
    const geometry = new DodecahedronGeometry(geometryObj.radius, geometryObj.detail);
    mesh.geometry.dispose();
    mesh.geometry = geometry;
}

{
    const gui = new GUI();
    gui.add(material, 'wireframe');
    gui.add(geometryObj, 'radius', 1, 3, 1).onChange(reRenderGeometry);
    gui.add(geometryObj, 'detail', 0, 10, 1).onChange(reRenderGeometry);
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
        const light = new DirectionalLight(0xffffff, 1);
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
    controls.update();
    renderer.render(scene, camera);
}

render();
