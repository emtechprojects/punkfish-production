window.addEventListener("scroll", function () {
    const parallax = document.querySelector('.parallax')
    const aboutUs = document.querySelector('.about-us')
    let x = window.scrollY
    // HIDE PARALLAX
    if (x > 420) {
        parallax.classList.add("active")
    } else {
        parallax.classList.remove("active")
    }
    // SHOW ABOUT US
    if (x > 600) {
        aboutUs.style.visibility = "visible"
    } else {
        aboutUs.style.visibility = "hidden"
    }
})

const userEmail = document.querySelector("[data-user-email]")

document.querySelector('.subscribe-btn').addEventListener('click', function () {
    const elem = document.querySelector('.subscribe')

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    if (!validateEmail(userEmail.value)) {
        alert("Please enter a valid email address.")
    } else {
        elem.children[0].style.display = 'none'
        elem.children[1].style.display = 'none'
        elem.children[2].style.display = 'block'
        setTimeout(() => {
            elem.style.display = 'none'
        }, 2000)
        const data = validateEmail(userEmail.value)
        fetch('/subscribe', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: data })
        })
            .then(async res => {
                if (res.ok) return res.json()
                const json = await res.json()
                return await Promise.reject(json)
            })
            .catch(e => {
                console.error(e)
            })
        console.log("Subscribe event!")
    }
})