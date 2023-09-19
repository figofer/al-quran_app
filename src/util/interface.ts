

interface Surah {
    suratSelanjutnya: any;

    id: number;
    code: number;
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    ayat: {
        length(length: any): unknown;
        nomorAyat: number;
        teksArab: string;
        teksLatin: string;
        teksIndonesia: string;

    }
    message: string;
    data: {
        nomor: number;
        nama: string;
        namaLatin: string;
        jumlahAyat: number;
        tempatTurun: string;
        arti: string;
        deskripsi: string;
        audioFull: {
            [key: string]: string;
        };
        ayat: {
            nomorAyat: number;
            teksArab: string;
            teksLatin: string;
            teksIndonesia: string;
            audio: {
                [key: string]: string;
            };
        }[];
        suratSelanjutnya: {
            nomor: number;
            nama: string;
            namaLatin: string;
            jumlahAyat: number;
        };
        suratSebelumnya: {
            nomor: number;
            nama: string;
            namaLatin: string;
            jumlahAyat: number;
        };
    };
}






export type { Surah };
