// Input fields
const DepartmentName = document.getElementById('DepartmentName');
const submitBtn = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search');
const searchNameButton = document.getElementById('searchNameButton');
const deleteAllButton = document.getElementById('deleteAll');

// Variables
let departments = JSON.parse(localStorage.getItem('Department')) || []; // Renamed variable
let searchMode = 'DepartmentName';
let mood = 'create';
let tmp;

// Add Department event listener
submitBtn.addEventListener('click', function () {
    const newDepartment = {
        DepartmentName: DepartmentName.value,
    };

    if (mood === 'create') {
        departments.push(newDepartment);
    } else {
        departments[tmp] = newDepartment;
        mood = 'create';
        submitBtn.innerHTML = 'Create';
    }

    localStorage.setItem('Department', JSON.stringify(departments));
    clearInputFields();
    showDepartment();
});

// Clear input fields
function clearInputFields() {
    DepartmentName.value = '';
}

// Show departments in the table
function showDepartment(searchValue = '') {
    let tableRows = '';
    departments.forEach((department, index) => {
        if (
            (!searchValue || department.DepartmentName.toLowerCase().includes(searchValue.toLowerCase())) &&
            searchMode === 'DepartmentName'
        ) {
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${department.DepartmentName}</td>
                    <td><button onclick="updateDepartment(${index})" class="update">Update</button></td>
                    <td><button onclick="deleteDepartment(${index})" class="delete">Delete</button></td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = tableRows;
    if (departments.length > 0) {
        deleteAllButton.innerHTML = '<button onclick="deleteAllDepartments()">Delete All</button>';
    } else {
        deleteAllButton.innerHTML = '';
    }
}

// Delete a department
function deleteDepartment(index) {
    departments.splice(index, 1);
    localStorage.setItem('Department', JSON.stringify(departments));
    showDepartment();
}

// Delete all departments
function deleteAllDepartments() {
    localStorage.clear();
    departments = [];
    showDepartment();
}

// Update a department
function updateDepartment(index) {
    const department = departments[index];
    DepartmentName.value = department.DepartmentName;
    searchMode = 'DepartmentName';
    submitBtn.innerHTML = 'Update';
    mood = 'update';
    tmp = index;
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    showDepartment();
}

// Search departments
function searchData() {
    const searchValue = searchInput.value;
    showDepartment(searchValue);
}

// Search by name button event
searchNameButton.addEventListener('click', function () {
    searchMode = 'DepartmentName';
    showDepartment();
});

// Initial call to display departments
showDepartment();
