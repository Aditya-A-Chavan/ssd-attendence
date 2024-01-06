import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    "type": "service_account",
    "project_id": "somaiya-sch-design",
    "private_key_id": "82989d001a63c3ca3ea6dc34d8799e57e396aff6",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZCuzazRvbVvoz\nZZzAO7j1PZMqEn2BLFTOLLsz1pHqP2RiiXhPUOwnRPVOzq/II/go9NAyA4qqzNzV\nunpOLMZLowiW11curMLhFEPmwqSkOmU8h6XDaE11CA4Rp5TbxO286KQXTu9nPNZj\nl/7z5WlSFZ03+nepPVJLfjklwfFi/0xsW629BgDY9jQhoxXJ6L8ofnGZetmJE7uM\nuIT8eP3cpxd6Y2Ku5XINUHchURE2w3CXbxU/aZ3rTVh4j5mm+Br2ctBDWP7RXbb5\nHZfjP/B4/pBdQbAqO0g8AinCgUjqtENRQXSbQnfBeycZajMAc53fjB5daKp4tgET\niXbr2Y4FAgMBAAECggEAF4d6bW7yb+kiNyuzHljrIHUELPmzrusAJ5jMU56Vk3w7\nVP5bs1eNvmUYpeo8vrj9iG0f2+gr4n/Sif4ND8gFWEJMplOigS4b81wnz063HBGz\nk2gONZyrVv5gThQpjFixQDtFPLyjMgEzqbja3BR5AjvTHzQxQEDkWMhOiDQaB9X7\nxX5Pd+9r8qvuZjaaLSUMaeSE8EEJXlC1v785ML+T4C922CB2nYdCCMGU5dSBoDd+\nlaVu6v32xefCBbb/BWjPBhLKJKxyomYfOmPZ2COBfEaT48a6tbj+QgINlEf5vrop\nsoReHQoL8b/dEV6F/5D5J0wqzloNN/0TPlp8mRwsyQKBgQD4DRmEOKrptQ09qugE\n070RtPf5IudJowx5qKl8yoMuZqwhxHo17rdSDdoZDm85slEFHMbJTcyYVJuFeQg9\njPXEuGKLYu0C6DnMI0vIvrZi+CXXmXUv839LqyC/hi10FjgNR6cB1RWVBlXq6FRL\nqtTlwZUfpSVbODodDFTWNgAv6QKBgQDf/3IfWNnR6PTlV+DJdvpNYehuJetOIIYb\nRl1Zrt2C3WhX9UxoaU+fqykpsfDgvhprE+SRN+zuiGE0ZzzkAnM/DQoXOaJj/s3w\nmZa+buLfRv6aif+0ALuSqstlac6jJK2hy1+RJMWuUgvdsqUp362zYMi3hPeYJMYJ\nZWmdaz5XvQKBgGpD0maekDnG4oFEslk/DISFbqZAma0mOLX114Yqi8BZI+zjayen\nuMliPcj2MhgZmDQEe/TJa5jmximMDEeyF6fLBgyIuNjB++DETjcV3LTRcgTHLTj5\nq9MS4Nir9tUAn8qwo49ZZgGN0Ujtdw9jhAlZwTTpXvORRvQi0EVkpPfhAoGBAJe4\nSC5fWjpJ1ga5vTH4epWLaYmh+X2TngI/aN9kB/mpyhE5vyVBn4MAxgLN2eAAI5i/\ngqOyA7OVgHGkM6Qk3LaqOFl+2jVs00TSYz5dkSG2zqESM7ZSgLpZISdxwVrTbyAV\nxodjJtpqDEt/w0tXjCnhtlJHqATPc6vNmvnbOADpAoGAZI9K+xR5zhcXJyTd+Zyc\nxi81CDOsF4IdQZ2xdF1q/KP6GXtCYub6DRaFafgB/JpX7sv1SJXYYhALUrKUp4tT\nn2G+GlKzbO/22n0TRG+h1BoewZNI8tDY2+5upun3DNQuL+uOb6RHDcj8gTfTwGPM\nkOLEeTEET4OzgeQ5mBLH+NI=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-x3utj@somaiya-sch-design.iam.gserviceaccount.com",
    "client_id": "112799612480714118248",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x3utj%40somaiya-sch-design.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };


const firebase =  initializeApp(firebaseConfig);


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (userCredential && userCredential.user) {
        await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
          email: email,
          approved: false // Setting the 'Approved' field to false by default
        });
        console.log('User signed up successfully!');
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <h2>User Sign Up</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
