import amqp from 'amqplib';
import { sendEmail } from '../services/email/email.service';
import path from 'path';
import fs from 'fs';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost:5672';

interface EmailMessage {
  type: 'VERIFICATION' | 'PASSWORD_RESET' | 'PASSWORD_CHAGE' | string;
  email: string;
  payload: Record<string, string>;
}

async function startEmailConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = 'emails';

    await channel.assertQueue(queue, { durable: true });

    console.log('Waiting for email messages...');

    channel.consume(queue, async (msg) => {
      if (msg) {
        const message: EmailMessage = JSON.parse(msg.content.toString());
        const { type, email, payload } = message;
        
        try {
          const templatePath = path.join(__dirname, `../templates/${type}.html`);
          let html = fs.readFileSync(templatePath, 'utf-8');

          Object.entries(payload).forEach(([key, value]) => {
            const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            html = html.replace(placeholder, value.toString());
          });

          const subject = type === 'VERIFICATION' 
            ? 'Verify Your Email' 
            : type === 'PASSWORD_RESET'
              ? 'Password Reset Request'
              : 'Notification';

          await sendEmail({
            to: email,
            subject,
            html
          });

          channel.ack(msg);
          console.log(`Sent ${type} email to ${email}`);
        } catch (error) {
          console.error(`Failed to process ${type} email:`, error);
          channel.nack(msg);
        }
      }
    });
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
    process.exit(1);
  }
}

export { startEmailConsumer };