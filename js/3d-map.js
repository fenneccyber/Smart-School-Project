// 3D Map visualization using Three.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the 3D map
    initMap();
});

function initMap() {
    const container = document.getElementById('map-container');
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        container.innerHTML = '<div class="error-message">Three.js library not loaded</div>';
        return;
    }
    
    // Basic Three.js setup
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(20, 20, 20);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 15);
    scene.add(directionalLight);
    
    // Add grid helper for reference
    const gridHelper = new THREE.GridHelper(50, 50);
    scene.add(gridHelper);
    
    // Create a simple school building model
    createSchoolModel(scene);
    
    // Add orbit controls if available
    let controls;
    if (typeof THREE.OrbitControls !== 'undefined') {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
    } else {
        console.warn('OrbitControls not available');
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (controls) controls.update();
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Add interactive elements
    addInteractiveElements(scene, camera, renderer);
}

// Create a simple school building model
function createSchoolModel(scene) {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(60, 60);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x7cbe7c,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    
    // Main building
    const buildingGeometry = new THREE.BoxGeometry(30, 8, 20);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
    const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
    building.position.y = 4;
    scene.add(building);
    
    // Roof
    const roofGeometry = new THREE.BoxGeometry(32, 1, 22);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xa52a2a });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 8.5;
    scene.add(roof);
    
    // Windows
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x87ceeb });
    
    // Front windows
    for (let i = -12; i <= 12; i += 6) {
        for (let j = 2; j <= 6; j += 4) {
            const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1);
            const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
            windowMesh.position.set(i, j, 10.05);
            scene.add(windowMesh);
        }
    }
    
    // Back windows
    for (let i = -12; i <= 12; i += 6) {
        for (let j = 2; j <= 6; j += 4) {
            const windowGeometry = new THREE.BoxGeometry(2, 2, 0.1);
            const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
            windowMesh.position.set(i, j, -10.05);
            scene.add(windowMesh);
        }
    }
    
    // Side windows
    for (let i = -8; i <= 8; i += 8) {
        for (let j = 2; j <= 6; j += 4) {
            const windowGeometry = new THREE.BoxGeometry(0.1, 2, 2);
            const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
            windowMesh.position.set(15.05, j, i);
            scene.add(windowMesh);
            
            const windowMesh2 = new THREE.Mesh(windowGeometry, windowMaterial);
            windowMesh2.position.set(-15.05, j, i);
            scene.add(windowMesh2);
        }
    }
    
    // Door
    const doorGeometry = new THREE.BoxGeometry(4, 6, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 3, 10.05);
    scene.add(door);
    
    // Solar panels on the roof
    const solarPanelGroup = new THREE.Group();
    solarPanelGroup.position.set(0, 9, 0);
    scene.add(solarPanelGroup);
    
    const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x1a237e });
    
    // Create a grid of solar panels
    for (let x = -12; x <= 12; x += 4) {
        for (let z = -8; z <= 8; z += 4) {
            const panelGeometry = new THREE.BoxGeometry(3, 0.2, 3);
            const panel = new THREE.Mesh(panelGeometry, panelMaterial);
            panel.position.set(x, 0, z);
            
            // Add panel to the group
            solarPanelGroup.add(panel);
            
            // Store original color for interaction
            panel.userData = {
                originalColor: 0x1a237e,
                type: 'solarPanel',
                status: 'operational',
                efficiency: Math.floor(85 + Math.random() * 15) + '%',
                id: `panel-${x}-${z}`
            };
        }
    }
    
    // Add water tank
    const waterTankGeometry = new THREE.CylinderGeometry(2, 2, 4, 16);
    const waterTankMaterial = new THREE.MeshStandardMaterial({ color: 0x0288d1 });
    const waterTank = new THREE.Mesh(waterTankGeometry, waterTankMaterial);
    waterTank.position.set(-18, 6, 0);
    scene.add(waterTank);
    
    // Store data for interaction
    waterTank.userData = {
        type: 'waterTank',
        status: 'operational',
        capacity: '85%',
        lastMaintenance: '2023-05-15'
    };
    
    // Add HVAC unit
    const hvacGeometry = new THREE.BoxGeometry(4, 2, 3);
    const hvacMaterial = new THREE.MeshStandardMaterial({ color: 0x9e9e9e });
    const hvac = new THREE.Mesh(hvacGeometry, hvacMaterial);
    hvac.position.set(18, 5, 0);
    scene.add(hvac);
    
    // Store data for interaction
    hvac.userData = {
        type: 'hvac',
        status: 'maintenance required',
        temperature: '24°C',
        lastService: '2023-02-10'
    };
    
    // Add electrical panel
    const electricalPanelGeometry = new THREE.BoxGeometry(1, 3, 2);
    const electricalPanelMaterial = new THREE.MeshStandardMaterial({ color: 0xffeb3b });
    const electricalPanel = new THREE.Mesh(electricalPanelGeometry, electricalPanelMaterial);
    electricalPanel.position.set(-14, 3, -9.5);
    scene.add(electricalPanel);
    
    // Store data for interaction
    electricalPanel.userData = {
        type: 'electricalPanel',
        status: 'operational',
        load: '72%',
        lastInspection: '2023-04-22'
    };
    
    return {
        building,
        solarPanelGroup,
        waterTank,
        hvac,
        electricalPanel
    };
}

