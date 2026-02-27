import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Image as ImageIcon, Loader2 } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import CardForm from './components/CardForm';
import CardPreview from './components/CardPreview';

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

  const handleExport = async (format: 'pdf' | 'jpg') => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      // Small delay to ensure QR code and images are fully rendered
      await new Promise((resolve) => setTimeout(resolve, 800));

      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (document) => {
          // Ensure the cloned element is visible and has correct sizing
          const element = document.getElementById('card-to-export');
          if (element) {
            element.style.transform = 'none';
          }
        }
      });

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png', 1.0);
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [85.6, 53.98], // Credit card size
        });

        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(`Kartu-${data.type}-${data.name || 'Guru'}.pdf`);
      } else {
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `Kartu-${data.type}-${data.name || 'Guru'}.jpg`;
        link.click();
      }
    } catch (error) {
      console.error('Error generating file:', error);
      alert('Gagal mengunduh kartu. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-16">
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
                <li>Klik tombol "Unduh PDF" atau "Unduh JPG".</li>
              </ul>
            </div>
            <CardForm data={data} onChange={setData} />

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                Keamanan Data
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Aplikasi ini berjalan sepenuhnya di browser Anda. Seluruh data dan foto diproses secara lokal dan **tidak pernah dikirim atau disimpan** di server mana pun. Privasi Anda adalah prioritas kami.
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[450px]">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 w-full text-left flex items-center gap-2">
                  <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                  Pratinjau Kartu
                </h2>

                <div className="transform scale-75 sm:scale-100 transition-transform duration-300 origin-center">
                  <CardPreview ref={cardRef} data={data} />
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                  <button
                    onClick={() => handleExport('pdf')}
                    disabled={isGenerating || !data.name || !data.number}
                    className={`
                      flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5
                      ${isGenerating || !data.name || !data.number
                        ? 'bg-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/30 active:scale-95'
                      }
                    `}
                  >
                    {isGenerating ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <Download size={20} />
                    )}
                    Unduh PDF
                  </button>

                  <button
                    onClick={() => handleExport('jpg')}
                    disabled={isGenerating || !data.name || !data.number}
                    className={`
                      flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5
                      ${isGenerating || !data.name || !data.number
                        ? 'bg-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-emerald-500/30 active:scale-95'
                      }
                    `}
                  >
                    {isGenerating ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <ImageIcon size={20} />
                    )}
                    Unduh JPG
                  </button>
                </div>
                {!data.name && (
                  <p className="text-xs text-gray-400 mt-4 italic">
                    *Lengkapi kartu untuk mengaktifkan tombol unduh
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
