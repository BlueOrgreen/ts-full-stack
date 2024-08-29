import { isEqual, isNil } from 'lodash';
import {
    DependencyList,
    EffectCallback,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from 'react';

import { defaultThemeConfig, locales, ThemeContext } from './constants';
import { LocaleContext } from './context';

export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
    const inited = useRef(deps);
    useEffect(() => {
        if (!isEqual(inited.current, deps)) {
            inited.current = deps;
            effect();
        }
    }, [deps]);
};

export const useTheme = () => {
    const context = useContext(ThemeContext) ?? ({} as Record<string, any>);
    return useMemo(
        () => (isNil(context.state) ? defaultThemeConfig : context.state),
        [context.state],
    );
};

export const useThemeAction = () => {
    const context = useContext(ThemeContext) ?? ({} as Record<string, any>);
    return useCallback(isNil(context.dispatch) ? null : context.dispatch, [context.dispatch]);
};

export const useLocale = () => {
    const context = useContext(LocaleContext) ?? ({} as Record<string, any>);
    return useMemo(() => (isNil(context.locale) ? locales[0] : context.locale), [context.locale]);
};

export const useLocaleAction = () => {
    const context = useContext(LocaleContext) ?? ({} as Record<string, any>);
    return useCallback(isNil(context.setLocale) ? null : context.setLocale, [context.setLocale]);
};
