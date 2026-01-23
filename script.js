document.addEventListener('DOMContentLoaded', () => {
    
    const BOT_TOKEN = "8473435796:AAGfjEQ2IAsDicm74jM-NYipD5v2kSMfDro";
    const MY_CHAT_ID = "6154942167";


    document.querySelectorAll('.carousel-container').forEach((container) => {
        const track = container.querySelector('.restaurants__grid');
        const nextBtn = container.querySelector('.next');
        const prevBtn = container.querySelector('.prev');

        if (!track || !nextBtn || !prevBtn) return;

        nextBtn.addEventListener('click', () => {
            const firstCard = track.firstElementChild;
            if (!firstCard) return;
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
            if (!lastCard) return;
            track.style.transition = "none";
            track.prepend(lastCard);
            track.style.transform = `translateX(-${lastCard.offsetWidth + 20}px)`;

            setTimeout(() => {
                track.style.transition = "transform 0.5s ease";
                track.style.transform = "translateX(0)";
            }, 1);
        });
    });


    const bookingModal = document.getElementById("bookingModal");
    const closeBookingBtn = document.querySelector(".close-button");
    const openBookingBtns = document.querySelectorAll(".btn-open-booking");

    if (bookingModal) {
        openBookingBtns.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                bookingModal.style.display = "block";
                document.body.style.overflow = "hidden";
            };
        });

        if (closeBookingBtn) {
            closeBookingBtn.onclick = () => {
                bookingModal.style.display = "none";
                document.body.style.overflow = "auto";
            };
        }
    }


    const loginModal = document.getElementById("loginModal");
    const openLoginBtn = document.getElementById("openLogin");  
    const closeLoginBtn = document.querySelector(".close-login");
    const loginForm = document.getElementById("loginForm");
    const smsField = document.getElementById("smsCodeField");
    const loginBtn = document.getElementById("loginBtn");
    
    const phoneInput = loginForm ? loginForm.querySelector('input[type="tel"]') : null;
    const smsInput = smsField ? smsField.querySelector('input') : null;


    function resetAndCloseLogin() {
        if (loginModal) {
            loginModal.style.display = "none";
            document.body.style.overflow = "auto"; 
            if (loginForm) loginForm.reset();     
            if (smsField) smsField.style.display = "none"; 
            if (loginBtn) loginBtn.innerText = "Получить код";
        }
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    
    if (openLoginBtn) {
        openLoginBtn.onclick = (e) => {
            e.preventDefault();
            loginModal.style.display = "block";
            document.body.style.overflow = "hidden";
        };
    }


    if (closeLoginBtn) closeLoginBtn.onclick = resetAndCloseLogin;
    
    window.addEventListener('click', (event) => {
        if (event.target == loginModal) resetAndCloseLogin();
        if (event.target == bookingModal) {
            bookingModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });


    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();

            if (smsField.style.display === "none" || smsField.style.display === "") {
                
                if (phoneInput.value.length < 5) {
                    alert("Введите номер телефона");
                    return;
                }


                const generatedCode = Math.floor(1000 + Math.random() * 9000);
                window.currentSmsCode = generatedCode; 

                const message = `Ваш код для входа на сайт: ${generatedCode}`;
                const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${MY_CHAT_ID}&text=${encodeURIComponent(message)}`;
;


                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        if (data.ok) {
                            smsField.style.display = "block";
                            loginBtn.innerText = "Войти";
                            alert("Код отправлен в ваш Telegram!");
                        } else {
                            alert("Ошибка бота: убедитесь, что нажали START в @SafeLoginPro_bot");
                        }
                    })
                    .catch(() => alert("Ошибка сети. Проверьте интернет."));
            } 
            else {
                if (smsInput && smsInput.value == window.currentSmsCode) {
                    alert("Успешный вход!");
                    resetAndCloseLogin(); 
                    if (openLoginBtn) openLoginBtn.innerText = "Профиль";
                } else {
                    alert("Неверный код! Проверьте Telegram сообщение.");
                }
            }
        };
    }
});
