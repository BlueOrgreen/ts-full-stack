import { Button } from 'antd';
import { FC, useEffect, useState } from 'react';

import $styles from './style.module.css';

const EffectDemo: FC = () => {
    const [red, setRed] = useState<boolean>(false);
    const [ghost, setGhost] = useState<boolean>(false);
    const [width, setWidth] = useState(window.innerWidth);
    const toggleGhostBtn = () => setGhost(!ghost);
    const resizeHandle = () => setWidth(window.innerWidth);
    useEffect(() => {
        console.log('浏览器宽度改变');
        window.addEventListener('resize', resizeHandle);
    }, [width]);
    useEffect(() => {
        console.log('切换幽灵按钮');
    }, [ghost]);
    useEffect(() => {
        console.log('只在第一次或重新渲染组件时触发');
    }, []);
    useEffect(() => {
        (async () => {
            await new Promise((resolve) => {
                setTimeout(() => resolve(true), 1000);
            });
            setRed(ghost);
        })();
    }, [ghost]);
    return (
        <div className={$styles.container}>
            <h2 className="tw-text-center">useEffect Demo</h2>
            <p className="tw-text-center tw-py-5">{ghost ? 'ghost' : '普通'}按钮</p>
            <div className="tw-flex tw-justify-center tw-flex-col">
                <Button type="primary" onClick={toggleGhostBtn} ghost={ghost} danger={red}>
                    切换按钮样式
                </Button>
                <p className="tw-pt-5 tw-text-center">宽度为: {width}</p>
            </div>
        </div>
    );
};
export default EffectDemo;
