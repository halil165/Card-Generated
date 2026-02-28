export interface CardData {
    type: 'NRG' | 'NUPTK';
    name: string;
    nrgNumber: string;
    nuptkNumber: string;
    nip: string;
    graduationYear: string;
    photoUrl: string | null;
    birthPlace: string;
    birthDate: string;
    subject: string;
}
