import request from 'supertest';
import express from 'express';

// Create a minimal Express app for testing
const app = express();
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

describe('Health Endpoint', () => {
  it('should return 200 and status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });
});