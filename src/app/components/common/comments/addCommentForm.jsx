import React, { useEffect, useState } from "react";
import API from "../../../API";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const [selectErrorsValid, setSelectErrorsValid] = useState(false);
    const [textAreaErrorsValid, setTextAreaErrorsValid] = useState(false);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
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

    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData(initialData);
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
        setSelectErrorsValid(false);
        setTextAreaErrorsValid(false);
        console.log(e.target);
    };
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }));

    const blurHandler = (target) => {
        switch (target.name) {
            case "userId":
                setSelectErrorsValid(true);
                break;
            case "content":
                setTextAreaErrorsValid(true);
                break;
        }
    };

    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                    errorsValid={selectErrorsValid}
                    blur={blurHandler}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                    errorsValid={textAreaErrorsValid}
                    blur={blurHandler}
                />
                <div className="d-flex justify-content-end">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isValid}
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
