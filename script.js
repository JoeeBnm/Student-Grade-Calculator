// Sample resources data
let resources = [
    {
        id: 1,
        name: "Community Food Bank",
        category: "food",
        description: "Provides free food assistance to families in need. Open Monday-Friday, 9am-5pm.",
        location: "123 Main Street",
        contact: "555-123-4567",
        date: "2024-03-15"
    },
    {
        id: 2,
        name: "Homeless Shelter",
        category: "housing",
        description: "Emergency shelter for individuals and families. Open 24/7.",
        location: "456 Oak Avenue",
        contact: "555-987-6543",
        date: "2024-03-14"
    },
    {
        id: 3,
        name: "Free Health Clinic",
        category: "health",
        description: "Provides free medical check-ups and basic healthcare services.",
        location: "789 Pine Road",
        contact: "555-456-7890",
        date: "2024-03-13"
    }
];

// Function to display resources
function displayResources(resourcesToShow) {
    const container = document.getElementById('resources-container');
    if (!container) return;

    container.innerHTML = '';
    
    resourcesToShow.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'feature-card';
        resourceCard.innerHTML = `
            <h2>${resource.name}</h2>
            <p><strong>Category:</strong> ${resource.category}</p>
            <p>${resource.description}</p>
            <p><strong>Location:</strong> ${resource.location}</p>
            <p><strong>Contact:</strong> ${resource.contact}</p>
        `;
        container.appendChild(resourceCard);
    });
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (!searchInput || !searchButton) return;

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredResources = resources.filter(resource => 
            resource.name.toLowerCase().includes(searchTerm) ||
            resource.description.toLowerCase().includes(searchTerm) ||
            resource.location.toLowerCase().includes(searchTerm)
        );
        displayResources(filteredResources);
    });
}

// Function to handle category filtering
function handleCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            const filteredResources = category === 'all' 
                ? resources 
                : resources.filter(resource => resource.category === category);
            
            displayResources(filteredResources);
        });
    });
}

// Function to handle form submission
function handleFormSubmission() {
    const form = document.getElementById('resource-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newResource = {
            id: resources.length + 1,
            name: document.getElementById('resource-name').value,
            category: document.getElementById('resource-category').value,
            description: document.getElementById('resource-description').value,
            location: document.getElementById('resource-location').value,
            contact: document.getElementById('contact-info').value,
            date: new Date().toISOString().split('T')[0]
        };

        resources.unshift(newResource);
        form.reset();
        alert('Thank you for sharing this resource!');
        
        // If we're on the resources page, update the display
        if (document.getElementById('resources-container')) {
            displayResources(resources);
        }
    });
}

// Function to display recent resources on home page
function displayRecentResources() {
    const container = document.getElementById('recent-resources-list');
    if (!container) return;

    const recentResources = resources.slice(0, 3);
    container.innerHTML = '';
    
    recentResources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'feature-card';
        resourceCard.innerHTML = `
            <h2>${resource.name}</h2>
            <p><strong>Category:</strong> ${resource.category}</p>
            <p>${resource.description}</p>
            <p><strong>Location:</strong> ${resource.location}</p>
        `;
        container.appendChild(resourceCard);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display resources if on resources page
    if (document.getElementById('resources-container')) {
        displayResources(resources);
        handleSearch();
        handleCategoryFilter();
    }
    
    // Handle form submission if on share page
    handleFormSubmission();
    
    // Display recent resources if on home page
    displayRecentResources();
});

// Store grades in an array
let grades = [];

// Load saved grades from localStorage
function loadGrades() {
    const savedGrades = localStorage.getItem('grades');
    if (savedGrades) {
        grades = JSON.parse(savedGrades);
    }
}

// Save grades to localStorage
function saveGrades() {
    localStorage.setItem('grades', JSON.stringify(grades));
}

// Calculate weighted average
function calculateAverage() {
    if (grades.length === 0) return 0;
    
    let totalWeight = 0;
    let weightedSum = 0;

    grades.forEach(grade => {
        weightedSum += grade.grade * grade.coefficient;
        totalWeight += grade.coefficient;
    });

    return weightedSum / totalWeight;
}

