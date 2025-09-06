
import { Users, Minus, Plus } from 'lucide-react';
import './guestSelector.css'


function GuestSelector({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
}) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="guest-selector">
      <label className={`guest-selector__label`}>
        {label}
      </label>
      <div className={`guest-selector__wrapper`}>
        <Users className="guest-selector__icon" size={20} />
        <div className="guest-selector__controls">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= min}
            className={`guest-selector__button guest-selector__button--minus`}
          >
            <Minus size={16} />
          </button>
          <span className="guest-selector__value">{value}</span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={value >= max}
            className={`guest-selector__button guest-selector__button--plus`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestSelector;
