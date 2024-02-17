# Verwenden Sie node:16-alpine für ein kleineres Image
FROM node:20-alpine

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

COPY package*.json ./
RUN npm install
# Optional: Erzwingen Sie das Neukompilieren von nativen Modulen
RUN npm rebuild


COPY . .

# Für Produktion:
CMD ["node", "index.js"]
