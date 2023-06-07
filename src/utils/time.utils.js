import moment from 'moment';

export const getDuration = (datetime) => {

    let current = moment(new Date()).add(8, 'h')
    let arrival = moment(datetime).add(8, 'h')
    let duration = moment.duration(arrival.diff(current)).asMinutes()
    return Math.floor(duration)
}