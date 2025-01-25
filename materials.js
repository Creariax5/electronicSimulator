import * as THREE from 'three';

export const material1 = new THREE.MeshBasicMaterial({color: 0x222222});
export const material2 = new THREE.MeshBasicMaterial({color: 0x333333});
export const buildMaterial = new THREE.MeshBasicMaterial({color: 0xFF6000});
export const conductorOn = new THREE.MeshBasicMaterial({color: 0xAAF000});
export const conductorOn1 = new THREE.MeshBasicMaterial({color: 0x99E000});
export const conductorOn2 = new THREE.MeshBasicMaterial({color: 0x88D000});
export const conductorOff = new THREE.MeshBasicMaterial({color: 0x44A000});
export const energy = new THREE.MeshBasicMaterial({color: 0xAFFFAA});

let currentBuildMaterial = buildMaterial;

export function setupMaterialSelector() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case '&':
                currentBuildMaterial = buildMaterial;
                console.log('Selected build material');
                break;
            case 'é':
                currentBuildMaterial = conductorOff;
                console.log('Selected conductor material');
                break;
            case '"':
                currentBuildMaterial = energy;
                console.log('Selected energy material');
                break;
            default:
                break;
        }
    });
    return buildMaterial;
}

export function getBuildMaterial() {
    return currentBuildMaterial;
}