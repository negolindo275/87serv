import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dadosPublicos, validar, publicavel } from '../scripts/depoimentos-dados.mjs';
// Fixtures explicitamente fictícias, só em teste; jamais entram na base editorial.
const fixture = () => ({ id: 'fixture-ficticia', nome: 'IDENTIDADE FICTÍCIA PARA TESTE', empresa: 'EMPRESA FICTÍCIA PARA TESTE', cargo: 'Síndico', segmento: 'Condomínio', cidade: 'Colombo', servico: 'SERVIÇO FICTÍCIO', texto: 'TEXTO FICTÍCIO PARA TESTE', foto: 'assets/fixture.webp', autoriza_nome: false, autoriza_foto: false, data_autorizacao: '2026-10-01', comprovante: 'REFERÊNCIA PRIVADA DE TESTE', publicado: true });
test('nenhuma evidência publicada quando a base está vazia', () => assert.deepEqual(dadosPublicos([]), []));
test('exemplos publicados bloqueiam mesmo com autorização faltante', () => assert.throws(() => validar([{ ...fixture(), exemplo: true, data_autorizacao: null }]), /bloqueada/));
test('regras de autorização e conteúdo falham fechadas', () => {
    for (const [key, value] of [['publicado', false], ['publicado', 'true'], ['autoriza_nome', undefined], ['autoriza_nome', 'false'], ['data_autorizacao', ''], ['data_autorizacao', '2026-02-30'], ['texto', 'x'.repeat(281)], ['comprovante', null], ['cidade', ''], ['segmento', 'Inválido']]) assert.equal(publicavel({ ...fixture(), [key]: value }), false, key);
    assert.equal(publicavel({ ...fixture(), autoriza_nome: true, nome: null }), false);
});
test('anonimização exclui identidade, foto, comprovante e permissões', () => {
    const [item] = dadosPublicos([{ ...fixture(), autoriza_foto: true }]);
    assert.equal(item.autor, 'Síndico, condomínio em Colombo');
    assert.equal(item.foto, null);
    for (const valor of ['IDENTIDADE FICTÍCIA', 'EMPRESA FICTÍCIA', 'REFERÊNCIA PRIVADA']) assert.ok(!JSON.stringify(item).includes(valor));
    assert.equal(item.data_autorizacao, undefined);
});
test('foto exige autorizações e caminho local seguro', () => {
    const item = { ...fixture(), autoriza_nome: true };
    assert.equal(dadosPublicos([item])[0].foto, null);
    assert.equal(dadosPublicos([{ ...item, autoriza_foto: true }])[0].foto, 'assets/fixture.webp');
    for (const foto of ['javascript:alert(1)', 'https://externo.invalid/foto.jpg', 'assets/../privado.jpg']) assert.equal(dadosPublicos([{ ...item, autoriza_foto: true, foto }])[0].foto, null);
});
test('caso só aparece completo; IDs duplicados falham', () => {
    assert.equal(dadosPublicos([{ ...fixture(), case: { problema: 'FICTÍCIO' } }])[0].case, null);
    const caso = { problema: 'PROBLEMA FICTÍCIO', solucao: 'SOLUÇÃO FICTÍCIA', resultado: 'RESULTADO FICTÍCIO' };
    assert.deepEqual(dadosPublicos([{ ...fixture(), case: caso }])[0].case, caso);
    assert.throws(() => validar([fixture(), fixture()]), /repetido/);
});
test('base real válida e três exemplos privados despublicados', async () => {
    const reais = JSON.parse(await readFile(new URL('../data/depoimentos.json', import.meta.url)));
    const exemplos = JSON.parse(await readFile(new URL('../data/depoimentos.exemplo.json', import.meta.url)));
    assert.ok(Array.isArray(reais));
    assert.equal(exemplos.length, 3);
    assert.ok(exemplos.every(item => item.exemplo === true && item.publicado === false));
    validar(reais); validar(exemplos);
    assert.deepEqual(dadosPublicos(exemplos), []);
    const runtime = await readFile(new URL('../depoimentos.js', import.meta.url), 'utf8');
    assert.ok(!runtime.includes('depoimentos.exemplo.json'));
    const preparo = await readFile(new URL('../scripts/preparar-site.mjs', import.meta.url), 'utf8');
    assert.ok(!preparo.includes("'docs'") && !preparo.includes("'data'"));
});
