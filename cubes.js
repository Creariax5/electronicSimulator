import * as THREE from 'three';

import { SIZE } from "./consts.js";
import { material1, material2 } from "./materials.js";

const geometry = new THREE.BoxGeometry(1, 1, 1);

export function initCubes(scene) {
    let cubes = [];

    let indice = true;
    for (let i = 0; i < SIZE - 1; i++) {
        for (let j = 0; j < SIZE - 1; j++) {
            let cube;
            if (indice) {
                cube = new THREE.Mesh(geometry, material1.clone());
                indice = false;
            } else {
                cube = new THREE.Mesh(geometry, material2.clone());
                indice = true;
            }
            cube.position.x = i;
            cube.position.y = j;
            cube.userData.originalMaterial = cube.material;
            cubes.push(cube);
            scene.add(cube);
        }
    }
    return cubes;
}
