import { Button } from 'antd';
import clsx from 'clsx';
import { isNaN, isNil } from 'lodash';
import {
    ChangeEventHandler,
    FC,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';

import $styles from './style.module.css';

interface RefFunc {
    focus: () => void;
    memo: () => number;
}

const MyInput = forwardRef<RefFunc, { value: number; changeValue: (v: number) => void }>(
    ({ value, changeValue }, ref) => {
        const [local, setLocal] = useState<number | string>(value);
        const inputRef = useRef<HTMLInputElement | null>(null);
        useImperativeHandle(
            ref,
            () => ({
                focus: () => inputRef.current.focus(),
                memo: () => value,
            }),
            [value],
        );
        useEffect(() => {
            changeValue(isNaN(Number(local)) ? 0 : Number(local));
        }, [changeValue, local]);
        const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
            setLocal(e.target.value);
        }, []);
        return (
            <input value={value} ref={inputRef} placeholder="请输入值" onChange={handleChange} />
        );
    },
);

const RefDemo: FC = () => {
    const [count, setCount] = useState(0);
    const inited = useRef(count);
    const ref = useRef<RefFunc | null>(null);
    useEffect(() => {
        ref.current.focus();
    }, []);
    useEffect(() => {
        if (inited.current !== count) {
            inited.current = count;
            console.log('changed');
        }
    }, [count]);
    return (
        <div className={clsx($styles.container, 'tw-w-[20rem]')}>
            <h2 className="tw-text-center">useRef Demo</h2>
            <p className="tw-text-center tw-py-5">{count}</p>
            <div className="tw-flex tw-justify-around">
                <Button onClick={() => setCount(Math.ceil(Math.random() * 10))} type="dashed">
                    变化
                </Button>
            </div>
            <div className="flex flex-col">
                {!isNil(ref.current) && <p className="tw-my-3">前一个值：{ref.current.memo()}</p>}
                <MyInput ref={ref} value={count} changeValue={setCount} />
            </div>
        </div>
    );
};
export default RefDemo;
