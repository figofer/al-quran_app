// surahSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Surah } from '../util/interface';

interface SurahState {
    surah: Surah | null;
    nextSurahNumber: number | null;
    beforeSurahNumber: number | null;
    readAyatIndices: number[];
    markedAyats: { [key: number]: boolean };
}

const initialState: SurahState = {
    surah: null,
    nextSurahNumber: null,
    beforeSurahNumber: null,
    readAyatIndices: [],
    markedAyats: {},
};

const surahSlice = createSlice({
    name: 'surah',
    initialState,
    reducers: {
        setSurah: (state, action: PayloadAction<Surah>) => {
            state.surah = action.payload;
        },
        setNextSurahNumber: (state, action: PayloadAction<number | null>) => {
            state.nextSurahNumber = action.payload;
        },
        setBeforeSurahNumber: (state, action: PayloadAction<number | null>) => {
            state.beforeSurahNumber = action.payload;
        },
        setReadAyatIndices: (state, action: PayloadAction<number[]>) => {
            state.readAyatIndices = action.payload;
        },
        toggleMarkAyat: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            state.markedAyats[index] = !state.markedAyats[index];
        },
    },
});

export const {
    setSurah,
    setNextSurahNumber,
    setBeforeSurahNumber,
    setReadAyatIndices,
    toggleMarkAyat,
} = surahSlice.actions;

export default surahSlice.reducer;
