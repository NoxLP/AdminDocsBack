# Admin docs Back API

REST API for Admin docs app written in Javascript, Node.js, Express.

Updated at 07/12/21

## Data Model

---

### **User Model:**

| Field             | Type     | Required    | Validation  | Default | Description                        |
| ----------------- | -------- | ----------- | ----------- | ------- | ---------------------------------- |
| name              | string   | yes         | -           | -       | User name                          |
| email             | string   | yes(unique) | email       | -       | User email                         |
| mobile_number     | string   | yes(unique) | 8-12 digits | -       | User mobile number                 |
| password          | string   | yes         | -           | -       | Password (encrypted)               |
| community         | ObjectId | yes         | -           | -       | User community Id                  |
| documents         | Array    | yes         | -           | -       | ObjectId: Array - ref: Documents   |
| floor             | ObjectId | yes(unique) | -           | -       | User floor Id                      |
| recover_pass_code | string   | no          | -           | -       | Recovery password code (encrypted) |

---

### **Communities model:**

| Field   | Type   | Required | Validation | Default | Description                                      |
| ------- | ------ | -------- | ---------- | ------- | ------------------------------------------------ |
| name    | string | yes      | -          | -       | Community name                                   |
| address | string | yes      | -          | -       | Community address                                |
| floors  | Array  | yes      | -          | -       | Community floors - ObjectId: Array - ref: Floors |

---

### **Floors model:**

| Field     | Type     | Required | Validation | Default | Description           |
| --------- | -------- | -------- | ---------- | ------- | --------------------- |
| name      | string   | yes      | -          | -       | Floor name(f.i.: 1??A) |
| community | ObjectId | yes      | -          | -       | User community Id     |
| user      | ObjectId | yes      | -          | -       | User Id               |

---

### **Document model:**

| Field       | Type     | Required | Validation | Default | Description                                                     |
| ----------- | -------- | -------- | ---------- | ------- | --------------------------------------------------------------- |
| data        | Buffer   | yes      | -          | -       | Document file data                                              |
| contentType | string   | yes      | -          | -       | Document file mime type                                         |
| community   | ObjectId | yes      | -          | -       | User community Id                                               |
| user        | ObjectId | yes      | -          | -       | User Id                                                         |
| date        | Date     | yes      | -          | -       | Document upload date                                            |
| category    | string   | yes      | -          | -       | Document category choose by user: Invoice, Mail, Notice, Others |
| name        | string   | yes      | -          | -       | Document name written by user                                   |
| comments    | string   | yes      | -          | -       | Document comments written by user                               |

## API endpoints

---

All API endpoints prepended with `/api/`

### **Auth:**

| METHOD | ENDPOINT                | TOKEN | DESCRIPTION                                 | POST PARAMS                                       | RETURNS                                                                                 |
| ------ | ----------------------- | ----- | ------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| POST   | /auth/signup            | -     | User signup                                 | `name, email, password, community, mobile, floor` | `token; user profile: mobile_number, community, email, name, id, floor`                 |
| POST   | /auth/login             | -     | User login                                  | `mobile, password`                                | `token; user profile: mobile_number, community, email, name, id, floor`                 |
| GET    | /auth/check             | yes   | Token check                                 | -                                                 | `msg: 'Token is valid'; user profile: mobile_number, community, email, name, id, floor` |
| POST   | /auth/recover-pass-data | -     | Password recovery: data to find user        | `email \| mobile_number`                          | -                                                                                       |
| POST   | /auth/recover-pass-code | -     | Password recovery: check code sent by email | `email \| mobile_number, code`                    | -                                                                                       |
| POST   | /auth/recover-pass-pass | -     | Password recovery: set new password         | `email \| mobile_number, password`                | `token; user profile: mobile_number, community, email, name, id, floor`                 |

---

### **User:**

| METHOD | ENDPOINT    | TOKEN | DESCRIPTION                      | POST PARAMS | RETURNS              |
| ------ | ----------- | ----- | -------------------------------- | ----------- | -------------------- |
| GET    | /users/docs | yes   | Get authenticated user documents | -           | Documents array      |
| GET    | /users/:id  | yes   | Get user profile by id           | -           | User profile         |
| DELETE | /users/:id  | yes   | Remove user by id                | -           | Removed user profile |
| PUT    | /users/:id  | yes   | Remove user by id                | -           | Removed user profile |

---

### **Communities:**

| METHOD | ENDPOINT                   | TOKEN | DESCRIPTION                                         | POST PARAMS | RETURNS                   |
| ------ | -------------------------- | ----- | --------------------------------------------------- | ----------- | ------------------------- |
| GET    | /communities/docs          | yes   | Get all documents of authenticated user's community | -           | Array of documents        |
| GET    | /communities/register-dtos | no    | Get communities DTOs for signup screen              | -           | Array of communities DTOs |

---

### **Documents:**

| METHOD | ENDPOINT       | TOKEN | DESCRIPTION                        | POST PARAMS                                                                      | RETURNS                   |
| ------ | -------------- | ----- | ---------------------------------- | -------------------------------------------------------------------------------- | ------------------------- |
| POST   | /documents     | yes   | Add document to authenticated user | `Form data: image, contentType, community, user, date, category, name, comments` | `msg: 'Document added'`   |
| PUT    | /documents/:id | yes   | Edit document by id                | `Form data: image, contentType, community, user, date, category, name, comments` | `msg: 'Document edited'`  |
| DELETE | /documents/:id | yes   | Remove document by id              | `Form data: image, contentType, community, user, date, category, name, comments` | `msg: 'Document removed'` |