// Add interactive elements to the scene
function addInteractiveElements(scene, camera, renderer) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.padding = '10px';
    tooltip.style.background = 'rgba(0, 0, 0, 0.7)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '4px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.zIndex = '1000';
    tooltip.style.display = 'none';
    tooltip.style.maxWidth = '200px';
    document.body.appendChild(tooltip);
    
    // Handle mouse move for hover effects
    renderer.domElement.addEventListener('mousemove', function(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersected objects
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        // Reset cursor
        renderer.domElement.style.cursor = 'default';
        
        // Hide tooltip by default
        tooltip.style.display = 'none';
        
        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            
            // Check if the object has user data
            if (intersected.userData && intersected.userData.type) {
                // Change cursor to indicate interactive element
                renderer.domElement.style.cursor = 'pointer';
                
                // Show tooltip
                tooltip.style.display = 'block';
                tooltip.style.left = event.clientX + 10 + 'px';
                tooltip.style.top = event.clientY + 10 + 'px';
                
                // Set tooltip content based on object type
                switch (intersected.userData.type) {
                    case 'solarPanel':
                        tooltip.innerHTML = `
                            <strong>Solar Panel</strong><br>
                            Status: ${intersected.userData.status}<br>
                            Efficiency: ${intersected.userData.efficiency}
                        `;
                        break;
                    case 'waterTank':
                        tooltip.innerHTML = `
                            <strong>Water Tank</strong><br>
                            Status: ${intersected.userData.status}<br>
                            Capacity: ${intersected.userData.capacity}<br>
                            Last Maintenance: ${intersected.userData.lastMaintenance}
                        `;
                        break;
                    case 'hvac':
                        tooltip.innerHTML = `
                            <strong>HVAC System</strong><br>
                            Status: <span style="color: #ff9800">${intersected.userData.status}</span><br>
                            Temperature: ${intersected.userData.temperature}<br>
                            Last Service: ${intersected.userData.lastService}
                        `;
                        break;
                    case 'electricalPanel':
                        tooltip.innerHTML = `
                            <strong>Electrical Panel</strong><br>
                            Status: ${intersected.userData.status}<br>
                            Current Load: ${intersected.userData.load}<br>
                            Last Inspection: ${intersected.userData.lastInspection}
                        `;
                        break;
                    default:
                        tooltip.style.display = 'none';
                }
            }
        }
    });
    
    // Handle click events
    renderer.domElement.addEventListener('click', function(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersected objects
        const intersects = raycaster.intersectObjects(scene.children, true);
        
        if (intersects.length > 0) {
            const intersected = intersects[0].object;
            
            // Check if the object has user data
            if (intersected.userData && intersected.userData.type) {
                // Handle click based on object type
                switch (intersected.userData.type) {
                    case 'solarPanel':
                        showDetailPanel('Solar Panel System', {
                            status: intersected.userData.status,
                            efficiency: intersected.userData.efficiency,
                            id: intersected.userData.id,
                            lastMaintenance: '2023-06-01',
                            installedDate: '2022-01-15',
                            manufacturer: 'SolarTech Industries'
                        });
                        break;
                    case 'waterTank':
                        showDetailPanel('Water Storage System', {
                            status: intersected.userData.status,
                            capacity: intersected.userData.capacity,
                            lastMaintenance: intersected.userData.lastMaintenance,
                            volume: '5000 liters',
                            pressureLevel: 'Normal (3.2 bar)',
                            waterQuality: 'Good'
                        });
                        break;
                    case 'hvac':
                        showDetailPanel('HVAC System', {
                            status: intersected.userData.status,
                            temperature: intersected.userData.temperature,
                            lastService: intersected.userData.lastService,
                            model: 'CoolAir Pro 3000',
                            energyConsumption: 'High (2.4kW/h)',
                            maintenanceAlert: 'Filter replacement needed'
                        });
                        break;
                    case 'electricalPanel':
                        showDetailPanel('Electrical System', {
                            status: intersected.userData.status,
                            load: intersected.userData.load,
                            lastInspection: intersected.userData.lastInspection,
                            capacity: '200 Amp',
                            circuitCount: '24 circuits',
                            backupGenerator: 'Available (Standby)'
                        });
                        break;
                }
            }
        }
    });
    
    // Function to show detailed information panel
    function showDetailPanel(title, details) {
        // Check if a panel already exists and remove it
        const existingPanel = document.getElementById('detail-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        // Create detail panel
        const panel = document.createElement('div');
        panel.id = 'detail-panel';
        panel.style.position = 'absolute';
        panel.style.top = '20px';
        panel.style.right = '20px';
        panel.style.width = '300px';
        panel.style.backgroundColor = 'white';
        panel.style.borderRadius = '8px';
        panel.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        panel.style.zIndex = '1000';
        panel.style.overflow = 'hidden';
        
        // Panel header
        const header = document.createElement('div');
        header.style.padding = '15px';
        header.style.backgroundColor = '#4361ee';
        header.style.color = 'white';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';
        
        const headerTitle = document.createElement('h3');
        headerTitle.textContent = title;
        headerTitle.style.margin = '0';
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.onclick = function() {
            panel.remove();
        };
        
        header.appendChild(headerTitle);
        header.appendChild(closeBtn);
        panel.appendChild(header);
        
        // Panel content
        const content = document.createElement('div');
        content.style.padding = '15px';
        
        // Add details to content
        for (const [key, value] of Object.entries(details)) {
            const detailRow = document.createElement('div');
            detailRow.style.marginBottom = '10px';
            detailRow.style.display = 'flex';
            detailRow.style.justifyContent = 'space-between';
            
            const keyElem = document.createElement('strong');
            keyElem.textContent = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) + ':';
            keyElem.style.textTransform = 'capitalize';
            
            const valueElem = document.createElement('span');
            
            // Add color coding for status
            if (key === 'status') {
                if (value.includes('operational') || value.includes('good')) {
                    valueElem.style.color = '#4caf50';
                } else if (value.includes('maintenance') || value.includes('minor')) {
                    valueElem.style.color = '#ff9800';
                } else if (value.includes('critical') || value.includes('alert')) {
                    valueElem.style.color = '#f44336';
                }
            }
            
            valueElem.textContent = value;
            
            detailRow.appendChild(keyElem);
            detailRow.appendChild(valueElem);
            content.appendChild(detailRow);
        }
        
        // Add action buttons
        const actions = document.createElement('div');
        actions.style.display = 'flex';
        actions.style.gap = '10px';
        actions.style.marginTop = '15px';
        
        const reportBtn = document.createElement('button');
        reportBtn.textContent = 'Report Issue';
        reportBtn.className = 'btn btn-primary';
        reportBtn.style.flex = '1';
        reportBtn.onclick = function() {
            // Open the maintenance request modal
            document.getElementById('request-modal').classList.add('active');
            panel.remove();
        };
        
        const historyBtn = document.createElement('button');
        historyBtn.textContent = 'View History';
        historyBtn.className = 'btn btn-secondary';
        historyBtn.style.flex = '1';
        historyBtn.onclick = function() {
            alert('Maintenance history would be displayed here');
        };
        
        actions.appendChild(reportBtn);
        actions.appendChild(historyBtn);
        content.appendChild(actions);
        
        panel.appendChild(content);
        document.body.appendChild(panel);
    }
} 