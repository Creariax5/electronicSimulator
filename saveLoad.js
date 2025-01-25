// saveLoad.js
import { getKey, SIZE } from "./consts";
import * as THREE from 'three';
import { material1, material2, conductorOff, conductorOn, conductorOn1, conductorOn2, energy, buildMaterial } from "./materials";

// Map material hex colors to their corresponding material objects
const materialMap = new Map([
    [material1.color.getHex(), material1],
    [material2.color.getHex(), material2],
    [conductorOff.color.getHex(), conductorOff],
    [conductorOn.color.getHex(), conductorOn],
    [conductorOn1.color.getHex(), conductorOn1],
    [conductorOn2.color.getHex(), conductorOn2],
    [energy.color.getHex(), energy],
    [buildMaterial.color.getHex(), buildMaterial]
]);

// Global state for raycasting control
export let isMouseOverUI = false;

export function setupSaveLoadSystem(scene, cubes) {
    // Create download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Map';
    downloadButton.style.position = 'fixed';
    downloadButton.style.top = '10px';
    downloadButton.style.left = '10px';
    downloadButton.style.padding = '8px 16px';
    downloadButton.style.zIndex = '1000';
    downloadButton.style.cursor = 'pointer';
    downloadButton.style.backgroundColor = '#4CAF50';
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '4px';
    
    // Add mouse enter/leave handlers for the button
    downloadButton.addEventListener('mouseenter', () => {
        isMouseOverUI = true;
    });
    
    downloadButton.addEventListener('mouseleave', () => {
        isMouseOverUI = false;
    });
    
    downloadButton.addEventListener('click', () => saveMap(cubes));
    document.body.appendChild(downloadButton);

    // Setup drag and drop
    setupDragAndDrop(scene, cubes);
}

function setupDragAndDrop(scene, cubes) {
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.json')) {
            loadMapFromFile(file, scene, cubes);
        } else {
            alert('Please drop a valid .json map file');
        }
    });
}

function saveMap(cubes) {
    const mapData = [];
    
    cubes.forEach((cube, key) => {
        const originalColor = cube.userData.originalMaterial.color.getHex();
        
        mapData.push({
            key: key,
            position: {
                x: cube.position.x,
                y: cube.position.y,
                z: cube.position.z
            },
            materialColor: originalColor
        });
    });
    
    const blob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'cube-map.json';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    URL.revokeObjectURL(url);
}

async function loadMapFromFile(file, scene, cubes) {
    try {
        const fileContent = await file.text();
        const savedMap = JSON.parse(fileContent);
        
        // Clear existing cubes
        cubes.forEach(cube => {
            scene.remove(cube);
        });
        cubes.clear();
        
        // Create new cubes from saved data
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        
        savedMap.forEach(cubeData => {
            const material = materialMap.get(cubeData.materialColor);
            
            if (!material) {
                console.error('Unknown material color:', 
                    cubeData.materialColor.toString(16),
                    'at position:', cubeData.position);
                return;
            }
            
            const clonedMaterial = material.clone();
            const cube = new THREE.Mesh(geometry, clonedMaterial);
            
            cube.position.set(
                cubeData.position.x,
                cubeData.position.y,
                cubeData.position.z
            );
            
            cube.userData.originalMaterial = clonedMaterial;
            cubes.set(cubeData.key, cube);
            scene.add(cube);
        });
        
        console.log('Map loaded successfully!');
    } catch (error) {
        console.error('Error loading map:', error);
        alert('Error loading map file! Please make sure you selected a valid map file.');
    }
}