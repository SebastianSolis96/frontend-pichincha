import { getDate } from '../getDate';
import moment from 'moment';

describe('Prueba al helper getDate', () => {
  it("test_happy_path_with_valid_string_date", () => {
    const result = getDate("2022-01-01T00:00:00.000Z");
    expect(result).toBe("2022-01-01");
  });

  it("test_happy_path_with_no_string_date", () => {
    const result = getDate();
    const currentDate = moment().format('YYYY-MM-DD');
    expect(result).toBe(currentDate);
  });

  it("test_edge_case_with_invalid_string_date", () => {
    expect(() => getDate("invalid date")).toThrowError('Invalid date string');
  });

  it("test_edge_case_with_unexpected_format_string_date", () => {
    expect(() => getDate("01/01/2022")).toThrowError('Invalid date string');
  });

  it("test_mock_moment_library", () => {
    const mockMoment = jest.spyOn(moment, 'utc').mockReturnValue(moment.utc("2022-01-01T00:00:00.000Z"));
    const result = getDate("2022-01-01T00:00:00.000Z");
    expect(result).toBe("2022-01-01");
    mockMoment.mockRestore();
  });

  it("test_edge_case_with_different_timezone_string_date", () => {
    const result = getDate("2022-01-01T00:00:00.000-05:00");
    expect(result).toBe("2022-01-01");
  });
});