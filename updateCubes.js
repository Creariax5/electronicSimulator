import { getKey, SIZE } from "./consts";
import { conductorOff, conductorOn, conductorOn1, conductorOn2, energy } from "./materials";

let lastUpdateTime = 0;
const THROTTLE_DELAY = 10;

function getNeighbors(cube, cubes) {
    const neighbors = [];
    const position = cube.position;
    
    const directions = [
        { x: 1, y: 0, z: 0 },  // right
        { x: -1, y: 0, z: 0 }, // left
        { x: 0, y: 1, z: 0 },  // up
        { x: 0, y: -1, z: 0 }, // down
        { x: 0, y: 0, z: 1 },  // front
        { x: 0, y: 0, z: -1 }  // back
    ];
    
    for (const dir of directions) {
        const neighborKey = getKey(
            Math.round(position.x + dir.x),
            Math.round(position.y + dir.y),
            Math.round(position.z + dir.z)
        );
        
        if (cubes.has(neighborKey)) {
            neighbors.push(cubes.get(neighborKey));
        }
    }
    
    return neighbors;
}

function conductorOffUpdate(cube, cubes) {
    let neighbors = getNeighbors(cube, cubes);
    for (let neighbor of neighbors) {
        if (neighbor.material.color.getHex() === conductorOn.color.getHex() || 
            neighbor.material.color.getHex() === energy.color.getHex()) {
            return {
                material: conductorOn.clone(),
                originalMaterial: conductorOn.clone()
            };
        }
    }
    return null;
}

function conductorOn2Update(cube, cubes) {
    let neighbors = getNeighbors(cube, cubes);
    for (let neighbor of neighbors) {
        if (neighbor.material.color.getHex() === conductorOn.color.getHex() || 
            neighbor.material.color.getHex() === energy.color.getHex()) {
            return {
                material: conductorOn.clone(),
                originalMaterial: conductorOn.clone()
            };
        }
    }
    return {
        material: conductorOff.clone(),
        originalMaterial: conductorOff.clone()
    };
    return null;
}

function conductorOn1Update() {
    return {
        material: conductorOn2.clone(),
        originalMaterial: conductorOn2.clone()
    };
}

function conductorOnUpdate() {
    return {
        material: conductorOn1.clone(),
        originalMaterial: conductorOn1.clone()
    };
}

export function updateCubes(cubes) {
    const currentTime = Date.now();
    
    if (currentTime - lastUpdateTime >= THROTTLE_DELAY) {
        const updates = new Map();
        
        for (let x = 0; x < SIZE - 1; x++) {
            for (let y = 0; y < SIZE - 1; y++) {
                const key = getKey(x, y, 1);
                if (cubes.has(key)) {
                    const cube = cubes.get(key);
                    let update = null;
                    
                    if (cube.material.color.getHex() === conductorOff.color.getHex()) {
                        update = conductorOffUpdate(cube, cubes);
                    } else if (cube.material.color.getHex() === conductorOn2.color.getHex()) {
                        update = conductorOn2Update(cube, cubes);
                    } else if (cube.material.color.getHex() === conductorOn1.color.getHex()) {
                        update = conductorOn1Update();
                    } else if (cube.material.color.getHex() === conductorOn.color.getHex()) {
                        update = conductorOnUpdate();
                    }
                    
                    if (update) {
                        updates.set(key, { cube, update });
                    }
                }
            }
        }
        
        for (const [key, { cube, update }] of updates) {
            cube.material = update.material;
            cube.userData.originalMaterial = update.originalMaterial;
            cube.material.needsUpdate = true;
        }
        
        lastUpdateTime = currentTime;
    }
}
