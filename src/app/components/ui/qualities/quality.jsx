import React from "react";
import { useQualities } from "../../../hooks/useQualities";
import PropTypes from "prop-types";
const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const qual = getQuality(id);
    // console.log("КАЧЕСТВА ID", id);
    // return null;
    return <span className={"badge m-1 bg-" + qual.color}>{qual.name}</span>;
};
Quality.propTypes = {
    id: PropTypes.string.isRequired
};

export default Quality;
