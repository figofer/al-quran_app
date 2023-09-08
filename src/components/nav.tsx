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
const close = () =>{
    setMenu(false)
}




    return (
        <>
            <nav className='bg-primary flex w-full z-30 items-center text-2xl sticky top-0 justify-between py-2'>
                <div className='flex gap-4'>
                    <m.button onClick={open}
                    > <BiMenuAltLeft className="text-broder text-4xl" /></m.button>
                    <b>Quran App</b>
                </div>

            </nav>
            {menu && (
                <m.div
                    className='fixed top-0 z-30  w-full p-4 h-screen left-0 bg-primary opacity-0'
                    initial={{ opacity: 0, x: '-100%' }}
                    animate={{ opacity: 1, x: '0' }}
                    exit={{ opacity: 0, x: '-100%' }}
                    transition={{ duration: 0.3 }}>
                    <button onClick={close}>
                        <BiMenuAltLeft className="text-broder text-4xl" />
                    </button>
                    <div className='flex flex-col gap-2 text-xl mt-10' >
                        <b>Instagram</b>
                        <b>Portofolio</b>
                    </div>
                </m.div>
            )}

        </>
    );
};

export default Nav;
