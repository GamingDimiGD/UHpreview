const rng = (max, min) => {
    if (!min) min = 0
    const num = Math.floor(Math.random() * (max - min + 1)) + min
    return num
}
const date = (month, day) => {
    return new Date().getDate() === day && new Date().getMonth() + 1 === month
}
const dateRange = (monthFrom, dayFrom, monthTo, dayTo) => {
    return new Date().getDate() >= dayFrom && new Date().getMonth() + 1 >= monthFrom && new Date().getDate() <= dayTo && new Date().getMonth() + 1 <= monthTo
}