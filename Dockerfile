# Estágio de Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio de Produção - Imagem final e leve
FROM node:18-alpine
WORKDIR /app

# RUN npm i yt-dlp-wrap
RUN apk add --no-cache python3 py3-pip && pip3 install yt-dlp --break-system-packages

# Copia as dependências de produção
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Copia os arquivos da aplicação compilados
COPY --from=builder /app/dist ./dist

# Expõe a porta que a aplicação vai rodar
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]

# # Estágio de Build
# FROM node:18-alpine AS builder
# WORKDIR /app

# # 1. Instala o 'curl' para podermos baixar arquivos
# RUN apk add --no-cache curl

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # 2. Baixa e prepara o yt-dlp AQUI, durante o build
# RUN mkdir -p /app/temp && \
#     curl -L https://github.com/yt-dlp/yt-dlp-nightly-builds/releases/latest/download/yt-dlp -o /app/temp/yt-dlp-nightly && \
#     chmod +x /app/temp/yt-dlp-nightly


# # Estágio de Produção - Imagem final e leve
# FROM node:18-alpine
# WORKDIR /app

# # 3. Só precisamos do python3 para EXECUTAR o yt-dlp
# RUN apk add --no-cache python3

# COPY --from=builder /app/package*.json ./
# RUN npm install --only=production

# COPY --from=builder /app/dist ./dist

# # 4. Copia o diretório 'temp' com o yt-dlp já baixado e pronto para uso
# COPY --from=builder /app/temp ./temp

# EXPOSE 8000

# CMD ["node", "dist/main"]