import axios from 'axios';
import ChatApi from '../chatApi';
import AuthApi from '../authApi';

jest.mock('axios');

describe('ChatApi', () => {
  describe('SendMsg', () => {
    test('sends a message successfully', async () => {
      const inputData = { message: 'Hello, World!' };
      const token = 'validToken';
      AuthApi.getToken = jest.fn().mockReturnValue(token);
      axios.post.mockResolvedValueOnce({ data: 'Message sent successfully' });

      const response = await ChatApi.SendMsg(inputData);

      expect(AuthApi.getToken).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith('/api/chat/message', inputData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response).toEqual({ data: 'Message sent successfully' });
    });

    test('handles error when sending a message', async () => {
      const inputData = { message: 'Hello, World!' };
      const token = 'validToken';
      AuthApi.getToken = jest.fn().mockReturnValue(token);
      const error = new Error('Network error');
      axios.post.mockRejectedValueOnce(error);
      console.log = jest.fn(); // Mocking console.log

      const response = await ChatApi.SendMsg(inputData);

      expect(AuthApi.getToken).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalledWith('/api/chat/message', inputData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response).toBeUndefined();
      expect(console.log).toHaveBeenCalledWith(error);
    });
  });

  describe('GetMsg', () => {
    test('gets messages successfully', async () => {
      const token = 'validToken';
      AuthApi.getToken = jest.fn().mockReturnValue(token);
      axios.get.mockResolvedValueOnce({ data: ['Message 1', 'Message 2'] });

      const response = await ChatApi.GetMsg();

      expect(AuthApi.getToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('/api/chat', {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response).toEqual({ data: ['Message 1', 'Message 2'] });
    });

    test('handles error when getting messages', async () => {
      const token = 'validToken';
      AuthApi.getToken = jest.fn().mockReturnValue(token);
      const error = new Error('Network error');
      axios.get.mockRejectedValueOnce(error);
      axiosRequestErrorHandler = jest.fn();
      const response = await ChatApi.GetMsg();
      
      axiosRequestErrorHandler.mockRejectedValueOnce(error);
      expect(AuthApi.getToken).toHaveBeenCalled();
      expect(axios.get).toHaveBeenCalledWith('/api/chat', {
        headers: { Authorization: `Bearer ${token}` },
      });
      expect(response).toBeUndefined();
    });
  });
});
