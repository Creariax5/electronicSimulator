import * as THREE from 'three';

import { buildMaterial } from "./materials";

let selectedCube = null;

const geometry = new THREE.BoxGeometry(1, 1, 1);

function placeCube(scene, cubes) {
    if (selectedCube != null && selectedCube.position.z < 1) {
        let cube;
                    
        cube = new THREE.Mesh(geometry, buildMaterial.clone());
        cube.position.x = selectedCube.position.x;
        cube.position.y = selectedCube.position.y;
        cube.position.z = selectedCube.position.z + 1;
        cube.userData.originalMaterial = cube.material;
        cubes.push(cube);
        scene.add(cube);
    }
}

function deleteCube(scene, cubes) {
    if (selectedCube != null && selectedCube.position.z >= 1) {
        scene.remove(selectedCube);
        const index = cubes.indexOf(selectedCube);
        if (index > -1) {
            cubes.splice(index, 1);
        }
        selectedCube = null;
    }
}

export function setupInteractions(scene, cubes) {
    let deleteMode = false;
    let buildMode = false;

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0 || e.button === 2) {
            if (e.button === 0) { 
                placeCube(scene, cubes);
                buildMode = true;
            } else if (e.button === 2) {
                deleteCube(scene, cubes);
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
            placeCube(scene, cubes);
        } else if (deleteMode) {
            deleteCube(scene, cubes);
        }
    });
    
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        deleteCube(scene, cubes);
    });
}

export function updateSeletedCube(highlightedCube) {
    selectedCube = highlightedCube;
}

