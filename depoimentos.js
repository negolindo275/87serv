import { GOOGLE_AVALIACOES_URL, EXIBIR_COLETA_DEPOIMENTOS } from './depoimentos-config.js';

const criar = (tag, texto, classe) => {
    const elemento = document.createElement(tag);
    if (texto) elemento.textContent = texto;
    if (classe) elemento.className = classe;
    return elemento;
};
export function renderizarDepoimentos(lista) {
    const secao = document.getElementById('depoimentos');
    const menus = document.querySelectorAll('#depoimentos-menu, #depoimentos-rodape');
    const grade = document.getElementById('depoimentos-cartoes');
    secao.hidden = true;
    menus.forEach(menu => { menu.hidden = true; });
    grade.replaceChildren();
    if (!Array.isArray(lista) || !lista.length) return;
    for (const item of lista) {
        const cartao = criar('figure', null, 'depoimento-card');
        const citacao = criar('blockquote');
        citacao.append(criar('p', item.texto));
        const legenda = criar('figcaption');
        if (item.foto) {
            const foto = criar('img');
            foto.src = item.foto;
            foto.alt = `Foto de ${item.autor}`;
            foto.loading = 'lazy';
            foto.width = foto.height = 64;
            legenda.append(foto);
        }
        legenda.append(criar('strong', item.autor), criar('span', `${item.segmento} • ${item.cidade}`));
        cartao.append(citacao, legenda);
        if (item.case) {
            const expansivel = criar('details');
            const titulo = criar('summary', 'Ver o caso');
            titulo.setAttribute('aria-label', `Ver o caso: ${item.autor}`);
            expansivel.append(titulo);
            const dados = criar('dl');
            for (const [chave, rotulo] of [['problema', 'Problema'], ['solucao', 'Solução'], ['resultado', 'Resultado']]) {
                dados.append(criar('dt', rotulo), criar('dd', item.case[chave]));
            }
            expansivel.append(dados);
            cartao.append(expansivel);
        }
        grade.append(cartao);
    }
    secao.hidden = false;
    menus.forEach(menu => { menu.hidden = false; });
}
const google = document.getElementById('google-avaliacoes');
try {
    const url = new URL(GOOGLE_AVALIACOES_URL);
    if (url.protocol === 'https:') {
        google.href = url.href;
        google.rel = 'noopener noreferrer';
        google.hidden = false;
    }
} catch { /* Sem URL válida, o link continua oculto. */ }
document.getElementById('coleta-depoimentos').hidden = !EXIBIR_COLETA_DEPOIMENTOS;
document.getElementById('depoimentos-cta').addEventListener('click', () => {
    window.track87?.('clique_cta_depoimentos');
});
try {
    const resposta = await fetch('/depoimentos-publicos.json');
    if (!resposta.ok) throw new Error('Dados indisponíveis');
    renderizarDepoimentos(await resposta.json());
} catch { /* Falha fechada: seção e menu permanecem ocultos. */ }
