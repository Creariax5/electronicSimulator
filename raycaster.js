import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let highlightedCube = null;

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Window resize handler
function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function updateRaycaster(camera, cubes) {
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(cubes);

    // Reset previous highlight
    if (highlightedCube && (!intersects.length || intersects[0].object !== highlightedCube)) {
        highlightedCube.material = highlightedCube.userData.originalMaterial;
        highlightedCube = null;
    }

    // Apply new highlight
    if (intersects.length > 0) {
        const cube = intersects[0].object;
        const originalColor = cube.userData.originalMaterial.color;
    
        // Create a new color and make it brighter
        const highlightColor = new THREE.Color(originalColor);
        highlightColor.multiplyScalar(3); // Makes the color 20% brighter
        
        const highlightMaterial = new THREE.MeshBasicMaterial({ color: highlightColor });
        if (cube !== highlightedCube) {
            cube.material = highlightMaterial;
            highlightedCube = cube;
        }
    }
    return highlightedCube;
}

export function initRaycaster(camera, renderer) {
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', () => onWindowResize(camera, renderer), false);
}