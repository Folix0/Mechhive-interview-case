import React from "react";
import "node_modules/flag-icons/css/flag-icons.min.css";

interface CurrencySelectorProps {
  name: string;
  currencies: { [key: string]: string };
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  name,
  currencies,
  onChange,
  value,
}) => {
  return (
    <div>
      <select
        id="convertBox"
        name={name}
        className=""
        onChange={onChange}
        value={value}
      >
        {Object.entries(currencies).map(([code, name]) => (
          <option key={code} value={code}>
            {code} - {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;