import moment from 'moment';

export const getDate = ( stringDate: string = moment().toISOString() ): string => {
  if (!moment.utc(stringDate).isValid()) {
    throw new Error('Invalid date string');
  }
  return moment(stringDate).format('YYYY-MM-DD');
}