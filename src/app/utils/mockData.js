import { useEffect, useState } from "react";
import profession from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";

import httpService from "../services/http.service";

const useMockData = () => {
    const statusConst = {
        idle: "Not starte",
        pending: "In Process",
        successed: "Ready",
        error: "Error occured"
    };
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConst.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summuryCount = profession.length + qualities.length + users.length;

    const IncrementCount = () => {
        setCount((prevState) => prevState + 1);
    };

    const updateProgress = () => {
        if (count !== 0 && status === statusConst.idle) {
            setStatus(statusConst.pending);
        }
        const newProgress = Math.floor((count / summuryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setStatus(statusConst.successed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of profession) {
                await httpService.put("profession/" + prof._id, prof);
                IncrementCount();
            }
            for (const user of users) {
                await httpService.put("users/" + user._id, user);
                IncrementCount();
            }
            for (const qual of qualities) {
                await httpService.put("quality/" + qual._id, qual);
                IncrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConst.error);
        }
    }
    return { error, initialize, progress, status };
};

export default useMockData;
