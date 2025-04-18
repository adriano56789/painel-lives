# **App Name**: StreamCentral

## Core Features:

- Stream Status Display: Display the current stream status (online/offline, bitrate, FPS, latency).
- RTMP Key Generation: Generate a unique RTMP key for each streamer.
- Real-time Charts: Display real-time charts for bitrate, latency and FPS.
- Stream Control: Allow admins to start/stop streams.
- AI Stream Title Generator: AI-powered tool to automatically generate suggested stream titles and descriptions based on detected content.

## Style Guidelines:

- Primary color: Dark blue (#1A202C) for a professional look.
- Secondary color: Light gray (#EDF2F7) for backgrounds and accents.
- Accent: Teal (#4DC0B5) for interactive elements and highlights.
- Clean and modern typography for clear data presentation.
- Simple and intuitive icons for stream controls and status indicators.
- Dashboard layout with clear sections for stream status, controls and real-time charts.

## Original User Request:
Claro! Para criar um painel de administração de transmissão ao vivo com RTMP, você precisará configurar tanto o frontend quanto o backend. Aqui está uma lista do que precisa ser criada, junto com as tecnologias recomendadas para cada parte. 1. Backend: O backend é responsável por gerenciar as atualizações, gerar e validar chaves RTMP, monitorar o status das atualizações ao vivo, entre outras funcionalidades. Funcionalidades do Backend: Gerenciamento de RTMP: Gerar chave RTMP (exemplo: live_k1e2bm) Gerenciar configurações de transmissão (taxa de bits, FPS, resolução, etc.) Iniciar/Parar móvel: Controlar o status da transmissão. Monitoramento de transferência ao vivo: Gráficos em tempo real: Bitrate, FPS, latência, conexões simultâneas. Armazenamento de gravação: Salvar vídeos para download posterior. Segurança: Proteção com token: Gerar e verificar tokens para proteger o acesso à transmissão. Integração com Restreaming: Restream para YouTube, Twitch, etc.: Envie o stream para várias plataformas simultaneamente. Tecnologias para o Backend: Linguagem: Node.js (Express.js), Python (Django/Flask), Ruby (Rails), PHP (Laravel). Servidor de RTMP: NGINX RTMP, Wowza, Red5. Banco de Dados: SQL: PostgreSQL, MySQL (para dados estruturados como usuários, específicos, etc.). NoSQL: MongoDB (para dados menos estruturados). Armazenamento de Arquivos: Nuvem: Amazon S3, Google Cloud Storage (para gravação e vídeos). Servidor próprio: Usar servidores próprios de arquivos, como FTP ou servidores de mídia (ex: Plex). 2. Frontend: O frontend é uma interface de administração onde os administradores e streamers podem monitorar e controlar a transmissão ao vivo. Funcionalidades do Frontend: Visão Geral do Stream: Mostrar status da transmissão: online/offline, bitrate, FPS, latência, etc. Mostrar o link RTMP gerado e o link HLS. Mostre as informações das conexões simultâneas. Controles do Stream: Botão para iniciar/parar o stream. Gerar nova chave RTMP. Modo privado: Opcional para detalhes privados. Gráficos em Tempo Real: Mostra gráficos de taxa de bits, latência, FPS. Opções extras: Gravar transmissão automaticamente: Habilitar transmissão automática. Baixar gravação: Permitir que o usuário baixe a gravação após o término da transmissão. Restream: Configuração para envio a transmissão para outras plataformas, como YouTube, Twitch, etc. Tecnologias para o Frontend: Framework de JavaScript: React.js: Para uma UI dinâmica e interativa. Vue.js: Para um framework mais simples e fácil de configurar. Angular: Caso você precise de uma solução mais robusta. Gerenciamento de Estado: Redux (React): Para gerenciar o estado da aplicação, como status do stream. Vuex (Vue.js): Para gerenciar o estado da aplicação no Vue. Gráficos em Tempo Real: Chart.js: Para gráficos simples e rápidos. D3.js: Para gráficos mais avançados e personalizáveis.Plotly: Para gráficos interativos e mais avançados. Comunicação em Tempo Real: Socket.IO: Para comunicação em tempo real (para atualizar o frontend com status do stream sem precisar atualizar a página). 3. Integração de Transmissão de Vídeo (RTMP/HLS): Você precisará integrar o servidor de RTMP com a aplicação para gerar as chaves RTMP e permitir a reprodução de vídeo via HLS. Funcionalidades de RTMP/HLS: RTMP: Gerar uma chave RTMP para o streamer. Receba o vídeo do streamer e envie-o ao servidor. HLS (HTTP Live Streaming): Conversor de vídeo recebido para HLS para facilitar o streaming. Fornecer o link HLS para visualização pública ou privada. Tecnologias para RTMP/HLS: Servidor RTMP: NGINX Módulo RTMP: Para gerenciar o fluxo de RTMP e conversor para HLS. Wowza ou Red5: Para alternativas comerciais de servidores de RTMP. Player de Vídeo HLS: Video.js: Para exibir o vídeo HLS no frontend. JWPlayer: Para uma solução mais robusta, com suporte HLS integrado. 4. Segurança e Autenticação: Caso você precise garantir que apenas usuários autorizados possam acessar o painel de administrador ou visualizar as atualizações: Tecnologias de Segurança: JWT (JSON Web Tokens): Para autenticação de usuários. OAuth 2.0: É necessário permitir login via Google, Facebook, etc. Proteção de RTMP com token: Gerar tokens temporários que só permitem o acesso à chave RTMP por um determinado tempo ou com permissões específicas. 5. Outras Funcionalidades Adicionais: Se for necessário, você pode adicionar outras funcionalidades, como notificações, relatórios, ou integração com outras plataformas. Tecnologias Adicionais: Notificações em Tempo Real: Usar Push Notifications ou Socket.IO. API RESTful: Para permitir a integração com outras plataformas ou para criar um sistema de APIs que o frontend pode consumir. Agendamento de Transmissões: Para permitir que os streamers agendem suas especificidades para uma data e hora específicas. Resumo das Tecnologias: Componente Tecnologias Backend Node.js (Express), Python (Django/Flask), NGINX RTMP Frontend React.js, Vue.js, Angular, Chart.js, D3.js, Socket.IO RTMP/HLS Streaming NGINX RTMP, Video.js servidores próprios Banco de Dados MongoDBMódulo NGINX RTMP: Para gerenciar o fluxo de RTMP e conversor para HLS. Wowza ou Red5: Para alternativas comerciais de servidores de RTMP. Player de Vídeo HLS: Video.js: Para exibir o vídeo HLS no frontend. JWPlayer: Para uma solução mais robusta, com suporte HLS integrado. 4. Segurança e Autenticação: Caso você precise garantir que apenas usuários autorizados possam acessar o painel de administrador ou visualizar as atualizações: Tecnologias de Segurança: JWT (JSON Web Tokens): Para autenticação de usuários. OAuth 2.0: É necessário permitir login via Google, Facebook, etc. Proteção de RTMP com token: Gerar tokens temporários que só permitem o acesso à chave RTMP por um determinado tempo ou com permissões específicas. 5. Outras Funcionalidades Adicionais: Se for necessário, você pode adicionar outras funcionalidades, como notificações, relatórios, ou integração com outras plataformas. Tecnologias Adicionais: Notificações em Tempo Real: Usar Push Notifications ou Socket.IO. API RESTful: Para permitir a integração com outras plataformas ou para criar um sistema de APIs que o frontend pode consumir. Agendamento de Transmissões: Para permitir que os streamers agendem suas especificidades para uma data e hora específicas. Resumo das Tecnologias: Componente Tecnologias Backend Node.js (Express), Python (Django/Flask), NGINX RTMP Frontend React.js, Vue.js, Angular, Chart.js, D3.js, Socket.IO RTMP/HLS Streaming NGINX RTMP, Video.js servidores próprios Banco de Dados MongoDBMódulo NGINX RTMP: Para gerenciar o fluxo de RTMP e conversor para HLS. Wowza ou Red5: Para alternativas comerciais de servidores de RTMP. Player de Vídeo HLS: Video.js: Para exibir o vídeo HLS no frontend. JWPlayer: Para uma solução mais robusta, com suporte HLS integrado. 4. Segurança e Autenticação: Caso você precise garantir que apenas usuários autorizados possam acessar o painel de administrador ou visualizar as atualizações: Tecnologias de Segurança: JWT (JSON Web Tokens): Para autenticação de usuários. OAuth 2.0: É necessário permitir login via Google, Facebook, etc. Proteção de RTMP com token: Gerar tokens temporários que só permitem o acesso à chave RTMP por um determinado tempo ou com permissões específicas. 5. Outras Funcionalidades Adicionais: Se for necessário, você pode adicionar outras funcionalidades, como notificações, relatórios, ou integração com outras plataformas. Tecnologias Adicionais: Notificações em Tempo Real: Usar Push Notifications ou Socket.IO. API RESTful: Para permitir a integração com outras plataformas ou para criar um sistema de APIs que o frontend pode consumir. Agendamento de Transmissões: Para permitir que os streamers agendem suas especificidades para uma data e hora específicas. Resumo das Tecnologias: Componente Tecnologias Backend Node.js (Express), Python (Django/Flask), NGINX RTMP Frontend React.js, Vue.js, Angular, Chart.js, D3.js, Socket.IO RTMP/HLS Streaming NGINX RTMP, Video.js servidores próprios Banco de Dados MongoDBIO RTMP/HLS Streaming NGINX RTMP, Video.js servidores próprios Banco de Dados MongoDBIO RTMP/HLS Streaming NGINX RTMP, Video.js servidores próprios Banco de Dados MongoDB    Estrutura Completa de um App de Live Streaming SEM TERCEIROS
🔹 1. FUNCIONALIDADES
Transmitir vídeo em tempo real (RTMP → HLS)

Reproduzir live no app

Gravar transmissões

Gerenciar usuários (login/token)

Mostrar cards com status da transmissão

API interna para controle de tudo

🧰 2. TECNOLOGIAS (100% AUTÔNOMAS)

Componente	Tecnologia
Frontend	React + TailwindCSS
Backend	Node.js (Express)
Banco	MongoDB local
Servidor RTMP	NGINX + nginx-rtmp
Player HLS	HLS.js ou Video.js
Socket	Socket.IO (puro)
Gravação	NGINX salva no disco
Autenticação	JWT (gerado por você)
⚙️ 3. CONFIGURAÇÃO DO RTMP (NGINX)
✅ Instalação:
bash
Copiar
Editar
sudo apt install nginx libnginx-mod-rtmp
✅ /etc/nginx/nginx.conf:
nginx
Copiar
Editar
rtmp {
    server {
        listen 1935;
        chunk_size 4096;

        application live {
            live on;
            record all;
            record_path /var/www/streams;
            record_unique on;

            on_publish http://localhost:3000/live/publish;
            on_done http://localhost:3000/live/end;
        }
    }
}

http {
    server {
        listen 8080;

        location /hls {
            types {
                application/vnd.apple.mpegurl m3u8;
                video/mp2t ts;
            }
            root /var/www/;
            add_header Cache-Control no-cache;
        }
    }
}
🧩 4. BACKEND (Express + MongoDB + JWT)
Rotas que você cria:


Rota	Função
POST /auth/login	Login local (sem terceiros)
GET /user/key	Gerar chave RTMP
GET /stream/status	Status da transmissão
GET /stream/list	Lista de gravações
POST /stream/start	Começou a transmissão (callback)
POST /stream/stop	Terminou a transmissão
🧠 5. COMO OS CARDS SERÃO CRIADOS (React + Tailwind)
Exemplo de card de status:
jsx
Copiar
Editar
<Card className="bg-white rounded-2xl shadow p-4">
  <h2 className="text-lg font-semibold">Status da Live</h2>
  <p>Status: <span className="text-green-600">Online</span></p>
  <p>Bitrate: 3200 kbps</p>
  <p>FPS: 30</p>
</Card>
Exemplo de player com HLS.js:
html
Copiar
Editar
<video id="video" controls autoplay></video>
<script src="https://cdn.jsdelivr.net/npm/hls.js"></script>
<script>
  const video = document.getElementById('video');
  const hls = new Hls();
  hls.loadSource('http://localhost:8080/hls/stream.m3u8');
  hls.attachMedia(video);
</script>
Você pode hospedar o .js local se quiser evitar CDN.

🔁 6. FLUXO DA LIVE (SEM TERCEIROS)
Usuário faz login no seu backend

Backend gera chave RTMP local: rtmp://seu_ip/live/<chave>

OBS transmite para seu NGINX local

NGINX envia callbacks para seu backend (/publish, /end)

NGINX salva os vídeos gravados (/var/www/streams)

Frontend mostra status, vídeo ao vivo e gravações direto do seu servidor

🗃️ 7. GRAVAÇÕES
Gravações ficam em: /var/www/streams

Listar no frontend usando API do seu backend
  