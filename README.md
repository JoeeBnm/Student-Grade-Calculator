# Student Grade Calculator

A simple and intuitive web application for students to track and calculate their grades. Built with HTML, CSS, and JavaScript.

## Features

- **Dashboard**: Quick overview of your current academic status
- **Add Grades**: Input and manage your grades with coefficients
- **Statistics**: Detailed analysis of your performance
- **Data Persistence**: Grades are saved in your browser
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)

## Pages

### 1. Dashboard
- Current average grade
- Total number of subjects
- Pass/Fail status
- Recent grades table
- Quick access to other pages

### 2. Add Grades
- Add new grades with subject name, grade (0-20), and coefficient (1-10)
- View all your grades in a table
- Delete unwanted grades
- Input validation

### 3. Statistics
- Overall average
- Highest and lowest grades
- Subject breakdown
- Performance overview

## How to Use

1. Open `index.html` in your web browser
2. Navigate between pages using the top menu
3. To add a new grade:
   - Go to "Add Grades" page
   - Fill in the subject name
   - Enter your grade (0-20)
   - Enter the coefficient (1-10)
   - Click "Add Grade"
4. View your statistics on the "Statistics" page

## Technical Details

- **Storage**: Uses localStorage to save your grades
- **Validation**: Ensures grades are between 0-20 and coefficients between 1-10
- **Calculations**: Weighted average based on coefficients
- **Status**: Pass/Fail determined by 10/20 threshold

## File Structure

```
.
├── index.html          # Dashboard page
├── add-grades.html     # Add grades page
├── statistics.html     # Statistics page
├── styles.css          # Styles for all pages
└── script.js           # JavaScript functionality
```

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs locally

## Note

This is a frontend-only application. All data is stored in your browser's localStorage. Clearing your browser data will remove your saved grades.
