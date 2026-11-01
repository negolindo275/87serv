export const segmentos = ['Condomínio', 'Academia', 'Indústria', 'Escritório', 'Clínica', 'Outro'];
const texto = value => typeof value === 'string' && value.trim().length > 0;
export function dataValida(value) {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) &&
        !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
export function publicavel(item) {
    return item && item.exemplo !== true && item.publicado === true &&
        typeof item.autoriza_nome === 'boolean' && dataValida(item.data_autorizacao) &&
        ['id', 'cargo', 'cidade', 'servico', 'texto', 'comprovante'].every(key => texto(item[key])) &&
        segmentos.includes(item.segmento) && [...item.texto].length <= 280 &&
        (item.autoriza_nome === false || texto(item.nome));
}
export function validar(lista) {
    if (!Array.isArray(lista)) throw new Error('Os depoimentos devem formar uma lista.');
    const ids = new Set();
    for (const item of lista) {
        if (!item || typeof item !== 'object') throw new Error('Item inválido.');
        if (item.exemplo === true && item.publicado === true) throw new Error('Exemplo fictício publicado: publicação bloqueada.');
        if (!texto(item.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || ids.has(item.id)) throw new Error('ID inválido ou repetido.');
        ids.add(item.id);
    }
}
export function dadosPublicos(lista) {
    validar(lista);
    return lista.filter(publicavel).map(item => {
        const autor = item.autoriza_nome ? [item.nome, item.cargo, item.empresa].filter(texto).join(' — ') :
            `${item.cargo}, ${item.segmento.toLocaleLowerCase('pt-BR')} em ${item.cidade}`;
        const foto = item.autoriza_foto === true && item.autoriza_nome === true && typeof item.foto === 'string' &&
            /^\/?assets\/[a-zA-Z0-9_./-]+\.(?:png|jpe?g|webp|avif)$/i.test(item.foto) && !item.foto.includes('..') ? item.foto : null;
        return { id: item.id, autor, segmento: item.segmento, cidade: item.cidade, texto: item.texto, foto,
            case: item.case && ['problema', 'solucao', 'resultado'].every(key => texto(item.case[key])) ?
                Object.fromEntries(['problema', 'solucao', 'resultado'].map(key => [key, item.case[key]])) : null };
    });
}
