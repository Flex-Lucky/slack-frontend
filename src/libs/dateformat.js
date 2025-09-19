const shortDateFormat = (dbtime) => {
    // console.log('%csrc\libs\dateformat.js:2 dbtime', 'color: #007acc;', dbtime);
    const [date, time] = dbtime.split("T");
    // console.log(time);
    const [temp_time, ms] = time.split(".");
    const [hour, min, sec] = temp_time.split(":");
    const curTime = new Date().toString();
    console.log(date);
    console.log(hour, min)
    console.log(curTime)
    // console.log("%csrclibsdateformat.js:11 hour", "color: #007acc;", hour);
    // console.log("%csrclibsdateformat.js:11 min", "color: #007acc;", min);
};

export { shortDateFormat };
