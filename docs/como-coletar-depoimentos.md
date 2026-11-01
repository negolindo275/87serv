# Como coletar depoimentos

Faça três perguntas curtas, sem sugerir uma resposta positiva:

1. Qual necessidade levou você a contratar a 87?
2. Como foi sua experiência com o serviço?
3. O que mudou depois do atendimento?

Peça ao cliente que escreva o relato final em até 280 caracteres. Confirme cargo, segmento, cidade e serviço. Não crie nomes, elogios ou números e não edite o sentido do relato.

## Autorização por WhatsApp

Preencha a mensagem abaixo com o texto exato e as escolhas do cliente antes de enviá-la. Nunca presuma autorização de foto ou de identificação. Se ele escolher anonimato, informe a identificação genérica que aparecerá e retire referências identificáveis também do relato e do caso.

> Posso publicar no site da 87 Serviços e Soluções o seu depoimento abaixo?
>
> Depoimento: [texto final exato, até 280 caracteres].
> Serviço: [serviço]. Segmento: [segmento]. Cidade: [cidade]. Cargo: [cargo].
> Identificação escolhida: [nome e empresa autorizados OU identificação anônima, sem nome e empresa].
> Nome: [autorizo / não autorizo]. Empresa: [autorizo / não autorizo / não se aplica]. Foto: [autorizo a imagem específica anexada / não autorizo].
> Caso, se houver: [problema, solução e resultado exatos OU não publicar caso].
> A autorização permite publicar somente esse conteúdo e os elementos escolhidos no site institucional da 87. Não inclui campanhas, redes sociais nem outros usos. Você pode solicitar a retirada por este WhatsApp.
> Se concordar com o texto e todas as escolhas acima, responda “autorizo”. Se quiser mudar algo, informe antes de autorizar.

A resposta “autorizo” só vale para as escolhas explícitas dessa mensagem. Uma autorização genérica sem o texto e as permissões discriminadas não basta. Se houver empresa identificada, confirme que o cliente pode autorizar o uso desse nome. Caso contrário, omita a empresa. Fotos e casos precisam estar incluídos na autorização específica.

## Guardar o comprovante

1. Capture a mensagem completa, as escolhas, o conteúdo autorizado, a resposta do cliente e a data. Inclua a foto específica autorizada, se aplicável.
2. Guarde o comprovante em pasta interna com acesso restrito à equipe responsável. Não envie prints ao repositório, à pasta pública ou ao site.
3. Use um identificador interno por depoimento e registre apenas a referência de localização em `comprovante`, sem URL com acesso ou informação sensível.
4. Registre a data real em `data_autorizacao`. Copie as palavras do cliente e marque separadamente as permissões de nome e foto. Nome e empresa não autorizados ficam `null`.
5. Revise a correspondência entre o comprovante e o registro; só então habilite `publicado`. Sem comprovação, mantenha `false`.
6. Se houver revogação, despublique o item e retire os arquivos públicos associados. Siga a política interna de retenção para os comprovantes restritos.

O link de coleta via WhatsApp está preparado, mas permanece oculto até solicitação expressa. AD3 Portão não tem conteúdo nem autorização cadastrados e permanece sem publicação.
