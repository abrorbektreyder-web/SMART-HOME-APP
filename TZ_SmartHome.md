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

### **1-QADAM: Arxitektura va Dizaynni Qabul Qilish (Bajarildi ✔)**
*   [x] Aura-build da berilgan UI/UX shablonni to'liq Figma ga o'tkazish yoki tahlil qilib Exact-Match (1ga1) komponentlar ro'yxatini tuzish. O'rnatilgan brend "HOYR".
*   [x] Loyihadagi rang kodlari, shriftlari va ikonkalar jamlanmasini yaratish.
*   [x] React Native loyihasini yaratish va papka strukturasini sozlash.

### **2-QADAM: UI/UX Komponentlarni Dasturlash (Frontend MVP - Yakunlandi ✔)**
*   [x] Eng qiyin qismlarni yozish: Silliq soyalar (Neumorphism Drop-shadows) uchun komponent yaratish.
*   [x] Konditsioner Termostatini (aylanuvchi halqa) matematika va SVG tushunchalari bilan yasash va unga animatsiya (Gesto-pan) qoshish.
*   [x] Navigation (Bosh sahifa, Xonalar va Datchiklar sahifasi oynalarini ulash).
*   [x] Haptic Feedback (Vibratsiyalar) ulash.
*   [x] Natija: UI umuman qotmasdan ishlaydigan chiroyli demo versiya holiga keladi.

### **3-QADAM: Backend va API Integratsiyasi (Bajarildi ✔)**
*   [x] NestJS serverni ko'tarish, ma'lumotlar bazasini o'rnatish.
*   [x] Foydalanuvchi registratsiyasi va Token tizimini (JWT Authentication) yo'lga qo'yish.
*   [x] **Tuya Open API** ga ulanish orqali qurilmalarni o'qish (Fetch Devices) funksiyasini integratsiya qilish.
*   [x] Qurilma buyruqlarini (Command: Turn On, Set Temp 22) jo'natish xizmatlarini yozish.
*   [x] Natija: Server foydalanuvchining chiroqlarini Tuya'dan bizga tortib bera oladi.

### **4-QADAM: Real-time Sinxronizatsiya va Biriktirish (Bajarildi ✔)**
*   [x] Ilovani (Frontend) va Serverni (Backend) WebSockets/MQTT orqali bir-biriga bog'lash.
*   [x] Ilovadagi tugma bosilganda API orqali chindan ham real qurilma reaksiyasi qanday bo'layotganini jonli test qilish (va Web Speech API ovozli boshqaruvini qo'shish).
*   [x] Xato berish (Internet yo'q bo'lsa) va qurilma "Offline" holatida qanday ko'rinishini dasturlash.

### **5-QADAM: APK Reliz va Oilaviy Funksiyalar (Bajarildi ✔)**
*   [x] Android APK ni EAS Build orqali bulutda yig'ish va `.apk` yuklab olish silkasini olish.
*   [x] Oilaga a'zo qo'shish — real galereyadan rasm tanlash (expo-image-picker).
*   [x] Qurilmalarni offline optimistic update rejimida ishlashi (server ulanmagan bo'lsa ham UI o'zgarishi).
*   [x] Ovozli boshqaruv (Web Speech API) — "Chiroqni yoq" / "Muzlatkichni o'chir".
*   [x] Termostat sezuvchanligini (sensitivity) kamaytirish va silliqlashtirish.

---

## 6. REFERENS ILOVAGA 1:1 O'XSHATISH — QILINMAGAN (QOLGAN) ISHLAR RO'YXATI

> **Referens:** https://smart-home-mobile.aura.build/
> Quyidagi hamma elementlar shu saytdagi dizayndan aniq olingan va har biri kodda yasalishi kerak.

---

### 🔴 6.1 — BOSH SAHIFA (Dashboard / Overview) FARQLAR

