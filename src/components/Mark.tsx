import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Surah } from '../util/interface';
import { Link } from 'react-router-dom';

const Marks = () => {
    const [markedAyat, setMarkedAyat] = useState<number | null>(null);
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const url = 'https://equran.id/api/v2/surat';

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await axios.get(url);
                setSurahs(response.data.data);
            } catch (error) {
                console.error('Error fetching surahs:', error);
            }
        };

        fetchSurahs();
    }, []);

    useEffect(() => {
        // Ambil data dari localStorage
        const storedMarkedAyat = localStorage.getItem('/surah/1');
        if (storedMarkedAyat) {
            setMarkedAyat(parseInt(storedMarkedAyat, 10));
        }
    }, []);

    return (
        <>
            <div className='flex justify-center items-center my-2'>
                {markedAyat !== null ? (
                    // Tampilkan data sebagai link
                    <Link to={`surah/${markedAyat}`}>
                        Surah terakhir dibaca: Ayat {markedAyat}
                    </Link>
                ) : (
                    // Tampilkan pesan jika tidak ada data
                    <p>Data tidak ditemukan.</p>
                )}
            </div>
        </>
    );
}

export default Marks;
