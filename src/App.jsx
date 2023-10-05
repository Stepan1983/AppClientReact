import React, { useState, useEffect } from 'react';
import './App.css';
import TrackUpload from './TrackUpload';


function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUsername, setLoggedInUsername] = useState(localStorage.getItem('username') || '');
  

  


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            
            setIsLoggedIn(true);
        }
    }, []);

    const handleRegister = () => {
        // Отправка данных о новом пользователе на сервер
        fetch('https://primarycheerfulpostgres.stiepanbastanzh.repl.co/register.php', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ответ от сервера при входе в систему:', data);

            if (data.success) {
                localStorage.setItem('token', data.token);
                setLoggedInUsername(data.username);
                localStorage.setItem('username', username);// Устанавливаем имя пользователя из ответа сервера в состояние
                setIsLoggedIn(true);
                window.location.reload();
            } else {
                console.error('Произошла ошибка при входе в систему:', data.message);
            }
        })
        .catch(error => {
            console.error('Произошла ошибка при входе в систему:', error);
        });
    };

    const handleLogin = () => {
    // Отправка данных для входа на сервер
    fetch('https://primarycheerfulpostgres.stiepanbastanzh.repl.co/login.php', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ответ от сервера при входе в систему:', data);

            if (data.success) {
                localStorage.setItem('token', data.token);
                
                setLoggedInUsername(data.username);
                localStorage.setItem('username', username);// Устанавливаем имя пользователя из ответа сервера в состояние
                setIsLoggedIn(true);
                window.location.reload();
            } else {
                console.error('Произошла ошибка при входе в систему:', data.message);
            }
        })
        .catch(error => {
            console.error('Произошла ошибка при входе в систему:', error);
        });
};

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <div>
                    <h1>Добро пожаловать, {loggedInUsername}!</h1>
                    <button onClick={handleLogout}>Выйти</button>
                    <TrackUpload token={localStorage.getItem('token')} />
                   
                </div>
            ) : (
                <div>
                    <h1>Пожалуйста, войдите или зарегиструйтесь</h1>              
                    <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Войти</button>
                    <button onClick={handleRegister}>Зарегистрироваться</button>
                </div>
          
            )}
          
        </div>
    );
}

export default App;
