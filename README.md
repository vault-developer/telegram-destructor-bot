# Factorization - Telegram bot

Telegram bot which can make factorization of number =)

## Find in Telegram now
You can find this bot in Telegram by name `@razlagator_bot` or can enter by [short link](https://tttttt.me/razlagator_bot).

## How to start project

1. Create `.env` file
2. Register new Telegram bot in `@BotFather`
3. Find Telegram proxy
4. Add all config variable in `.env` file
    ```dotenv
    TELEGRAM_BOT_TOKEN=...
    TELEGRAM_PROXY_HOST=...
    TELEGRAM_PROXY_PORT=...
    TELEGRAM_PROXY_USERNAME=...
    TELEGRAM_PROXY_PASSWORD=...
    ```
5. You need Docker on your PC
6. `docker build -t telegram-bot/factorization`
7. `docker run -d telegram-bot/factorization`