document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Inicializar AOS (Animações de Scroll) ---
    AOS.init({
        once: true,
        offset: 50,
    });

    // --- 2. Inicializar Swiper (Carrossel de Galeria) ---
    const swiper = new Swiper('.gallery-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // --- 3. Countdown Timer ---
    const targetDate = new Date("2026-07-02T17:00:00").getTime();
    
    const countdownElement = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    const updateCountdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownElement.days.innerText = "00";
            countdownElement.hours.innerText = "00";
            countdownElement.minutes.innerText = "00";
            countdownElement.seconds.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.days.innerText = days < 10 ? "0" + days : days;
        countdownElement.hours.innerText = hours < 10 ? "0" + hours : hours;
        countdownElement.minutes.innerText = minutes < 10 ? "0" + minutes : minutes;
        countdownElement.seconds.innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);

    // --- 4. Controle de Música Nativo ---
    const musicBtn = document.getElementById('music-btn');
    const bgAudio = document.getElementById('bg-audio');
    let isPlaying = false;

    // Define o volume suave
    bgAudio.volume = 0.4;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgAudio.pause();
            musicBtn.innerHTML = '<span class="music-icon">🎵</span> Ligar Música';
            musicBtn.classList.remove('playing');
        } else {
            // Promise para garantir que o navegador permita
            bgAudio.play().then(() => {
                musicBtn.innerHTML = '<span class="music-icon">⏸️</span> Pausar Música';
                musicBtn.classList.add('playing');
            }).catch(err => {
                console.log("Erro ao tocar música: ", err);
                alert("O navegador bloqueou a música. Tente novamente.");
            });
        }
        isPlaying = !isPlaying;
    });

    // --- 5. Formatação do WhatsApp ---
    const whatsappInput = document.getElementById('whatsapp');
    whatsappInput.addEventListener('input', function (e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // --- 6. Envio do Formulário RSVP (Redirecionamento para WhatsApp) ---
    const rsvpForm = document.getElementById('rsvp-form');
    const submitBtn = rsvpForm.querySelector('.submit-btn');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitBtn.innerHTML = '<span class="btn-text">Redirecionando...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Coleta os dados
        const name = document.getElementById('name').value;
        const procedure = document.getElementById('procedure');
        const procedureText = procedure.options[procedure.selectedIndex].text;
        
        let text = `Olá! Quero resgatar meu voucher de desconto do Aniversário do Instituto Pomus.%0A%0A*Nome:* ${name}%0A*Procedimento de Interesse:* ${procedureText}`;

        const whatsappNumber = "5598984633233";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        // Redireciona em 1 segundo
        setTimeout(() => {
            window.location.href = whatsappUrl;
            
            // Restaura o botão caso o usuário volte
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="btn-text">Garantir Meu Voucher ✨</span>';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1000);
        }, 800);
    });

    // --- 7. Botão Salvar na Agenda ---
    const btnCalendar = document.getElementById('btn-calendar');
    btnCalendar.addEventListener('click', () => {
        const eventUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=1+Ano+Instituto+Pomus&dates=20260702T200000Z/20260703T010000Z&details=Celebração+de+1+ano+do+Instituto+Pomus.&location=Instituto+Pomus";
        window.open(eventUrl, '_blank');
    });

    // --- 8. Sticky Nav Highlight ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".floating-nav .nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("highlight");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("highlight");
            }
        });
    });

});
