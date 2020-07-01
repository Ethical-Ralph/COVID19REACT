export const capitialize = (str = 'state') => {
    str = str[0].toUpperCase() + str.substring(1)
    return str
}

export const formatDate = (date) => {
    const dateArr = new Date(date).toDateString().split(' ')
    let newDate = dateArr[1] + ' ' + dateArr[2]
    return newDate
}