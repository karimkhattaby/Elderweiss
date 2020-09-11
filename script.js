const form = document.querySelector("form");
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
            form.parentNode.parentNode.children[1].textContent = "You have successfully signed up to our mailing list. We will notify you through email about our upcoming events."
            const newElement = document.createElement("label");
            newElement.innerHTML = "<strong>Join our Facebook Community</strong> <a href='http://google.com'>By Clicking Here</a>";
            form.replaceWith(newElement);
        }
        else {
            emailError.textContent = data;
            if (data === "Email Already Exists") {
                const newError = document.createElement("label");
                newError.setAttribute("id", "error2");
                newError.innerHTML = "Join our facebook group <a href='http://google.com'>Here</a> if you haven't already joined it";
                emailError.parentNode.appendChild(newError);
            }
        }
    } catch(err) {
        emailError.textContent = "Server Error. Please Try Again After Some Time";
    }
});