import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MyltiSelectField = ({ options, onChange, label, name, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                <Select
                    closeMenuOnSelect={false}
                    defaultValue={defaultValue}
                    isMulti
                    options={optionsArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    name={name}
                />
            </div>
        </div>
    );
};
MyltiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MyltiSelectField;
