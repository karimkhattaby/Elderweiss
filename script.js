fetch("https://elderweiss.herokuapp.com/");
const link = "http://google.com";
const form = document.querySelector("form");
const lang = document.querySelector("html").getAttribute("lang");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = form.email.value;
    
    const emailError = document.querySelector("#error");
    emailError.textContent = "";
    
    const emailError2 = document.querySelector("#error2");
    if (emailError2) {
        emailError2.remove();
    }
    
    try {
        const res = await fetch("https://elderweiss.herokuapp.com/register", {
            method: "POST",
            mode: "cors",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email})
        })
        const data = await res.json();
        if (res.status === 200) {
            const newElement = document.createElement("label");
            form.parentNode.parentNode.children[1].textContent = "You have successfully signed up to our mailing list. We will notify you through email about our upcoming events.";
            newElement.innerHTML = `<strong>Join our Facebook Community</strong> <a href="${link}">By Clicking Here</a>`;
            if (lang === "ar") {
                form.parentNode.parentNode.children[1].textContent = "لقد قمت بالتسجيل بنجاح في قائمتنا البريدية. سنخطرك عبر بريدك الإلكتروني بفعالياتنا المقبلة.";
                newElement.innerHTML = `<strong>انضم إلينا في مجموعة الفيسبوك</strong> <a href="${link}">بالنقر هنا</a>`;
            }
            form.replaceWith(newElement);
        }
        else {
            emailError.textContent = data;
            if (data === "Email Already Exists") {
                const newError = document.createElement("label");
                newError.setAttribute("id", "error2");
                newError.innerHTML = `Join our facebook group <a href="${link}">Here</a> if you haven't already joined it`;
                if (lang === "ar") {
                    emailError.textContent = "بريدك الإلكتروني موجود مسبقاً";
                    newError.innerHTML = `انضم إلينا في مجموعة الفيسبوك <a href="${link}">هنا</a> إن لم تكن قمت بذلك من قبل`;
                }
                emailError.parentNode.appendChild(newError);
            }
        }
    } catch(err) {
        emailError.textContent = "Server Error. Please Try Again After Some Time";
        if (lang === "ar") {
            emailError.textContent = "حدث خطأ في الاتصال مع الخادم. برجاء المحاولة مرة أخرى لاحقاً";
        }
    }
});