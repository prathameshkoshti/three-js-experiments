import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc4baff)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


function makeCube(color, x) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: color });
    
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;

    scene.add(cube);

    return cube;
}

const cubes = [
    makeCube(0xffc8dd, -2),
    makeCube(0xa999ff, 0),
    makeCube(0xbde0fe, 2),
];

{
    const lightColor = 0xffffff;
    const lightIntensity = 1;

    const light = new THREE.DirectionalLight(lightColor, lightIntensity);
    light.position.set(-5, 4, 4);

    scene.add(light)
}

function render(time) {
    time *= 0.001;
    
    cubes.forEach((cube, index) => {
        const speed = 1 + (index * 10) * 0.1;
        const rotation = time * speed;
        cube.rotation.x = rotation;
        cube.rotation.y = rotation;
    })

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);