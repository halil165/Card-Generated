import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { GraduationCap } from 'lucide-react';

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

interface CardPreviewProps {
  data: CardData;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ data }, ref) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const bgGradient = data.type === 'NRG' 
    ? 'from-[#2563eb] to-[#1e40af]' 
    : 'from-[#059669] to-[#065f46]';

  const headerTitle = data.type === 'NRG' 
    ? 'KARTU NOMOR REGISTRASI GURU' 
    : 'KARTU NUPTK';

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="relative group">
        {/* Card Container */}
        <div
          ref={ref}
          className="w-[350px] h-[220px] sm:w-[500px] sm:h-[315px] bg-[#ffffff] rounded-xl shadow-2xl overflow-hidden relative flex flex-col print:shadow-none"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {/* Header */}
          <div className={`h-14 sm:h-20 bg-gradient-to-r ${bgGradient} flex items-center px-2 sm:px-4 justify-between relative overflow-hidden shrink-0`}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            {/* Left Icon */}
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#ffffff]/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
              <GraduationCap className="text-[#ffffff] w-5 h-5 sm:w-8 sm:h-8" />
            </div>

            {/* Center Text */}
            <div className="text-[#ffffff] flex flex-col justify-center items-center flex-1 px-1 z-10 overflow-hidden">
              <h1 className="text-[8px] sm:text-[11px] font-bold opacity-95 tracking-wide whitespace-nowrap">KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH</h1>
              <h2 className="text-[11px] sm:text-[15px] font-extrabold leading-tight whitespace-nowrap mt-0.5 tracking-tight">{headerTitle}</h2>
            </div>

            {/* Right Logo */}
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-[#ffffff]/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg/800px-Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg.png" 
                 alt="Logo" 
                 className="w-6 h-6 sm:w-9 sm:h-9 object-contain"
                 crossOrigin="anonymous"
               />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-3 py-2 sm:p-5 flex gap-3 sm:gap-5 relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] pointer-events-none"></div>

            {/* Photo Area */}
            <div className="w-20 sm:w-32 flex flex-col gap-2 z-10 shrink-0 justify-center sm:justify-start">
              <div className="w-20 h-24 sm:w-32 sm:h-40 bg-[#f3f4f6] border-2 border-[#e5e7eb] rounded-lg overflow-hidden shadow-inner relative">
                {data.photoUrl ? (
                  <img src={data.photoUrl} alt="Foto" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#f9fafb] text-[#d1d5db]">
                    <span className="text-[9px] sm:text-xs text-center px-1">Foto 3x4</span>
                  </div>
                )}
              </div>
            </div>

            {/* Details Area */}
            <div className="flex-1 flex flex-col z-10 min-w-0 h-full">
              <div className="flex flex-col gap-0.5 sm:gap-1.5">
                {/* Name */}
                <div className="border-b border-[#f3f4f6] pb-0.5">
                  <p className="text-[6px] sm:text-[9px] text-[#6b7280] uppercase tracking-wider font-semibold">Nama Lengkap</p>
                  <p className="text-[9px] sm:text-sm font-bold text-[#111827] truncate uppercase leading-tight">{data.name || '-'}</p>
                </div>
                
                {/* Number & NIP */}
                <div className="grid grid-cols-2 gap-2 border-b border-[#f3f4f6] pb-0.5">
                  <div>
                    <p className="text-[6px] sm:text-[9px] text-[#6b7280] uppercase tracking-wider font-semibold">Nomor {data.type}</p>
                    <p className="text-[9px] sm:text-sm font-bold text-[#111827] font-mono truncate leading-tight">{data.number || '-'}</p>
                  </div>
                  {data.nip && (
                    <div>
                      <p className="text-[6px] sm:text-[9px] text-[#6b7280] uppercase tracking-wider font-semibold">NIP</p>
                      <p className="text-[9px] sm:text-sm font-bold text-[#111827] font-mono truncate leading-tight">{data.nip}</p>
                    </div>
                  )}
                </div>

                {/* TTL & Gender */}
                <div className="grid grid-cols-2 gap-2 border-b border-[#f3f4f6] pb-0.5">
                  <div className="col-span-1">
                    <p className="text-[6px] sm:text-[9px] text-[#6b7280] uppercase tracking-wider font-semibold">Tempat, Tgl Lahir</p>
                    <p className="text-[8px] sm:text-[13px] font-medium text-[#111827] truncate leading-tight">
                      {data.birthPlace || '-'}, {data.birthDate ? formatDate(data.birthDate) : '-'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[6px] sm:text-[9px] text-[#6b7280] uppercase tracking-wider font-semibold">Jenis Kelamin</p>
                    <p className="text-[8px] sm:text-[13px] font-medium text-[#111827] truncate leading-tight">{data.gender || '-'}</p>
                  </div>
                </div>

                {/* School */}
                <div>
                  <p className="text-[6px] sm:text-[9px] text-[#6b7280] uppercase tracking-wider font-semibold">Unit Kerja</p>
                  <p className="text-[8px] sm:text-[13px] font-medium text-[#111827] line-clamp-2 leading-tight">{data.school || '-'}</p>
                </div>
              </div>

              {/* Footer / QR */}
              <div className="flex justify-between items-end mt-auto pt-1 pb-1">
                <div className="flex flex-col justify-end">
                  <p className="text-[5px] sm:text-[9px] text-[#9ca3af] italic leading-tight">
                    *Dokumen ini sah dan diterbitkan secara digital.
                  </p>
                  <p className="text-[5px] sm:text-[9px] text-[#9ca3af] italic leading-tight">
                    Scan QR Code untuk validasi data.
                  </p>
                </div>
                <div className="bg-[#ffffff] p-0.5 sm:p-1 rounded border border-[#f3f4f6] shadow-sm shrink-0 mb-0.5">
                  <QRCodeSVG 
                    value={`NRG/NUPTK:${data.number}|NAMA:${data.name}|SEKOLAH:${data.school}`} 
                    size={48} 
                    level="M"
                    className="w-8 h-8 sm:w-12 sm:h-12"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className={`h-2 bg-gradient-to-r ${bgGradient} shrink-0`}></div>
        </div>
      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview';

export default CardPreview;
