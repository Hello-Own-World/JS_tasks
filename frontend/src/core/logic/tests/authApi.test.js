import AuthApi from '../authApi';

describe('AuthApi', () => {
  let localStorageMock;

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Mock localStorage
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    console.error.mockRestore();
    console.warn.mockRestore();
    delete global.localStorage;
  });

  describe('getToken', () => {
    test('returns null if token is absent', () => {
      const token = AuthApi.getToken();
      expect(token).toBeNull();
    });

    test('returns the token if it is valid', () => {
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);
      localStorageMock.getItem.mockReturnValueOnce('validToken');
      localStorageMock.getItem.mockReturnValueOnce(futureDate.toISOString());

      const token = AuthApi.getToken();
      expect(token).toBe('validToken');
    });
  });

  // Rest of the tests...
});
