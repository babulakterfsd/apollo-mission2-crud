import { rainbow, red } from 'colors';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(
        rainbow(
          `Connected to databse and app is running on port ${config.port}`
        ).bold
      );
    });
  } catch (err) {
    console.log(red(`Error: ${err}`).bold);
  }
}

main();
