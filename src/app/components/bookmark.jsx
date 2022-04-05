import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    console.log(status);
    return (
        <button {...rest}>
            <i
                className={"bi bi-bookmark" + (status === false ? "" : "-fill")}
            ></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
