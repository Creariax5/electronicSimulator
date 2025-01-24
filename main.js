import * as THREE from 'three';

import { setupControls } from './controls.js';
import { initCubes } from "./cubes.js";
import { SIZE } from "./consts.js";
import { initRaycaster, updateRaycaster } from "./raycaster.js";
import { setupInteractions, updateSeletedCube } from "./interactions.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;
camera.position.x = SIZE / 2;
camera.position.y = SIZE / 2;
setupControls(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cubes = initCubes(scene);

let highlightedCube = null;
initRaycaster(camera, renderer);

setupInteractions(scene, cubes);

function animate() {
    highlightedCube = updateRaycaster(camera, cubes);
    updateSeletedCube(highlightedCube);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
