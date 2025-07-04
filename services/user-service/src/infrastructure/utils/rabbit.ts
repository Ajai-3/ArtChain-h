import amqplib from "amqplib";

export const publishToQueue = async (queueName: string, data: any) => {
  const connection = await amqplib.connect(process.env.RABBIT_URL!);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
  await channel.close();
  await connection.close();
};
