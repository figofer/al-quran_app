import  { useState } from 'react';
import { BiMenuAltLeft} from 'react-icons/bi';

import { motion as m } from 'framer-motion';

const Nav = () => {
    const [menu, setMenu] = useState(false);
    const open = () => {
        setMenu(!menu)
    }
    const close = () => {
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
                    <button onClick={close} className='flex gap-5 justify-between items-center'>
                        <BiMenuAltLeft className="text-broder text-4xl" /><p>&copy; {new Date().getFullYear()} FigoFerdyian.</p>
                    </button>
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-col gap-2 text-xl mt-10' >

                            <a href="https://figofer.netlify.app/">My Portofolio</a>
                        </div>
                        <footer className='relative t'>

                        </footer>
                    </div>
                </m.div>
            )}

        </>
    );
};

export default Nav;
