import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Loader2 } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';
import DeploymentGuide from './components/DeploymentGuide';

interface CardData {
  type: 'NRG' | 'NUPTK';
  name: string;
  number: string;
  nip: string;
  school: string;
  photoUrl: string | null;
  birthPlace: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
}

function App() {
  const [data, setData] = useState<CardData>({
    type: 'NRG',
    name: '',
    number: '',
    nip: '',
    school: '',
    photoUrl: null,
    birthPlace: '',
    birthDate: '',
    gender: 'Laki-laki',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      // Wait for images to load if any
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.6, 53.98], // Credit card size
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save(`Kartu-${data.type}-${data.name || 'Guru'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Gagal mengunduh kartu. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-medium">Panduan:</p>
              <ul className="list-disc list-inside mt-1 space-y-1 text-blue-700/80">
                <li>Isi data diri dengan lengkap dan benar.</li>
                <li>Upload foto resmi (latar merah/biru disarankan).</li>
                <li>Periksa pratinjau kartu di sebelah kanan.</li>
                <li>Klik tombol "Unduh PDF" untuk menyimpan.</li>
              </ul>
            </div>
            <CardForm data={data} onChange={setData} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Rekomendasi Tech Stack</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong className="text-gray-900">Frontend:</strong> React + Vite + Tailwind CSS. 
                  Kombinasi ini memberikan performa tinggi, pengembangan cepat, dan UI yang mudah disesuaikan.
                </p>
                <p>
                  <strong className="text-gray-900">Backend:</strong> Untuk aplikasi generator seperti ini, 
                  <strong>Client-Side Processing</strong> (tanpa backend) adalah pilihan terbaik untuk privasi data. 
                  Jika butuh penyimpanan data, disarankan menggunakan <strong>Node.js (Express) + PostgreSQL/MySQL</strong>.
                </p>
              </div>
            </div>
            
            <DeploymentGuide />
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 w-full text-left flex items-center gap-2">
                  <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                  Pratinjau Kartu
                </h2>
                
                <div className="transform scale-90 sm:scale-100 transition-transform duration-300">
                  <CardPreview ref={cardRef} data={data} />
                </div>

                <div className="mt-8 flex justify-center w-full">
                  <button
                    onClick={handleDownload}
                    disabled={isGenerating || !data.name || !data.number}
                    className={`
                      flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white shadow-lg transition-all transform hover:-translate-y-0.5
                      ${isGenerating || !data.name || !data.number
                        ? 'bg-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 active:scale-95'
                      }
                    `}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Memproses...
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        Unduh PDF
                      </>
                    )}
                  </button>
                </div>
                {!data.name && (
                  <p className="text-xs text-gray-400 mt-2">
                    Lengkapi nama dan nomor untuk mengunduh
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
