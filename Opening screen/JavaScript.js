// جافا سكريبت لإخفاء شاشة الافتتاحية بعد تحميل الموقع بفترة
window.addEventListener('load', function () {
    var splashScreen = document.getElementById('splash-screen');
    var content = document.getElementById('content');

    // التحقق من وجود العناصر قبل محاولة تعديل الخصائص
    if (splashScreen && content) {
        setTimeout(function () {
            splashScreen.style.display = 'none';
            content.style.display = 'block';
        }, 10000);
    } else {
        console.error('العناصر المطلوبة غير موجودة في الـ DOM');
    }
});
