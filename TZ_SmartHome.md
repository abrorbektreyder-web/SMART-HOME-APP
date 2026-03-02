# TEXNIK TOPSHIRIQ (TZ): PREMIUM "SMART HOME" UNIVERSAL MOBIL ILOVASI

## 1. LOYIHA MAQSADI VA OBYEKTIVI
**Maqsad:** O'zbekiston bozori uchun mo'ljallangan, istalgan brenddagi (Tuya, Xiaomi, Sonoff va h.k.) aqlli qurilmalarni bitta joydan boshqarish imkonini beruvchi, vizual jihatdan eng yuqori "Premium" darajadagi, tez va ishonchli ishlaydigan Universal Mobil Ilova (iOS va Android) yaratish. Ilova dizayni aynan https://smart-home-mobile.aura.build/ referensi (Neumorphism va Voice-first) asosida 1:1 ko'chiriladi.

**Target Auditoriya:** O'z uyi yoki kvartirasiga aqlli tizim o'rnatgan, qulaylik qidiradigan, O'zbekistondagi zamonaviy foydalanuvchilar (B2C) va premium turar-joy quruvchi kompaniyalar (B2B).

---

## 2. TEXNOLOGIK STEK (PREMIUM SIFAT UCHUN)
Eng zamonaviy, silliq va qotmaydigan ishlashi hamda kelajakda kengaytirish oson bo'lishi uchun quyidagi texnologiyalar tanlandi:

