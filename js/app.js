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

    // TODO: Send data to backend API (Phase 1/2)
    // fetch('/api/maintenance', { 
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(issueData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    //     // Add the new issue to the list visually
    //     addIssueToList(data); // Assuming backend returns the created issue
    //     form.reset(); // Clear the form
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     alert('Failed to submit request. Please try again.');
    // });

    // For now, just clear the form and maybe add a dummy entry
    addIssueToList(issueData, true); // Add to list locally (temporary)
    form.reset();
    alert('Request submitted (logged to console for now)!');
}

// --- Maintenance List Handling ---

// Placeholder function to load issues (replace with API call later)
function loadMaintenanceIssues() {
    const issueList = document.querySelector('#maintenance-list ul');
    if (issueList) {
        // Clear placeholder
        issueList.innerHTML = ''; 
        // Add dummy data or fetch from API
        // addIssueToList({ location: 'Test Location', description: 'Initial issue', priority: 'low', status: 'open'});
        const noIssuesMsg = document.createElement('li');
        noIssuesMsg.textContent = 'No current issues reported.';
        noIssuesMsg.style.fontStyle = 'italic';
        issueList.appendChild(noIssuesMsg);
    }
}

// Function to add a single issue to the list (can be called after submit or load)
function addIssueToList(issue, isNew = false) {
    const issueList = document.querySelector('#maintenance-list ul');
    if (!issueList) return;

    // Remove the 'No current issues' message if it exists
    const noIssuesMsg = issueList.querySelector('li:only-child');
    if (noIssuesMsg && noIssuesMsg.textContent === 'No current issues reported.') {
        issueList.innerHTML = ''; 
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${issue.location}</strong> (${issue.priority}) - ${issue.status}<br>
        <em>${issue.description}</em>
        ${isNew ? '<small> (Submitted just now)</small>' : ''}
    `; // Basic display
    // TODO: Add status updates, timestamps, etc.

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