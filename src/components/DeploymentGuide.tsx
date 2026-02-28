import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Github, Globe, Terminal } from 'lucide-react';

export default function DeploymentGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="bg-black text-white p-1.5 rounded-lg">
            <svg viewBox="0 0 1155 1000" className="w-5 h-5" fill="currentColor">
              <path d="M577.344 0L1154.69 1000H0L577.344 0Z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Panduan Deploy ke Vercel</h3>
            <p className="text-xs text-gray-500">Gratis, Cepat, & Mudah (Step-by-Step)</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="text-gray-400" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
      </button>

      {isOpen && (
        <div className="p-6 space-y-6 border-t border-gray-200">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Github size={16} />
                Push Kode ke GitHub
              </h4>
              <p className="text-sm text-gray-600">
                Ada dua skenario: membuat repository baru atau memperbarui yang sudah ada.
              </p>

              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-semibold text-gray-500 mb-2">A. Untuk Proyek Baru (Setup Awal)</h5>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Inisialisasi Git di folder proyek Anda</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git init</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Tambahkan semua file untuk disimpan</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git add .</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Simpan perubahan dengan sebuah pesan</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git commit -m "Initial commit"</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Buat repo baru di GitHub, lalu hubungkan</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git remote add origin https://github.com/username/repo-name.git</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Kirim semua perubahan ke GitHub</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git push -u origin main</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-gray-500 mb-2">B. Memperbarui Proyek yang Sudah Ada</h5>
                  <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300 space-y-1">
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Tambahkan semua file yang sudah diubah</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git add .</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Simpan perubahan dengan pesan yang jelas</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git commit -m "Deskripsi perubahan, mis: Perbaiki footer"</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500"># Kirim perubahan ke GitHub</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-green-400">$</span>
                      <span>git push origin main</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Globe size={16} />
                Buka Dashboard Vercel
              </h4>
              <p className="text-sm text-gray-600">
                Kunjungi <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">vercel.com</a> dan login menggunakan akun GitHub Anda.
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 ml-1">
                <li>Klik tombol <strong>"Add New..."</strong> &rarr; <strong>"Project"</strong>.</li>
                <li>Pilih repository GitHub yang baru saja Anda buat.</li>
                <li>Klik <strong>"Import"</strong>.</li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Terminal size={16} />
                Konfigurasi & Deploy
              </h4>
              <p className="text-sm text-gray-600">
                Vercel biasanya otomatis mendeteksi settingan Vite. Pastikan:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Framework Preset:</span>
                  <span className="font-medium text-gray-900">Vite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Build Command:</span>
                  <span className="font-medium text-gray-900 font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">npm run build</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Output Directory:</span>
                  <span className="font-medium text-gray-900 font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">dist</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Terakhir, klik tombol <strong>"Deploy"</strong> dan tunggu hingga selesai (biasanya &lt; 1 menit).
              </p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-sm text-green-800">
            <strong>Selesai! 🎉</strong> Aplikasi Anda sekarang sudah online dan bisa diakses oleh siapa saja melalui URL yang diberikan Vercel (contoh: <code>nama-project.vercel.app</code>).
          </div>
        </div>
      )}
    </div>
  );
}
