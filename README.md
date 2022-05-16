# Reviews & Ratings API
A fully developed back-end application scaled to support thousands of requests per second, as well as over 30 million rows of data for the Reviews & Ratings section of an e-Commerce page.

<h2>Technologies</h2>

- [Node.js](https://github.com/nodejs/node/) - RESTful API
- [PostgreSQL](https://github.com/postgres/postgres) - Relational Database
- [AWS](https://aws.amazon.com/) - EC2 Instances
- [NGINX](https://github.com/nginx/nginx) - Load Balancing
- [k6](https://github.com/grafana/k6) - Load Testing (Local)
- [Loader.io](https://loader.io/) - Load Testing (Cloud)
- [ESLint](https://github.com/eslint/eslint) - Code Quality ([Airbnb Style Guide](https://github.com/airbnb/javascript))

<h2>Getting Started</h2>

1. Fork and clone:
```
git clone https://github.com/Samosas-SDC/reviews-api.git
```

2. Install dependencies:
```
npm install
```

3. Configure your database settings in .env


4. Start the server:
```
npm start
```

<h2>API Endpoints</h2>

**GET /reviews**
| Parameter | Type | Description |
| ------------- | ------------- | ------------- |
| product_id | integer | Specifies the product for which to retrieve reviews |
| page | integer | Selects the page of results to return |
| count | integer | Specifies how many results per page to return |
| sort | text | Changes the sort order of reviews based on "newest", "helpful", or "relevant" |

**Response**

Status: 200 OK
```
{
  "product": "40344",
  "page": 1,
  "count": 1,
  "results": [
    {
      "review_id": 5,
      "rating": 5,
      "summary": "This product is amazing!!!",
      "recommend": true,
      "response": null,
      "body": "OMG I cannot stress this enough. This product is amazing!",
      "date": "2022-01-01T00:00:00.000Z",
      "reviewer_name": "jtang",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_40344_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_40344_photo_number_2.jpg"
        },
      ]
  ]
}
```

**GET /reviews/meta**
| Parameter | Type | Description |
| ------------- | ------------- | ------------- |
| product_id | integer | Specifies the product for which to retrieve metadata |


**Response**

Status: 200 OK

```
{
  "product_id": "40344",
  "ratings": {
    1: 3
    2: 4,
    3: 6,
    4: 12,
    5: 20,
  },
  "recommended": {
    0: 5,
    1: 22,
  },
  "characteristics": {
    "Size": {
      "id": 10,
      "value": "4.0"
    },
    "Width": {
      "id": 11,
      "value": "3.5"
    },
    "Comfort": {
      "id": 12,
      "value": "4.0"
    },
}
```


**PUT /reviews/:review_id/helpful**
| Parameter | Type | Description |
| ------------- | ------------- | ------------- |
| review_id | integer | Specifies the review to mark as helpful |

**Response**

Status: 204 NO CONTENT


**PUT /reviews/:review_id/report**
| Parameter | Type | Description |
| ------------- | ------------- | ------------- |
| review_id | integer | Specifies the review to mark as reported |

**Response**

Status: 204 NO CONTENT

**POST /reviews**
| Parameter | Type | Description |
| ------------- | ------------- | ------------- |
| product_id	| integer | ID of the product to post the review for |
| rating	| integer | Indicating the review rating (1-5) |
| summary	| text | Summary text of the review |
| body	| text | Full text of the review |
| recommend	| boolean | Value indicating if the reviewer recommends the product |
| name | text | Username of the reviewer |
| email	| text |	Email address of the reviewer |
| photos | [text] |	Array of image URLs |
| characteristics	| object |	Object of keys representing characteristic_id and values representing their ratings { "14": 5, "15": 5 //...} |

**Response**

Status: 201 CREATED

<h2>Local Performance Tests with k6</h2>

Objectives:
<ul>
  <li>Reach 1000 requests per second</li>
  <li>Remain under 50ms response time</li>
</ul>

<h3>Endpoint: /reviews</h3>

![image](https://user-images.githubusercontent.com/97769405/166124353-244cd936-74b7-4c96-b5c3-47d741fdafe4.png)

<h3>Endpoint: /reviews/meta</h3>

![image](https://user-images.githubusercontent.com/97769405/166124355-3346d700-e82a-4e53-a038-0d5f8a2f0e5d.png)


<h2>Cloud Performance Tests with Loader.io</h2>

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


