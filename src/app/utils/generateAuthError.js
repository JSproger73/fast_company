export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email или пароль введены неверно";
        case "EMAIL_EXIST":
            return "Пользователь с таким Email уже существует";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
