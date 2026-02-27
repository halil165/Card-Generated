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
  subject: string;
}

interface CardPreviewProps {
  data: CardData;
}

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ data }, ref) => {
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
    ? { primary: '#2563eb', dark: '#1e40af', light: '#eff6ff' }
    : { primary: '#059669', dark: '#065f46', light: '#ecfdf5' };

  const headerTitle = data.type === 'NRG'
    ? 'KARTU NOMOR REGISTRASI GURU'
    : 'KARTU NUPTK';

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <div
          ref={ref}
          id="card-to-export"
          className="w-[500px] h-[315px] bg-white rounded-xl shadow-2xl overflow-hidden relative flex flex-col"
          style={{
            fontFamily: 'sans-serif',
            color: '#111827',
            background: '#ffffff',
            boxSizing: 'border-box'
          }}
        >
          {/* Header */}
          <div
            className="h-20 flex items-center px-4 justify-between relative"
            style={{ backgroundColor: colors.primary }}
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg/800px-Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg.png"
                alt="Logo"
                className="w-9 h-9 object-contain"
                crossOrigin="anonymous"
              />
            </div>

            <div className="flex flex-col justify-center items-center flex-1 px-2 z-10 text-center min-w-0">
              <h1 className="text-[11px] font-bold tracking-[0.05em] text-white opacity-95 m-0 leading-tight whitespace-nowrap">
                KEMENTERIAN PENDIDIKAN DASAR DAN MENENGAH
              </h1>
              <h2 className="text-[17px] font-black text-white m-0 leading-tight mt-1 tracking-tight uppercase whitespace-nowrap">
                {headerTitle}
              </h2>
            </div>

            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
              <GraduationCap style={{ color: '#ffffff' }} size={32} />
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 flex px-5 py-3 gap-5 relative bg-white">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] pointer-events-none"></div>

            {/* Photo */}
            <div className="w-32 flex flex-col z-10">
              <div className="w-32 h-40 bg-gray-100 border-2 border-gray-200 rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
                {data.photoUrl ? (
                  <img src={data.photoUrl} alt="Foto" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-xs font-bold">Foto 3x4</div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col z-10 justify-between min-w-0">
              <div className="space-y-1.5">
                <div>
                  <label className="text-[9px] text-gray-500 uppercase font-black block leading-none mb-1">Nama Lengkap</label>
                  <div className="text-sm font-bold uppercase truncate border-b border-gray-100 pb-1 leading-tight">{data.name || '-'}</div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 min-w-0">
                    <label className="text-[9px] text-gray-500 uppercase font-black block leading-none mb-1">Nomor {data.type}</label>
                    <div className="text-sm font-bold font-mono border-b border-gray-100 pb-1 truncate leading-tight">{data.number || '-'}</div>
                  </div>
                  {data.nip && (
                    <div className="flex-1 min-w-0">
                      <label className="text-[9px] text-gray-500 uppercase font-black block leading-none mb-1">NIP</label>
                      <div className="text-sm font-bold font-mono border-b border-gray-100 pb-1 truncate leading-tight">{data.nip}</div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black block leading-none mb-1">Tempat, Tgl Lahir</label>
                    <div className="text-[12px] font-bold truncate border-b border-gray-100 pb-1 leading-tight">
                      {data.birthPlace || '-'}, {data.birthDate ? formatDate(data.birthDate) : '-'}
                    </div>
                  </div>
                  <div className="w-24">
                    <label className="text-[9px] text-gray-500 uppercase font-black block leading-none mb-1">Gender</label>
                    <div className="text-[12px] font-bold truncate border-b border-gray-100 pb-1 leading-tight">{data.gender || '-'}</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[9px] text-gray-500 uppercase font-black block leading-none mb-1">Unit Kerja</label>
                    <div className="text-[12px] font-bold line-clamp-2 min-h-[32px] leading-snug pt-0.5">{data.school || '-'}</div>
                  </div>
                  <div className="w-24 text-left">
                    <label className="text-[9px] text-gray-500 uppercase font-black block leading-none mb-1">Guru Mapel</label>
                    <div className="text-[12px] font-bold truncate border-b border-gray-100 pb-1 leading-tight">{data.subject || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-end h-14">
                <div className="text-[#9ca3af] italic text-[8px] leading-tight space-y-0.5">
                  <p>*Dokumen ini sah dan diterbitkan secara digital.</p>
                  <p>Scan QR Code untuk validasi data.</p>
                </div>
                <div className="bg-white p-1 rounded border border-gray-200 shadow-sm shrink-0">
                  <QRCodeSVG
                    value={`NRG/NUPTK:${data.number}|NAMA:${data.name}|SEKOLAH:${data.school}`}
                    size={48}
                    level="H"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-2 w-full shrink-0" style={{ backgroundColor: colors.primary }}></div>
        </div>
      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview';

export default CardPreview;
