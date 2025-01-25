import * as THREE from 'three';

import { buildMaterial } from "./materials";
import { getKey } from "./consts";

let selectedCube = null;
let currentBuildMaterial = null;

const geometry = new THREE.BoxGeometry(1, 1, 1);

function placeCube(scene, cubes) {
    if (selectedCube != null && selectedCube.position.z < 1) {
        const cube = new THREE.Mesh(geometry, currentBuildMaterial.clone());
        
        cube.position.set(
            selectedCube.position.x,
            selectedCube.position.y,
            selectedCube.position.z + 1
        );
        
        cube.userData.originalMaterial = cube.material;
        
        const key = getKey(cube.position.x, cube.position.y, cube.position.z);
        
        if (!cubes.has(key)) {
            cubes.set(key, cube);
            scene.add(cube);
        }
    }
}


function deleteCube(scene, cubes) {
    if (selectedCube != null && selectedCube.position.z >= 1) {
        const key = getKey(
            selectedCube.position.x,
            selectedCube.position.y,
            selectedCube.position.z
        );
        
        scene.remove(selectedCube);
        cubes.delete(key);
        selectedCube = null;
    }
}


export function setupInteractions(scene, cubes) {
    let deleteMode = false;
    let buildMode = false;

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0 || e.button === 2) {
            if (e.button === 0) { 
                deleteCube(scene, cubes);
                buildMode = true;
            } else if (e.button === 2) {
                placeCube(scene, cubes);
                deleteMode = true;
            }
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (e.button === 0 || e.button === 2) {
            deleteMode = false;
            buildMode = false;
        }
    });

    document.addEventListener('mousemove', (event) => {
        if (buildMode) { 
            deleteCube(scene, cubes);
        } else if (deleteMode) {
            placeCube(scene, cubes);
        }
    });
    
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        placeCube(scene, cubes);
    });
}

export function updateSeletedCube(highlightedCube, buildMaterial) {
    selectedCube = highlightedCube;
    currentBuildMaterial = buildMaterial;
}

