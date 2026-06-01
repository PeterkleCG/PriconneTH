<img width="706" height="184" alt="Title" src="https://github.com/user-attachments/assets/e3143983-250f-4151-b0af-65ad0adcfa62" />

# PriconneTH

แพตช์แปล UI **ภาษาไทย** (ไม่เป็นทางการ) สำหรับ [Princess Connect! Re:Dive เซิร์ฟเวอร์ญี่ปุ่น](https://dmg.priconne-redive.jp/)
ต่อยอดจาก English patch ของ [PriconneRe-TL](https://github.com/ImaterialC/PriconneRe-TL) แล้วเติมคำแปลไทยทางการจากฐานข้อมูลเซิร์ฟเวอร์ไทยเดิม

จุดประสงค์หลักของโปรเจกต์นี้คือการแปลเมนู ปุ่ม และข้อความต่าง ๆ ในเกมให้เป็นภาษาไทย เพื่อให้ผู้ที่ไม่เข้าใจภาษาญี่ปุ่นเล่นเกมได้ง่ายขึ้น

> ⚠️ **คำเตือน:** โปรดใช้งานด้วยความรับผิดชอบของตนเอง ทางเราไม่รับผิดชอบต่อการดำเนินการใด ๆ กับบัญชีของคุณ หากคุณใช้เครื่องมือแปลนี้

---

## 💬 Community

สงสัยอะไรเรื่องในเกมกับ Patch ไปสอบถามกันได้ใน Discord
เข้ามาเป็นส่วนหนึ่งของ Community กับพวกเราได้ที่ลิงก์ด้านล่างเลย

[![Discord](https://img.shields.io/badge/Discord-เข้าร่วม-5865F2?logo=discord&logoColor=white&style=for-the-badge)](https://discord.gg/AtmAsm8pwv)

---

## ✨ ฟีเจอร์

- **คำแปลไทยทางการ** จาก master DB เซิร์ฟเวอร์ไทยเดิม — สกิล, ชื่อ/โปรไฟล์ตัวละคร, ไอเทม, อุปกรณ์, ชื่อตอนเนื้อเรื่อง, อภิธานศัพท์, ภารกิจ, ศัตรู ฯลฯ
- **ลำดับความสำคัญการแปล:** ไทยทางการ → ไทย fan-TL → English → ญี่ปุ่น
- **ส่วนที่ยังไม่มีไทย แสดงเป็น English (ไม่ใช่ญี่ปุ่น)** — อ่านเข้าใจได้แม้ยังแปลไม่ครบ
- **รูปภาพ (Texture):** ใช้ของไทยที่มี ทับบนฐานภาษาอังกฤษ
- **ตัวติดตั้ง (.exe):** ติดตั้ง/อัปเดตแพตช์อัตโนมัติในคลิกเดียว

---

## 💾 ติดตั้ง

ดาวน์โหลดล่าสุดที่ [**Releases**](https://github.com/PeterkleCG/PriconneTH/releases/latest) · ดูประวัติทุกเวอร์ชั่นที่ [**CHANGELOG**](CHANGELOG.md)

### วิธีที่ 1 — ตัวติดตั้งอัตโนมัติ (แนะนำ)
1. โหลดไฟล์ตัวติดตั้ง (`.exe`)
2. เปิดโปรแกรม → กดติดตั้ง (ตรวจหาเกมให้อัตโนมัติ ติดตั้ง/อัปเดตให้เอง)

### วิธีที่ 2 — ติดตั้งเอง
1. โหลดไฟล์แพตช์ (`.zip`)
2. แตกไฟล์ทั้งหมดลงในโฟลเดอร์เกม `priconner`
3. รันครั้งแรกจะค้างสักครู่ ครั้งต่อไปปกติ

> **หาโฟลเดอร์เกมไม่เจอ?** ปกติอยู่ที่ `%USERPROFILE%\priconner`
> วิธีเปิดเร็ว: กด `Win + R` → วาง `%USERPROFILE%\priconner` → Enter
> (`%USERPROFILE%` = `C:\Users\<ชื่อผู้ใช้ของคุณ>`)
> ถ้าเปลี่ยนที่ติดตั้งเอง ให้เช็คพาธจาก DMM Game Player

> ติดตั้งเกมจาก DMM Game Player เท่านั้น (ไม่ใช่ผ่าน emulator)

---

## 🤝 ร่วมแปล

ยินดีต้อนรับทุกการมีส่วนร่วม! ไฟล์แปลอยู่ใน `src/BepInEx/Translation/th/Text/` (รูปแบบ `ญี่ปุ่น=ไทย` หนึ่งคู่ต่อบรรทัด) เพิ่มรูปภาพไทยได้เช่นกัน — มาคุยกันได้ใน Discord

ดูแนวทางการแปล (อภิธานศัพท์, รูปแบบสกิล, ขอบเขต) ได้ที่ [**CONTRIBUTING.md**](CONTRIBUTING.md)

---

## 🙏 เครดิต

### คนแปลไทย
- Peterkle
- HetCreep
- ลุงนิพ

### AI Co-Engineers
- **Antigravity** (Google DeepMind)
- **Claude Code** (Anthropic)

### 🧪 Testers & Community
ขอบคุณชาว Discord ทุกคนที่ช่วยทดสอบ รายงานบั๊ก เสนอคำแปล และติชมตลอดการพัฒนา 🙏
หากตกหล่นชื่อใครไป ต้องขออภัยมา ณ ที่นี้ — ทุกคนคือส่วนสำคัญที่ทำให้แพตช์นี้ดีขึ้นเรื่อย ๆ

### ต้นฉบับ & เครื่องมือ
- English patch: [PriconneRe-TL](https://github.com/ImaterialC/PriconneRe-TL) โดย ImaterialC
- ฐานข้อมูล master.db ทุกเซิร์ฟเวอร์: [Expugn/priconne-database](https://github.com/Expugn/priconne-database)
- ตัวติดตั้ง: ต่อยอดจาก [tynave/PriconneReTL-Installer](https://github.com/tynave/PriconneReTL-Installer)
- Framework: BepInEx + XUnity.AutoTranslator **ฉบับดัดแปลงสำหรับ Priconne** (มาพร้อม PriconneRe-TL — มี PrincessRedirector + Fixup plugins) ต่อยอดจาก [BepInEx](https://github.com/BepInEx/BepInEx) + [XUnity.AutoTranslator](https://github.com/bbepis/XUnity.AutoTranslator) ต้นฉบับ

---

โค้ดและเครื่องมือในโปรเจกต์นี้อยู่ภายใต้สัญญาอนุญาต [MIT License](LICENSE) — ทรัพย์สินในเกมทั้งหมดเป็นของ Cygames, Inc. และผู้สร้างต้นฉบับ โปรเจกต์นี้เป็น fan project ไม่แสวงหากำไร
