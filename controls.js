export function setupControls(camera) {
    document.addEventListener('wheel', (event) => {
        const zoomSpeed = 1.2;
        if (event.deltaY > 0) {
            camera.position.z *= zoomSpeed;
        } else {
            camera.position.z *= 1/zoomSpeed;
        }
        
        camera.position.z = Math.max(2, Math.min(500, camera.position.z));
    });

    let isMouseDown = false;
    let startX, startY;

    document.addEventListener('mousedown', (e) => {
        if (e.button === 1) {
            isMouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            camera.position.x += (startX - e.clientX) * camera.position.z / 500;
            camera.position.y -= (startY - e.clientY) * camera.position.z / 500;
            
            startX = e.clientX;
            startY = e.clientY;
        }
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
}
