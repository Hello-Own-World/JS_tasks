import axios from 'axios';
import { axiosRequestErrorHandler } from '../../errors/axiosErrors';
import AuthApi from '../authApi';
import UserApi from '../userApi';

jest.mock('axios');
jest.mock('../../errors/axiosErrors');
jest.mock('../authApi');

describe('UserApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Login', () => {
    test('sends a login request successfully', async () => {
      const inputData = { username: 'testuser', password: 'password' };
      const response = { data: { token: 'validToken' } };
      axios.post.mockResolvedValueOnce(response);

      const result = await UserApi.Login(inputData);

      expect(axios.post).toHaveBeenCalledWith('/api/user/login', inputData, {});
      expect(result).toBe(response);
      expect(axiosRequestErrorHandler).not.toHaveBeenCalled();
    });

    test('handles error when sending a login request', async () => {
      const inputData = { username: 'testuser', password: 'password' };
      const error = new Error('Network error');
      axios.post.mockRejectedValueOnce(error);

      await UserApi.Login(inputData);

      expect(axios.post).toHaveBeenCalledWith('/api/user/login', inputData, {});
      expect(axiosRequestErrorHandler).toHaveBeenCalledWith(error);
    });
  });

  describe('Register', () => {
    test('sends a register request successfully', async () => {
      const authData = { username: 'testuser', password: 'password' };
      const response = { data: { userId: '123456' } };
      axios.post.mockResolvedValueOnce(response);

      const result = await UserApi.Register(authData);

      expect(axios.post).toHaveBeenCalledWith('/api/user/register', authData, {});
      expect(result).toBe(response);
      expect(axiosRequestErrorHandler).not.toHaveBeenCalled();
    });

    test('handles error when sending a register request', async () => {
      const authData = { username: 'testuser', password: 'password' };
      const error = new Error('Network error');
      axios.post.mockRejectedValueOnce(error);

      await UserApi.Register(authData);

      expect(axios.post).toHaveBeenCalledWith('/api/user/register', authData, {});
      expect(axiosRequestErrorHandler).toHaveBeenCalledWith(error);
    });
  });

  describe('IsLoggedIn', () => {
    test('returns true if token and UserId are present in local storage', () => {
      AuthApi.getToken.mockReturnValueOnce('validToken');
      AuthApi.getLocalItem.mockReturnValueOnce('123456');

      const result = UserApi.IsLoggedIn();

      expect(AuthApi.getToken).toHaveBeenCalled();
      expect(AuthApi.getLocalItem).toHaveBeenCalledWith('UserId');
      expect(result).toBe(true);
    });

    test('returns false if token or UserId is absent in local storage', () => {
      AuthApi.getToken.mockReturnValueOnce('validToken');
      AuthApi.getLocalItem.mockReturnValueOnce(null);

      const result = UserApi.IsLoggedIn();

      expect(AuthApi.getToken).toHaveBeenCalled();
      expect(AuthApi.getLocalItem).toHaveBeenCalledWith('UserId');
      expect(result).toBe(false);
    });
  });

  describe('GetUserInfo', () => {
    test('returns user info successfully', async () => {
      const userId = '123456';
      const response = { data: { name: 'John Doe', email: 'john.doe@example.com' } };
      axios.get.mockResolvedValueOnce(response);
      AuthApi.getLocalItem.mockReturnValueOnce(userId);

      const result = await UserApi.GetUserInfo();

      expect(AuthApi.getLocalItem).toHaveBeenCalledWith('UserId');
      expect(axios.get).toHaveBeenCalledWith(`/api/user/${userId}`);
      expect(result).toBe(response);
      expect(axiosRequestErrorHandler).not.toHaveBeenCalled();
    });

    test('handles error when getting user info', async () => {
      const userId = '123456';
      const error = new Error('Network error');
      axios.get.mockRejectedValueOnce(error);
      AuthApi.getLocalItem.mockReturnValueOnce(userId);

      const result = await UserApi.GetUserInfo();

      expect(AuthApi.getLocalItem).toHaveBeenCalledWith('UserId');
      expect(axios.get).toHaveBeenCalledWith(`/api/user/${userId}`);
      expect(axiosRequestErrorHandler).toHaveBeenCalledWith(error);
    });
  });
});
