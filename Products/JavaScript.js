const theDate = document.getElementById('theDate');
const total = document.getElementById('total');
const category = document.getElementById('category');
const submitBtn = document.getElementById('submit');
const tbody = document.getElementById('tbody');
const searchValueInput = document.getElementById('search');
const searchTitleButton = document.getElementById('searchTitleButton');
const searchCategoryButton = document.getElementById('searchCategoryButton');
const deleteAllButton = document.getElementById('deleteAll');
let Products = JSON.parse(localStorage.getItem('Products')) || [];
let mood = 'create';
let tmp;
let searchMood = 'title';

submitBtn.addEventListener('click', function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        Quantity: Quantity.value,
        theDate: theDate.value,
        total: total.innerHTML,
        category: category.value
    };

    if (mood === 'create') {
        if (validateProduct(newProduct)) {
            // إضافة المنتج الجديد إلى Products
            Products.push(newProduct);
            localStorage.setItem('Products', JSON.stringify(Products));
            clearInputFields();
            showProducts();
        } else {
            alert('Please fill out all fields.');
        }
    } else {
        // تعديل المنتج الموجود
        Products[tmp] = newProduct;
        mood = 'create';
        submitBtn.textContent = 'Create';
        localStorage.setItem('Products', JSON.stringify(Products));
        clearInputFields();
        showProducts();
    }
});

function clearInputFields() {
    title.value = '';
    price.value = '';
    Quantity.value = '';
    theDate.value = '';
    total.innerHTML = '';
    category.value = '';
}

function showProducts() {
    getTotal();
    let tableRows = '';
    Products.forEach((Products, index) => {
        if (
            (!searchValueInput.value || Products.title.toLowerCase().includes(searchValueInput.value.toLowerCase())) &&
            (searchMood === 'title' || Products.category.toLowerCase().includes(searchValueInput.value.toLowerCase()))
        ) {
            tableRows += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${Products.title}</td>
                    <th>${Products.price}</th>
                    <th>${Products.Quantity}</th>
                    <th>${Products.theDate}</th>
                    <td>${Products.total}</td>
                    <td>${Products.category}</td>
                    <td><button onclick="updateProducts(${index})" class="update">Update</button></td>
                    <td><button onclick="deleteProducts(${index})" class="delete">Delete</button></td>
                </tr>
            `;
        }
    });

    tbody.innerHTML = tableRows;
    let btnDelete = document.getElementById('deleteAll');
    if (Products.length > 0) {
        btnDelete.innerHTML = '<button onclick="deleteAll()">Delete All</button>';
    } else {
        btnDelete.innerHTML = '';
    }
}

function deleteProducts(index) {
    Products.splice(index, 1);
    localStorage.setItem('Products', JSON.stringify(Products));
    showProducts();
}

function deleteAll() {
    localStorage.clear();
    Products = [];
    showProducts();
}

function updateProducts(index) {
    // التأكد من أن المتغير Products معرف بشكل صحيح ويحتوي على بيانات
    if (!Array.isArray(Products) || index < 0 || index >= Products.length) {
        console.error("Products array is not defined properly or index is out of bounds.");
        return;
    }

    // جلب المنتج المحدد من المصفوفة
    const selectedProduct = Products[index];

    // تعبئة الحقول بالقيم المخزنة للمنتج
    title.value = selectedProduct.title;
    price.value = selectedProduct.price;
    Quantity.value = selectedProduct.Quantity;
    theDate.value = selectedProduct.theDate;
    total.innerHTML = selectedProduct.total;
    category.value = selectedProduct.category;

    // حساب المجموع
    getTotal();

    // تغيير نص الزر إلى 'Update' وتحديث الحالة إلى 'update'
    submitBtn.textContent = 'Update';
    mood = 'update';
    tmp = index;

    // التمرير إلى أعلى الصفحة بسلاسة
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function searchData(searchValue) {
    showProducts(searchValue);
}

function getTotal() {
    // التأكد من أن الحقول تحتوي على قيم صالحة قبل الحساب
    let priceValue = parseFloat(price.value);
    let quantityValue = parseInt(Quantity.value);

    // التحقق من أن السعر والكمية أرقام صحيحة
    if (!isNaN(priceValue) && !isNaN(quantityValue) && priceValue > 0 && quantityValue > 0) {
        // حساب المجموع
        let result = priceValue * quantityValue;
        total.innerHTML = result;
        total.style.backgroundColor = '#4CAF50'; // تغيير لون الخلفية للإشارة إلى النجاح
    } else {
        // مسح المجموع إذا كانت المدخلات غير صالحة
        total.innerHTML = '';
        total.style.backgroundColor = '#f14343'; // تغيير لون الخلفية للإشارة إلى الخطأ
    }
}

function validateProduct(Products) {
    return Products.title && Products.price >= 0 && Products.Quantity >= 0 ;
}

showProducts();