

# Jokka Web

Jokka Web adalah sebuah aplikasi web yang dirancang untuk memberikan informasi tentang event, destinasi wisata, makanan, dan kegiatan menarik lainnya yang ada di Kota Makassar. Proyek ini dibangun menggunakan **Ionic** dan **Firebase** sebagai backend untuk otentikasi dan penyimpanan data. Website ini juga memiliki fitur akses khusus untuk admin.

## Fitur

- **Halaman Utama**: Informasi umum dan sambutan kepada pengguna.
- **Navigasi**: Menu yang terdiri dari Home, Event, Destination, Food, dan About Us.
- **Halaman Event**: Menampilkan daftar event yang berlangsung.
- **Halaman Destination**: Menyediakan informasi tentang tempat wisata populer.
- **Halaman Food**: Rekomendasi makanan khas.
- **Role Admin**: Admin memiliki akses ke halaman dashboard untuk mengelola data konten.
- **Login dan Signup**: Otentikasi pengguna menggunakan Firebase.
- **Responsif**: Mendukung tampilan di berbagai perangkat, termasuk perangkat seluler dengan menu hamburger.

## Teknologi yang Digunakan

- **Ionic Framework**: Membuat UI yang responsif dan ramah seluler.
- **Firebase**: Mengelola otentikasi, database, dan penyimpanan data.
- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **TypeScript**: Bahasa pemrograman yang menambahkan tipe statis ke JavaScript untuk pengembangan yang lebih andal.

## Instalasi

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

### Prasyarat

- **Node.js** versi 12 atau lebih baru
- **Ionic CLI** versi terbaru:  
  ```bash
  npm install -g @ionic/cli
  ```

### Langkah-Langkah Instalasi

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/reynaldabnerr/Jokka-Web.git
   cd Jokka-Web
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Firebase**:
   - Buat proyek Firebase di [Firebase Console](https://firebase.google.com/).
   - Salin konfigurasi Firebase dan tempelkan ke dalam file `firebaseConfig.js`.
   - Aktifkan fitur **Authentication** dan **Firestore** di Firebase Console.

4. **Jalankan Aplikasi**:
   ```bash
   ionic serve
   ```

   Buka di browser Anda di `http://localhost:8100`.

## Struktur Proyek

- **src/components**: Komponen UI yang digunakan di seluruh halaman.
- **src/pages**: Halaman utama aplikasi, seperti Home, Event, Destination, Food, About Us, dan Admin Dashboard.
- **src/firebaseConfig.js**: Konfigurasi Firebase untuk otentikasi dan database.
- **src/NavBar.tsx**: Komponen navigasi utama yang menampilkan menu.

## Penggunaan

- **Login dan Signup**: Pengguna dapat membuat akun dan login untuk mengakses informasi lebih lanjut.
- **Akses Admin**: Login dengan akun admin memberikan akses ke halaman dashboard.


## Kontak

Untuk pertanyaan atau saran, hubungi Reynald Abner Tananda di reynald030685@gmail.com atau kunjungi reynaldabnerr.