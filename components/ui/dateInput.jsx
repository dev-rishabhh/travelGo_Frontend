
import { Calendar } from 'lucide-react';
import "./dateInput.css"


function DateInput({
    label,
    value,
    onChange,
    placeholder = "Select date",
    size = 'medium',
    minDate
}) {
    // const sizeClasses = {
    //     small,
    //     medium,
    //     large
    // }

    // const labelSizes = {
    //     small: 'text-xs',
    //     medium: 'text-sm',
    //     large: 'text-base'
    // };

    const today = new Date().toISOString().split('T')[0];
    const minDateValue = minDate || today;

    return (
        <div className="date-input">
            <label className={`date-input__label`}>
                {label}
            </label>
            <div className="date-input__wrapper">
                <Calendar className="date-input__icon" size={20} />
                <input
                    type="date"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    min={minDateValue}
                    className={`date-input__field `}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default DateInput;