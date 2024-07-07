# Gunakan image resmi Node.js sebagai image dasar
FROM node:18.20.3-slim

# Atur direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi ke dalam container
COPY . .

# Build aplikasi
RUN npm run build

# Expose port yang digunakan oleh aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]
