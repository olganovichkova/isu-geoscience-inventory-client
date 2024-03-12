"use client";

// import { useRouter } from 'next/router';
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react';

const Login: React.FC = () => {
  // const router = useRouter();

  useEffect(() => {

    // Function to retrieve tokens from URL query parameters
    const getTokensFromUrl = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const idToken = urlParams.get('id_token');
      const accessToken = urlParams.get('access_token');
      const refreshToken = urlParams.get('refresh_token');

      if (idToken && accessToken && refreshToken) {
        // Store tokens in sessionStorage or any other preferred storage
        sessionStorage.setItem('id_token', idToken);
        sessionStorage.setItem('access_token', accessToken);
        sessionStorage.setItem('refresh_token', refreshToken);

        // Redirect to a clean URL without tokens
        
        // router.push('/');
        // window.location.replace('http://localhost:3000');
        // window.location.assign('/');
        redirect('/');
      }
    };

    // Call the function when the component mounts
    getTokensFromUrl();
  }, []); // The empty dependency array ensures the effect runs once after the initial render

  // The rest of your component code goes here

  return <div className="flex min-h-screen"></div>;
};

export default Login;



