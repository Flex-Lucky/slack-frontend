const shortDateFormat = (dbtime) => {
    const [date, time] = dbtime.split("T");
    const [temp_time, ms] = time.split(".");
    const [hour, min, sec] = temp_time.split(":");
    return { date: date, time: `${hour}:${min}` };
};
export { shortDateFormat };
