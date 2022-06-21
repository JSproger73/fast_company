import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { validator } from "../../../utils/validator";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useUser } from "../../../hooks/useUsers";

const EditUserPage = () => {
    const { userId } = useParams();
    const { getUserById } = useUser();
    const user = getUserById(userId);
    const { updateUserData } = useAuth();
    const history = useHistory();
    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
    }));
    const { professions, isLoading: professionLoading } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const [data, setData] = useState({
        name: user.name,
        profession: user.profession,
        sex: user.sex,
        qualities: getQualities(user.qualities)
    });
    const [errors, setErrors] = useState({});

    function getQualities(elements) {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality of qualities) {
                if (elem === quality._id) {
                    qualitiesArray.push({
                        value: quality._id,
                        label: quality.name,
                        color: quality.color
                    });
                }
            }
        }
        return qualitiesArray;
    }

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        }
        // email: {
        //     isRequired: {
        //         message: "Электронная почта обязательна для заполнения"
        //     },
        //     isEmail: {
        //         message: "Email введен некорректно"
        //     }
        // }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...user,
            ...data,
            profession: data.profession,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await updateUserData(userId, newData);
            history.push(`/users/${userId}`);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        {!professionLoading && !qualitiesLoading && user ? (
                            <>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                {/* <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                /> */}
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professionsList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    defaultValue={data.qualities}
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mx-auto"
                                    disabled={!isValid}
                                >
                                    Обновить
                                </button>
                            </>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
