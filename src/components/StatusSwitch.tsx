import { useState } from 'react';
import { Switch } from '@bigcommerce/big-design';

interface StatusSwitchProps {
    name: string,
    status: boolean
}

export default function StatusSwitch({ name, status}: StatusSwitchProps) {
    const [checked, setChecked] = useState(status);
  
    const handleChange = () => {
        const newState = !checked;
        setChecked(newState);
    }
  
    return <Switch name={name} checked={checked} onChange={handleChange} />;
}