*   **Mobil Ilova (Frontend): React Native (CLI yoki Expo)**
    *   *Nima uchun?* Bitta kod bilan ham iOS, ham Android ilova chiqaramiz. Silliq 60FPS animatsiyalar uchun **React Native Reanimated** va **Skia** ishlatamiz (aynan termostatni aylantirish va soyalar uchun kerak).
    *   *Holatni boshqarish (State Management):* **Zustand** (juda yengil va tez) va **Tanstack Query** (API dan kelgan ma'lumotlarni keshlash uchun).
*   **Server qismi (Backend): Node.js (NestJS)**
    *   *Nima uchun?* NestJS microservislar uchun juda qulay, xavfsiz va tizimli. IoT (Aqlli uy) loyihalarida millionlab so'rovlarni ko'tarishga moslashgan (TypeScript da yoziladi).
*   **Ma'lumotlar Bazasi (Database): PostgreSQL + Prisma ORM**
    *   Foydalanuvchilar, xonalar va qurilmalar ro'yxatini xavfsiz saqlash uchun.
*   **Real-time Muloqot (Juda Muhim!): MQTT protokoli va WebSockets (Socket.io)**
    *   Chiroqni bozganingizda 0.1 sekundda yonishi va dasturda o'zgarishi uchun HTTP emas, doimiy ochiq qoladigan MQTT yoki WebSocket ulanishi shart.

---

## 3. MVP (1-BOSQICH) FUNKSIYALARI RO'YXATI
Birinchi versiyada faqat eng zarur, ishlaydigan funksiyalarga e'tibor qaratamiz:

1.  **Avtorizatsiya va Profil:** Telefon raqam orqali (SMS bilan) ro'yxatdan o'tish (O'zbek bozoriga eng mosi).
2.  **Bosh Sahifa (Dashboard):**
    *   Joriy manzil ob-havosi (Tashqari harorat, namlik).
    *   "Xonalar" va "Qurilmalar" tablari.
    *   Uyda kim borligini ko'rsatuvchi "Oilaviy" qism.
3.  **Xonalar Boshqaruvi:** Xonalar ro'yxati (Masalan: Mehmonxona, Oshxona, Yotoqxona). Xona rasmini qo'yish imkoniyati. Xona ichidagi barcha qurilmalarni bitta tugma bilan o'chirish/yoqish.
4.  **Qurilmalar Boshqaruvi (1-bosqich qamrovi):**
    *   **Chiroqlar (Lighting):** Yoqish/O'chirish (On/Off). Rangi o'zgaradigan (RGB) chiroqlar bo'lsa, rangni tanlash halqasi.
    *   **Aqlli Rozetkalar (Smart Plugs):** Yoqish/O'chirish. Elektr sarfini ko'rish imkoniyati bilan.
    *   **Isitish/Konditsioner (Climate):** Yoqish/O'chirish, Haroratni gradusda o'zgartirish (Aylanma termostat dizayni yordamida), Rejimni tanlash (Sovutish, Isitish, Fan, Eco).
5.  **Bulutli Integratsiya API (Universal Pult qismi):** Foydalanuvchi Tuya/SmartLife hisobini ulab tashiydi, va biz fonga yashiringan holda Tuya bulutidan uning qurilmalarini o'zimizning bazaga va dizaynga tortib olamiz.

---

## 4. PREMIUM DARAJAGA OLIB CHIQISH UCHUN MENING TAKLIFLARIM (QO'SHIMCHALAR)
Oddiy loyihadan uni Million dollarlik biznesga aylantirish uchun:

1.  **Lokalizatsiya (O'zbek va Rus tillari):** Interface 100% tushunarli tillarda va chiroyli shrifitlarda bo'lishi shart.
2.  **Pullik Statistika (KiloVatt/So'm hisoblagich):** Elektr narxi oshgani sababli foydalanuvchilar qaysi qurilma qancha so'm yeyayotganini aniq ko'rishni xohlashadi. Bu bizning ilovaning eng "sotiladigan" funksiyasi bo'ladi.
3.  **Siri va Google Assistant Integratsiyasi:** Pastdagi mikrofon orqali telefonning o'zidagi AI asistentga "Oshxonani yoq" deyish mumkinligini moslash.
4.  **"Dark Mode" (Tungi Rejim):** Hozirgi dizaynning qop-qora (Dark Grey + Neon qizil) versiyasini yaratish (UI dizaynda Neumorphism tungi holatda judayam premium VIP salonlarga o'xshab ketadi).
5.  **Vibratsiya (Haptic Feedback):** Tugmani yoki konditsioner gradusini aylantirganda telefonda yoqimli "Tiq..Tiq..Tiq" degan vibratsiya bo'lishi kerak. Bu qo'ldagi fizik pult hissiyotini beradi.

---

## 5. BOSQICHMA-BOSQICH AMALGA OSHIRISH REJASI (ROADMAP)

### **1-QADAM: Arxitektura va Dizaynni Qabul Qilish (1 hafta)**
*   Aura-build da berilgan UI/UX shablonni to'liq Figma ga o'tkazish yoki tahlil qilib Exact-Match (1ga1) komponentlar ro'yxatini tuzish.
*   Loyihadagi rang kodlari, shriftlari va ikonkalar jamlanmasini yaratish.
*   React Native loyihasini yaratish va papka strukturasini sozlash.

### **2-QADAM: UI/UX Komponentlarni Dasturlash (Frontend MVP - 2 hafta)**
*   Eng qiyin qismlarni yozish: Silliq soyalar (Neumorphism Drop-shadows) uchun komponent yaratish.
*   Konditsioner Termostatini (aylanuvchi halqa) matematika va SVG tushunchalari bilan yasash va unga animatsiya (Gesto-pan) qoshish.
*   Navigation (Xonalar va Datchiklar sahifasi oynalarini ulash).
*   Haptic Feedback (Vibratsiyalar) ulash.
*   Natija: UI umuman qotmasdan ishlaydigan chiroyli demo versiya holiga keladi (lekin hali uylar yoqilmaydi).

### **3-QADAM: Backend va API Integratsiyasi (In Progress ⏳)**
*   [x] NestJS serverni ko'tarish, ma'lumotlar bazasini o'rnatish.
*   [ ] Foydalanuvchi registratsiyasi va Token tizimini (JWT Authentication) yo'lga qo'yish.
*   [ ] **Tuya Open API** ga ulanish orqali qurilmalarni o'qish (Fetch Devices) funksiyasini integratsiya qilish.
*   [ ] Qurilma buyruqlarini (Command: Turn On, Set Temp 22) jo'natish xizmatlarini yozish.
*   [ ] Natija: Server foydalanuvchining chiroqlarini Tuya'dan bizga tortib bera oladi.

### **4-QADAM: Real-time Sinxronizatsiya va Biriktirish (1 hafta)**
*   Ilovani (Frontend) va Serverni (Backend) WebSockets/MQTT orqali bir-biriga bog'lash.
*   Ilovadagi tugma bosilganda API orqali chindan ham real qurilma reaksiyasi qanday bo'layotganini jonli test qilish.
*   Xato berish (Internet yo'q bo'lsa) va qurilma "Offline" holatida qanday ko'rinishini dasturlash.

### **5-QADAM: Sinovlar, Stabilizatsiyala va Reliz (1-2 hafta)**
*   Dasturni Android APK va iOS TestFlight (Test qilish) ga chiqarib haqiqiy qurilmalar bilan xonadonda test qilib ko'rish.
*   Bugs (Xatoliklar) ni topib to'g'irlash.
*   Performance (Tezlik, xotira sarfi) bo'yicha optimizatsiya qilish.

---

**Ushbu fayl Loyihaning asosiy yo'naltiruvchi hujjati hisoblanadi.** Har qanday dasturchi yoki jamoa ushbu TZ ga qarab ish ko'radi. Barcha bosqichlar tasdiqlangan va tahlil qilingan.
