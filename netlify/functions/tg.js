exports.handler = async (event) => {
    // Разрешаем только POST-запросы
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    try {
        // Получаем данные от бота
        const body = JSON.parse(event.body);
        
        // ВСТАВЬ СВОЙ ТОКЕН СЮДА (без слова bot)
        const TG_TOKEN = "9263108544:AAGo7K3U6DLLdbQkaTFywaIoCVfpTszM96Y"; 
        
        // Формируем адрес для настоящего Telegram
        const tgUrl = `https://api.telegram.org/bot${TG_TOKEN}/${body.method}`;
        
        // Пересылаем запрос в Telegram
        const response = await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body.params)
        });
        
        const data = await response.json();
        
        // Возвращаем ответ от Telegram обратно боту
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    } catch (e) {
        return { statusCode: 500, body: e.toString() };
    }
};
