
# Simple Setup Guide for Termux

## 1. Install Termux
- Download and install **Termux** from the [Google Play Store](https://play.google.com/store/apps/details?id=com.termux) or [F-Droid](https://f-droid.org/en/packages/com.termux/).
- Open **Termux**.

## 2. Update and Upgrade Termux
- Run the following commands to update and upgrade the package manager:
  ```bash
  pkg update && pkg upgrade
  ```

## 3. Install Node.js and Git
- To install **Node.js** (required to run the bot) and **Git** (to download the project):
  ```bash
  pkg install nodejs git
  ```

## 4. Clone the Project
- Use **Git** to download your project. Run the following command:
  ```bash
  git clone https://github.com/devrock-sys/mb-selfbot.git
  ```
- After cloning, go to the project directory:
  ```bash
  cd https://github.com/devrock-sys/mb-selfbot.git
  ```

## 5. Edit the `config.js` file
- If there’s no `config.js` file, create one by running:
  ```bash
  nano config.js
  ```
- Add your bot’s token and other settings to the file. Here's an example:
  ```js
  module.exports = {
      token: 'your_discord_bot_token',
      prefix: '!',
      allowedUserIDs: ['your_user_id_here'],
      allowedNoPrefixUserIDs: ['your_user_id_here'],
      ltcAddress: 'your_ltc_address',
      paypalID: 'your_paypal_id',
  };
  ```
- Save the file by pressing `CTRL + O`, then `Enter`. Exit the editor by pressing `CTRL + X`.

## 6. Install Dependencies
- Install the required project dependencies using:
  ```bash
  npm install
  ```

## 7. Run the Bot
- Start the bot with the following command:
  ```bash
  node index.js
  ```
- If you want to create a script for easy starting:
  1. Create a start script:
     ```bash
     nano start.sh
     ```
  2. Add this to the script:
     ```bash
     #!/bin/bash
     node index.js
     ```
  3. Save and exit (`CTRL + O`, `Enter`, then `CTRL + X`).
  4. Make it executable:
     ```bash
     chmod +x start.sh
     ```
  5. Run the script:
     ```bash
     ./start.sh
     ```

## 8. Keep the Bot Running
- To keep the bot running after you close Termux, install **pm2**:
  ```bash
  npm install -g pm2
  ```
- Start the bot with **pm2**:
  ```bash
  pm2 start index.js
  ```

## 9. Optional: Using `screen` to Keep the Bot Running
- Alternatively, you can use **screen** to keep your bot running in the background:
  1. Install **screen**:
     ```bash
     pkg install screen
     ```
  2. Start a new screen session and run the bot:
     ```bash
     screen -S bot
     node index.js
     ```
  3. To detach from the screen without stopping the bot, press `CTRL + A`, then `D`.
  4. To resume the session later:
     ```bash
     screen -r bot
     ```

## 10. Troubleshooting
- If there are issues, check:
  - Node.js is properly installed by running `node -v`.
  - You’ve added the correct token and information in `config.js`.
  - If dependencies failed, try running `npm install` again.

