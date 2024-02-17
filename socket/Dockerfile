# Verwenden Sie node:16-alpine für ein kleineres Image
FROM node:20-alpine

# Arbeitsverzeichnis im Container setzen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY package*.json ./
RUN npm install --production # Installieren Sie nur Produktionsabhängigkeiten


COPY . .

# Für Produktion:
CMD ["node", "index.js"]
