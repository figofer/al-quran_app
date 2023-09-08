import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Surah } from '../util/interface';
import { FiOctagon } from 'react-icons/fi';
import Nav from '../components/nav';
import Fuse from 'fuse.js';
import JadwalSholatItem from '../components/JadwalSholatItem';
import JadwalSholat from '../components/JadwalSholatItem';
import Marks from '../components/Mark';


const QuranSurahList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
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


    const fuseOptions = {
        keys: ['namaLatin', 'arti', 'nomor'],
        threshold: 0.4,
    };
    const fuse = new Fuse(surahs, fuseOptions);

    const searchResults = fuse.search(searchQuery);


    return (

        <>

            <div className='px-4 py-2  h-cull  mx-auto text-white'>
                <Nav />
                <div className='flex flex-col gap-2 px-2 py-4'>
                    <p className='text-white/60'>Assalamualaikum</p>
                    <b className='text-3xl'>Beliau</b>
                    <JadwalSholat />
                </div>
                <div className='flex flex-col gap-6'>
                    <div className='flex justify-between px-5'>
                        <span className=' border-b-4 rounded-lg border-unggu pb-2 '>Surah</span>

                    </div>

                    <input
                        type="search"
                        className='p-4 text-sm w-full rounded-2xl duration-200 bg-transparent border-white/50 border focus:border-none'
                        placeholder='Surat apa yg mau anda baca?'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}

                    />
                </div>

                <div>
                    <div className='backdrop-blur-md backdrop-brightness  grid grid-cols-1 gap-4  p-5 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>


                        {searchQuery ? (
                            searchResults.map((result) => (
                                <Link
                                    to={`/surah/${result.item.nomor}`}
                                    key={result.item.nomor}
                                    className='text-2xl flex items-center gap-4 border-b py-4 border-border hover:border-unggu transition-colors duration-200'
                                >
                                    <div className='relative flex justify-center items-center '>
                                        <span className='absolute text-xl'>{result.item.nomor}</span>
                                        <FiOctagon className="text-5xl text-unggu" />
                                    </div>
                                    <div className='flex gap-10 items-center w-full justify-between'>
                                        <div className='flex flex-col text-white items-start'>
                                            <span className=''>{result.item.namaLatin}</span>
                                            <span className='text-gray-400'>{result.item.arti}</span>
                                        </div>
                                        <b className='text-2xl text-unggu font-alqalamquran'>{result.item.nama}</b>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            surahs.map((surah) => (
                                <Link
                                    to={`/surah/${surah.nomor}`}
                                    key={surah.nomor}
                                    className='text-2xl flex items-center gap-4 border-b py-4 border-white/25 hover:border-unggu hover:scale-[1.05] transition-all duration-200'
                                >
                                    <div className='relative flex justify-center items-center '>
                                        <FiOctagon className="text-5xl text-unggu" />
                                        <span className='absolute text-xl' style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                                            {surah.nomor}
                                        </span>
                                    </div>

                                    <div className='flex gap-10 items-center w-full justify-between'>
                                        <div className='flex flex-col text-white items-start'>
                                            <span className=''>{surah.namaLatin}</span>
                                            <span className='text-gray-400'>{surah.arti}</span>
                                        </div>
                                        <b className='text-2xl text-unggu font-alqalamquran'>{surah.nama}</b>
                                    </div>
                                </Link>
                            ))
                        )}


                    </div>

                </div>
            </div>


        </>

    );
};



export default QuranSurahList;
