import {createSlice} from '@reduxjs/toolkit';

const router = createSlice({
    name: "app",
    initialState: {
        lang: "ru",
    },
    reducers: {
        setLang: (state, {payload}) => {
            state.lang=payload;
        }
    }
});

export const { setLang } = router.actions;
export default router.reducer;