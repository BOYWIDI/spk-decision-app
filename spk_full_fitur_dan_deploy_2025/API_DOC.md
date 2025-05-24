# 📘 Dokumentasi API SPK (Sistem Pendukung Keputusan)

## 🔐 Auth

### POST /api/auth/register
**Deskripsi:** Registrasi user baru  
**Body:**
```json
{
  "username": "johndoe",
  "password": "secret123",
  "name": "John Doe",
  "age": 25
}
```
**Response:** 201 Created / 400 Bad Request

---

### POST /api/auth/login
**Deskripsi:** Login user/admin  
**Body:**
```json
{
  "username": "johndoe",
  "password": "secret123"
}
```
**Response:** 200 OK dengan token JWT

---

### POST /api/auth/google
**Deskripsi:** Login via akun Google  
**Body:**
```json
{
  "credential": "GOOGLE_ID_TOKEN"
}
```
**Response:** 200 OK dengan token JWT

---

## 👤 User

### GET /api/users/me
**Deskripsi:** Ambil profil user yang login  
**Header:** Authorization: Bearer {token}

---

### PUT /api/users/change-password
**Deskripsi:** Ganti password user  
**Body:**
```json
{
  "oldPassword": "oldpass",
  "newPassword": "newpass123"
}
```

---

### PUT /api/users/:id/reset-password *(Admin)*
**Deskripsi:** Reset password user ke `user123`  
**Header:** Authorization: Bearer {admin_token}

---

## ❓ Pertanyaan

### GET /api/questions
**Deskripsi:** Ambil semua pertanyaan

---

### POST /api/questions *(Admin)*
### PUT /api/questions/:id *(Admin)*
### DELETE /api/questions/:id *(Admin)*

---

## 📝 Jawaban / Respon

### POST /api/responses
**Deskripsi:** Kirim jawaban user  
**Body:**
```json
{
  "answers": ["1", "2", "3"]
}
```

### GET /api/responses *(Admin)*  
### GET /api/responses/export *(Admin)* → File Excel (.xlsx)

---

## 📊 Dashboard (Admin)

### GET /api/dashboard
**Deskripsi:** Statistik jumlah user, respon, distribusi usia

---

## 🔐 Autentikasi
Semua endpoint selain login/register memerlukan header:
```
Authorization: Bearer {token}
```