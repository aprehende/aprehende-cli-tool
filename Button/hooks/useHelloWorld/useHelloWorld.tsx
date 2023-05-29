import { useState } from 'react';

interface ButtonProps {
    name: string;
    setName: (name: string) => void;
}

const useButton = (): ButtonProps => {
    const [name, setName] = useState<string>('');

    return {
        name,
        setName,
    };
};

export default useButton;
