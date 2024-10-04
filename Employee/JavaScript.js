// Input fields
const FirstName = document.getElementById('FirstName');
const LastName = document.getElementById('LastName');
const phoneNumberInput = document.getElementById('phoneNumber');
const edgeInput = document.getElementById('edge');
const National_IDInput = document.getElementById('National_ID');
const salaryInput = document.getElementById('salary');
const emailInput = document.getElementById('Email');
const addressInput = document.getElementById('Address');
const countryInput = document.getElementById('country');
const cityInput = document.getElementById('city');
const submitBtn = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search');
const searchNameButton = document.getElementById('searchNameButton');
const deleteAllButton = document.getElementById('deleteAll');

// Variables
let Employee = JSON.parse(localStorage.getItem('Employee')) || [];
let searchMode = 'FirstName';
let mood = 'create';
let tmp;

// Add Employee event listener
submitBtn.addEventListener('click', function () {
    const newEmployee = {
        FirstName: FirstName.value,
        LastName: LastName.value,
        phoneNumber: phoneNumberInput.value,
        Email: emailInput.value,
        National_ID: National_IDInput.value,
        salary: salaryInput.value,
        Address: addressInput.value,
        country: countryInput.value,
        city: cityInput.value,
        edge: edgeInput.value,
    };

    if (mood === 'create') {
        Employee.push(newEmployee);
    } else {
        Employee[tmp] = newEmployee;
        mood = 'create';
        submitBtn.innerHTML = 'Create';
    }

    localStorage.setItem('Employee', JSON.stringify(Employee));
    clearInputFields();
    showEmployee();
});

// Clear input fields
function clearInputFields() {
    FirstName.value = '';
    LastName.value = '';
    National_IDInput.value = '';
    salaryInput.value = '';
    phoneNumberInput.value = '';
    emailInput.value = ''; // Corrected to emailInput
    addressInput.value = '';
    countryInput.value = '';
    cityInput.value = '';
    edgeInput.value = '';
}

// Show employees in the table
function showEmployee(searchValue = '') {
    let tableRows = '';
    Employee.forEach((employee, index) => {
        if (
            (!searchValue || employee.FirstName.toLowerCase().includes(searchValue.toLowerCase())) &&
            (searchMode === 'FirstName' || employee.phoneNumber.toLowerCase().includes(searchValue.toLowerCase()))
        ) {
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${employee.FirstName}</td>
                    <td>${employee.LastName}</td>
                    <td>${employee.phoneNumber}</td>
                    <td>${employee.edge}</td>
                    <td>${employee.National_ID}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.Email}</td>
                    <td>${employee.Address}</td>
                    <td>${employee.country}</td>
                    <td>${employee.city}</td>
                    <td><button onclick="updateEmployee(${index})" class="update">Update</button></td>
                    <td><button onclick="deleteEmployee(${index})" class="delete">Delete</button></td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = tableRows;
    if (Employee.length > 0) {
        deleteAllButton.innerHTML = '<button onclick="deleteAllEmployees()">Delete All</button>';
    } else {
        deleteAllButton.innerHTML = '';
    }
}

// Delete an employee
function deleteEmployee(index) {
    Employee.splice(index, 1);
    localStorage.setItem('Employee', JSON.stringify(Employee));
    showEmployee();
}

// Delete all employees
function deleteAllEmployees() {
    localStorage.clear();
    Employee = [];
    showEmployee();
}

// Update an employee
function updateEmployee(index) {
    const employee = Employee[index];
    FirstName.value = employee.FirstName;
    LastName.value = employee.LastName;
    National_IDInput.value = employee.National_ID;
    salaryInput.value = employee.salary;
    phoneNumberInput.value = employee.phoneNumber;
    emailInput.value = employee.Email;
    addressInput.value = employee.Address;
    countryInput.value = employee.country;
    cityInput.value = employee.city;
    edgeInput.value = employee.edge;
    searchMode = 'FirstName';
    submitBtn.innerHTML = 'Update';
    mood = 'update';
    tmp = index;
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    showEmployee();
}

// Search employees
function searchData() {
    const searchValue = searchInput.value;
    showEmployee(searchValue);
}

// Search by name button event
searchNameButton.addEventListener('click', function () {
    searchMode = 'FirstName';
    showEmployee();
});

// Initial call to display employees
showEmployee();
