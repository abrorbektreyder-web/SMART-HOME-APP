# Loyihani Rivojlantirish Qoidalari (DEVELOPMENT RULES)

Bu fayldagi qoidalarga ishlab chiquvchi (Agent/Assistant) tomonidan MUTLAQO og'ishmay amal qilinishi SHART.

## 1. Versiyalarni Boshqarish (Git & Branching)
*   **Yangi Branch:** Har bir yangi vazifa, bosqich yoki xatolikni tuzatishni (BugFix) boshlashdan oldin `main` (yoki `master`) branch'dan albatta yangi branch ochilishi shart.
    *   *Namuna:* `feature/frontend-init`, `bugfix/thermostat-animation` va h.k.
*   **Meni Xabardor Qilish:** Har bir branch'dagi ish tugallangandan so'ng, nimalar qilingani bo'yicha menga (Userga) hisobot berilishi shart.
*   **Merge Qilish Taqiqlanadi:** Agent (Assistant) dagi ishchi kodni o'z bilganicha `main` branch'ga merge qilishi (qo'shib yuborishi) QAT'IYAN TAQIQLANADI. Main branch faqatgina User tasdig'i bilan barqaror holatda qolishi kerak.
*   **GitHub/Remote ga Push qilish:** Kodlarni GitHub yoki masofaviy repozitoriyaga Push qilish faqat User alohida buyruq berganidan keyingina amalga oshiriladi. Avtomatik Push qilish taqiqlanadi.

## 2. Global Skillardan Maksimal Foydalanish
*   Agent har doim kod yozishda, muammolarni hal qilishda yoki yangi integratsiyalar ulashda o'ziga berilgan BARCHA (dizayn, backend, frontend, devops) SKILL'lardan, Context7 kabi MCP serverlardan va zamonaviy kutubxonalarning eng so'nggi ma'lumotlaridan maksimal foydalanishi shart.
*   "Premium" darajani saqlab qolish uchun oddiy kod ishlatib ketilmaydi, eng optimal va "Best Practice" yo'li tanlanadi.
