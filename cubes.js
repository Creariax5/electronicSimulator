import * as THREE from 'three';

import { SIZE } from "./consts.js";
import { material1, material2 } from "./materials.js";
import { getKey } from "./consts.js";

const geometry = new THREE.BoxGeometry(1, 1, 1);

export function initCubes(scene) {
    let cubes = new Map();
    
    let indice = true;
    const z = 0;
    
    for (let x = 0; x < SIZE - 1; x++) {
        for (let y = 0; y < SIZE - 1; y++) {
            const cube = new THREE.Mesh(
                geometry, 
                indice ? material1.clone() : material2.clone()
            );
            
            cube.position.set(x, y, z);
            
            cube.userData.originalMaterial = cube.material;
            
            cubes.set(getKey(x, y, z), cube);
            scene.add(cube);
            indice = !indice;
        }
    }
    
    return cubes;
}