#### 6.1.1 — Ob-havo Kartochkasi (Weather Card) — YANGI ✨
**Referensdagi holat:** Bosh sahifaning tepasida (Oilavi qismdan keyin) bitta katta, chiroyli gradient kartochka bor. Unda:
- Shahar nomi (masalan: "Seattle, WA" — bizda "Toshkent" bo'ladi)
- Joriy harorat katta shriftda (masalan: "14°")
- Ob-havo holati matni (masalan: "Light Rain" / "Yengil yomg'ir")
- Kunlik eng yuqori/past harorat (masalan: "H:18° L:10°")
- Fon rangi: **Og'ir Gradient — Orange (#FB923C) dan Deep Pink (#DB2777) gacha**
- Border-radius: 24px, Soya: diffused soft shadow

**Hozirgi ilovamizda:** Ob-havo qismi mavjud, ammo kichik ikki qator (Namlik va Harorat) bo'lib turgan oddiy kartochkalar. Referensdagi katta, gradient, premium Weather Card **YO'Q**.

**Bajarilishi kerak:**
- [ ] `WeatherCard.tsx` yangi komponent yaratish (Gradient fon bilan)
- [ ] OpenWeatherMap API dan real ob-havo ma'lumotini tortish (yoki mock)
- [ ] Shahar, harorat, holat, kunlik min/max — hammasini joylashtirish
- [ ] Gradient: `LinearGradient` (#FB923C → #DB2777) — `expo-linear-gradient` ishlatish
- [ ] BorderRadius: 24, Soya: `shadow-xl` uslubida

---

#### 6.1.2 — "Rooms / Devices" Tab Navigatsiyasi — YANGI ✨
**Referensdagi holat:** Ob-havo kartochkasi ostida ikki seksiyali **"Rooms" | "Devices"** degan tablari bor. Faol tab'ning foni oq (yoki soyali), nofaol tab'niki shaffof. Bu segmented control ko'rinishida.

**Hozirgi ilovamizda:** Bunday tab selector yo'q. Qurilmalar to'g'ridan-to'g'ri list sifatida berilgan. Rooms (Xonalar) esa alohida sahifaga chiqib ketdi.

**Bajarilishi kerak:**
- [ ] Dashboard ichiga "Rooms" va "Devices" segment-tab'larni joylashtirish
- [ ] "Rooms" tab bosilganda — xonalar kartochkalari ko'rinadi (pastda batafsil)
- [ ] "Devices" tab bosilganda — hozirgi qurilmalar ro'yxati ko'rinadi
- [ ] Tab uslubi: pill-shaped, faol tab oq fon + soya, nofaol tab shaffof + kulrang yozuv
- [ ] Smooth animatsiya bilan o'tish (Animated / LayoutAnimation)

---

#### 6.1.3 — Xonalar Kartochkalari (Room Cards) — YANGI DIZAYN ✨
**Referensdagi holat:** "Rooms" tabi tanlanganida pastda xonalar ro'yxati chiqadi. Har bir xona:
- **Katta rasmli kartochka** (to'rtburchak, border-radius: 24px)
- Rasm ustida: Xona nomi (Bold oq shrift) va qurilmalar soni (masalan: "3 active" / "12 total")
- O'ng tomonida: "ON" / "OFF" yozuvi va pill-shaped toggle tugma
- Toggle rangi: **ON = Orange (#F97316)**, OFF = Light Gray

**Hozirgi ilovamizda:** Rooms sahifasi alohida va neumorphic stilidagi emoji-li kartochkalar bilan. Ularda RASM YO'Q, toggle YO'Q, ON/OFF YO'Q.

**Bajarilishi kerak:**
- [ ] Room kartochkasini to'liq qayta dizayn qilish (rasmli)
- [ ] Har bir xona uchun haqiqiy rasm (yoki Unsplash dan placeholder) qo'yish
- [ ] Rasm ustida overlay (qora shaffof qatlam) + Oq Xona nomi + qurilmalar soni
- [ ] Pill-shaped toggle switch (ON=Orange, OFF=Gray) qo'shish
- [ ] Toggle bosilganda xonadagi barcha qurilmalar bir vaqtda yonish/o'chishi
- [ ] Rooms alohida sahifa bo'lmasdan, Dashboard ichidagi tab orqali ko'rinishi kerak

---

#### 6.1.4 — Household (Oila) Seksiyasini To'liqlashtirish
**Referensdagi holat:** Tepada "Household" degan sarlavha ostida dumaloq avatarlar, ular ustma-ust chiqib (overlapping) turadi.

**Hozirgi ilovamizda:** Avatarlar bor, lekin ular YONMA-YON joylashgan (ularning overlapping effekti yo'q).

**Bajarilishi kerak:**
- [ ] Avatarlarni overlapping (ustma-ust, har biri -10px margin) qilish
- [ ] "Household" yozuvini referensdagidek formatlash

---

### 🔴 6.2 — IQLIM BOSHQARUVI (Climate Control Screen) FARQLAR

#### 6.2.1 — Termostat Dial ni Referensga Moslashtirish
**Referensdagi holat:** Termostati — gradient (og'ir to'q gradient), kattaligi ekran kengligi taxminan 85%, markazda oq soyali dumaloq tugma. Arc-dagi chiziqlar (tick marks) havo yo'nalishni ko'rsatadi. Markazda "HEATING" yozuvi, harorat raqami va yashil Eco barg ikonkasi.

**Hozirgi ilovamizda:** Termostat mavjud va ishlaydi, lekin vizual farqlar bor: tick-marks yo'q, eco barg ikonkasi yo'q, markaziy doira oq-soyali emas.

**Bajarilishi kerak:**
- [ ] ThermostatDial ga tick marks (10° dan 30° gacha, har 2 gradusda 1 chiziq) qo'shish
- [ ] Markaziy doira ichiga Eco barg (🍃) ikonkasini qo'shish (yashil)
- [ ] Markaziy doirani oq fon + kuchli soya (shadow-xl) bilan chizish (Referensdagiday neumorphic)
- [ ] "+/-" tugmalarini doira ichiga emas, pastroqqa joylashtirish (Referens bo'yicha)

#### 6.2.2 — Xona Selektori (Unit Selector) — YANGI ✨
**Referensdagi holat:** Termostat ostida pill-shaped dropdown bor: "Living Room Unit" deb yozilgan, uni bossang boshqa xonaning konditsionerini tanlash mumkin.

**Hozirgi ilovamizda:** Bunday selector yo'q. Termostat faqat 1 ta xonaga ulangan.

**Bajarilishi kerak:**
- [ ] Termostat ostiga `RoomUnitSelector` komponent qo'shish
- [ ] Pill-shaped dizayn (BorderRadius: 50, soyali fon)
- [ ] Bosish → Pastdan Modal yoki BottomSheet ochiladi (Xonalar ro'yxati)
- [ ] Tanlov almashganda termostat shu xonaning haroratini ko'rsatadi

#### 6.2.3 — Rejim Tugmalari (Mode Cards: Fan, Heat, Cool, Eco) — YANGI ✨
**Referensdagi holat:** Termostat va selector ostida gorizontal qatorta rejim tugmalari bor (Fan, Mode va boshqalar). Ular kartochka ko'rinishida va ikonkali.

**Hozirgi ilovamizda:** Bunday rejim tugmalari umuman YO'Q.

**Bajarilishi kerak:**
- [ ] Klimat sahifasi pastiga 4 ta rejim kartochkasi qo'shish: ❄️ Sovutish, 🔥 Isitish, 💨 Fan, 🍃 Eco
- [ ] Har bir kartochka: Ikonka + Nomi + Aktiv/Noaktiv holat
- [ ] Aktiv rejim: Orange bordyur/fon, ikonka rangi Orange
- [ ] Noaktiv rejim: Kulrang fon, kulrang ikonka
- [ ] Rejim bosilganda Tuya API ga komanda yuborish (AC mode change)

---

### 🔴 6.3 — SOZLAMALAR (Settings) SAHIFASI — TO'LIQ YANGI ✨

**Referensdagi holat:** Alohida Settings sahifasi bor. Unda:
- Foydalanuvchi profili (Ism, Email, Avatar)
- Notifications (Bildirishnomalar) tugmasi
- Privacy & Security (Maxfiylik) qatori
- System Preferences (Tizim sozlamalari) qatori
- Log Out (Chiqish) — QIZIL rangda tugma
- Har bir qatorda: Chap tomonida ikonka, o'ngda chevron (→) belgisi
- Kartochkalar oq (yoki surface), border-radius: 12px

**Hozirgi ilovamizda:** Alohida Settings sahifasi **UMUMAN YO'Q**.

**Bajarilishi kerak:**
- [ ] `settings.tsx` sahifasini yaratish (app/ papkasida)
- [ ] Profile Section: Avatar + Ism + Email (tahrirlash imkoniyati)
- [ ] Notification Toggle: Bildirishnomalarni yoqish/o'chirish
- [ ] Til o'zgartirish: UZ/RU
- [ ] Tema o'zgartirish: Light/Dark
- [ ] Log Out tugmasi: Qizil rangli, bosilganda Login sahifasiga qaytarish
- [ ] Har bir element: Icon + Text + Chevron uslubida ro'yxat
- [ ] Navigation: Dashboard dan Settings ga o'tish tugmasi (gear icon)

---

### 🔴 6.4 — PASTKI NAVIGATSIYA PANELI (Bottom Tab Navigation) — YANGI ✨

**Referensdagi holat:** Sahifaning eng pastida (aynan telefon darchasi ichida) pill-shaped bottom tab bar bor. Unda 3-4 ta ikonka: Home, Rooms/Devices, Climate, Settings.

**Hozirgi ilovamizda:** Bottom tab navigation **YO'Q**. Faqat Floating Mic tugma va tepada Grid icon bor.

**Bajarilishi kerak:**
- [ ] `_layout.tsx` ni Tab Navigator ga o'zgartirish (Expo Router Tabs)
- [ ] 4 ta tab: 🏠 Home, 🌡️ Climate, 📊 Statistics, ⚙️ Settings
- [ ] Tab bar vizual: pill-shaped fon, aktiv tab ikonkasi Orange, noaktiv kulrang
- [ ] Mikrafon tugmasi — tab bar o'rtasidagi FAB (Floating Action Button) sifatida qolishi mumkin
- [ ] Tab bar yuqori bordyur (shadow) va animatsiyali o'tish

---

### 🔴 6.5 — DIZAYN VA RANG PALITRASI FARQLARI

#### 6.5.1 — Light Mode ni Referensga To'liq Moslashtirish
**Referensdagi holat:** Background: `#F8FAFC` (juda och zangori-kulrang), Cards: `#FFFFFF`, Text: `#0F172A`, Muted: `#64748B`, Accent: `#F97316` (Orange). Hammasi yumshoq ko'lka (soft shadow) bilan.

**Hozirgi ilovamizda:** Light mode mavjud, ranglar yaqin ammo hali aniq bir xil emas.

**Bajarilishi kerak:**
- [ ] Light mode ranglarini referens bilan pikselma-piksel solishtirish va moslashtirish
- [ ] Asosiy accent rangni Red (#f43f5e) dan **Orange (#F97316)** ga o'zgartirish (Referensga mos)
- [ ] Toggle'lar, bartlar, aktiv elementlar — barchasi Orange rangda bo'lishi
- [ ] Hozirgi qizil mikrafon tugma rangini ham Orange ga o'zgartirish

#### 6.5.2 — Shriftlar (Typography)
**Referensdagi holat:** "Inter" Google Font — barcha og'irliklarida (300, 400, 500, 600, 700).

**Hozirgi ilovamizda:** Standart sistema shrifti ishlatilmoqda.

**Bajarilishi kerak:**
- [ ] `expo-google-fonts` paketidan "Inter" shriftini o'rnatish va ulash
- [ ] Barcha Text elementlarda fontFamily: "Inter" qilish

---

### 🔴 6.6 — STATISTIKA SAHIFASI (Energy Dashboard) — YANGI ✨

**Bajarilishi kerak (TZ 4-bo'limdan):**
- [ ] `statistics.tsx` sahifasini yaratish
- [ ] Har bir qurilmaning kunlik/haftalik/oylik elektr iste'moli grafiklarini ko'rsatish
- [ ] Grafik kutubxonasi: `react-native-chart-kit` yoki `victory-native`
- [ ] Umumiy narxni so'mda hisoblash (1 kWh = X so'm)
- [ ] Qurilmalar bo'yicha sarfni donut chart ko'rinishida qiyoslash
- [ ] Rang palitra: Har bir qurilma uchun o'ziga xos rang

---

### 🔴 6.7 — QURILMA BATAFSIL SAHIFASI (Device Detail Screen) — YANGI ✨

**Bajarilishi kerak:**
- [ ] `device/[id].tsx` dinamik sahifa yaratish
- [ ] Chiroq uchun: Yorug'lik darajasi (brightness slider), RGB rang tanlash halqasi
- [ ] Rozetka uchun: Joriy quvvat sarfi (Watt), kunlik grafik
- [ ] Klimat uchun: Termostat (hozirgi), rejim tugmalari, jadval (schedule)
- [ ] Har bir qurilmada: Tarix (history log), Jadval (schedule timer), Nomi o'zgartirish

---

### 🔴 6.8 — BILDIRISHNOMALAR (Notifications) — YANGI ✨

**Bajarilishi kerak:**
- [ ] Push Notification tizimini ulash (expo-notifications)
- [ ] Qurilma holati o'zgarganda: "Oshxona chirog'i yoqildi" kabi xabar
- [ ] Xavfsizlik ogohlantirishi: "Muzlatkichingiz 2 soatdan ko'p o'chirilgan!"
- [ ] Server tomondan Firebase Cloud Messaging (FCM) orqali push jo'natish

---

### 🔴 6.9 — ANIMATSIYALAR VA MICRO-INTERACTIONS — YAXSHILASH ✨

**Bajarilishi kerak:**
- [ ] Sahifa o'tishlarida silliq animatsiyalar (shared element transitions)
- [ ] Toggle bosganda yumshoq "spring" animatsiyasi (react-native-reanimated)
- [ ] Kartochka bosganda scale down → up effekti (pressIn/pressOut)
- [ ] Tab o'zgarganda sliding indicator animatsiyasi
- [ ] Termostat harorat o'zgarganda raqamning silliq counting effekti
- [ ] Splash Screen (ilova ochilganda 2 soniyalik Loading animatsiya) — HOYR logotipi bilan

---

### 🔴 6.10 — XAVFSIZLIK VA PROFIL — YAXSHILASH ✨

**Bajarilishi kerak:**
- [ ] Haqiqiy SMS Verification (Eskiz.uz API yoki Twilio) bilan Login
- [ ] Biometrik kirish (barmog'iz izi yoki FaceID) — expo-local-authentication
- [ ] Parolni tiklash funksiyasi
- [ ] Foydalanuvchi profilini tahrirlash (Ism, rasm, telefon)

---

## 7. QILINGAN VA QILINMAGAN ISHLAR UMUMIY XULOSA JADVALI

| # | ISH NOMI | HOLATI |
|---|---------|--------|
| 1 | Login sahifasi (SMS mock) | ✅ Bajarildi |
| 2 | Dashboard (Bosh sahifa) asosiy tuzilishi | ✅ Bajarildi |
| 3 | Termostat Dial (SVG aylanma harorat) | ✅ Bajarildi |
| 4 | Oilaviy avatarlar + real rasm qo'shish | ✅ Bajarildi |
| 5 | Qurilmalar ro'yxati (Chiroq/Rozetka/Klimat) | ✅ Bajarildi |
| 6 | ON/OFF toggle tugmalari (optimistic update) | ✅ Bajarildi |
| 7 | Dark Mode / Light Mode almashtirish | ✅ Bajarildi |
| 8 | O'zbek / Rus tili almashtirish | ✅ Bajarildi |
| 9 | Haptic Feedback (vibratsiya) | ✅ Bajarildi |
| 10 | NestJS Backend + Tuya API integratsiya | ✅ Bajarildi |
| 11 | WebSocket real-time bog'lanish | ✅ Bajarildi |
| 12 | Ovozli boshqaruv (Speech Recognition) | ✅ Bajarildi |
| 13 | Android APK (EAS Build) | ✅ Bajarildi |
| 14 | Xonalar sahifasi (alohida) | ✅ Bajarildi |
| --- | --- | --- |
| 15 | Gradient Weather Card (Ob-havo Premium) | ❌ Qilinmagan |
| 16 | "Rooms / Devices" Tab Selector | ❌ Qilinmagan |
| 17 | Xona kartochkalarini rasmli qilish + Toggle | ❌ Qilinmagan |
| 18 | Avatarlar overlapping effekti | ❌ Qilinmagan |
| 19 | Termostat tick-marks va Eco icon | ❌ Qilinmagan |
| 20 | Xona Selektori (Unit dropdown) | ❌ Qilinmagan |
| 21 | Rejim tugmalari (Cool/Heat/Fan/Eco) | ❌ Qilinmagan |
| 22 | Settings sahifasi | ❌ Qilinmagan |
| 23 | Bottom Tab Navigation | ❌ Qilinmagan |
| 24 | Accent rangni Orange ga o'zgartirish | ❌ Qilinmagan |
| 25 | Inter shriftini o'rnatish | ❌ Qilinmagan |
| 26 | Statistics sahifasi (Energiya grafiklari) | ❌ Qilinmagan |
| 27 | Device Detail sahifasi (Batafsil boshqaruv) | ❌ Qilinmagan |
| 28 | Push Notifications | ❌ Qilinmagan |
| 29 | Micro-animations va transitions | ❌ Qilinmagan |
| 30 | Splash Screen (HOYR logo bilan) | ❌ Qilinmagan |
| 31 | Real SMS Login (Eskiz/Twilio) | ❌ Qilinmagan |
| 32 | Biometrik kirish (FingerPrint/FaceID) | ❌ Qilinmagan |

---

## 8. TAVSIYA ETILADIGAN ISH TARTIBI (ERTAGA BOSHLASH UCHUN)

**1-kun:**
1. Accent rangni RED → ORANGE ga o'zgartirish (ranglar faylida)
2. Inter shriftini o'rnatish
3. Bottom Tab Navigation qilish (Home, Climate, Stats, Settings)
4. Settings sahifasini yaratish

**2-kun:**
5. Weather Card (Gradient ob-havo kartochkasi) komponentini yaratish
6. "Rooms / Devices" tab selector qo'shish
7. Xona kartochkalarini rasmli va toggleli qilish
8. Avatarlarni overlapping qilish

**3-kun:**
9. Termostat ni referensga moslashtirish (tick marks, eco icon, oq soyali markaz)
10. Unit Selector va Rejim tugmalari qo'shish
11. Micro-animatsiyalar (spring, scale, counting)

**4-kun:**
12. Statistics sahifasi (Energiya grafiklari)
13. Device Detail sahifasi
14. Splash Screen

**5-kun:**
15. Push Notifications
16. Yakuniy pikselma-piksel taqqoslash va tuzatishlar
17. Yangi APK yig'ish va test

---

**Ushbu fayl Loyihaning asosiy yo'naltiruvchi hujjati hisoblanadi.** Har qanday dasturchi yoki jamoa ushbu TZ ga qarab ish ko'radi. Barcha bosqichlar tasdiqlangan va tahlil qilingan.
