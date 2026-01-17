document.querySelectorAll('.carousel-container').forEach((container, index) => {
    const track = container.querySelector('.restaurants__grid');
    const nextBtn = container.querySelector('.next');
    const prevBtn = container.querySelector('.prev');

    let currentIndex = 0;
    const totalCards = track.children.length;

    nextBtn.addEventListener('click', () => {
        const firstCard = track.firstElementChild;
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(-${firstCard.offsetWidth + 20}px)`;

        setTimeout(() => {
            track.style.transition = "none";
            track.appendChild(firstCard);
            track.style.transform = "translateX(0)";
        }, 500);
    });

    prevBtn.addEventListener('click', () => {
        const lastCard = track.lastElementChild;
        track.style.transition = "none";
        track.prepend(lastCard);
        track.style.transform = `translateX(-${lastCard.offsetWidth + 20}px)`;

        setTimeout(() => {
            track.style.transition = "transform 0.5s ease";
            track.style.transform = "translateX(0)";
        }, 1);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("bookingModal");
    const closeBtn = document.querySelector(".close-button");
    const openButtons = document.querySelectorAll(".btn-open-booking");

    if (modal && openButtons.length > 0) {
        openButtons.forEach(btn => {
            btn.onclick = function (e) {
                e.preventDefault();
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
            }
        });

        if (closeBtn) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const loginModal = document.getElementById("loginModal");
    const openLoginBtn = document.getElementById("openLogin");  
    const closeLogin = document.querySelector(".close-login");
    const loginForm = document.getElementById("loginForm");
    const smsField = document.getElementById("smsCodeField");
    const loginBtn = document.getElementById("loginBtn");

    if (openLoginBtn) {
        openLoginBtn.onclick = function (e) {
            e.preventDefault();
            loginModal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }

    if (closeLogin) {
        closeLogin.onclick = function () {
            loginModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }


    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            if (smsField.style.display === "none") {
                smsField.style.display = "block";
                loginBtn.innerText = "Войти";
                alert("Код отправлен на ваш номер (тестово)");
            } else {
                alert("Успешный вход!");
                loginModal.style.display = "none";
            }
        }
    }
});