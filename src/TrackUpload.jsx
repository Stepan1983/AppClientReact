
import React, { useState, useEffect } from 'react';
 const storedUsername = localStorage.getItem('username');

function TrackUpload({ token }) {
    const [file, setFile] = useState(null);
    const [tracks, setTracks] = useState([]);

  useEffect(() => {
        if (token) {
            // Запрос к серверу для получения списка треков
            fetch('https://primarycheerfulpostgres.stiepanbastanzh.repl.co/getTracks.php', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${storedUsername}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    setTracks(data);
                })
                .catch(error => {
                    console.error('Произошла ошибка при получении списка треков:', error);
                });
        }
    }, [token]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

   

const handleUpload = (event) => {
    event.preventDefault();

    if (!file) {
        console.error('Пожалуйста, выберите файл.');
        return;
    }

    const formData = new FormData();
    formData.append('audio', file);

    fetch('https://primarycheerfulpostgres.stiepanbastanzh.repl.co/upload.php', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': `Bearer ${storedUsername}`
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Произошла ошибка при загрузке файла:', error);
        });
};

    return (
        <div>
           
            <h1>Загрузка аудиофайла</h1>
            <form onSubmit={handleUpload} encType="multipart/form-data">
                <label htmlFor="audioFile">Выберите аудиофайл:</label>
                <input type="file" id="audioFile" name="audio" accept=".mp3, .wav, .ogg" onChange={handleFileChange} required />
                <br />
                <button type="submit">Загрузить</button>
            </form>

          <h1>Список загруженных треков</h1>
            <ul>
                {tracks.map((track, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: track }} />
                ))}
            </ul>
         
        </div>
    );
}

export default TrackUpload;
