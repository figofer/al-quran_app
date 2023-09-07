// import React, { useEffect, useState } from 'react';
// import { BiMenuAltLeft, BiSearch } from 'react-icons/bi';
// import { Link } from 'react-router-dom';
// import { Surah } from '../util/interface';
// import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
// import axios from 'axios';

// const SecNav = () => {
//     const [search, setSearch] = useState(false);
//     const [surahs, setSurahs] = useState<Surah[]>([]);
//     const [searchQuery, setSearchQuery] = useState('');

//     const url = 'https://equran.id/api/v2/surat'
//     useEffect(() => {
//         const fetchSurahs = async () => {
//             try {
//                 const response = await axios.get(url);
//                 setSurahs(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching surahs:', error);
//             }
//         };

//         fetchSurahs();
//     }, []);


//     const HandleSearch = () => {
//         setSearch(!search);
//     };

//     return (
//         <>
//             <nav className='bg-primary flex w-full z-30 items-center text-2xl sticky top-0 justify-between py-2'>
//                 <div className='flex gap-4'>
//                     <Link to="/"> <MdNavigateBefore className="text-broder text-white text-5xl" /></Link>
//                     {nextSurahNumber !== null && (
//                         <Link to={`/surah/${nextSurahNumber}`}>Sesudah</Link>
//                     )}

//                     {beforeSurahNumber !== null && (
//                         <Link to={`/surah/${beforeSurahNumber}`}>sebelum</Link>
//                     )}
//                 </div>
               
//             </nav>

//         </>
//     );
// };

// export default SecNav;
