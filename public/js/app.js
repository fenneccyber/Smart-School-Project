// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initModal();
    initMaintenanceForm();
    initNavigation();
    initTabNavigation();
    initButtons();
    
    // Demo data for charts would be initialized here
    // In a real application, this data would come from an API
});

// Modal functionality
function initModal() {
    const modal = document.getElementById('request-modal');
    const openModalBtn = document.querySelector('.btn-primary');
    const closeBtn = document.querySelector('.close-btn');
    
    // Open modal
    openModalBtn.addEventListener('click', function() {
        modal.classList.add('active');
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // Close on outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Initialize the maintenance request form
function initMaintenanceForm() {
    const formContainer = document.getElementById('maintenance-form');
    
    // Create form HTML
    formContainer.innerHTML = `
        <div class="form-group">
            <label for="issue-type">Issue Type</label>
            <select id="issue-type" class="form-control" required>
                <option value="">Select issue type</option>
                <option value="water">Water System</option>
                <option value="electrical">Electrical</option>
                <option value="hvac">HVAC</option>
                <option value="structural">Structural</option>
                <option value="other">Other</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="location">Location</label>
            <select id="location" class="form-control" required>
                <option value="">Select location</option>
                <option value="classroom-101">Classroom 101</option>
                <option value="classroom-102">Classroom 102</option>
                <option value="classroom-103">Classroom 103</option>
                <option value="lab-science">Science Lab</option>
                <option value="lab-computer">Computer Lab</option>
                <option value="office-admin">Admin Office</option>
                <option value="library">Library</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" class="form-control" rows="4" required
                placeholder="Describe the issue in detail..."></textarea>
        </div>
        
        <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" class="form-control" required>
                <option value="low">Low</option>
                <option value="medium" selected>Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
            </select>
        </div>
        
        <div class="form-group">
            <label for="photo">Attach Photo (optional)</label>
            <input type="file" id="photo" class="form-control" accept="image/*">
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn btn-secondary" id="cancel-request">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Request</button>
        </div>
    `;
    
    // Add form styling
    const style = document.createElement('style');
    style.textContent = `
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        
        .form-control {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--gray-light);
            border-radius: var(--border-radius-sm);
            font-family: inherit;
        }
        
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 0.5rem;
            margin-top: 1.5rem;
        }
        
        .btn-secondary {
            background-color: var(--gray-light);
            color: var(--gray-dark);
        }
        
        .btn-secondary:hover {
            background-color: var(--gray-medium);
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    // Form submission handler
    formContainer.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // In a real application, this would send data to a server
        alert('Maintenance request submitted successfully!');
        
        // Close the modal
        document.getElementById('request-modal').classList.remove('active');
    });
    
    // Cancel button handler
    document.getElementById('cancel-request').addEventListener('click', function() {
        document.getElementById('request-modal').classList.remove('active');
    });
}

// Handle navigation
function initNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Sidebar navigation
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // In a real application, this would change the content
            const section = this.querySelector('span').textContent.trim();
            console.log(`Navigating to ${section}`);
        });
    });
    
    // Top navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // In a real application, this would change the content
            const section = this.textContent.trim();
            console.log(`Navigating to ${section}`);
        });
    });
}

// Initialize all tab navigation
function initTabNavigation() {
    const contentSections = {
        'Dashboard': createDashboardContent(),
        '3D Map': createMapContent(),
        'Maintenance': createMaintenanceContent(),
        'Reports': createReportsContent()
    };

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainContent = document.querySelector('.dashboard');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Update content based on clicked tab
            const tabName = link.textContent.trim();
            if (contentSections[tabName]) {
                mainContent.innerHTML = contentSections[tabName];
            }
        });
    });

    // Initialize sidebar navigation
    const sidebarLinks = document.querySelectorAll('.menu-item');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Get the text content of the span element
            const tabName = link.querySelector('span').textContent.trim();
            if (contentSections[tabName]) {
                mainContent.innerHTML = contentSections[tabName];
            }
        });
    });
}

// Initialize all buttons
function initButtons() {
    // View All buttons
    document.querySelectorAll('.view-all').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const mainContent = document.querySelector('.dashboard');
            mainContent.innerHTML = createMaintenanceContent();
            initButtons(); // Reinitialize buttons for new content
        });
    });

    // New Request buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent.includes('New Request')) {
                document.getElementById('request-modal').classList.add('active');
            } else if (button.textContent.includes('Export Report')) {
                alert('Downloading report...');
                // Here you would implement report export functionality
            }
        });
    });

    // Action buttons in the table (View/Edit icons)
    document.querySelectorAll('.btn-icon').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.querySelector('i').classList.contains('fa-eye') ? 'view' : 'edit';
            const requestId = button.closest('tr').querySelector('td').textContent;
            
            if (action === 'view') {
                showRequestDetails(requestId);
            } else {
                openEditForm(requestId);
            }
        });
    });

    // Map control buttons
    document.querySelectorAll('.map-control-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.map-control-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateMapView(button.textContent.trim());
        });
    });

    // Filter buttons in Maintenance section
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterMaintenanceRequests(button.textContent.trim());
        });
    });

    // Report card buttons
    document.querySelectorAll('.report-card .btn-secondary').forEach(button => {
        button.addEventListener('click', () => {
            const reportTitle = button.closest('.report-card').querySelector('h4').textContent;
            showReportDetails(reportTitle);
        });
    });

    // Search functionality
    document.querySelectorAll('.search-bar input').forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            handleSearch(searchTerm);
        });
    });
}

// Helper functions for button actions
function showRequestDetails(requestId) {
    const modalContent = `
        <div class="request-details">
            <h3>Request Details ${requestId}</h3>
            <div class="detail-row">
                <span class="label">Status:</span>
                <span class="badge pending">Pending</span>
            </div>
            <div class="detail-row">
                <span class="label">Location:</span>
                <span>Science Lab 2</span>
            </div>
            <div class="detail-row">
                <span class="label">Reported By:</span>
                <span>John Smith</span>
            </div>
            <div class="detail-row">
                <span class="label">Date:</span>
                <span>2024-02-20</span>
            </div>
            <div class="detail-row">
                <span class="label">Description:</span>
                <p>Water leak from ceiling, causing damage to lab equipment.</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary">Update Status</button>
                <button class="btn btn-secondary">Close Request</button>
            </div>
        </div>
    `;
    
    showModal('Request Details', modalContent);
}

function openEditForm(requestId) {
    const modalContent = `
        <form id="edit-request-form">
            <div class="form-group">
                <label>Status</label>
                <select class="form-control">
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </div>
            <div class="form-group">
                <label>Priority</label>
                <select class="form-control">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                </select>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea class="form-control" rows="4"></textarea>
            </div>
            <div class="actions">
                <button type="submit" class="btn btn-primary">Save Changes</button>
                <button type="button" class="btn btn-secondary">Cancel</button>
            </div>
        </form>
    `;
    
    showModal('Edit Request ' + requestId, modalContent);
}

function updateMapView(view) {
    const mapContainer = document.getElementById('map-container');
    // Here you would update the 3D map view based on the selected view
    console.log(`Updating map view to: ${view}`);
}

function filterMaintenanceRequests(filter) {
    const rows = document.querySelectorAll('.requests-table tbody tr');
    rows.forEach(row => {
        const status = row.querySelector('.badge').textContent;
        if (filter === 'All' || status === filter) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function showReportDetails(reportTitle) {
    const modalContent = `
        <div class="report-details">
            <h3>${reportTitle}</h3>
            <div class="chart-placeholder">
                Report Chart Visualization
            </div>
            <div class="report-summary">
                <h4>Summary</h4>
                <p>Detailed report information would appear here.</p>
            </div>
            <div class="actions">
                <button class="btn btn-primary">Download PDF</button>
                <button class="btn btn-secondary">Share Report</button>
            </div>
        </div>
    `;
    
    showModal('Report Details', modalContent);
}

function handleSearch(searchTerm) {
    const rows = document.querySelectorAll('.requests-table tbody tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function showModal(title, content) {
    const modal = document.getElementById('request-modal');
    const modalHeader = modal.querySelector('.modal-header h3');
    const modalBody = modal.querySelector('.modal-body');
    
    modalHeader.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('active');
    
    // Add event listeners for new buttons in modal
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Handle form submission if present
    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Changes saved successfully!');
            modal.classList.remove('active');
        });
    }
    
    // Handle cancel buttons
    const cancelBtn = modal.querySelector('.btn-secondary');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
}

// Add some CSS for the new modal content
const style = document.createElement('style');
style.textContent = `
    .request-details, .report-details {
        padding: 1rem;
    }
    
    .detail-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eee;
    }
    
    .detail-row .label {
        font-weight: bold;
    }
    
    .actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        justify-content: flex-end;
    }
    
    .chart-placeholder {
        background: #f5f5f5;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1rem 0;
        border-radius: 4px;
    }
    
    .report-summary {
        margin-top: 1rem;
    }
    
    .report-summary h4 {
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);

// Content creation functions
function createDashboardContent() {
    return `
        <header class="page-header">
            <h2>School Infrastructure Dashboard</h2>
            <div class="actions">
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i> New Request
                </button>
                <div class="search-bar">
                    <input type="text" placeholder="Search...">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </header>

        <div class="status-cards">
            <!-- Status cards content -->
            ${createStatusCards()}
        </div>

        <section class="map-section">
            <h3>School Map</h3>
            <div id="map-container" class="map-container"></div>
        </section>

        <section class="maintenance-section">
            ${createMaintenanceTable()}
        </section>
    `;
}

function createMapContent() {
    return `
        <header class="page-header">
            <h2>3D School Map</h2>
        </header>
        <div id="map-container" class="map-container" style="height: 80vh;"></div>
        <div class="map-controls">
            <button class="map-control-btn active">Full Building</button>
            <button class="map-control-btn">Ground Floor</button>
            <button class="map-control-btn">First Floor</button>
            <button class="map-control-btn">Systems View</button>
        </div>
    `;
}

function createMaintenanceContent() {
    return `
        <header class="page-header">
            <h2>Maintenance Requests</h2>
            <div class="actions">
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i> New Request
                </button>
                <div class="search-bar">
                    <input type="text" placeholder="Search requests...">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </header>
        
        <div class="maintenance-filters">
            <button class="filter-btn active">All</button>
            <button class="filter-btn">Pending</button>
            <button class="filter-btn">In Progress</button>
            <button class="filter-btn">Completed</button>
        </div>

        ${createMaintenanceTable(true)} <!-- Pass true to show extended table -->
    `;
}

function createReportsContent() {
    return `
        <header class="page-header">
            <h2>Infrastructure Reports</h2>
            <div class="actions">
                <button class="btn btn-primary">
                    <i class="fas fa-download"></i> Export Report
                </button>
                <div class="search-bar">
                    <input type="text" placeholder="Search reports...">
                    <i class="fas fa-search"></i>
                </div>
            </div>
        </header>

        <div class="reports-section">
            <div class="report-cards">
                ${createReportCards()}
            </div>
            
            <div class="charts-section">
                <div class="chart-container">
                    <h3>Energy Consumption</h3>
                    <div class="chart-placeholder">Energy Chart</div>
                </div>
                <div class="chart-container">
                    <h3>Maintenance Trends</h3>
                    <div class="chart-placeholder">Maintenance Chart</div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions to create content sections
function createStatusCards() {
    return `
        <div class="card">
            <div class="card-icon bg-success">
                <i class="fas fa-solar-panel"></i>
            </div>
            <div class="card-info">
                <h3>Solar System</h3>
                <p class="status good">Operational</p>
                <p class="metric">Energy Output: 85%</p>
            </div>
        </div>
        
        <div class="card">
            <div class="card-icon bg-warning">
                <i class="fas fa-water"></i>
            </div>
            <div class="card-info">
                <h3>Water System</h3>
                <p class="status warning">Minor Issues</p>
                <p class="metric">Pressure: 80%</p>
            </div>
        </div>
        
        <div class="card">
            <div class="card-icon bg-danger">
                <i class="fas fa-temperature-high"></i>
            </div>
            <div class="card-info">
                <h3>HVAC System</h3>
                <p class="status critical">Maintenance Required</p>
                <p class="metric">Performance: 65%</p>
            </div>
        </div>
        
        <div class="card">
            <div class="card-icon bg-info">
                <i class="fas fa-plug"></i>
            </div>
            <div class="card-info">
                <h3>Electrical</h3>
                <p class="status good">Operational</p>
                <p class="metric">Load: 72%</p>
            </div>
        </div>
    `;
}

function createMaintenanceTable(extended = false) {
    return `
        <div class="section-header">
            <h3>Recent Maintenance Requests</h3>
            ${!extended ? '<a href="#" class="view-all">View All</a>' : ''}
        </div>
        
        <div class="requests-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Issue</th>
                        <th>Location</th>
                        <th>Reported By</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#1254</td>
                        <td>Water Leak</td>
                        <td>Science Lab 2</td>
                        <td>John Smith</td>
                        <td><span class="badge pending">Pending</span></td>
                        <td><span class="badge high">High</span></td>
                        <td>
                            <button class="btn-icon"><i class="fas fa-eye"></i></button>
                            <button class="btn-icon"><i class="fas fa-edit"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>#1253</td>
                        <td>Broken Light</td>
                        <td>Classroom 103</td>
                        <td>Mary Johnson</td>
                        <td><span class="badge in-progress">In Progress</span></td>
                        <td><span class="badge medium">Medium</span></td>
                        <td>
                            <button class="btn-icon"><i class="fas fa-eye"></i></button>
                            <button class="btn-icon"><i class="fas fa-edit"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td>#1252</td>
                        <td>AC Not Working</td>
                        <td>Computer Lab</td>
                        <td>Robert Chen</td>
                        <td><span class="badge completed">Completed</span></td>
                        <td><span class="badge critical">Critical</span></td>
                        <td>
                            <button class="btn-icon"><i class="fas fa-eye"></i></button>
                            <button class="btn-icon"><i class="fas fa-edit"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function createReportCards() {
    return `
        <div class="report-card">
            <h4>System Health Overview</h4>
            <p>Last updated: Today, 2:30 PM</p>
            <button class="btn btn-secondary">View Report</button>
        </div>
        <div class="report-card">
            <h4>Monthly Maintenance Summary</h4>
            <p>Last updated: Yesterday</p>
            <button class="btn btn-secondary">View Report</button>
        </div>
        <div class="report-card">
            <h4>Energy Efficiency Analysis</h4>
            <p>Last updated: 2 days ago</p>
            <button class="btn btn-secondary">View Report</button>
        </div>
    `;
} 