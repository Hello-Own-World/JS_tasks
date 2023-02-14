export function axiosRequestErrorHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error(
      `data: ${error.response.data}\n
       status: ${error.response.status}\n
       headers: ${error.response.headers}`
    );
  } else if (error.request) {
    // The request was made but no response was received
    console.error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  console.log(error.config);
}
