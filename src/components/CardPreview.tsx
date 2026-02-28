import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { GraduationCap } from 'lucide-react';


import { CardData } from '../types';


interface CardPreviewProps {
  data: CardData;
  logoUrl: string;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ data, logoUrl }, ref) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const colors = data.type === 'NRG'
    ? { primary: '#1d4ed8', dark: '#1e40af', light: '#eff6ff' } // More vibrant blue
    : { primary: '#047857', dark: '#065f46', light: '#ecfdf5' }; // More vibrant green

  const headerTitle = data.type === 'NRG'
    ? 'KARTU NOMOR REGISTRASI GURU'
    : 'KARTU NUPTK';

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Front Side */}
      <div className="relative">
        <div
          ref={ref}
          id="card-to-export"
          className="w-[500px] h-[315px] bg-white rounded-xl shadow-2xl relative flex flex-col border border-gray-100"
          style={{
            fontFamily: 'sans-serif',
            color: '#111827',
            background: '#ffffff',
            boxSizing: 'border-box'
          }}
        >


          {/* Header */}
          <div
            className="h-16 flex items-center px-4 justify-between relative shadow-md rounded-t-xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary} 100%)` }}
          >
            {/* Decorative elements for a modern look */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/3 -translate-y-1/3 blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 blur-lg"></div>

            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm z-10 shrink-0">
              <img
                src={logoUrl}
                alt="Logo"
                className="w-9 h-9 object-contain"
                crossOrigin="anonymous"
              />
            </div>

            <div className="flex flex-col justify-center items-center flex-1 px-2 z-10 text-center min-w-0">
              <h1 className="text-[10px] font-bold tracking-wider text-white/80 m-0 leading-tight whitespace-nowrap uppercase">
                KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
              </h1>
              <h2 className="text-base font-black text-white m-0 leading-tight mt-1 tracking-tight uppercase whitespace-nowrap">
                {headerTitle}
              </h2>
            </div>

            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
              <GraduationCap style={{ color: '#ffffff' }} size={32} />
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 flex px-6 py-4 gap-5 relative">
            {/* Photo */}
            <div className="w-32 flex flex-col z-10 shrink-0">
              <div className="w-32 h-40 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center relative">
                {data.photoUrl ? (
                  <img src={data.photoUrl} alt="Foto" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-xs font-bold text-center p-2">FOTO 3X4</div>
                )}
                <div className="absolute inset-0 border border-black/5 rounded-lg pointer-events-none"></div>
              </div>
            </div>

            {/* Details Section - Refactored with Flexbox for robustness */}
            <div className="flex-1 flex flex-col" style={{ fontFamily: 'Arial, sans-serif' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', flex: 1 }}>
                {/* Row: Nama */}
                <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '13px', fontWeight: 'bold', lineHeight: 1.4 }}>
                  <span style={{ width: '90px', color: '#374151', flexShrink: 0, fontSize: '11px' }}>NAMA</span>
                  <span style={{ width: '10px', color: '#374151', flexShrink: 0 }}>:</span>
                  <span style={{ color: '#1e3a8a', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.name || '-'}</span>
                </div>

                {/* Row: Nomor */}
                <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '13px', fontWeight: 'bold', lineHeight: 1.4 }}>
                  <span style={{ width: '90px', color: '#374151', flexShrink: 0, fontSize: '11px' }}>NOMOR {data.type}</span>
                  <span style={{ width: '10px', color: '#374151', flexShrink: 0 }}>:</span>
                  <span style={{ fontFamily: 'monospace', color: '#111827', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {data.type === 'NRG' ? data.nrgNumber : data.nuptkNumber || '-'}
                  </span>
                </div>

                {/* Row: NIP (Conditional) */}
                {data.nip && (
                  <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '13px', fontWeight: 'bold', lineHeight: 1.4 }}>
                    <span style={{ width: '90px', color: '#374151', flexShrink: 0, fontSize: '11px' }}>NIP</span>
                    <span style={{ width: '10px', color: '#374151', flexShrink: 0 }}>:</span>
                    <span style={{ fontFamily: 'monospace', color: '#111827', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.nip}</span>
                  </div>
                )}

                {/* Row: TTL */}
                <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '12px', fontWeight: 'bold', lineHeight: 1.4 }}>
                  <span style={{ width: '90px', color: '#374151', flexShrink: 0, fontSize: '11px' }}>TTL</span>
                  <span style={{ width: '10px', color: '#374151', flexShrink: 0 }}>:</span>
                  <span style={{ color: '#1f2937', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.birthPlace || '-'}/{data.birthDate ? formatDate(data.birthDate) : '-'}</span>
                </div>

                {/* Row: Bidang Studi */}
                <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '12px', fontWeight: 'bold', lineHeight: 1.4 }}>
                  <span style={{ width: '90px', color: '#374151', flexShrink: 0, fontSize: '11px' }}>BIDANG STUDI</span>
                  <span style={{ width: '10px', color: '#374151', flexShrink: 0 }}>:</span>
                  <span style={{ color: '#1f2937', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.subject || '-'}</span>
                </div>

                {/* Row: Tahun Lulus / No NRG */}
                <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '12px', fontWeight: 'bold', lineHeight: 1.4 }}>
                  <span style={{ width: '90px', color: '#374151', flexShrink: 0, fontSize: '11px' }}>{data.type === 'NRG' ? 'TAHUN LULUS' : 'NO NRG'}</span>
                  <span style={{ width: '10px', color: '#374151', flexShrink: 0 }}>:</span>
                  <span style={{ color: '#1f2937', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.type === 'NRG' ? (data.graduationYear || '-') : (data.nrgNumber || '-')}</span>
                </div>
              </div>

              {/* Bottom Instructions and QR (Always fixed at bottom) */}
              <div className="flex justify-between items-end mt-auto">
                <div className="text-gray-500 italic text-[7.5px] leading-tight space-y-px" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <p>* Kartu ini dibuat menggunakan aplikasi Card Generator.</p>
                  <p>* Bukan merupakan dokumen resmi dari pemerintah.</p>
                  <p className="font-bold not-italic text-gray-600 mt-1">Produksi Mandiri oleh Hayyan-Tec Production</p>
                </div>
                <div className="bg-white p-1 rounded-lg border border-gray-100 shadow-sm shrink-0">
                  <QRCodeSVG
                    value={`Type:${data.type}|No:${data.type === 'NRG' ? data.nrgNumber : data.nuptkNumber}|Nama:${data.name}`}
                    size={50}
                    level="H"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-2 w-full shrink-0 rounded-b-xl" style={{ backgroundColor: colors.primary }}></div>
        </div>
      </div>

    </div>
  );
});

CardPreview.displayName = 'CardPreview';

export default CardPreview;
