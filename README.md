
# API de Transcrição de Áudio do YouTube

API leve e containerizada que recebe um link de um vídeo do YouTube, extrai o áudio e retorna a transcrição completa utilizando o modelo Whisper da OpenAI.

## 📜 Tabela de Conteúdos

  - [Visão Geral](https://www.google.com/search?q=%23-vis%C3%A3o-geral)
  - [Arquitetura](https://www.google.com/search?q=%23-arquitetura)
  - [Tecnologias Utilizadas](https://www.google.com/search?q=%23-tecnologias-utilizadas)
  - [Pré-requisitos](https://www.google.com/search?q=%23-pr%C3%A9-requisitos)
  - [Instalação e Execução](https://www.google.com/search?q=%23-instala%C3%A7%C3%A3o-e-execu%C3%A7%C3%A3o)
  - [Como Usar](https://www.google.com/search?q=%23-como-usar)
  - [Configuração](https://www.google.com/search?q=%23-configura%C3%A7%C3%A3o)
  - [Licença](https://www.google.com/search?q=%23-licen%C3%A7a)

## 🎯 Visão Geral

O objetivo deste projeto é fornecer um endpoint simples e eficiente para transcrever o conteúdo de vídeos. Ao invés de processar o vídeo ou o áudio localmente (o que consumiria muitos recursos), a API orquestra o processo:

1.  Recebe uma URL do YouTube.
2.  Usa o `yt-dlp` para baixar um stream de áudio em formato `.mp3`.
3.  Envia este áudio para a API da OpenAI.
4.  Retorna a transcrição em texto para o cliente.

Toda a aplicação roda dentro de um contêiner Docker, garantindo um ambiente de execução consistente e de fácil configuração.

## 🏗️ Arquitetura

O fluxo de dados da aplicação é o seguinte:

> `Cliente` → `POST /transcription` → `API NestJS` → `yt-dlp (download do áudio)` → `API da OpenAI (Whisper)` → `Retorno JSON` → `Cliente`

## 🛠️ Tecnologias Utilizadas

  - **Backend:** [NestJS](https://nestjs.com/)
  - **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
  - **Containerização:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
  - **Download de Mídia:** [yt-dlp](https://github.com/yt-dlp/yt-dlp) (através do wrapper `yt-dlp-wrap`)
  - **Transcrição:** [API da OpenAI (Modelo Whisper)](https://platform.openai.com/docs/guides/speech-to-text)
  - **Requisições HTTP:** [Axios](https://axios-http.com/)

## ✅ Pré-requisitos

Antes de começar, certifique-se de que você tem os seguintes softwares instalados em sua máquina:

  - [Docker](https://www.docker.com/get-started/) e Docker Compose
  - [Node.js](https://nodejs.org/en/) (v18 ou superior) - *Opcional, necessário apenas para desenvolvimento local fora do Docker.*
  - Uma **chave de API da OpenAI**. Você pode obter a sua no [painel da OpenAI](https://platform.openai.com/api-keys).

## ⚙️ Instalação e Execução

Siga os passos abaixo para rodar a aplicação localmente usando Docker.

**1. Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

**2. Crie o arquivo de variáveis de ambiente:**

Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o arquivo de exemplo:

```bash
cp .env.example .env
```

Se o arquivo `.env.example` não existir, crie o `.env` com o seguinte conteúdo:

```env
# .env
OPENAI_API_KEY=sua_chave_de_api_da_openai_aqui
```

**3. Adicione sua chave de API:**

Abra o arquivo `.env` que você acabou de criar e substitua `sua_chave_de_api_da_openai_aqui` pela sua chave real da API da OpenAI.

**4. Construa a imagem e inicie o contêiner:**

Este comando irá construir a imagem Docker (instalando todas as dependências do sistema e do Node.js) e iniciar a API.

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`.

## ▶️ Como Usar

Para usar a API, envie uma requisição `POST` para o endpoint `/transcription` com a URL do vídeo no corpo da requisição.

**Endpoint:** `POST /transcription`

**Corpo da Requisição (JSON):**

```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Exemplo com cURL:**

```bash
curl --location --request POST 'http://localhost:3000/transcription' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}'
```

**Resposta de Sucesso (`200 OK`):**

A API retornará um objeto JSON com o texto transcrito.

```json
{
  "text": "We're no strangers to love. You know the rules and so do I. A full commitment's what I'm thinking of. You wouldn't get this from any other guy..."
}
```

## 🔧 Configuração

A principal configuração da aplicação é feita através do arquivo `.env`:

  - `OPENAI_API_KEY`: **(Obrigatório)** Sua chave secreta para autenticação na API da OpenAI.

## 📄 Licença

Distribuído sob a Licença MIT. Veja o arquivo `LICENSE` para mais informações.

-----

*Este README foi gerado em: 29 de Junho de 2025.*