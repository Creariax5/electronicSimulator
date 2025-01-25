import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let highlightedCube = null;

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onWindowResize(camera, renderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function updateRaycaster(camera, cubes) {
    raycaster.setFromCamera(mouse, camera);

    // Convert Map to array for intersection test
    const cubeArray = Array.from(cubes.values());
    const intersects = raycaster.intersectObjects(cubeArray);

    // Reset previous highlight
    if (highlightedCube && (!intersects.length || intersects[0].object !== highlightedCube)) {
        highlightedCube.material = highlightedCube.userData.originalMaterial;
        highlightedCube = null;
    }

    // Apply new highlight
    if (intersects.length > 0) {
        const cube = intersects[0].object;
        const originalColor = cube.userData.originalMaterial.color;
    
        const highlightColor = new THREE.Color(originalColor);
        highlightColor.multiplyScalar(3);
        
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
