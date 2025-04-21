from flask import Flask, request
import requests
import os

app = Flask(__name__)

# Токен из переменной окружения
TOKEN = '6968842126:AAHfYXGRtGw5IvN48QpGsXToc445ojsRcdk'
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TOKEN}/sendMessage"

@app.route('/')
def index():
    return 'Бот запущен!'

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.get_json()

    if 'message' in data:
        chat_id = data['message']['chat']['id']
        text = data['message'].get('text', '')

        reply = f"Привет! Вы написали: {text}"

        # Отправка ответа
        requests.post(TELEGRAM_API_URL, json={
            'chat_id': chat_id,
            'text': reply
        })

    return 'ok'