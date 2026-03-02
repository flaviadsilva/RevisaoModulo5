// --- CARROSSEL ---
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const btnPrev = document.querySelector('.carousel-btn-prev');
const btnNext = document.querySelector('.carousel-btn-next');
let currentSlide = 0;

function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

btnPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
btnNext.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(Number(dot.dataset.index)));
});

// Troca automática a cada 4 segundos
setInterval(() => goToSlide(currentSlide + 1), 4000);

// --- FORMULÁRIO ---
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    // 1. Captura de elementos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const msgContainer = document.getElementById('msg-container');
    const btnSubmit = this.querySelector('.btn-submit');

    // 2. Limpeza de estados anteriores
    msgContainer.innerHTML = '';
    btnSubmit.classList.remove('shake');

    // 3. Lógica de Validação
    let erros = [];

    if (nome.length < 3) {
        erros.push("Por favor, digite seu nome completo.");
    }

    // Validação de e-mail um pouco mais robusta
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erros.push("Insira um e-mail válido (ex: nome@dominio.com).");
    }

    // 4. Manipulação do DOM e Animações
    if (erros.length > 0) {
        // Ação em caso de ERRO
        erros.forEach(texto => {
            const p = document.createElement('p');
            p.className = 'msg-error';
            p.textContent = texto;
            msgContainer.appendChild(p);
        });

        // Adiciona a animação de tremor definida no CSS
        btnSubmit.classList.add('shake');
        
        // Remove a classe após a animação (0.4s) para poder repetir se clicar de novo
        setTimeout(() => {
            btnSubmit.classList.remove('shake');
        }, 400);

    } else {
        // Ação em caso de SUCESSO
        const sucesso = document.createElement('p');
        sucesso.className = 'msg-success';
        sucesso.innerHTML = `✨ <strong>Sucesso!</strong> Obrigado, ${nome}. <br> Recebemos seu pedido e logo entraremos em contato.`;
        msgContainer.appendChild(sucesso);
        
        // Estilização extra no botão para feedback visual
        const textoOriginal = btnSubmit.textContent;
        btnSubmit.textContent = "Enviado!";
        btnSubmit.style.background = "#2a7a43";
        btnSubmit.disabled = true;

        // Limpa o formulário
        this.reset();

        // Restaura o botão após 3 segundos
        setTimeout(() => {
            btnSubmit.textContent = textoOriginal;
            btnSubmit.style.background = "";
            btnSubmit.disabled = false;
            sucesso.remove();
        }, 5000);
    }
});