// Get grade status
function getStatus(average) {
    return average >= 10 ? 'Passed' : 'Failed';
}

// Update dashboard
function updateDashboard() {
    const average = calculateAverage();
    const status = getStatus(average);

    // Update quick stats
    document.getElementById('current-average')?.textContent = average.toFixed(2);
    document.getElementById('total-subjects')?.textContent = grades.length;
    document.getElementById('current-status')?.textContent = status;
    document.getElementById('current-status')?.className = status.toLowerCase();

    // Update recent grades table
    const recentGradesBody = document.getElementById('recent-grades-body');
    if (recentGradesBody) {
        recentGradesBody.innerHTML = '';
        const recentGrades = grades.slice(0, 5); // Show last 5 grades
        recentGrades.forEach(grade => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${grade.subject}</td>
                <td>${grade.grade.toFixed(2)}</td>
                <td>${grade.coefficient}</td>
                <td>${grade.date || '-'}</td>
            `;
            recentGradesBody.appendChild(row);
        });
    }
}

// Update statistics page
function updateStatistics() {
    const average = calculateAverage();
    const status = getStatus(average);

    // Update overview stats
    document.getElementById('overall-average')?.textContent = average.toFixed(2);
    document.getElementById('total-subjects-stat')?.textContent = grades.length;

    // Find highest and lowest grades
    if (grades.length > 0) {
        const highestGrade = Math.max(...grades.map(g => g.grade));
        const lowestGrade = Math.min(...grades.map(g => g.grade));
        document.getElementById('highest-grade')?.textContent = highestGrade.toFixed(2);
        document.getElementById('lowest-grade')?.textContent = lowestGrade.toFixed(2);
    }

    // Update subject breakdown table
    const subjectBody = document.getElementById('subject-body');
    if (subjectBody) {
        subjectBody.innerHTML = '';
        grades.forEach(grade => {
            const row = document.createElement('tr');
            const gradeStatus = grade.grade >= 10 ? 'passed' : 'failed';
            row.innerHTML = `
                <td>${grade.subject}</td>
                <td>${grade.grade.toFixed(2)}</td>
                <td>${grade.coefficient}</td>
                <td class="${gradeStatus}">${gradeStatus}</td>
            `;
            subjectBody.appendChild(row);
        });
    }
}

// Add new grade
function addGrade() {
    const subject = document.getElementById('subject').value.trim();
    const grade = parseFloat(document.getElementById('grade').value);
    const coefficient = parseInt(document.getElementById('coefficient').value);

    // Validate inputs
    if (!subject || isNaN(grade) || isNaN(coefficient)) {
        alert('Please fill in all fields correctly');
        return;
    }

    if (grade < 0 || grade > 20) {
        alert('Grade must be between 0 and 20');
        return;
    }

    if (coefficient < 1 || coefficient > 10) {
        alert('Coefficient must be between 1 and 10');
        return;
    }

    // Add grade to array
    grades.push({
        subject,
        grade,
        coefficient,
        date: new Date().toLocaleDateString()
    });

    // Clear inputs
    document.getElementById('subject').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('coefficient').value = '';

    // Save and update displays
    saveGrades();
    updateGradesTable();
    updateDashboard();
    updateStatistics();
}

// Update grades table
function updateGradesTable() {
    const gradesBody = document.getElementById('grades-body');
    if (!gradesBody) return;

    gradesBody.innerHTML = '';
    
    grades.forEach((grade, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${grade.subject}</td>
            <td>${grade.grade.toFixed(2)}</td>
            <td>${grade.coefficient}</td>
            <td>
                <button class="delete-btn" onclick="deleteGrade(${index})">Delete</button>
            </td>
        `;
        gradesBody.appendChild(row);
    });
}

// Delete grade
function deleteGrade(index) {
    grades.splice(index, 1);
    saveGrades();
    updateGradesTable();
    updateDashboard();
    updateStatistics();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadGrades();
    
    // Add event listener for add grade button if it exists
    const addButton = document.getElementById('add-grade');
    if (addButton) {
        addButton.addEventListener('click', addGrade);
    }

    // Update appropriate displays based on current page
    updateDashboard();
    updateStatistics();
    updateGradesTable();
}); 