import { Dispatch } from 'react';

export type LocaleType = {
    name: string;
    label: string;
};
export type LocaleState = {
    locale: LocaleType;
    setLocale: (locale: LocaleType) => void;
};

export enum ThemeMode {
    LIGHT = 'light',
    DARK = 'dark',
}

export type ThemeState = {
    mode: `${ThemeMode}`;
    compact: boolean;
};

export enum ThemeActionType {
    CHANGE_MODE = 'change_mode',
    TOOGLE_MODE = 'toggle_mode',
    CHANGE_COMPACT = 'change_compact',
    TOOGLE_COMPACT = 'toggle_compact',
}

export type ThemeAction =
    | { type: `${ThemeActionType.CHANGE_MODE}`; value: `${ThemeMode}` }
    | { type: `${ThemeActionType.TOOGLE_MODE}` }
    | { type: `${ThemeActionType.CHANGE_COMPACT}`; value: boolean }
    | { type: `${ThemeActionType.TOOGLE_COMPACT}` };

export type ThemeContextType = {
    state: ThemeState;
    dispatch: Dispatch<ThemeAction>;
};
