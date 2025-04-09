// Three.js Setup Logic
// Note: OrbitControls needs to be included via HTML script tag

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
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
        60, // Field of View (slightly less than before)
        container.clientWidth / container.clientHeight, // Aspect Ratio
        0.1, // Near clipping plane
        1000 // Far clipping plane
    );
    camera.position.set(10, 10, 20); // Adjust camera position for a better view
    camera.lookAt(0, 0, 0); // Look at the center of the scene

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true; // Enable shadows
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true; // Enable shadow casting
    scene.add(directionalLight);

    // Configure shadow properties (optional but good)
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;

    // 5. OrbitControls
    // Ensure OrbitControls.js is included in index.html
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Optional: smooths camera movement
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.maxPolarAngle = Math.PI / 2; // Prevent looking below ground
    controls.target.set(0, 1, 0); // Adjust target slightly if needed
    controls.update(); // Initial update

    // --- Scene Objects --- 

    // Ground Plane
    const planeGeometry = new THREE.PlaneGeometry(50, 50); // Large ground plane
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, side: THREE.DoubleSide }); // Forest green
    const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    groundPlane.receiveShadow = true; // Allow ground to receive shadows
    scene.add(groundPlane);

    // Basic Building Shape (Placeholder)
    const buildingGeometry = new THREE.BoxGeometry(5, 4, 6); // Width, Height, Depth
    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc }); // Light grey
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 2; // Raise building to sit on the ground (height/2)
    building.castShadow = true; // Allow building to cast shadows
    building.receiveShadow = true;
    scene.add(building);

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);

        // Update OrbitControls
        controls.update();

        // No longer rotating the cube
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    // --- Handle Window Resize ---
    function onWindowResize() {
        // Get the container's actual dimensions
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Check if dimensions are valid
        if (width === 0 || height === 0) return;

        console.log(`Resizing canvas to: ${width} x ${height}`); // DEBUG LOG

        // Update camera's aspect ratio
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Update renderer's size
        renderer.setSize(width, height);
        // Optional: Adjust pixel ratio for high-DPI displays
        // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    window.addEventListener('resize', onWindowResize);

    // Initial call to set size - add a small delay
    // onWindowResize(); 
    setTimeout(onWindowResize, 50); // Delay by 50ms

    // Start animation
    animate();

    console.log("Three.js scene setup complete with ground, building, and controls.");
}); 