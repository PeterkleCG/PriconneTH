# Changelog

ดูรายละเอียดแต่ละเวอร์ชั่นพร้อมไฟล์ดาวน์โหลดที่ [**Releases**](https://github.com/PeterkleCG/PriconneTH/releases)

## V2.1.4

- เพิ่มคำแปลสกิลตัวละคร: คริสทีน่า (ไวลด์/คริสต์มาส/อัลฟ่า), คุเรีย (ฟอลเล็น/ฤดูร้อน) และอื่น ๆ
- เพิ่มคำแปลตัวละคร Lyrael เต็มชุด — โปรไฟล์, ชื่อตอนเนื้อเรื่อง (LyraelP/LyraelX), บทพูด, อีเวนต์
- เพิ่มคำแปล Ameth (ความรู้สึกของอาเมส) + แก้ชื่อตอนอีเวนต์
- ปรับชื่อตัวละครให้เป็นคำอ่านภาษาไทย (春咲 = ฮารุซากิ) ใน 5_NamesStory.txt + th_only.txt
- ลบ key ซ้ำ (春咲) และจัดระเบียบ th_only.txt (ย้ายคำแปลตัวละครเข้าไฟล์โครงสร้าง EN)
- ลบ kana sort-key ที่หลุดมาจากระบบเกม (87 รายการ) ใน unit_data.txt — ไม่ใช่คำแปล
- อัปเดต Profile.txt + คำแปลข้อความภารกิจอีเวนต์
- เพิ่มระบบ sync เลขเวอร์ชั่นใน Version.txt ให้ตรงกับ release tag อัตโนมัติ

Full Changelog: [v2.1.3...v2.1.4](https://github.com/PeterkleCG/PriconneTH/compare/v2.1.3...v2.1.4)

## V2.1.3

- เพิ่มคำแปลตัวละคร: ริริ, ริริ (ฤดูร้อน), ริริ (วัลคีเรีย), จิเอรุ (ฤดูหนาว), ยูนิ (ฤดูหนาว)
- เพิ่มคำแปลสกิล: ฮิโยริ (แอสทรัล), เนอา, เนอา (ฤดูร้อน), นานะ, ฟุบุกิ, คาน่อน
- อัปเดต Atlas texture
- อัปเดต Clan.txt และแก้ Clan Last Day
- อัปเดต Texture clan_battle_notice_text_last
- เพิ่มคำแปลใหม่จากต้นฉบับอังกฤษ (31/5/2026)
- อัปเดต Challenge, Shop, Character Detail, Album in settings
- อัปเดต Hiyori (Astral) เพิ่มเติม + LabyrinthRelics.txt

Full Changelog: [v2.1.2...v2.1.3](https://github.com/PeterkleCG/PriconneTH/compare/v2.1.2...v2.1.3)

## V2.1.2

- อัปเดต BepInEx framework + DLL จากต้นทาง ImaterialC/PriconneRe-TL (core/, interop/, dotnet, config)
- คงค่า Language=th ใน BepInEx/config/AutoTranslatorConfig.ini (มอดภาษาไทย ไม่ตามต้นทาง en)
- เพิ่มคำแปลไทย Kokkoro (ปีใหม่) — ชื่อสกิล, คำอธิบายตัวละคร, สกิลรีเจน TP, สกิล taunt + barrier
- เพิ่มคำแปลไทย Maho-sensei — ชื่อสกิล มาโฮะมาโฮะแฟรี่เทลเดรส, แฟรี่เทลปริซึม, ฟลาวเวอร์เซอร์เคิล, แฮปปิเนสแทคท์, สกิลฟิ้นฟู TP
- อัปเดตคำแปลใน Album and Manga.txt, Quest.txt, Profile.txt, SynthesisMenuEvents.txt
- แปลเนื้อหากิจกรรมเพิ่ม (Event detail)
- ปรับการแสดงผล UI ให้รองรับฟอนต์ฟรี
- Rollback การแก้ไขที่ไม่ถูกต้องในไฟล์ตัวละครหลายตัว กลับเป็นเวอร์ชั่นไทยเดิม

Full Changelog: [v2.1.1...v2.1.2](https://github.com/PeterkleCG/PriconneTH/compare/v2.1.1...v2.1.2)

## V2.1.1

- เพิ่มคำแปลไทย Album & Manga (ชื่อตอนการ์ตูน 4 ช่อง) ย้ายมาจาก zz_db_th มาอยู่ในไฟล์โครงสร้าง EN
- เพิ่มคำแปลตอนเนื้อเรื่องในปฏิทิน (Calendar), Adventure Event, Special Event, ConnectChar
- เพิ่มคำแปลชื่อภาษาอังกฤษ + อุปกรณ์ (EN_Title + Equipment)
- เพิ่มคำแปล UI ส่วน Clan, LabyrinthUI, BossDesc, Caravan
- เพิ่มอุปกรณ์ Season Pass EX ใหม่
- ปรับโครงสร้าง: zz_th_only.txt → AA_Only_TH/th_only.txt
- ย้ายคำแปลที่ตรงกับโครงสร้าง EN ออกจาก zz_db_th (Glossary, Event, Presents, GuildHouse, equipment_data ฯลฯ)
- ลบ key ซ้ำ 158 รายการ (62 + 96 จากการย้าย re-house) เพื่อให้ XUAT โหลดถูกต้อง ไม่ขึ้นกับลำดับ
- แทนค่าภาษาอังกฤษเป็นไทยใน Album and Manga 3 รายการ (ぺこぺこ, 守る力, ３人いつも)
- อัปเดต Texture ภาษาไทย: AtlasUnitCommonTalent, AtlasUnitRoleGacha

Full Changelog: [v2.1.0...v2.1.1](https://github.com/PeterkleCG/PriconneTH/compare/v2.1.0...v2.1.1)

## V2.1.0

- ปรับคำแปลไทย 1,055 จุด กลับไปใช้ fan-TL (V1.1.1) ที่แก้คำแปลทางการที่คลาดเคลื่อน/ไม่เหมาะ
- เพิ่มคำแปลไทย UI + สถานะการต่อสู้ (เดี่ยว, วงกว้าง, กายภาพ/เวทมนตร์ไร้ผล, ดูดซับ ฯลฯ)
- เติมชื่อสกิลแบบ +/++ อัตโนมัติจากชื่อหลักที่แปลแล้ว (~103 รายการ)
- แก้ฟอนต์ + การจัดขนาดข้อความ (.font/.resizer) ให้มอดทำงาน — ตัวอักษรไทยแสดงถูกต้องขึ้น
- จัดโครงสร้างไฟล์แปลให้ตรงกับต้นฉบับอังกฤษ (ค้นหา/อัปเดตง่ายขึ้น)

Full Changelog: [v2.0.1...v2.1.0](https://github.com/PeterkleCG/PriconneTH/compare/v2.0.1...v2.1.0)

## V2.0.1

- เพิ่มตัวติดตั้งอัตโนมัติ (.exe) ในรีลีส — ติดตั้ง/อัปเดตแพตช์ได้ในคลิกเดียว
- เปลี่ยนไฟล์แพตช์เป็น .zip — ใช้ได้ทั้งติดตั้งเอง และให้ตัวติดตั้งดึงไปติดตั้งอัตโนมัติ
- (รวมจาก v2.0.0) คำแปลไทยทางการจากฐานข้อมูลเซิร์ฟเวอร์ไทย ~40,000 รายการ — สกิล, ชื่อ/โปรไฟล์ตัวละคร, ไอเทม, อุปกรณ์, ชื่อตอนเนื้อเรื่อง, อภิธานศัพท์, ภารกิจ, ศัตรู
- (รวมจาก v2.0.0) เติมภาษาอังกฤษทุกส่วนที่ไทยยังไม่แปล แทนภาษาญี่ปุ่น (~216,900 บรรทัด)
- (รวมจาก v2.0.0) ลำดับความสำคัญ: ไทยทางการ > ไทย fan-TL > อังกฤษ > ญี่ปุ่น
- (รวมจาก v2.0.0) โครงสร้าง src/ ตรงกับต้นฉบับอังกฤษ

Full Changelog: [v2.0.0...v2.0.1](https://github.com/PeterkleCG/PriconneTH/compare/v2.0.0...v2.0.1)

## V2.0.0

- โครงสร้างใหม่: ย้าย scr/ เป็น src/ ให้ตรงกับต้นฉบับอังกฤษ (ReTL)
- คำแปลไทยทางการ: ดึงจากฐานข้อมูลเซิร์ฟเวอร์ไทย (master DB) ~40,000 รายการ — สกิล, ชื่อ/โปรไฟล์ตัวละคร, ไอเทม, อุปกรณ์, ชื่อตอนเนื้อเรื่อง, อภิธานศัพท์, ภารกิจ, ศัตรู ฯลฯ
- English fallback: เติมภาษาอังกฤษทุกส่วนที่ไทยยังไม่แปล แทนภาษาญี่ปุ่น (ข้อความที่โหลดได้รวม ~216,900 บรรทัด)
- ลำดับความสำคัญการแปล: ไทยทางการ > ไทย fan-TL > อังกฤษ > ญี่ปุ่น
- รูปภาพ (Texture): ใช้ของไทยก่อน เติมอังกฤษเฉพาะส่วนที่ไทยไม่มี (จับคู่ด้วย hash)
- ลบไฟล์ที่ไม่ถูกใช้งานออก ลดขนาดแพตช์
- เพิ่มระบบสร้าง release อัตโนมัติ (GitHub Actions) + LICENSE / .gitignore / .gitattributes

Full Changelog: [v1.1.1...v2.0.0](https://github.com/PeterkleCG/PriconneTH/compare/v1.1.1...v2.0.0)

