export const validatePassword = (password: string) => {
    if (password.length < 8) {
        return false;
    }
    return true;
}

export const validateEmail = (mail: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true)
    }
    return (false)
}

export const validateName = (name: string) => {
    return (name || name.length !== 0 );
}