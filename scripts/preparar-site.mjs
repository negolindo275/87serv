import './validar-depoimentos.mjs';
import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { dadosPublicos } from './depoimentos-dados.mjs';
// Lista explícita: dados privados, comprovantes, exemplos e testes nunca são publicados.
const raiz = new URL('../', import.meta.url);
const destino = new URL('../.site/', import.meta.url);
await rm(destino, { recursive: true, force: true });
await mkdir(destino, { recursive: true });
for (const arquivo of ['index.html', 'trabalhe-conosco.html', 'privacidade.html', 'candidatura-enviada.html', 'analytics.js', 'site-extras.css', 'depoimentos.js', 'depoimentos-config.js', 'robots.txt', 'sitemap.xml', 'assets']) {
    await cp(new URL(arquivo, raiz), new URL(arquivo, destino), { recursive: true });
}
const dados = JSON.parse(await readFile(new URL('data/depoimentos.json', raiz), 'utf8'));
await writeFile(new URL('depoimentos-publicos.json', destino), JSON.stringify(dadosPublicos(dados)) + '\n');
