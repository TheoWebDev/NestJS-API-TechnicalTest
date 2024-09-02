
## API Reference

### Users
#### Get User by Email

```http
  GET /user?email=${userEmail}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email user |

#### Put User (Create an user if doesn't exists)

```http
  PUT /userapi/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. email User |
| `username`      | `string` | **Required**. username User |

### Child-cares
#### Get All Child-cares

```http
  GET /child-cares
```

#### Create a child-care

```http
  POST /child-care
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email User |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name |
| `createdBy`      | `int` | **Required**. User ID |

#### Delete a child-care

```http
  DELETE /child-care/${id}?userId=${userId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Nursery ID |
| `userId`      | `int` | **Required**. User ID |

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email User |

### Children
#### Create a child

```http
  POST /child
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email User |

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `firstname`      | `string` | **Required**. Firstname child |
| `lastname`      | `string` | **Required**. Lastname child |
| `createdBy`      | `int` | **Required**. User ID |
| `nurseryId`      | `int` | **Required**. Nursery ID |

#### Get All children in child-care

```http
  GET /child-car/${id}/children
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | **Required**. Nursery ID |

#### Delete child in a child-care

```http
  DELETE /child/${nurseryId}/child/${childId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nurseryId` | `int` | **Required**. Nursery ID |
| `childId` | `int` | **Required**. Child ID |

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email User |

#### Get Child-care By ID

```http
  GET /child-care/${nurseryId}
```

### Children Export CSV
#### Export All Children

```http
  GET /children/export
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `n/a` | `n/a` | n/a |

#### Export By Child-care

```http
  GET /children/export/${nurseryId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `nurseryId` | `int` | **Required**. Nursery ID |
