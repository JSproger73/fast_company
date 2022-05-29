import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    errorsValid,
    blur
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (errorsValid && error ? " is-invalid" : "");
    };
    const handleChangeValidError = ({ target }) => {
        blur({ name: target.name });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    onBlur={handleChangeValidError}
                />

                {errorsValid && error && (
                    <div className="invalid-feedback ">{error}</div>
                )}
            </div>
        </div>
    );
};
TextAreaField.defaultProps = {
    type: "text"
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    errorsValid: PropTypes.bool,
    blur: PropTypes.func
};

export default TextAreaField;
