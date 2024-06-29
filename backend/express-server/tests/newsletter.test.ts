import request from 'supertest';
import App from '../src/app';

const app = new App();

test('Should signup email to newsletter', async () => {
  await request(app.express)
    .post('/newsletter/signup')
    .send({
      email: 'email@example.com',
    })
    .expect(201);
});
