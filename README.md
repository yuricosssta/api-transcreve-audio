# API de Transcrição e Resumo de Áudio do YouTube

API containerizada que recebe um link de vídeo do YouTube, extrai o áudio, retorna a transcrição completa utilizando o modelo Whisper da OpenAI e permite gerar um resumo didático em Markdown com GPT-4o.

---

## 📜 Tabela de Conteúdos

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Como Usar](#como-usar)
- [Configuração](#configuração)
- [Licença](#licença)

---

## 🎯 Visão Geral

Esta API oferece endpoints para:
- Transcrever o conteúdo de vídeos do YouTube usando Whisper (OpenAI).
- Gerar um resumo didático e organizado em Markdown, adequado para jovens de 14 a 18 anos, usando GPT-4o.

O processo é totalmente automatizado:
1. Recebe uma URL do YouTube.
2. Usa o `yt-dlp` para baixar o áudio em formato `.mp3`.
3. Envia o áudio para a API da OpenAI (Whisper).
4. Retorna a transcrição em texto para o cliente.
5. (Opcional) Envia a transcrição para o endpoint de resumo, que retorna o material didático em Markdown.

A aplicação roda em contêiner Docker, garantindo ambiente consistente e fácil configuração.

---

## 🏗️ Arquitetura

Fluxo de dados:

```
Cliente → POST /transcription → API NestJS → yt-dlp (download do áudio) → OpenAI Whisper → Retorno JSON → Cliente
Cliente → POST /summary/text → API NestJS → OpenAI GPT-4.1 → Retorno Markdown → Cliente
```

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** [NestJS](https://nestjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Containerização:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Download de Mídia:** [yt-dlp](https://github.com/yt-dlp/yt-dlp) (via [yt-dlp-wrap](https://www.npmjs.com/package/yt-dlp-wrap))
- **Transcrição:** [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- **Resumo:** [OpenAI GPT-4.1](https://platform.openai.com/docs/overview)
- **Requisições HTTP:** [Axios](https://axios-http.com/)

---

## ✅ Pré-requisitos

- [Docker](https://www.docker.com/get-started/) e Docker Compose
- [Node.js](https://nodejs.org/en/) (opcional, apenas para desenvolvimento local)
- **Chave de API da OpenAI** (obtenha em [platform.openai.com/api-keys](https://platform.openai.com/api-keys))

---

## ⚙️ Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/yuricosssta/api-transcreve-audio.git
   cd api-transcreve-audio
   ```

2. **Crie o arquivo `.env`:**
   ```bash
   cp .env.example .env
   ```
   Ou crie manualmente:
   ```
   OPENAI_API_KEY=sua_chave_de_api_da_openai_aqui
   ```

3. **Construa e inicie o contêiner:**
   ```bash
   docker-compose up --build
   ```
   A API estará disponível em `http://localhost:3000`.

---

## ▶️ Como Usar

### 1. Transcrição de vídeo do YouTube

**Endpoint:** `POST /transcription`

**Body (JSON):**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Resposta:**
```json
{
  "text": "Transcrição completa do áudio..."
}
```

---

### 2. Resumo didático em Markdown

**Endpoint:** `POST /summary/text`

**Body (JSON):**
```json
{
  "text": "Transcrição completa do áudio..."
}
```

**Resposta:**
```markdown
# Resumo
...
## Tópico 1
...
```

---

## 🔧 Configuração

- `.env`:  
  - `OPENAI_API_KEY` — sua chave da OpenAI (obrigatório)

---

## 📄 Licença

Distribuído sob a Licença MIT.

---

> Desenvolvido para fins educacionais.