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
# --- ESTA É A LINHA CORRIGIDA ---
RUN apk add --no-cache python3 py3-pip && pip3 install yt-dlp --break-system-packages
# ---------------------------------

# Copia as dependências de produção
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Copia os arquivos da aplicação compilados
COPY --from=builder /app/dist ./dist

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]