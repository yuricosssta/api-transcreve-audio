# API Transcreve Áudio

API RESTful para transcrição de áudio/vídeo do YouTube para texto, construída com [NestJS](https://nestjs.com/) e integração com [whisper.cpp](https://github.com/ggerganov/whisper.cpp).

---

## 🚀 Como rodar

### 1. Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- (Opcional) [Node.js](https://nodejs.org/) para rodar localmente sem Docker

### 2. Suba os serviços com Docker Compose

```bash
docker-compose build
docker-compose up
```

A API estará disponível em: http://localhost:3000
O serviço whisper.cpp será usado automaticamente para transcrição.

### 3. Rodando localmente (sem Docker)

```bash
cd server
npm install
npm run start:dev
```

Atenção: Para transcrição funcionar, o serviço whisper precisa estar disponível e o diretório uploads/ deve existir na raiz do projeto.

📦 Endpoints principais

Transcrição do YouTube
POST /transcribe/youtube
Recebe uma URL de vídeo do YouTube e retorna a transcrição em texto.

Exemplo de requisição:
```bash
{
  "youtubeUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX"
}
```

Resposta:
```bash
{
  "transcription": "Texto transcrito do áudio/vídeo..."
}
```

🛠️ Tecnologias
NestJS
whisper.cpp
ytdl-core
Docker

📝 Observações
O serviço faz download do áudio do YouTube, executa a transcrição via whisper.cpp em container separado e retorna o texto.
Os arquivos de áudio e texto são salvos na pasta uploads/.
O endpoint /transcribe/youtube pode demorar dependendo do tamanho do vídeo.

📄 Licença
MIT

Desenvolvido para fins educacionais.