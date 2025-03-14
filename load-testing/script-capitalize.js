import http from 'k6/http';
import { check } from 'k6';

// Опции за теста, включващи два сценария
export const options = {
  scenarios: {
    // Сценарий 1: 10 виртуални потребители за 1 минута
    scenario1: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
    },
    // Сценарий 2: 20 виртуални потребители за 30 секунди
    scenario2: {
      executor: 'constant-vus',
      vus: 20,
      duration: '30s',
    },
  },
};

export default function () {
  const url = 'http://localhost:8080/capitalize'; // Заменете с вашия реален URL
  const payload = JSON.stringify({
    text: 'hello world', // Примерен текст, който ще изпращате
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Изпращане на POST заявка към /capitalize
  const response = http.post(url, payload, params);

  // Проверка на статус кода, трябва да е 200 OK
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time is < 200ms': (r) => r.timings.duration < 200,
  });
}
