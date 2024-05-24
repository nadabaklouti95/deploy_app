export const localDate = (dateTime: string) => {
    const date = new Date(dateTime);

    const timeDifference = date.getTimezoneOffset() / 60;

    const localDateTime = new Date(date.getTime() + timeDifference * 60 * 60 * 1000 * -1);

    const formattedDate = `${localDateTime.getDate().toString()
        .padStart(2, '0')}-${(localDateTime.getMonth() + 1).toString()
        .padStart(2, '0')}-${localDateTime.getFullYear()} ${localDateTime.getHours().toString()
        .padStart(2, '0')}:${localDateTime.getMinutes().toString()
        .padStart(2, '0')}:${localDateTime.getSeconds().toString()
        .padStart(2, '0')}`;

    return formattedDate;
};
