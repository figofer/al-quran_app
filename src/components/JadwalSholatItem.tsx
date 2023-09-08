import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const jadwalSholatData = [
    {
        namaSholat: 'Subuh',
        jadwalSholat: '04:30',
    },
    {
        namaSholat: 'Dzuhur',
        jadwalSholat: '12:00',
    },
    {
        namaSholat: 'Ashar',
        jadwalSholat: '15:30',
    },
    {
        namaSholat: 'Maghrib',
        jadwalSholat: '18:20',
    },
    {
        namaSholat: 'Isya',
        jadwalSholat: '20:15',
    },
];

const JadwalSholat: React.FC = () => {
    const [jadwalAktif, setJadwalAktif] = useState(0);
    const [waktuMundur, setWaktuMundur] = useState('');

    useEffect(() => {
        const updateJadwalAktif = () => {
            const now = DateTime.now();
            const jadwalSholatWaktu = jadwalSholatData.map((item) => {
                const jadwalWaktu = DateTime.fromFormat(item.jadwalSholat, 'HH:mm');
                return now.set({
                    hour: jadwalWaktu.hour,
                    minute: jadwalWaktu.minute,
                    second: jadwalWaktu.second
                });
            });

            const jadwalBerikutnyaIndex = jadwalSholatWaktu.findIndex((jadwal) =>
                jadwal > now ? true : false
            );

            if (jadwalBerikutnyaIndex !== -1) {
                setJadwalAktif(jadwalBerikutnyaIndex);

                // Hitung waktu mundur
                const waktuMundurMillis = jadwalSholatWaktu[jadwalBerikutnyaIndex].toMillis() - now.toMillis();
                const hours = Math.floor(waktuMundurMillis / 3600000);
                const minutes = Math.floor((waktuMundurMillis % 3600000) / 60000);
                const seconds = Math.floor((waktuMundurMillis % 60000) / 1000);
                setWaktuMundur(`${hours}:${minutes}:${seconds}`);
            }
        };

        updateJadwalAktif(); // Panggil fungsi pertama kali
        const interval = setInterval(updateJadwalAktif, 1000); // Update setiap detik

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gradient-to-r mt-4 from-[#D2963E] to-[#8C5400] rounded-2xl p-5 h-[170px] shadow-white  transition-colors hover:shadow-xl ">
            <div className="flex flex-col h-full justify-between">
                <div className="text-xl gap-1 flex flex-col">
                    <b>{jadwalSholatData[jadwalAktif].namaSholat}</b>
                    <p>{jadwalSholatData[jadwalAktif].jadwalSholat}</p>
                </div>
                <div className="flex justify-between">
                    <p><b>- </b>{waktuMundur}</p>
                    <p>Kota Yogyakarta</p>
                </div>
            </div>
        </div>
    );
};

export default JadwalSholat;
