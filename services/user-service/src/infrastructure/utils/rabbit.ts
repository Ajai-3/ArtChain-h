import amqp from 'amqplib';
import { config } from '../config/env';

export async function publishToQueue(queue: string, message: object) {
  try {
    const connection = await amqp.connect(config.rabbitmq_URL);
    const channel = await connection.createChannel();
    
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    
    console.log(`Message sent to ${queue}`);
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error('RabbitMQ error:', error);
  }
}