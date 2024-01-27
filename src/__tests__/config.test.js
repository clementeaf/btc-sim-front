import axios from 'axios';
import { calculatePortfolioReturns, fetchBitcoinPricesfromTimeStamps, generateTimestamps, initialValues, useCachedData, validationSchema } from '../utils';

test('generateTimestamps generates correct timestamps', () => {
    const startDate = '2022-01-01';
    const endDate = '2022-03-01';
    const timestamps = generateTimestamps(startDate, endDate);
    // Add your assertions here based on expected timestamps
    expect(timestamps.length).toBeGreaterThan(0);
  });
  
  test('calculatePortfolioReturns calculates correct returns', () => {
    const prices = [100, 120, 150];
    const amounts = [1000, 1200, 1400];
    const returns = calculatePortfolioReturns(prices, amounts);
    expect(returns.length).toBe(prices.length - 1);
  });
  
  // Add more tests for other functions...
  
  // Example of a Jest mock for axios
  jest.mock('axios');
  
  test('fetchBitcoinPricesfromTimeStamps fetches prices correctly', async () => {
    const mockSetPriceAndTimeData = jest.fn();
    const mockSetLoading = jest.fn();
  
    // Mocking axios response
    axios.get.mockResolvedValue({ data: 200 });
  
    await fetchBitcoinPricesfromTimeStamps([123, 456], 'getBTCCLPprice', mockSetPriceAndTimeData, mockSetLoading);
  
    // Add your assertions here based on expected behavior
    expect(mockSetPriceAndTimeData).toHaveBeenCalledWith([200, 200]);
    expect(mockSetLoading).toHaveBeenCalledWith(false);
  });
  
  // Add more tests for other functions...
  
  test('useCachedData returns cached data if available', () => {
    localStorage.setItem('cachedData', JSON.stringify({ example: 'cached data' }));
    const result = useCachedData({ example: 'default data' });
    expect(result).toEqual({ example: 'cached data' });
  });
  
  test('validationSchema validates correctly', async () => {
    const validData = {
      amount: 100,
      startDate: new Date('2022-01-01'), // Convertir la fecha a un objeto Date
      endDate: new Date('2022-02-01'),   // Convertir la fecha a un objeto Date
    };
  
    // Validate valid data
    const validResult = await validationSchema.validate(validData);
    
    // Asegurarse de que las fechas en validResult también sean objetos Date
    validResult.startDate = new Date(validResult.startDate);
    validResult.endDate = new Date(validResult.endDate);
  
    // Realizar la comparación
    expect(validResult).toEqual(validData);
  });
  
  
  test('initialValues match expected structure', () => {
    // Add your assertions here based on the expected structure of initialValues
    expect(initialValues).toEqual({
      cryptocurrency: "Bitcoin",
      amount: "",
      frequency: "monthly",
      startDate: "",
      endDate: "",
      compareWithBitcoin: false,
    });
  });