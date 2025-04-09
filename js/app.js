// Main application logic

console.log("Smart School App Initialized");

// DOM Ready event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM Fully Loaded");

    // Example: Add event listeners or fetch initial data here
    const maintenanceForm = document.getElementById('maintenance-form');
    if (maintenanceForm) {
        maintenanceForm.addEventListener('submit', handleMaintenanceSubmit);
    }

    // Load initial maintenance issues (placeholder for now)
    loadMaintenanceIssues();
});

// --- Maintenance Form Handling ---
function handleMaintenanceSubmit(event) {
    event.preventDefault(); // Prevent default form submission (page reload)

    const form = event.target;
    const formData = new FormData(form);

    const issueData = {
        location: formData.get('location'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        status: 'submitted', // Add a default status
        timestamp: new Date().toISOString()
    };

    console.log("Maintenance Request Submitted:", issueData);

    // Add to list locally (temporary)
    // Assign a temporary local ID for demo purposes
    issueData.id = Date.now(); // Simple unique ID for local demo
    addIssueToList(issueData, true); 
    form.reset();
    alert('Request submitted (local view only)!');
}

// --- Maintenance List Handling ---

// Function to load issues (Now just clears the list)
function loadMaintenanceIssues() {
    const issueList = document.querySelector('#maintenance-list ul');
    if (!issueList) return;
    
    issueList.innerHTML = ''; // Clear placeholder/previous content
    const noIssuesMsg = document.createElement('li');
    noIssuesMsg.textContent = 'No issues reported yet (local view).';
    noIssuesMsg.style.fontStyle = 'italic';
    noIssuesMsg.style.color = '#718096';
    issueList.appendChild(noIssuesMsg);
}

// Function to add a single issue to the list (can be called after submit or load)
function addIssueToList(issue, isNew = false) {
    const issueList = document.querySelector('#maintenance-list ul');
    if (!issueList) return;

    // Remove the 'No current issues' message if it exists
    const noIssuesMsg = issueList.querySelector('li:only-child');
    // Check text content before removing
    if (noIssuesMsg && noIssuesMsg.textContent.includes('No issues reported')) { 
        issueList.innerHTML = ''; 
    }

    const listItem = document.createElement('li');
    // Use basic styling defined in style.css or add simple classes if needed
    // listItem.className = 'maintenance-item'; // Example class
    
    // Basic status class for border
    listItem.classList.add(issue.status === 'completed' ? 'status-completed' : 'status-submitted'); // Add classes for styling

    // Format the display better using simple HTML and classes from style.css
    listItem.innerHTML = `
        <div> 
            <strong>${issue.location}</strong>
            <div class="tags">
                 <span class="tag">Priority: ${issue.priority}</span>
                 <span class="tag">Status: ${issue.status}</span>
            </div>
        </div>
        <em>${issue.description}</em>
        <small>Submitted: ${new Date(issue.timestamp).toLocaleString()}</small>
        ${isNew ? '<small style="color: green; display: block;"> (Added just now)</small>' : ''}
    `;

    // TODO: Add interaction buttons later

    // Add to the top of the list if new
    if (isNew) {
        issueList.insertBefore(listItem, issueList.firstChild);
    } else {
        issueList.appendChild(listItem);
    }
}

// Add functions for handling user interactions, API calls, etc.

// function exampleFunction() {
//     // ...
// } 