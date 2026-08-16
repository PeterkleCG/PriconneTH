# 🖼️ รายงานรูปซ้ำ (texture hash ซ้ำ)

XUAT จับคู่รูปด้วย `[HASH]` ในชื่อไฟล์ ไม่สนโฟลเดอร์ — hash เดียวกัน 2 ไฟล์ = โหลดทับกัน (ลำดับตัดสินว่าตัวไหนชนะ)

## ✅ ลบสำเนาซ้ำ (byte ตรงกัน) — 6 ไฟล์

PR นี้ลบให้แล้ว (เก็บไฟล์เดียวพอ เพราะ content เหมือนกัน):

- ลบ `th/Texture/Text Pop/battle_skip_00001 [0F47282F96-F1403292E2].png` (เหมือน `th/Texture/Battle/battle_skip_00001 [0F47282F96-F1403292E2].png` ที่เก็บไว้)
- ลบ `th/Texture/Text Pop/battle_skip_00002 [51F5206496-BAB7715326].png` (เหมือน `th/Texture/Battle/battle_skip_00002 [51F5206496-BAB7715326].png` ที่เก็บไว้)
- ลบ `th/Texture/Text Pop/battle_skip_00003 [A34B4CB7A5-37341E38DF].png` (เหมือน `th/Texture/Battle/battle_skip_00003 [A34B4CB7A5-37341E38DF].png` ที่เก็บไว้)
- ลบ `th/Texture/Text Pop/battle_skip_00004 [01905597E0-BDEBA8F9F5].png` (เหมือน `th/Texture/Battle/battle_skip_00004 [01905597E0-BDEBA8F9F5].png` ที่เก็บไว้)
- ลบ `th/Texture/Text Pop/clan_battle_notice_text_last [D3221B3EE3-5FDC643CA9].png` (เหมือน `th/Texture/Clan/clan_battle_notice_text_last [D3221B3EE3-5FDC643CA9].png` ที่เก็บไว้)
- ลบ `th/Texture/Text Pop/third_login_bonus_text [9C5F9C78F1-0F4D66B432].png` (เหมือน `th/Texture/Other/third_login_bonus_text [9C5F9C78F1-0F4D66B432].png` ที่เก็บไว้)

## ⚠️ hash ขัดแย้ง (byte ต่างกัน) — ต้องคนตัดสิน — 3 รายการ

PR นี้**ไม่แตะ** — เลือกเองว่าตัวไหนถูก แล้วลบ/แก้ตัวที่เหลือ:

- `[C1CF35485B-CFE3C22A6B]`
  - `th/Texture/Banner/banner_name_pass_normal_26061 [C1CF35485B-CFE3C22A6B].png`
  - `th/Texture/Banner/banner_name_pass_premium_26061 [C1CF35485B-CFE3C22A6B].png`
- `[C266F8B4B4-CF80F899C8]`
  - `th/Texture/Banner/event_teaser_10217 [C266F8B4B4-CF80F899C8] copy.png`
  - `th/Texture/Banner/event_teaser_10217 [C266F8B4B4-CF80F899C8].png`
- `[5A6BBFEF0A-8FB1CA4F6D]`
  - `th/Texture/Banner/fbs_logo [5A6BBFEF0A-8FB1CA4F6D].png`
  - `th/Texture/Other/fbs_logo [5A6BBFEF0A-8FB1CA4F6D].png`
