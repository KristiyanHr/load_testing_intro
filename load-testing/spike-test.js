import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [{ duration: '10s', target: 50 }],
};

export default function () {
  let res = http.get('http://localhost:8080/');
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}