# Reviews & Ratings API
A fully developed back-end application scaled to support thousands of requests per second, as well as over 30 million rows of data for the Reviews & Ratings section of an e-Commerce page.

<h2>API Endpoints</h2>

| Method | Endpoint | Description | Parameters |
| ------------- | ------------- | ------------- | ------------- |
| GET | /reviews | Retrieve reviews | product_id, page, count, sort |
| GET | /reviews/meta | Retrieve review metadata | product_id | 
| PUT | /reviews/:review_id/helpful | Mark a review as helpful | review_id | 
| PUT | /reviews/:review_id/report | Mark a review as reported | review_id | 
| POST | /reviews | Save a review into the database | product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email | 

<h2>Technologies Used</h2>

| Technology | Description |
| ------------- | ------------- |
| [Node.js](https://github.com/nodejs/node/)  | RESTful API  |
| [PostgreSQL](https://github.com/postgres/postgres)  | Relational Database Management System  |
| [NGINX](https://github.com/nginx/nginx) | Load Balancing and Reverse Proxy  |
| [k6](https://github.com/grafana/k6)   | Load Testing (Local)  |
| [Loader.io](https://loader.io/) | Load Testing (Cloud)  |
| [ESLint](https://github.com/eslint/eslint) | Code Quality ([Airbnb Style Guide](https://github.com/airbnb/javascript)) |

<h2>Performance Metrics (Local)</h2>

<h3>k6</h3>
Objectives:
<ul>
  <li>Reach 1000 requests per second</li>
  <li>Remain under 50ms response time</li>
</ul>

<h3>Endpoint: /reviews</h3>

![image](https://user-images.githubusercontent.com/97769405/166124353-244cd936-74b7-4c96-b5c3-47d741fdafe4.png)

<h3>Endpoint: /reviews/meta</h3>

![image](https://user-images.githubusercontent.com/97769405/166124355-3346d700-e82a-4e53-a038-0d5f8a2f0e5d.png)


<h2>Performance Metrics (Cloud)</h2>

<h3>Loader.io</h3>
Objectives:
<ul>
  <li>Scale horizontally and limit test with the addition of new servers</li>
  <li>Remain under 2000ms response time</li>
  <li>Remain under 1% error rate</li>
</ul>

<h3>Endpoint: /reviews</h3>

![image](https://user-images.githubusercontent.com/97769405/166124393-8b7ac7ab-adf2-4d19-b56b-1e7e1aee9198.png)


<h3>Endpoint: /reviews/meta</h3>

![image](https://user-images.githubusercontent.com/97769405/166124385-329ce029-8aba-47f2-9efa-169d1b41be87.png)


