# Apê Parque Praia

Projeto independente, sem ligação com Cordeiro Tattoos. Landing page estática em português, com navegação por âncoras, animações progressivas, menu móvel e respeito à preferência de movimento reduzido.

## Visualização local

Execute `node server.mjs` nesta pasta e acesse http://127.0.0.1:4173.

## Publicação na Vercel

O `vercel.json` na raiz do repositório configura o site estático para publicar `dist`, onde está o `index.html`. Não é necessário mover o HTML para a raiz. Use a raiz do repositório como Root Directory na Vercel, com a branch de produção `main`. Não há instalação de dependências ou etapa de compilação. Novos commits na main acionam a publicação quando a integração com GitHub está conectada.

## Alterações do cliente

- Foto principal: substitua `dist/assets/sacada.jpg`.
- WhatsApp: preencha `CONTACT.whatsapp` no início de `dist/app.js`, somente com dígitos, incluindo país e DDD. O botão permanece indisponível até o preenchimento.
- Vídeo: preencha `CONTACT.balconyVideo` no mesmo arquivo, com o caminho do MP4 em `dist/assets/` ou uma URL HTTPS direta de vídeo. O player tem controles nativos, sem reprodução automática. Adicione legendas ao receber o conteúdo.
- Conteúdo: `dist/index.html`. Aparência: `dist/styles.css`.
- QR code futuro: usar a URL pública definitiva seguida de `/#sacada`. Não imprimir um QR apontando para a versão privada de apresentação, que exige acesso do proprietário.

## Localização e SEO

Endereço consultado no link Google fornecido: Lavitta Residences Beach and Park, Av. Eugênio Krause, 3650, Armação, Penha – SC, 88385-000. Nenhum telefone, avaliação ou dado comercial do condomínio foi atribuído ao apartamento. Não foi informado número de unidade.

Metadados em português e dados estruturados LodgingBusiness incluídos. A versão privada não está disponível para indexação pública. Antes do lançamento, definir acesso público/domínio definitivo, canonical e sitemap, confirmar endereço com o cliente e revisar dados finais. Não há promessa de posicionamento em buscas.

## Segurança e manutenção

Sem formulários, banco de dados, rastreadores, cookies de aplicação ou credenciais no navegador. Links externos isolados com noopener/noreferrer. Fontes são carregadas do Google Fonts, com alternativas locais. A hospedagem deverá usar HTTPS. Configuração de cabeçalhos está em `dist/_headers` quando suportada pelo provedor.

As fotos originais permanecem na pasta principal; somente os arquivos em dist compõem o site.
