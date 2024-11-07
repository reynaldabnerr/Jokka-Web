import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../component/Eventcard";
import "tailwindcss/tailwind.css";

const LandingPage = () => {
  const events = [
    {
      title: "Jokka Market",
      date: "22-26 FEBRUARI 2023",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "JogjaInErlanga",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Makassar untuk Palestina",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Event Trending Section */}
      <section className="px-4 py-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Event Trending</h2>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto">
            {events.map((event, index) => (
              <Card key={index} className="min-w-[300px] bg-white">
                <CardContent className="p-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Jelajahi Event Section */}
      <section className="px-4 py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Jelajahi Event Luar Biasa</h2>
          <p className="text-gray-600 mb-8">
            Makassar menyelenggarakan berbagai festival tahunan yang memadukan
            budaya, kuliner, dan seni, menjadikannya destinasi menarik bagi
            wisatawan lokal dan internasional.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[200px] object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/600x400"
              alt="City View"
              className="rounded-lg w-full h-[300px] object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              Dapatkan Aplikasi Jokka App
            </h2>
            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Mudah Merencanakan Perjalanan</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Akses Dimanapun</span>
              </div>
            </div>
            <div className="flex gap-4 items-center mb-8">
              <div>
                <p className="text-sm">Mengenai</p>
                <p className="font-bold">Indonesia</p>
                <p className="text-sm">Emas 2045</p>
              </div>
              <div>
                <p className="text-sm">Memenuhi</p>
                <p className="font-bold">Poin-Poin</p>
                <p className="text-sm">SDG</p>
              </div>
            </div>
            <img
              src="https://via.placeholder.com/200"
              alt="QR Code"
              className="w-32 h-32"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-2">
              <li>Layanan Pelanggan</li>
              <li>Jaminan Layanan</li>
              <li>Info Layanan lainnya</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Tentang Kami</h3>
            <ul className="space-y-2">
              <li>Tentang Jokka App</li>
              <li>Berita</li>
              <li>Karier</li>
              <li>Syarat dan Ketentuan</li>
              <li>Pernyataan Privasi</li>
              <li>Informasi Lanjutan</li>
              <li>Tentang Developer</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Layanan Lain</h3>
            <ul className="space-y-2">
              <li>Hubungan Investor</li>
              <li>Reward Jokka-Web</li>
              <li>Program lainnya</li>
              <li>Keamanan</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600 mt-8">
          Hak Cipta ©2024 Jokka-Web Tugas Pemrograman Web Kelas C
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
