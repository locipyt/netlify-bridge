exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    try {
        const body = JSON.parse(event.body);
        
        // Берем токен из настроек Netlify (Environment variables)
        const TG_TOKEN = process.env.TG_TOKEN; 
        
        if (!TG_TOKEN) {
            return { statusCode: 500, body: 'Token is missing in settings' };
        }

        const tgUrl = `https://api.telegram.org/bot${TG_TOKEN}/${body.method}`;
        
        const response = await fetch(tgUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body.params)
        });
        
        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    } catch (e) {
        return { statusCode: 500, body: e.toString() };
    }
};
