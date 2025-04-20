<?php

require 'vendor/autoload.php';

use Telegram\Bot\Api;

$telegram = new Api('6968842126:AAHfYXGRtGw5IvN48QpGsXToc445ojsRcdk'); // 🔁 Замени на свой токен

$update = $telegram->getWebhookUpdate();

$message = $update->getMessage();

if ($message) {
    $chatId = $message->getChat()->getId();
    $text = $message->getText();

    // Ответ на сообщение
    $telegram->sendMessage([
        'chat_id' => $chatId,
        'text' => "Вы написали: $text"
    ]);
}
