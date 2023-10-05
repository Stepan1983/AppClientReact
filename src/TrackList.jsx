import React, { useState, useEffect } from 'react';


function TrackList() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        // Запрос к серверу для получения имен файлов
        fetch('https://primarycheerfulpostgres.stiepanbastanzh.repl.co/getTracks.php')
            .then(response => response.json())
            .then(data => {
                // Создаем полные пути к файлам на клиенте
                const fullPaths = data.map(filename => ({
                    name: filename,
                    path: `https://primarycheerfulpostgres.stiepanbastanzh.repl.co/uploads/${filename}`
                }));
                //setTracks(fullPaths);
            })
            .catch(error => {
                console.error('Произошла ошибка при получении списка треков:', error);
            });
    }, []);

    return (
        <div>
            <h1>Список загруженных треков</h1>
            <div>
                {tracks.map((track, index) => (
                    <audio key={index} controls>
                        <source src={track.path} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                ))}
            </div>
        </div>
    );
}

export default TrackList;
