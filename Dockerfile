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

# masukan .env ke dalam container
# ARG berfungsi untuk mendefinisikan variabel yang dapat diakses pada saat build image
ARG PORT
ARG BE_BASE_URL
ARG DATA_CLIENT_MIDTRANS

ENV PORT=$PORT
ENV BE_BASE_URL=$BE_BASE_URL
ENV DATA_CLIENT_MIDTRANS=$DATA_CLIENT_MIDTRANS

# Build aplikasi
RUN npm run build

# Expose port yang digunakan oleh aplikasi
EXPOSE $PORT

# Jalankan aplikasi
CMD ["npm", "run", "start"]
