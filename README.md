# Reviews & Ratings API
A fully developed back-end project scaled to support thousands of requests per second, as well as over 30 million rows of data for the Reviews & Ratings section of an e-Commerce page.

<h2>Technologies Used</h2>

- [Node.js](https://github.com/nodejs/node/) - RESTful API
- [PostgreSQL](https://github.com/postgres/postgres) - database
- [NGINX](https://github.com/nginx/nginx) - load balancing
- [k6](https://github.com/grafana/k6) - load testing (local)
- [Loader.io](https://loader.io/) - load testing (cloud)
- [ESLint](https://github.com/eslint/eslint) - code quality ([Airbnb Style Guide](https://github.com/airbnb/javascript))


<h2>Performance Metrics</h2>

<h3>Local Testing (with k6)</h3>
Goal:
<ul>
  <li>Reach 1000 requests per second</li>
  <li>Remain under 50ms response time</li>
</ul>


<h3>Cloud Testing (with Loader.io)</h3>
Goal:
<ul>
  <li>Scale horizontally</li>
  <li>Remain under 2000ms response time</li>
  <li>Remain under 1% error rate</li>
</ul>
