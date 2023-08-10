import { useState } from 'react';
import { Switch } from '@bigcommerce/big-design';

export default function StatusSwitch({ name, status}) {
    const [checked, setChecked] = useState(status);
  
    const handleChange = async () => {
        const newState = !checked;
        setChecked(newState);
    }
  
    return <Switch name={name} checked={checked} onChange={handleChange} />;
}