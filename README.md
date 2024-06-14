# Force++ (F++)

Force++ (F++ for short) is a Telegram bot designed to notify users about upcoming coding contests on popular competitive programming platforms. Currently, the bot supports notifications for LeetCode, Codeforces and CodeChef contests.

## ⚠️ Development Status

**Note: This bot is heavily unstable and highly in development.** Use it at your own risk, and expect frequent changes and potential issues. As of now, it works for a single group or person configured by the chat ID in environment variables.

## Installation

1. Clone the repository:
    ```sh
    git clone https://git.ptr.moe/adithyagenie/forceplusplus.git
    cd forceplusplus
    ```

2. Install the required dependencies:
    ```sh
    pnpm install
    ```

3. Set up your environment variables. Create a `.env` file in the root directory and add the following:
    ```env
    RUN_METHOD="WEBHOOK" or "POLLING"
    BOT_TOKEN="your_telegram_bot_token"
    WEBHOOK_URL="your_webhook_url"
    WEBHOOK_SECRET="your_webhook_secret"
    PORT=your_port_number
    CHAT_ID="your_chat_id"
    ```

4. Run the bot:
    ```sh
    pnpm start
    ```

## Configuration

- **RUN_METHOD**: The method to run the bot. Use `"WEBHOOK"` for webhook mode or `"POLLING"` for polling mode.
- **BOT_TOKEN**: The token you get from BotFather on Telegram.
- **WEBHOOK_URL**: The URL for the webhook (required if using webhook mode).
- **WEBHOOK_SECRET**: The secret for the webhook (required if using webhook mode).
- **PORT**: The port number to run the webhook server on (required if using webhook mode).
- **CHAT_ID**: The chat ID of the group or person where the bot will send notifications.

## Usage

Once the bot is running, it will automatically send notifications about upcoming contests to the configured chat ID.

## License

This project is licensed under the AGPL-v3.0 License. See the [LICENSE](LICENSE) file for details.
