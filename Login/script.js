document.write(`
        <div id="content" style="display: none;">    
        <form class="login">
        <div>
            <label for="username">Username</label>
            <input type="text" id="username" placeholder="Username">
        </div>
        <div>
            <label for="password">password</label>
            <input type="password" id="password" placeholder="Password">
        </div>
        <p id="error-message"></p>
        <button href="Home.html" type="button" id="button" onclick="validateLogin()">Login</button>
        <button href="User.html" type="button" id="button" onclick=" window.location.href = 'index.html';">Create</button>
    </form>
    </div>
    `);
    
    function validateLogin() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var errorMessage = document.getElementById("error-message");
    
    var enteredUsername = usernameInput.value;
    var enteredPassword = passwordInput.value;
    
    // قم بتعيين قيمة اسم المستخدم وكلمة المرور الصحيحة هنا
    var correctUsername = "AmrMaher";
    var correctPassword = "3306Amr";
    
    if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
        var htmlFilePath = "Customer.html";
        // استخدام window.open() لفتح الملف HTML في نافذة جديدة.
        window.open(htmlFilePath, "_self");
    } else {
        errorMessage.textContent = "اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.";
    }
    }