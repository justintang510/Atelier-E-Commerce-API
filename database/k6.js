import http from 'k6/http';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 2000,
      timeUnit: '1s',
      duration: '60s',
      preAllocatedVUs: 100,
      maxVUs: 5000,
    },
  },
};

export default function () {
  // http.get(`http://localhost:3000/reviews?sort=newest&count=2&page=1&product_id=${Math.floor(Math.random()*1000000)}`);

  // http.put(`http://localhost:3000/reviews/${Math.floor(Math.random()*1000000)}/helpful`);

  // http.put(`http://localhost:3000/reviews/${Math.floor(Math.random()*1000000)}/report`);

  // http.get(`http://localhost:3000/reviews/meta?product_id=${Math.floor(Math.random()*100000)}`);
}