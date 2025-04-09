// Three.js Setup Logic

console.log("Three.js Setup Initialized");

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('3d-model-container');
    if (!container) {
        console.error("3D model container not found!");
        return;
    }

    // --- Basic Three.js Scene Setup --- 

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Light grey background

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
        75, // Field of View
        container.clientWidth / container.clientHeight, // Aspect Ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.z = 5; // Move camera back

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- Add Basic Object (Example: Cube) ---
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);

        // Example animation: Rotate the cube
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    // --- Handle Window Resize ---
    function onWindowResize() {
        // Check if container exists and has dimensions
        if (container.clientWidth > 0 && container.clientHeight > 0) {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
    }
    window.addEventListener('resize', onWindowResize);

    // Initial call to set size
    onWindowResize(); 
    
    // Start animation
    animate();

    console.log("Three.js scene setup complete.");
}); 