// Lightbox simples para ampliar imagens da galeria
(() => {
    const initLightbox = () => {
        const images = document.querySelectorAll('.card img'); // Todas as imagens clicáveis
        if (!images.length) return; // Se não houver imagens, não faz nada

        // Cria o overlay do lightbox na página
        const overlay = document.createElement('div');
        overlay.className = 'lightbox hidden';
        overlay.innerHTML = `
            <div class="lightbox__backdrop" aria-hidden="true"></div>
            <div class="lightbox__inner" role="dialog" aria-modal="true">
                <button class="lightbox__close" aria-label="Fechar">×</button>
                <img class="lightbox__img" alt="">
                <p class="lightbox__caption"></p>
            </div>
        `;
        document.body.appendChild(overlay);

        // Referências aos elementos do overlay
        const imgEl = overlay.querySelector('.lightbox__img');
        const captionEl = overlay.querySelector('.lightbox__caption');
        const closeBtn = overlay.querySelector('.lightbox__close');
        const backdrop = overlay.querySelector('.lightbox__backdrop');

        // Abre o overlay preenchendo imagem e legenda
        const open = (src, alt, caption) => {
            imgEl.src = src;
            imgEl.alt = alt || '';
            captionEl.textContent = caption || '';
            overlay.classList.remove('hidden');
            document.body.classList.add('no-scroll');
        };

        // Fecha o overlay e limpa a imagem
        const close = () => {
            overlay.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            imgEl.src = '';
        };

        // Liga clique em cada imagem para abrir o lightbox
        images.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                const caption = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim();
                open(img.src, img.alt, caption);
            });
        });

        // Controles de fechamento
        closeBtn.addEventListener('click', close);
        backdrop.addEventListener('click', close);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
                close();
            }
        });
    };

    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})();
