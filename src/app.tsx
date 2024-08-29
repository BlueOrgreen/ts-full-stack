import { FC, useMemo } from 'react';

import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import $styles from './app.module.css';
import RefDemo from './demo/ref';
import ReducerDemo, { Theme } from './demo/reducer';
import ContextDemo, { Locale } from './demo/context';
import { useLocale, useTheme } from './demo/hooks';
import { localeData } from './demo/constants';
import CustomDemo from './demo/custom';


// 自动转换一些设置了px的css数值为rem
const px2rem = px2remTransformer();
const Wrapper: FC = () => {
    const locale = useLocale();
    const antdLocaleData = useMemo(() => {
        if (!Object.keys(localeData).find((v) => v === locale.name)) {
            return localeData[0];
        }
        return localeData[locale.name];
    }, [locale.name]);
    const themeState = useTheme();
    const algorithm = useMemo(() => {
        const result = [themeState.compact ? theme.compactAlgorithm : theme.defaultAlgorithm];
        if (themeState.mode === 'dark') result.push(theme.darkAlgorithm);
        return result
    }, [themeState])
    return (
        <ConfigProvider
            locale={antdLocaleData}
            theme={{
                algorithm,
                // 启用css变量
                cssVar: true,
                hashed: false,
                token: {},
            }}
        >
            <AntdApp>
            {/* 使用StyleProvider包装应用根组件并使用layer来设置选择器权重，防止tailwind与antd产生样式冲突 */}
        <StyleProvider layer transformers={[px2rem]}>
            <div className={$styles.app}>
                <div className={$styles.container}>
                    <h2 className="tw-text-center">First React App</h2>
                    <div className="tw-flex tw-items-center tw-flex-col">
                        <div className="tw-flex-auto tw-my-5">
                            <a
                                className="tw-text-neutral-800"
                                href="https://3rcd.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                3R教室
                            </a>
                        </div>
                    </div>
                </div>
                <RefDemo />
                <ContextDemo />
                <ReducerDemo />
                <CustomDemo />
            </div>
        </StyleProvider>
        </AntdApp>
        </ConfigProvider>
    );
};

const App: FC = () => (
    <Locale>
        <Theme>
            <Wrapper />
        </Theme>
    </Locale>
);

export default App;
