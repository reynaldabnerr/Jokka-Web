import React from "react";
import { Search, User } from "lucide-react";
import 'tailwindcss/tailwind.css';

const HomePage = () => {
  const categories = [
    { id: 1, name: "Tempat Bersejarah" },
    { id: 2, name: "Wisata Alam" },
    { id: 3, name: "Pantai" },
    { id: 4, name: "Wisata Religius" },
  ];

  const popularPlaces = [
    { id: 1, name: "Benteng Rotterdam", image: "https://via.placeholder.com/400x300" },
    { id: 2, name: "Pulau Samalona", image: "https://via.placeholder.com/400x300" },
    {
      id: 3,
      name: "Center Point Indonesia",
      image: "https://via.placeholder.com/400x300",
    },
    { id: 4, name: "Masjid 99 Kubah CPI", image: "https://via.placeholder.com/400x300" },
    {
      id: 5,
      name: "Kampung Karet Rammang Rammang",
      image: "https://via.placeholder.com/400x300",
    },
    { id: 6, name: "Pulau Samalona", image: "https://via.placeholder.com/400x300" },
  ];

  const popularFood = [
    { id: 1, name: "Coto Makassar", image: "https://via.placeholder.com/400x300" },
    { id: 2, name: "Pallu Basa", image: "https://via.placeholder.com/400x300" },
    { id: 3, name: "Sop Konro", image: "https://via.placeholder.com/400x300" },
    { id: 4, name: "Pisang Epe", image: "https://via.placeholder.com/400x300" },
    { id: 5, name: "Pisang Ijjou", image: "https://via.placeholder.com/400x300" },
    { id: 6, name: "Ikan Bakar Parape", image: "https://via.placeholder.com/400x300" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     

      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src="https://via.placeholder.com/1920x600"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full ${
                category.id === 1 ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Places */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Tempat Populer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{place.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Food */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Kuliner Populer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularFood.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{food.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download App Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">
              Dapatkan Aplikasi Jokka App
            </h2>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                Mudah Merencanakan Perjalanan
              </div>
              <div className="flex items-center">
                <span className="mr-2">✓</span>
                Akses Dimanapun
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/200x200"
              alt="QR Code"
              className="w-32 h-32"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-2">
              <li>Layanan Pelanggan</li>
              <li>Jaminan Layanan</li>
              <li>Info Layanan Lainnya</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Tentang Kami</h3>
            <ul className="space-y-2">
              <li>Tentang Jokka App</li>
              <li>Berita</li>
              <li>Karier</li>
              <li>Syarat dan Ketentuan</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Layanan Lain</h3>
            <ul className="space-y-2">
              <li>Hubungan Investor</li>
              <li>Reward Jokka-web</li>
              <li>Program Lainnya</li>
              <li>Keamanan</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t text-center text-sm text-gray-500">
          Hak Cipta ©2024 Jokka Web Tugas Pemrograman
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
