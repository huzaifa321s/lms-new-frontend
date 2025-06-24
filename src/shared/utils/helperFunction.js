// Cookies
export const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            try {
                // Attempt to parse the cookie value as JSON
                return JSON.parse(cookieValue);
            } catch (error) {
                // If parsing fails, return the raw string value
                return cookieValue;
            }
        }
    }
    return null;
};

// ------- Web related


export const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const shuffleArrayPostion = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

// Nested Objects Form data
export const objectToFormData = (obj, form, namespace) => {
    let fd = form || new FormData();

    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {

            let formKey = namespace ?
                namespace + '[' + property + ']' :
                property;

            if (obj[property] === Object(obj[property]) && !(obj[property] instanceof File)) {
                objectToFormData(obj[property], fd, formKey);
            } else if (obj[property] instanceof Array) {
                for (var i = 0; i < obj[property].length; i++) {
                    objectToFormData(obj[property][i], fd, `${formKey}[${i}]`);
                }
            } else {
                const value = obj[property] === null ? '' : obj[property]
                fd.append(formKey, value);
            }
        }
    }
    return fd
}


// Formating date
export const formatDate = (dateStr, type = "month-day-year-time") => {
    const date = new Date(dateStr);

    let formattedDate = null;
    if (type === 'month-day-year-time') {
        formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    if (type === 'month-year') {
        formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
        });
    }

    return formattedDate
}


export const isActiveSubscription = (subscriptions) => {
    return subscriptions && subscriptions.status === 'active';
}

export const checkSubscriptionStatus = (subscription) => {
    const status = subscription && subscription?.status;

    if(!status) {
        return null;
    }

    return subscription.status;
}


export const calculateDateAfter30Days = (dateStr) => {
    const date = new Date(dateStr);
    const after30Days = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    return after30Days.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export const isStudentLoggedIn = () => {
    if (getCookie("studentToken")) {
        return true
    }
    return false;
}

export const unixToLocaleStr = (unixTimestamp, locales) => {

    // Convert seconds to milliseconds
    const date = new Date(unixTimestamp * 1000);

    const formattedDate = date.toLocaleDateString(locales, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return formattedDate;
}
