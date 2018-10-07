import isWithinRange from 'date-fns/is_within_range'
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days'
import isBefore from 'date-fns/is_before'
import isSameDay from 'date-fns/is_same_day'
import subDays from 'date-fns/sub_days'

/**
 * Calculate the number of days within 180 days period till today.
 * @param {object} range - The period to calculate days for.
 * @param {Date} range.start - The start date of the period in Schegen zone.
 * @param {Date} range.end - The start date of the period in Schegen zone.
 * @return {number} - The number of days within the past 180 days.
 */
export function calculateDaysBackFor(range) {
  const daysAgo = subDays(new Date(), 179)

  if (isBefore(daysAgo, range.start) || isSameDay(daysAgo, range.start)) {
    return differenceInCalendarDays(range.end, range.start) + 1
  }
  if (
    isWithinRange(daysAgo, range.start, range.end) ||
    isSameDay(daysAgo, range.end)
  ) {
    return differenceInCalendarDays(range.end, daysAgo) + 1
  }
  return 0
}

/**
 * Calculate the total number of days within 180 days period till today for given periods.
 * @param {Array} ranges - The list of periods to calculate days for.
 * @return {number} The number of days within the past 180 days.
 */
export function usedDays(ranges) {
  return ranges.reduce((acc, range) => acc + calculateDaysBackFor(range), 0)
}
