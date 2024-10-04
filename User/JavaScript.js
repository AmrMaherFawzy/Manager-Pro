function validateCreateUser() {
    // الحصول على قيم المدخلات
    const userName = document.getElementById('UserName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('Password').value;

    // التحقق من أن جميع الحقول معبأة
    if (userName === '' || email === '' || phone === '' || password === '') {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    // إنشاء كائن يحتوي على بيانات المستخدم
    const user = {
        userName: userName,
        email: email,
        phone: phone,
        password: password
    };

    // حفظ البيانات في ملف JSON (يتم محاكاة ذلك هنا)
    saveUserToJSON(user);
}

function saveUserToJSON(user) {
    // هنا سنقوم بمحاكاة حفظ البيانات في ملف JSON
    // في الواقع، هذا يحتاج إلى تنفيذ على الخادم باستخدام Node.js أو أي تقنية خلفية أخرى
    console.log('سيتم حفظ بيانات المستخدم التالية في ملف JSON:', user);

    // على سبيل المثال، يمكن إرسال البيانات إلى الخادم عبر API
    fetch('YOUR_API_ENDPOINT', { // استبدل YOUR_API_ENDPOINT بنقطة النهاية الخاصة بك
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok) {
            console.log('تم حفظ المستخدم بنجاح');
            // التوجيه إلى صفحة تسجيل الدخول
            window.location.href = 'LogIn.html';
        } else {
            console.log('حدث خطأ أثناء حفظ المستخدم');
        }
    }).catch(error => {
        console.error('خطأ في الشبكة:', error);
    });
}
