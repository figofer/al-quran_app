import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion as m } from 'framer-motion';
import { Surah } from '../util/interface';
import { BiMenuAltLeft, BiSearch, BiHome } from 'react-icons/bi';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { BiBookmark, BiShareAlt } from 'react-icons/bi'
import { BsPlay, BsBookmarkFill, BsFillPlayFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const SurahPage: React.FC = ({ }) => {


    const { surahNumber } = useParams<{ surahNumber: string }>();
    const [surah, setSurah] = useState<Surah | null>(null);
    const [nextSurahNumber, setNextSurahNumber] = useState<number | null>(null);
    const [beforeSurahNumber, setBeforeSurahNumber] = useState<number | null>(null);

    let history = useNavigate()
    useEffect(() => {

        const fetchSurah = async () => {
            try {
                const response = await axios.get(`https://equran.id/api/v2/surat/${surahNumber}`);
                setSurah(response.data.data);

                if (response.data.data.suratSelanjutnya.nomor) {
                    setNextSurahNumber(response.data.data.suratSelanjutnya.nomor);
                    window.scrollTo(0, 0);

                } else {
                    setNextSurahNumber(null);

                }


                if (response.data.data.suratSebelumnya) {
                    setBeforeSurahNumber(response.data.data.suratSebelumnya.nomor);
                    window.scrollTo(0, 0);
                } else {

                    setBeforeSurahNumber(null)


                }

            } catch (error) {
                console.error('Error fetching surah:', error);
            }
        };

        fetchSurah();
    }, [surahNumber, history]);

    const [readAyatIndices, setReadAyatIndices] = useState<number[]>([]);


    useEffect(() => {
        const storedIndices = localStorage.getItem('readAyatIndices');
        if (storedIndices) {
            setReadAyatIndices(JSON.parse(storedIndices));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('readAyatIndices', JSON.stringify(readAyatIndices));
    }, [readAyatIndices]);


    const [play, setPlay] = useState<number | null>(null);




    const [markedAyat, setMarkedAyat] = useState<number | null>(null);

    useEffect(() => {
        const storedMarkedAyat = localStorage.getItem(`/surah/${surahNumber}`);
        if (storedMarkedAyat) {
            setMarkedAyat(parseInt(storedMarkedAyat, 10));
        } else {
            setMarkedAyat(null); // Reset markedAyat jika tidak ada data tersimpan
        }
    }, [surahNumber]);

    const toggleMarkAyat = (nomorAyat: number) => {
        if (markedAyat === nomorAyat) {
            setMarkedAyat(null);
            localStorage.removeItem(`/surah/${surahNumber}`);
        } else {
            setMarkedAyat(nomorAyat);
            localStorage.setItem(`/surah/${surahNumber}`, nomorAyat.toString());
        }
    };



    const [activeAudioIndex, setActiveAudioIndex] = useState<number | null>(null);
    const [currentPlayingAyatIndex, setCurrentPlayingAyatIndex] = useState<number | null>(
        null
    );
    // const togglePlayAudio = (index: number) => {
    //     if (activeAudioIndex === index) {
    //         setActiveAudioIndex(null);
    //     } else {
    //         setActiveAudioIndex(index);
    //     }
    // };

    const togglePlayAudio = (index: number) => {
        if (activeAudioIndex === index) {
            setActiveAudioIndex(null);
        } else {
            setActiveAudioIndex(index);
            setCurrentPlayingAyatIndex(index);
        }
    };
    const audioRefs: React.RefObject<HTMLAudioElement>[] = Array.from(
        { length: surah?.jumlahAyat || 0 },
        () => React.createRef<HTMLAudioElement>()
    );

    useEffect(() => {
        const handleAudioEnd = () => {
            if (
                surah &&
                currentPlayingAyatIndex !== null &&
                currentPlayingAyatIndex < surah.jumlahAyat - 1
            ) {
                const nextAyatIndex = currentPlayingAyatIndex + 1;
                setCurrentPlayingAyatIndex(nextAyatIndex);
                setActiveAudioIndex(nextAyatIndex);
            } else {
                setCurrentPlayingAyatIndex(null);
                setActiveAudioIndex(null);
            }
        };

        if (currentPlayingAyatIndex !== null && surah) {
            const audioElement = audioRefs[currentPlayingAyatIndex].current;
            if (audioElement) {
                audioElement.addEventListener('ended', handleAudioEnd);
                return () => {
                    audioElement.removeEventListener('ended', handleAudioEnd);
                };
            }
        }
    }, [currentPlayingAyatIndex, surah]);

    const [selectedAudio, setSelectedAudio] = useState<string | null>(null);


    if (!surah || !Array.isArray(surah.ayat)) {
        return <div className='bg-primary h-screen flex justify-center items-center text-white'>

            <div className='flex flex-col items-center justify-center text-2xl gap-5 '>
                <b>Loading</b>
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-unggu" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        </div>;
    }



    return (
        <>
            <div className='px-4 py-2 bg-primary max-w-xl mx-auto text-white'>

                <nav className='bg-primary flex w-full z-30 items-center text-2xl sticky top-0 justify-between py-2'>
                    <div className='flex justify-between w-full items-center text-6xl'>
                        {(beforeSurahNumber === 0 || beforeSurahNumber === null) ? (
                            <Link to='/'>
                                <MdNavigateBefore />
                            </Link>
                        ) : null}
                        {beforeSurahNumber !== null && (
                            <Link to={`/surah/${beforeSurahNumber}`}><MdNavigateBefore /></Link>
                        )}

                        <Link to='/' className='text-3xl'>
                            <BiHome />
                        </Link>

                        {nextSurahNumber !== null && (
                            <Link to={`/surah/${nextSurahNumber}`}><MdNavigateNext /></Link>
                        )}




                    </div>

                </nav>


                <div className='bg-gradient-to-r mt-4 flex flex-col items-center gap-10 from-[#D2963E] to-[#8C5400] rounded-2xl p-5 h-[270px]'>
                    <div className='flex flex-col items-center text-2xl gap-2'>
                        <b>{surah.namaLatin}</b>
                        <p >{surah.arti}</p>
                    </div>
                    <div className='flex gap-2'>
                        <b>{surah.tempatTurun}</b>
                        -
                        <b>{surah.jumlahAyat} Ayat</b>
                    </div>
                    <p className='font-serif text-6xl '>{surah.nama}</p>

                </div>


                <div className='flex flex-col gap-10 pt-10 text-gray-300'>

                    {surah.ayat.map((ayat) => (
                        <div key={ayat.nomorAyat}>
                            <div className='bg-white/10 p-2 flex justify-between rounded-xl px-2'>
                                <span className='bg-unggu text-black font-bold flex h-8 w-8  justify-center items-center rounded-full'>{ayat.nomorAyat}</span>
                                <div className='text-unggu flex gap-8 text-2xl items-center'>
                                    <m.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}>
                                        <BiShareAlt />
                                    </m.button>
                                    <m.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className='text-3xl'
                                        onClick={() => togglePlayAudio(ayat.nomorAyat)}>
                                        {activeAudioIndex === ayat.nomorAyat ? <BsFillPlayFill className='text-green-500 ' /> : <BsPlay />}
                                    </m.button>
                                    {activeAudioIndex === ayat.nomorAyat && (

                                        <div className='flex hidden  justify-end py-4'>
                                            {ayat.audio && ayat.audio['01'] && (
                                                <audio className='' controls autoPlay={activeAudioIndex === ayat.nomorAyat}>
                                                    <source src={ayat.audio['01']} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            )}
                                        </div>
                                    )}
                                    <m.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => toggleMarkAyat(ayat.nomorAyat)}>
                                        {markedAyat === ayat.nomorAyat ? <BsBookmarkFill className='text-red-500' /> : <BiBookmark />}
                                    </m.button>
                                </div>
                            </div>
                            <div>
                                <div className='flex text-end font-alqalamquran text-4xl justify-end py-6 leading-[60px] tracking-wide'>
                                    <p>{ayat.teksArab}</p>
                                </div>
                                <div className='text-white/60 flex flex-col px-2 gap-4'>
                                    <i>{ayat.teksLatin}</i>
                                    <p>{ayat.teksIndonesia}</p>

                                </div>
                            </div>

                        </div>


                    ))}


                    <button className='flex items-center justify-center p-8 bg-white/10 rounded-lg'>
                        <Link to={`/surah/${surah.suratSelanjutnya.nomor}`}>Ayat selanjutnya : {surah.suratSelanjutnya.namaLatin}</Link>
                    </button>
                </div>

            </div>
        </>
    );
};

export default SurahPage;
