import {toast} from 'react-toastify';

export const loginService = async (email: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch('https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/login', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      toast.error('Credenciales Invalidas');
      return null;
    }

    
    return response.json();

  } catch (error) {
    console.log(error);
    
  }
};