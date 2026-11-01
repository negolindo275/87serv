import { readFile } from 'node:fs/promises';
import { validar } from './depoimentos-dados.mjs';
for (const arquivo of ['depoimentos.json', 'depoimentos.exemplo.json']) {
    validar(JSON.parse(await readFile(new URL('../data/' + arquivo, import.meta.url), 'utf8')));
}
console.log('Depoimentos validados: nenhum exemplo publicado.');
