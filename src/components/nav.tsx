import React, { useEffect, useState } from 'react';
import { BiMenuAltLeft, BiSearch } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Surah } from '../util/interface';
import axios from 'axios';
import { motion as m } from 'framer-motion';

const Nav = () => {
    const [menu, setMenu] = useState(false);
    const open = () => {
        setMenu(!menu)
    }





    return (
        <>
            <nav className='bg-primary flex w-full z-30 items-center text-2xl sticky top-0 justify-between py-2'>
                <div className='flex gap-4'>
                    <button onClick={open}> <BiMenuAltLeft className="text-broder text-4xl" /></button>
                    <b>Quran App</b>
                </div>

            </nav>
            {menu && (
                <m.div
                    className='fixed top-0  w-full p-4 left-0 flex backdrop-blur-md backdrop-brightness opacity-80 flex-col bg-black z-50 h-screen'
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: 1, x: '0' }}
                    exit={{ opacity: 0, x: '-100%' }}
                    transition={{ duration: 0.3 }}

                >
                    <button onClick={open}>
                        <BiMenuAltLeft className="text-broder text-4xl" />
                    </button>
                    <div className='flex flex-col gap-2 text-xl' >
                        <b>Quran App</b>
                        <b>Quran App</b>
                    </div>
                </m.div>
            )}

        </>
    );
};

export default Nav;
