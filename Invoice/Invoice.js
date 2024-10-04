const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const taxesInput = document.getElementById('taxes');
const adsInput = document.getElementById('ads');
const discountInput = document.getElementById('discount');
const totalOutput = document.getElementById('total');
const countInput = document.getElementById('count');
const categoryInput = document.getElementById('category');
const submitButton = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const searchInput = document.getElementById('search');
const searchTitleButton = document.getElementById('searchTitleButton');
const searchCategoryButton = document.getElementById('searchCategoryButton');
const searchButton = document.getElementById('searchButtonId');

let Invoice = JSON.parse(localStorage.getItem('Invoice')) || [];
let mood = 'create';
let tmp;
let searchMood = 'title';

function getTotal() {
    if (priceInput.value !== '') {
        let result = +priceInput.value + +taxesInput.value + +adsInput.value - +discountInput.value;
        totalOutput.textContent = result;
        totalOutput.style.backgroundColor = '#4CAF50';
    } else {
        totalOutput.textContent = '';
        totalOutput.style.backgroundColor = '#f14343';
    }
}

submitButton.addEventListener('click', function () {
    const newInvoice = {
        title: titleInput.value,
        price: priceInput.value,
        taxes: taxesInput.value,
        ads: adsInput.value,
        discount: discountInput.value,
        total: totalOutput.textContent,
        count: countInput.value,
        category: categoryInput.value,
    };

    if (mood === 'create') {
        const count = parseInt(newInvoice.count);
        if (count > 1) {
            for (let i = 0; i < count; i++) {
                Invoice.push({ ...newInvoice });
            }
        } else {
            Invoice.push(newInvoice);
        }
    } else {
        Invoice[tmp] = newInvoice;
        mood = 'create';
        submitButton.textContent = 'Create';
        countInput.style.display = 'block';
    }

    localStorage.setItem('Invoice', JSON.stringify(Invoice));
    clearInputFields();
    showInvoice();
});

function clearInputFields() {
    titleInput.value = '';
    priceInput.value = '';
    taxesInput.value = '';
    adsInput.value = '';
    discountInput.value = '';
    countInput.value = '';
    totalOutput.textContent = '';
    categoryInput.value = '';
}

function showInvoice() {
    getTotal();
    let tableRows = '';
    Invoice.forEach((Invoice, index) => {
        if (
            (!searchInput.value ||
                Invoice.title.toLowerCase().includes(searchInput.value.toLowerCase())) &&
            (searchMood === 'title' ||
                Invoice.category.toLowerCase().includes(searchInput.value.toLowerCase()))
        ) {
            tableRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${Invoice.title}</td>
          <td>${Invoice.price}</td>
          <td>${Invoice.taxes}</td>
          <td>${Invoice.ads}</td>
          <td>${Invoice.discount}</td>
          <td>${Invoice.total}</td>
          <td>${Invoice.category}</td>
          <td><button onclick="updateInvoice(${index})" class="update">Update</button></td>
          <td><button onclick="deleteInvoice(${index})" class="delete">Delete</button></td>
        </tr>
      `;
        }
    });

    tbody.innerHTML = tableRows;
    let deleteAllButton = document.getElementById('deleteAll');
    if (Invoice.length > 0) {
        deleteAllButton.innerHTML = '<button onclick="deleteAll()">Delete All</button>';
    } else {
        deleteAllButton.innerHTML = '';
    }
}

function deleteInvoice(index) {
    Invoice.splice(index, 1);
    localStorage.setItem('Invoice', JSON.stringify(Invoice));
    showInvoice(); // تعديل هنا
}


function deleteAll() {
    localStorage.clear();
    Invoice = [];
    showInvoice();
}

countInput.addEventListener('input', getTotal);

function updateInvoice(index) {
    if (!Array.isArray(Invoice) || index < 0 || index >= Invoice.length) {
        console.error("Invoice array is not defined properly or index is out of bounds.");
        return;
    }

    const selectedInvoice = Invoice[index];

    titleInput.value = selectedInvoice.title;
    priceInput.value = selectedInvoice.price;
    taxesInput.value = selectedInvoice.taxes;
    adsInput.value = selectedInvoice.ads;
    discountInput.value = selectedInvoice.discount;
    totalOutput.textContent = selectedInvoice.total;
    categoryInput.value = selectedInvoice.category;

    getTotal();

    countInput.style.display = 'none';
    submitButton.textContent = 'Update';
    mood = 'update';
    tmp = index;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}



function searchData() {
    const searchValue = searchInput.value;
    showInvoice(searchValue);
}

searchButton.addEventListener('click', searchData);

searchTitleButton.addEventListener('click', function () {
    searchMood = 'title';
    showInvoice();
});

searchCategoryButton.addEventListener('click', function () {
    searchMood = 'category';
    showInvoice();
});

showInvoice();