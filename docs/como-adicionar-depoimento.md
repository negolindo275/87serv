# Como adicionar um depoimento real

A base editorial `data/depoimentos.json` começa com `[]`. Ela é mantida no repositório, sem formulário, banco novo ou gravação de dados pelo navegador. Não cadastre conteúdo inventado. Copie apenas palavras fornecidas pelo cliente, com até 280 caracteres; peça uma versão menor em vez de reescrever sua opinião.

Cada objeto tem o formato abaixo. Os valores descritivos são instruções de preenchimento, não um depoimento para publicar:

```json
{
  "id": "slug-unico",
  "nome": null,
  "cargo": "Cargo real informado pelo cliente",
  "empresa": null,
  "segmento": "Condomínio",
  "cidade": "Cidade real informada pelo cliente",
  "servico": "Serviço realmente prestado",
  "texto": "Palavras do cliente, até 280 caracteres",
  "foto": null,
  "autoriza_nome": false,
  "autoriza_foto": false,
  "data_autorizacao": "AAAA-MM-DD",
  "comprovante": "Referência interna da autorização; nunca um link público",
  "publicado": false
}
```

`id` deve ser único, em letras minúsculas sem acento, números e hífens. `nome`, `empresa` e `foto` podem ser `null`. `segmento` aceita somente Condomínio, Academia, Indústria, Escritório, Clínica ou Outro. `autoriza_nome` deve ser um booleano explícito. `data_autorizacao` deve conter uma data real no formato AAAA-MM-DD. Preencha cargo, cidade, serviço, texto e referência do comprovante. Só mude `publicado` para `true` depois de conferir a autorização.

Se faltar qualquer campo obrigatório ou autorização, o item não é enviado à página. Se todos forem inelegíveis, a seção inteira e seu link no menu ficam ocultos. `autoriza_nome: false` gera identificação anônima, como “Síndico, condomínio em Colombo”, sem expor nome ou empresa. Revise o próprio texto e os campos de caso para garantir que não revelem a identidade de quem escolheu anonimato.

Nome e empresa só aparecem quando `autoriza_nome: true`; esse campo representa a autorização de ambos quando fornecidos. Se a empresa não autorizar identificação, use `empresa: null`. Fotos exigem `autoriza_foto: true`, identificação autorizada e arquivo local em `assets/`. A regra adicional de identificação impede uma foto de desanonimizar o cliente. Use imagem quadrada apropriada para o recorte de 64 × 64, sem metadados pessoais. Não adicione fotos sem autorização à pasta pública de assets.

## Casos opcionais

Acrescente `"case": { "problema": "...", "solucao": "...", "resultado": "..." }` somente com conteúdo real, documentado e autorizado. Os três campos devem estar preenchidos para aparecer o expansível “Ver o caso”. Não invente métricas ou resultados; o depoimento continua sujeito às mesmas regras de publicação.

<!--
AD3 Portão — pendente de autorização. Este lembrete é um item comentado apenas na documentação, pois JSON não admite comentários. Não colocar na base publicada nem preencher texto, nome, foto ou resultado sem dados reais e autorização.
Item reservado (não é um registro publicável):
{ "id": "ad3-portao", "nome": null, "empresa": null, "case": { "problema": null, "solucao": null, "resultado": null }, "publicado": false }
-->

AD3 Portão permanece sem publicação. Solicite os dados e as permissões antes de criar seu registro.

## Validação e privacidade

Execute `node scripts/validar-depoimentos.mjs` e `node --test tests/depoimentos.test.mjs`. A validação falha se qualquer registro de qualquer um dos dois arquivos tiver simultaneamente `exemplo: true` e `publicado: true`. A preparação configurada da publicação executa essa mesma validação e gera `depoimentos-publicos.json` com uma lista permitida de campos. Comprovantes, decisões de autorização, dados identificáveis não autorizados e arquivos de exemplo não entram na pasta pública `.site`.

Guarde comprovantes em armazenamento interno restrito, fora do repositório e de `assets`. A base fonte contém somente uma referência interna sem dados sensíveis. O repositório pode ser público: não registre nele informação pessoal que não possa ser divulgada. Para anonimato, mantenha `nome` e `empresa` como `null` também na fonte. Não inclua links de acesso, credenciais ou arquivos de autorização.

`data/depoimentos.exemplo.json` contém três exemplos explicitamente fictícios, todos despublicados e sem autorização. Ele serve apenas aos testes locais e nunca é importado pelo site ou copiado para a publicação. Não altere autorizações para exibir esses exemplos no site. Os testes de navegador podem simular cartões com esses textos, interceptando somente a resposta local, sem mudar a base real.

## Links opcionais e análise

Em `depoimentos-config.js`, `GOOGLE_AVALIACOES_URL` começa vazia. Preencha apenas com o endereço HTTPS oficial fornecido pela empresa. O link aparece dentro da seção quando houver pelo menos um depoimento publicável. A seção continua oculta sem depoimentos, mesmo que a URL esteja preenchida.

`EXIBIR_COLETA_DEPOIMENTOS` começa `false`. Só habilite após pedido expresso. O link “Enviar depoimento” abre o WhatsApp da 87 com mensagem pré-preenchida e não grava nada no site.

O botão “Pedir orçamento” aponta para `#contato` e usa `track87` para o evento `clique_cta_depoimentos`, respeitando o consentimento existente. O projeto ainda tem um ID de GA4 placeholder: o evento só é enviado depois que houver ID válido e consentimento de análise. Nenhuma marcação Review ou AggregateRating foi adicionada.

## Verificação local

O script `tests/depoimentos.browser.mjs` usa Playwright e @axe-core/playwright apenas no ambiente de testes. Com essas ferramentas disponíveis, inicie `netlify dev --port 8889 --dir . --offline` e execute `node tests/depoimentos.browser.mjs`. Se os pacotes estiverem instalados fora do projeto, `PLAYWRIGHT_MODULE` e `AXE_MODULE` podem apontar para seus módulos de entrada. Não é necessário instalar biblioteca no site.

Esse teste fornece a resposta pública pela interceptação de rede do navegador: primeiro os dados reais filtrados, depois cartões fictícios de teste, sem alterar os arquivos editoriais. Verifica 375px e 1440px, seção e links ocultos, colunas, teclado no expansível, âncoras, evento do CTA, foto, configuração opcional, erros de console, IDs únicos, árvore de acessibilidade e regras WCAG com axe na seção. Essa inspeção automatizada não substitui uma sessão manual com NVDA ou VoiceOver.
