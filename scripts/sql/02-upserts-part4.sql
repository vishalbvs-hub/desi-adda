-- Upserts part 4 (29 restaurants)


INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Midnight Temple', 'Detroit', 'midnight-temple-detroit', 'Chaat/Street Food', 'Both', '$$', 'Authentic street food, bold spices', 'Authentic street food, bold spices', '{"Chaat","Street Food"}', '{}', '2466 Riopelle St Floor 2, Detroit, MI 48207, USA', '(313) 810-2585', 'http://www.midnighttemple.com/', 4.3, 652, 'Monday: Closed | Tuesday: 5:00 PM – 12:00 AM | Wednesday: 5:00 PM – 12:00 AM | Thursday: 5:00 PM – 12:00 AM | Friday: 5:00 PM – 12:00 AM | Saturday: 12:00 PM – 12:00 AM | Sunday: 12:00 – 10:00 PM', 'ChIJYdmk4lXTJIgRX_PSw06y-Ok', 42.34632149999999, -83.0383217, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGnBGGNOzOQ-vq-e1Z5010akByO9YCju5b7BCn8Me9au4MiBpPDPXE6AY9g_cV0K_DHT6WOgoqx69ca9gR2ivXMAcCbpDKaBd1N1thLHw0zNg5tI7fIzhJv_ZPlGV-bSL4TYs3PtxYSoxdiAzpvsnjnFWf65pPQt_KDhVjUP4u_RtO5iRnSOpslQaLcok24TMYSpyd8yMmLQ5xcX3Hl9Iyyw23SOw5-d_BR6v0VQ0oJ9YLILj9B4-qqb21r0RYlScp4wauuxV3hXMIDXkhEvzjLngCAFHiWBngMjNugp6s&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGk8rPql-DO4mJS_YqMPb8UDSafEoswDH_uGFH4oLkeBqGTw9W6NbB1z3AfuAybcvjUBBpcRzn9T0NJqCuG6R4-Rvgk9TR9zQLOa13CWU942iyXpW1E-I86I9C0ss_c8WmEvRDozVIDiZAbNIEnUipBbl__58Npjz_8mb7-7E1pATEryYzRPq8gaddO3GxoDtvTxJUqCKHLJ3_4kz0ygUVo87ipbUaHBMMkzmVl_ekstXL1cwYWsRkHj-qf3OcglxroOibxtNOgs6XWa11ldvdpa2BBlHl9Rit8-ZnyONI&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFbB08DeUpOok5lQ1pg-hXe53Xt6mu_4rY3-M0SweYyeqyLugWmtFxkwhYdwlSoBQvUK_sSG5xZD4SV3YR2Kgi516pjAEcsx7kzG5-Kkw24_d1ca70PKv74UmEe2qPsEdF2y8Pv7bzGhdYJijbMHrpsg4WVc44oYOQIr5OSNqA0BEbbCSpoHXaaTNRk4AESPZPgVM1B0u3D1iRi1vrwF7E-pMmtRUnH9Q2pcw0F3_ByEi4ShgBSK6MQxVhZD4X0mRbgmeJeqChEZLT7ukO2b-enyPfX1kyNQOyczfT5Mw4UEBaPHCgALxgI5ohPYX__6F4FtBKNooPfEQmotDlD0ZMKGjAu_BkXu_fQOLGjUEIrZk-T7IO2KRqKW4hayIbMmh43zh2vRFGrznYA96m39fvZ9vI9HboHiy_fan7Bn79srgy2Upjy3tzLX7md2w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Aladdin Sweets Bangladeshi', 'Detroit', 'aladdin-sweets-bangladeshi-detroit', 'Bangladeshi, Sweets & Bakery', 'Both', '$', 'Bangladeshi food and sweets', 'Bangladeshi food and sweets', '{"Bangladeshi","Sweets & Bakery"}', '{}', '11945 Conant, Hamtramck, MI 48212, USA', '(313) 891-8050', NULL, 3.6, 986, 'Monday: 11:00 AM – 10:00 PM | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 10:00 PM', 'ChIJScacpj3SJIgRcOky0GfFpAQ', 42.4066469, -83.0556988, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEiMGqgfJqxBErlWxLw8G8J82hnYbjdDzzEKcyNixJQf4AWzksSFrrlsPPnPJ_UUHHBY_LO5j7WidZIP9ip0HGIZ8nHT8gfLjcUCt7ijlBV9URubCciH40Ho4Vtu8DHH5EeOeE_xeYSusXrD0GyT8juelCHNxRdFYYiebqC1390knIdjKVTwz-UHKHWXY3CQQdUdlflHX1AEhkpvLSDNumwubGsq0Sv0daGIprV5Wto13HDzKV1jUzZE03CYcfj7bzTOhH0CZC-SrSzGjwQpPdCLJOX5I4p2-H1zZw9hoKMgzd_oRRXBbSVjFZFIPpV_OE2-vYYa6ctdFmKrTtcgoiPAH4sQWAKWAiflx0w23T50DPJQXnrhv7O8cNaxVOC1bgCaI9f4H87_d1qYs3eYQ0mjg4BHkgjnt0Hh67hi9KHqA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFwEwbvw5gGZFS7VPSHe2Aj3g53ghLz0braZ92oJuWqYL9O-dJ3dZPVfcU-jDWv1tVDX_zrIeJetpwUWSOrO4kiaFv1R2CqKa591ZPtRTYbi6Pe1wwlHUTTcxP6EN5EF7ecIjpHY3q5cZVtTZzMf7IDNMibNe--TkmdjCG-IYLNbzcfSK9udNIOEeMbQD74qvZUEWyMRxEoKp2QSqBei1nBc7PBrDKxuCkFHttpBFzIiWVm6mAM_KKkEZBaDVnlqsHGQCp-P-ivaf6MyhN9eO8aHKlYJFBNv5s7xWthHhLWh0Qu10Jf6l97r_RpIbuZXed9-NShDa-mNxiYLOvFSXpefok0r55oIyrJ2kjBSJEB58lsd61QIz1WXZO7_xl2GC7050SLTzKbbH_L9Gna3ae4zJ0-mnng8-IxAzfRMd6-3ZauwadvZOppQ38HrnpE&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF5wWarDV51Pi9manIidr_iv1aI8v5a3g0In1rcEdIsNZAxe4ZFJ6DaAkWQaw6xqJTsdgHQ_kYKDp4yDL2Ht0rsD7y38uk4kB_oZxWnUdlqf_ZCKGzHZ6FX_uGI8jIbwSNiEYY-OZUKUj4xSEuihu2m3PQ2BMt962KaZBtaC4dBaw8yd8_OHEXiLsJNAnY8K3zcFjTp6bsCUUmFtAODkigCaG6BUCnhPHokrWIZrVhIwppI8o19DFkXHxBKIcWDyYGXAlwY3TLOJr4h6W-_2KFAw_HdgmR3G54E6zABHorpevnEHktYuhk1ctdgK1uPzsLwstp9Zmkr3Wz_gilfPQrzTjEoXnu-0xcyHM91zdphnQltcwLQBS2uIcAEtmIbHxgnxxUNnNDV7NUqPd5N-G9y9kdG16EKw3dsFt-7eLsbxJrE&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Mumbai Market', 'Detroit', 'mumbai-market-detroit', 'Pan-Indian, Grocery/Deli', 'Both', '$', 'Indian grocery with food counter', 'Indian grocery with food counter', '{"Pan-Indian","Grocery","Deli"}', '{}', '1472 S Sheldon Rd, Plymouth, MI 48170, USA', '(734) 658-6040', NULL, 4.5, 206, 'Monday: 10:00 AM – 8:00 PM | Tuesday: 10:00 AM – 8:00 PM | Wednesday: 10:00 AM – 8:00 PM | Thursday: 10:00 AM – 8:00 PM | Friday: 10:00 AM – 8:00 PM | Saturday: 10:00 AM – 8:00 PM | Sunday: 10:00 AM – 8:00 PM', 'ChIJ5xukbu5TO4gREwZMnI4avYI', 42.3591171, -83.48023289999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGQFcNS21pJwq-Tj6FCWV5iOIykj1PqqRci6Pfbt2ZfJa4bYMQ6bYOdg55-uznhhQHE9SKMMY0s026hBrE2G0MEaPUHXcZgu9t9Gk3Sl44-B8u4QV7SnMxoHIAnRG9xCAFSXu7zmXJb4qKzgCmSMoNBnl86bJ8b6j2MorHy1BMkd31CTo4K4mwMIHa9o5_CwDSLs2A0McYINPvjrgzKPd98mGhBM39QADWSl9uA9Uyn6ni5lKWPZGkTwRW4Ioxl4OvLgHh0UmcJMvbRF0ZqzT8S0P6m-_U-FJCuQRscAE-t_ZuNF15b8u6qBJAexWEn_Iva3_-itwBpUvTSoAECmTrZNOfsUo-AKnkHlUMhg0xmHTlFpQf7sKLDTJEEQZ26gDCmFU3WLYOdzT67mQ6kQQlcBXjxogZ25J5ZNi3Ok2U&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGGXd5XR4WAxsprgbH9NSKZmjgGjVtLI4BmGPcIaVa4fdsX1lQLTbZopgWamlLVRMyOsNXvPTjJzeThgJtC_5tfvamPEzR-2TCbVjwbQXnNkx9wOok8BEtgJvmVa39jk6_NiVw2qRHA_HgJT13TjRmB9gHRxZza_yBvU9jW2xPBKUgqi0DHRQuwJK5Yx_je9BL3IQb_l_fn9H7w7qsWEzbACRp8mr1PuSotf4xfFCR8JuwLIZjMSfCnJy8G7HtyyXXjlQDzm35fG9F2yimPQAuO5NAAJFWEmq01w-AwP8KUoA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGcZK2iseIM04jfSdq0VmgXSP5SucFMIoshOZCy8gNeiavMjTT422Qo8q6Ymx87unzy9Jutf6bCS5ra8JW5sO38QZPrcW5ltG9fCDjERk8B1CZNEpByenseU-mNT7o7tyZ-Pd1DNRwsmqWPO7l3cRiJWKP6xYmivFH7nNLPvgMOtKbT8PdXXdC7AZq7W3tshfUBOg05h297zSL7tuL2eki-jlb04STcprdi-B4GWRbKUoucCRUHCe63LF-rqLEeUBPzzEdgnbBD-VLizxmbSLUgcHQBJ3lArNb2WxtFiy7Z4rM_Nj1h9TfIQPlNRLuRar2aG7z5vRF1-EUVHNxxqVaFBvwzAR0XmUpz_XBVXaDvDOQwoZ6XXerOoMsThTwqTd5aYkt270BYNp9GsgNEfUb9rmOuM2OaN3MKi4ehbck8MEWQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Madras Masala Restaurant', 'Ann Arbor', 'madras-masala-restaurant-ann-arbor', 'South Indian', 'Both', '$$', 'Dosas, South Indian specialties', 'Dosas, South Indian specialties', '{"South Indian"}', '{}', '2016 Packard St, Ann Arbor, MI 48104, USA', '(734) 222-9006', 'http://madrasmasala.com/', 4.2, 1711, 'Monday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Tuesday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Wednesday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Thursday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Friday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Saturday: 11:30 AM – 3:30 PM, 4:30 – 9:30 PM | Sunday: 11:30 AM – 3:30 PM, 4:30 – 9:00 PM', 'ChIJQd-tQz-uPIgRnEKEr1N5Ink', 42.2571755, -83.727763, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHg3BV4rl6ZPH-PbXncWzEe1osu4KIs0JtA-AIJ1WEyrHNO7rD0cY3UaUCDyopWp4MLD2CBwthnCIs5v56JOKISGZXRMHsgC9qIpX-yqM5ePDNxYr00m8y7aIqWu2GoAZE9ocwhdeffYlXM7QYFKFBmqJSMnR5HsW6K4jfIykY4uWvnjJoshUxK5c36plugUU7tWCh-URPl1QHTCmqadEmgOzKcgzp4K_8iTtwtqRZ6PNh-uM1Bk3liPxl_m1qUNpOM-MEPhnUIqVL5Pgu50K-rqEwbTNF9djaLK3Uzi9q4Qw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGxHAadn-JoBvEFrVeeXEiS0SHLzi-aPVEX3QVUL0IrIWmUUwjgIx1umvfrdpF0wSJw6v6lBneRdBfY-irBexQqZdmw5Uvs0M6y4pFKgVQvJ_V808Z-e0VVnc45BJKH8DE52dQrdsNwWGIqR2ca1joSqWlJkDbIDgJ0BFs9WmwJLYLzlzH0qiVTyPkpxpPLLXK8oYy58VQKFRFTEcZr7E5H4XboL7H34IzD20co5cL7BcHHjrsbOAqDHTXSCmRIb6ttFCNctNuzGvBj_Z0NRVxsMwcv2nNbIjf1-6x8siRokqyZNdW2ZDIY46wXZukAvABWlfR1MmK9gj9IXimosBob3Xwt2zOhhc331wbeTrmtHLy5J1zFVj2AikKQVqnt7Zq12EsQ5LmSvC97SmuG2z-blDNS1sayn_GubP6VKx0Yxw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEnc65OxXWivUgc6qzC0h4Y_1BS4NjL4tcnWWcJX2WJKNhercjTRtAIWnVw-ucFTuIpqqQoEFaO5B8atUz-c67v-hl17lEA2y6BthQsXSQN8--4eHwyg-Ext0OTzwvzJCsiv8YvaUtXpSMkVv6Mrx_p-4Lx43xO2fN7b8NJPsShFCwqyoe_0pxq4Q0ssGtH9qd5CuNfpqmPLJkWRK1-o8QTqCx-D0ziBMZfqJnpEpKmqejbiURdMVF_jgWLRIzbU6xf5U9gdBIM8iVeTS5AH-Ft4gcHcbZ82myV9xWo5yYGa7xvs7b5-0BJ_KTGXQ9mLTpbPvqZUb4jSAyXXNt9sMRnyUkufOikXF01fXGpMu1MCyJDDTdySmuo395quSvov16KC-pAuOv_0FH_0H3y-M2A-Jqkg5Zj3j4wAIQxNy-lpQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Madras Masala Express', 'Ann Arbor', 'madras-masala-express-ann-arbor', 'South Indian', 'Both', '$', 'Quick South Indian', 'Quick South Indian', '{"South Indian"}', '{}', '1143 Broadway St, Ann Arbor, MI 48105, USA', '(734) 882-2401', 'http://www.madrasmasala.com/', 4.5, 106, 'Monday: Closed | Tuesday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Wednesday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Thursday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Friday: 11:30 AM – 2:30 PM, 4:30 – 9:30 PM | Saturday: 11:30 AM – 3:30 PM, 4:30 – 9:30 PM | Sunday: 11:30 AM – 3:30 PM, 4:30 – 9:00 PM', 'ChIJF34SZACvPIgR87SSP9gjOGU', 42.290804, -83.7369511, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG8GqSBzvoUeDqvwr2y8m9tiL9ZU78b-rl_Z_DiwNnDzFhzB9JQFWw-9EXjyprrOCXHW9gtpAVMIGYlU_9TM7N-eb6FlTMyLGVwIt8mNS7FsCQbrSApkmtiASLIJVoWyB5o_hXgyIhaUcrKrBJEoiurey0AyE3bt7lJrdoV2__MQ-XzaQij-bRhysIe2EgRlNYpdzDqQ-j6ufaUWfCceH5js1iLDVhj-LMnn-4NP_czo8xmCrPXeabhQj3LZeW4KcDnnNdxwOdazzQvOXqWvMIGYZ9uCTlIvyDzVkjGQbbxnD_2n1F1mfpj90IgL7B22r79DGaPnS2X480zaxThKepuVLY9EvtYpoLf5F6UYmWYO4wVxW-4WhpdNUddD07mtdMaUWfKcCEIYjniFbLItGe7tfsmCcOVJcsyK4LsnupdyUUQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGeOrDdhBiLM-ezzek_1TL2bbe0gxID6jXKI1fyTRjRfk71uqgVVgrg18YaWl9rZjU_KQDpQtwxg1tQHFbASuTyRGgE5a0zCckMysqG6emWqa5XtruMcwg9fRwkfkyPslSR15rhISHAw6qScjJIXu-CZr8UslSPUgC_W4fNXc2wmsF4TaWugo80j-FoOqCpczj6m-Clf6Oorem3fTh4H164nTsQMFGTkpQpAOwBVjsf9qAcZSj2mVRjI923ppRfv5JauDUT4wYbf7dIgAH9REHKtQqMj6ITulTFeBzwuy7DNGGl4-LVKDD1eQH74Ygue5c3svq5Xxkpe7lAMY0W1xqFvV_sskGPaUcJrYr5XbhPlpyzI92bR_zzw0JGA2HBP-KK9ajbnTkRvkHEVnADU_IkLG52qr9B8wcuX8assquTHEyr&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF-V2Y-LgcD5R0oVikxfSJcwt1T63qadJTATCj-pQZVZo7YwC1oqg6lDUQTwyRFcXxuRW0yT4-h9svNUKeKgaiz1VrYRqs8tLzmgw4a-t935gc91o3-HxZOlvJ-hNsTcSCDaRBkhxINfNyRkzQAaAOI88S096M2uvgb2v2PECzuiwynwGirCwDDHKUdxvBsZBgY6ZkrVkBlE2aTbHMw4RGV_QG_an-P-r64YKxCkI0lVEMkW-q5gTbcGaBP3PqM5Q57vLrF_JnAkVvjrfEJ-5aSDruMVsTzJQj9ArhPMBQehO1WfPcXWJFEpu6dJPJS2A4VJjVtiPPYEAtLCKNGakjH4tdw7rUxOA4DuIb6RgoQcife_xVTa7txtbtkmPVLe7NqRP7iuKLU-c-oSoX3q6_BQl2eDt0K4ZeyqguJFutNhzucM4L8ajcJ3lz4U0ew&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Cardamom', 'Ann Arbor', 'cardamom-ann-arbor', 'Pan-Indian', 'Both', '$$$', 'Chicken biryani, bhindi masala, upscale', 'Chicken biryani, bhindi masala, upscale', '{"Pan-Indian"}', '{}', '1739 Plymouth Rd, Ann Arbor, MI 48104, USA', '(734) 662-2877', 'http://www.cardamoma2.com/', 4.4, 1629, 'Monday: Closed | Tuesday: Closed | Wednesday: 5:00 – 10:00 PM | Thursday: 5:00 – 10:00 PM | Friday: 5:00 – 10:30 PM | Saturday: 5:00 – 10:30 PM | Sunday: 5:00 – 10:00 PM', 'ChIJxxmItH-uPIgRDuvzf4RZ4BM', 42.2985643, -83.7214494, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEut73wfXVzlXKVldF8HQhlELiBNRrvbqT_bJqxpyfUuoERiUteoWa6_jK69B5dl4GmIV4RtM-pU3Jzqh_D6QA3Q6TVf9uObXe1RX48WYLwj1O2GPEa3A3OgSt4Zo0z0fhlQq-MP-nmgCJO3LVl3RED52YXLcNDDGF5QnqmioQiMC9HWiNtpg7JDGn7LvsQUdPQ-W_BI0mxb5R7RSlib5T2CrhAFAjA8hgvxN15dti15CBREFId3QRVsIUBv7p-1fjhXdluvYiI22tcs_PDEsk9ZGm9l4bINMlfNY0ueH5cjeFP0PR8i0eqMp_fVykl8bQL-AAj3CYFYiSaCkhtjAoizQOvtZc2ZY6vOKh1xRPEbtdhFU4E1IWf7drwYCO33V5BojSRKE-mqhvyoNfgnFomG0czX2I8W50VjpKJNOsJxrv-prR7oZJv7Z2t1w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFZpoh91M0JOOCF6CurFVO6z_4MtR__xq9MDCL25I1-YLIWbncD61ynPsByn0QkNp-x4SDfoyZdsEjAth5XStmgsYrPj9YMniKJpKQ6V3Ng8pZfP7XKW76yHNTK-UufvNyyiGRDwmkBCabc5RcL6DHKWyrStOKtCqWwNzrk_5yCzf6zXeKcYi4teMveS1YEbVbHfVLjREjteEPHnOhLtYjbhkdkB6kdtTm_O8Z_Z8aZRU2AG4eFQVodF2t5VjLyZJ4xxv-bqRlYAijZt0fODkv6wDI-frwm_nIwzEfdPCacN-WQTJuZoKqVt27RsUaVQ547HsLI0u-wh7NSPh9jRNOIRBujMa5hgj7Ids_TyZ_xmsKBN0pw5Brm59Xw8oXRa_oWXCkZHsqt2wkj1tdpMrvOkuP7x6z_VanLeV21g8csRxKS&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGSP7H2Xny7fMQpdJ8VKGV6GkvTBWDQIm6ndRWF4EtJaMNDQ5fXJyI3qpahw-bhG402H6VFx1aE-LuFch-1wA3YqRizYBcbe-pkD2oE5WuISd7vpB7T_BFYVRBTcUe1n_N9-oXsDwg4NDZcGMt1Zrf8FPmOT9NN9qfnxwfGAdpxJJmXsP9kf4iIFiBuZGzTklw885oA0RP7PF9o_Nwai2rNUD5-ZVSRy_PZqwcc69BggdjTE-ET06gGnQ4jedxJquCsqwzKDErNeyHJkApohkYS4Szs0M05LyBn4FfvZRf4c16I2yt6kQEtr3eQdNkHkwRgeJUjjSRM-7KWQ9mUY9IXdqMpy7EjoCXfA7TqYVBPn7g9Do-tytV4ZugwiDaJPVVXJrbcXaXK0JB8to_1P5bibkjCZfwdgLnKuo6vdE58qjhwFtPe40Fu7JA7vA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Shalimar Cuisine of India', 'Ann Arbor', 'shalimar-cuisine-of-india-ann-arbor', 'Pan-Indian', 'Both', '$$', 'Consistent, traditional Indian', 'Consistent, traditional Indian', '{"Pan-Indian"}', '{}', '307 S Main St, Ann Arbor, MI 48104, USA', '(734) 663-1500', 'http://www.shalimarrestaurant.com/', 4.1, 1607, 'Monday: 11:30 AM – 2:45 PM, 5:00 – 9:30 PM | Tuesday: 11:30 AM – 2:45 PM, 5:00 – 9:30 PM | Wednesday: 11:30 AM – 2:45 PM, 5:00 – 9:30 PM | Thursday: 11:30 AM – 2:45 PM, 5:00 – 9:30 PM | Friday: 11:30 AM – 2:45 PM, 5:00 – 10:30 PM | Saturday: 11:30 AM – 2:45 PM, 5:00 – 10:30 PM | Sunday: 11:30 AM – 2:45 PM, 5:00 – 9:30 PM', 'ChIJOSatXDyuPIgRehsG8WwjCRw', 42.2793005, -83.74847299999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHRSOAWLnvdHWGXyJ5hiGakX7kRjgwFECL_aneHQyG13l-QgUx0Qw2Y3Hn-hOFtJdmk0_sIF6jB1uzkUCiOii6jZHo9meXd-cJobg1RyiKSL813CXQchyRrlaly8S4zEn0VGk2peyzB3LG6prJHiZviJMgZ-_smXRK8D7vA_hqaoI4dHgvgVfBMAZ1t37N_BkiMVVtXeqknRMsQQn7zRIoIi_q3a40lhUhxcte8XpuHC5Xv-mcKNGyrtrFwld1D2IXmoOnCwh8d-83BgEXGPhxit9_Kb_wODOXIMWpidhLP6Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGs1jnsx43hOhYXNhnLllHctKb96ZnZ9jFi8PqcneSs85Q-s7Q3IJFDT4NZprBN9zS62U9la8K6ST9kaimCvKCDllL_-myLe6l369skLxRcqh0nR6ugQsq6BZ0sk6tSK0VLTe00zRKn-ZnL3lJgVB2PhV6354iitNTN1K_DpUxIVikGDg6Z6CwKkcoErOn16ZsnwTs0cMOmfvdj4maL8jtkYixy0D1cmipfFklbFLdgxe4ZWR7Jl9Edl1fJRqkcawgoaoBqwP3eY_J9LiXwwYm1H6TtTuMLYkizF-lKrxcbdQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHlt4zllARiCx5Sk4TeRqvGg0pEf-OnI8daqhftTBuk_c5y97jfbk20wuaE-1vUpfCXggZeV0LHZRXXDYTIrBeUymXZ-52LVcqmlRrbk3q4GTLf-LkQG5nGNFjh4vTPS-afat7oJEVxwu859PUMGov-s0Ij265Zob128XcSkooAq6GjYlYOfUmv-kvueDFxXBuclWEaDjwpbbhdBdQuFvSkMePXVA6LawHPkRsGd_K72r0IeSSIIHjsUFZXJ0s7hN44KgS6Br4yDkxM0TgkyuJx_3RmnRluV20tIFgwFNk4HhtB38RkeJ3I2Fp6OHX_EaVdilHzMMXBGwvSY46IEhOf5Fvakx-xkTxPaoK0zxANYXjWlrXbqYtrCT0uzb2seDsv6gZTbvcqTnWuZP5n1BitTLUfb3yGR4utiDZsNqJKpW3WLGM90NrmSLso5mEP&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Namaste Flavours Ann Arbor', 'Ann Arbor', 'namaste-flavours-ann-arbor-ann-arbor', 'South Indian', 'Both', '$$', 'Best sit-down South Indian in A2', 'Best sit-down South Indian in A2', '{"South Indian"}', '{}', '400 S Division St, Ann Arbor, MI 48104, USA', '(734) 995-1545', 'http://www.namasteflavoursannarbor.com/', 4.3, 1692, 'Monday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Tuesday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Wednesday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Thursday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Friday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Saturday: 11:30 AM – 10:00 PM | Sunday: 11:30 AM – 9:00 PM', 'ChIJP8H70z6uPIgR8T_P8lSxpvQ', 42.27765249999999, -83.744383, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGg0Kr_n50ylVQInJ-c6ZYQLzgEn6Qc5mEM3sKEVDGBEy2N-n1j72AIv5tWkU1W57k_4SzzIR8KqV04KbQLdNzdXb53PLTH56CR2IpKSYANUiS7GBt0Ghx9aoWZo5zHLu8tgW43VN6belrLxbU-F-XGr_PlFFklY8Zc2sxMAw1_GtfXMUcQQyMj6diNCfiocWsyGOVyRY5bSgGM6p8WN-kjvs6XINs5olD8vRwMD9tC2bSHbI7AIa9IRyz_WQ5lQ1PUEQ97sHCldfTejbtKUsDahwf5dk4G-wqblKcdZbwYfQx3UvdVhoXrPiB-OLYWCs60jU6czY5pwgrMS5BABpGHHza4qJkRo1K9wXovJCp9gMcm7RYcsb0epFqE3R_QGFk1VajwwhrnavBDBUDqx6aazx6rNUZkaLD94vWtty7QKg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHvKmJKvLJuO3i6lnzduGCNg51-_aKMhlVldoaIKc9n1S7uO2vqQgEll3wGY3W3ajePFpPKAKqIGyIvRRdNmFfDDt26zFT2nyK4yif4rS1HVTLY7a_06Wo0TkfD4-7aFi3Cj0y9Ei2rLR349JCO5Nrq2z1kurPqgPGoU06i7mi_vXmydEJS8PMDyjnujR_tg2Mb6Xw0ci7a2VCAA5u7PUltwHAq16gE7axDyWoCAvTPDkATisAJJytpuVnh5-6KSWQx3ARFtvWm4lEnJJSAZJ7mgL3whaTmdgS6PhpLPF_zESFgPfYXMO69Ki-S6fZZfdnK_cwkE_W8yZRI4CI7LVBJm-XCHVIchZLhxGCh0N3aEiyMG1y8QC8vq0MotO0YSSLgfmR7ceEuGOuJTNs3nyTfRRvn-z46jcFTygxn4zkaF--P&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHGYo4r0BPsNn9hgHwf06Vpoz5uXQ4XF4tyAV_izB-HttrZP00SFvqYNkgjE2xUHmPVD0xrhOn0gMHO1_5vVMrDM9VjOq9WMyMlpO4wBYXOYPGcPXrjwdiIjq2pb02rk6nxBwQdgMa2fN62rT64q2rDj5nae8uAhumi5nDAJsDSseepOHvUPKmejdpdoW52tGwnVY0gihKRNQzTBEofLqW9UQcffRhGIETnl4o2X5njCMsw5DhCanFDDOQfv5yE6K1ktk5glKOdcw-DQVe4f4z8AunLnza--0ZvKaptCNASdR9-hNXNDWdsneKjwkUO93Xr6e3Nsz6SIcwutjnk5wjrGOn_BKyLgTnREUyb_Kc7c3GE0x9tm4wdSHDLZi89etFMzlPI7WNGDOic-E7kYtCZD_AgyGYUQArOTlCuRsO4IpDKtRupmOvRgT5GCTqf&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Taste of India', 'Ann Arbor', 'taste-of-india-ann-arbor', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '217 S State St Ste B, Ann Arbor, MI 48104, USA', '(734) 327-6500', 'https://www.tasteofindiasuvai.com/', 4.2, 716, 'Monday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Tuesday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Wednesday: Closed | Thursday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Friday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Saturday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Sunday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM', 'ChIJWRQCM9ivPIgR9eqQsqA1JQM', 42.2796896, -83.7406896, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFOB4-lz3zabCOePXCzgOyDSJhbBmBOG7pwuU4Cc8C2BHgFNX97YWNHIL1pZVzeYDXvYsZ2RjlUrS2ucACcuybFLOXMlqEl6XvSG1Bcvq8cOh3MR1naVuaSe67d3HS1cbvkVUiY0WFRQbT9ne-tjmrpE_4x3LgzMvFasJWxKq50X4LlrMWyr9i1xg7SjFf7Rcy9QLM9Mjiwm7ZttFsih7U826CKXriXae5tPDf90X-2jyiYUCLzIh2LoKtsh_F-HUSVbhaWI6-V5Re8c8uprHKJh8mTc1Dc1U9EklHl-pk7ug&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFByIsLrhVL0mc09GvCjL4RkQkUgmGk-SN2Y_UI79hA6C0BQTzEQ2j0u8bSeckyHybib-tNFSeZAVN1SVCCfBFiB8D4r5-sH35oJbsi_05q3LQmOhioiOVEb-zBV51_2w7gmKZQO29pPtCdHq3ipsIGvhMVU7ifDE0uX9wws0aFDLycCeJ6qHQHK9VdZcuFWTOd7DbHcIdi8M3vDkA0AMmaJ8r_-luyIMbqjfCwnTh1FIe0wkjD7XOrXhnrHwrqL4rVD2K0Q10_dPc_glu8rblC8y-2WOo1-YIRHIUcaIrG4Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGtCpCHy7VnN0sasm5gBLTjXvPFuKeS7ivBy7W_aL7yiDuJnpaP3fx0OQVuNTC3qV_6Vqprzad4SV2HiUAq6r5iNaX4JW3yoHmxvqZ8axkEtwYwTRRXX9BF18-DlovadueBodMuziLiieemJaFBmyJ-g1Cn4g0c50YsXaozhfyoyH4NzRkU615KrmXHI01EEiT-L30ANK1pu6xLXbhmMSzsLpV1-SMxVAVbEsyztUdirUBkunyFopcNLod8fpANy1D8n5dOxk0Z9RYoHVD7YsXHfcm9jLP6pQb6CWmoNgyK-CR_isCFbKV10e5ROi7-cCeUnzaClbh-nSamvkQJy-etNv21_v3wxYKQRaY4OwLcTn5HakR0Hj49x98g2Kmbknxax45Gshh2Iah8crdyeo8N7OFs6jV9e1jGWNOjBStUrCTO&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Spice Palace Indian Cuisine', 'Ann Arbor', 'spice-palace-indian-cuisine-ann-arbor', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '2874 Washtenaw Ave, Ypsilanti, MI 48197, USA', '(734) 415-2789', 'https://indianrestaurantypsilanti.com/', 4.7, 828, 'Monday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Tuesday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Wednesday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Thursday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Friday: 11:00 AM – 3:00 PM, 5:00 – 11:00 PM | Saturday: 11:00 AM – 3:00 PM, 5:00 – 11:00 PM | Sunday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM', 'ChIJ-WLvSFapPIgRZWKrvX2Na0w', 42.2508989, -83.65607179999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEm1jrYYho_lS-ZokqlG4cZ8kMb5uKE_cUe0upNj9KI4amkzdU50db3YkDTp28vtG5FmtcPcJO9WQhUYdSJ0ms9lfuaCyrFtuLGmRO2ZACvgZklskf4WJXvmBTFgUV4P5h25gvYTO_cJ25iFrGCSLIr2VipgzLYgCtD0iEV-xT2mWamh7zO9X1KempcykwNHyff5LUZT33n_SZtuppPykI7ziGb-HDOrEABOho7ELmY9kPhF5QAfWS_MYn7orWsb1onTjuXohD_OupYFcx1iWbNXM11o9MykvXUDYrlpW_FfQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE-Htllt8-qm8wkZd8Q6mzkDagNfPUEBihAGdpnkJW0N-1uGFkdnudlkOJCxb1hmjMiLp3FH38_Os5zxlRQPGQJCqZDzt0GY9cjHEB5G16CT3XH8Ki3Fxv5eM6Lfdu0NbkcLMrY-k7x0EqVM_bkWAI30ngu7SbapWqzLRI5eaNuKiynyGNlsVrv3j4sdNjvu_OFYTC6ae7eMphJkhOpE697MsgUQLXYi3ZzDSDVRi50JiqXL-UOboB2IotVhaT6wO6e-4BHyfM6DuWPI1dAv6DYByvyr607Ol_kE6PQWx1IyA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEsptg009X3KU3NFbAjC4w3VWLq4levw2N7t7fM0-8LPb4Zk1f0OAQgZBNgO1Np9BGauoOQcOBccuRZGx212oZQP0jtCb0NxT61EYEh7sa1Xy3plCtI9_ui3jGLeJPka4yJMdPtCm0sI65_I7eq7eWqhXhhaNJmJK6NcdD6kq2lG3v02_jhIoidto-0204Vu2MG-qqyvOddOSyGon_Zek5cm_cOyO7xaoY2GOCmqxROSUWYAnvkHLjucCrM6I1zmxpzCAdGdh6cnLJlNMXTde02lzSEoz1hqOeLyXYD-tXLmw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Everest Sherpa Restaurant', 'Ann Arbor', 'everest-sherpa-restaurant-ann-arbor', 'Nepali, North Indian', 'Both', '$$', 'Himalayan/Nepali food', 'Himalayan/Nepali food', '{"Nepali","North Indian"}', '{}', '2803 Oak Valley Dr, Ann Arbor, MI 48103, USA', '(734) 997-5490', 'https://www.everestsherparestaurant.com/', 4.6, 1072, 'Monday: Closed | Tuesday: 11:00 AM – 2:15 PM, 4:30 – 8:45 PM | Wednesday: 11:00 AM – 2:15 PM, 4:30 – 8:45 PM | Thursday: 11:00 AM – 2:15 PM, 4:30 – 8:45 PM | Friday: 11:00 AM – 2:15 PM, 4:30 – 8:45 PM | Saturday: 11:00 AM – 2:15 PM, 4:30 – 8:45 PM | Sunday: 11:00 AM – 2:15 PM, 4:30 – 8:45 PM', 'ChIJaxIyOCKwPIgRS9iWJt1iHp4', 42.2459739, -83.76925039999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH3bKZ-ZLOA6FEqCbe0Rch_qmLE1ZgUcsTkG-rs7JWC6fcnPEdGeYtpu8upLG-gQeuNsVSrO6Wx74_pXzqEVNEez5R_PZjzbC6p5vPnPdxxzTB5KALIZzfno5xjIi1erZqCBWw8Ei6D66blLVRgRVR50rBeQLvytX2HgjPnVYjCF35VBjE_TtRV6Ctr1lfuDNym9iDKWGA6Em0m1sqPQOOymQ1v01i3EJL6gABs0wm2lWfKcjWyrm3EUVFnB4XHFMgpyfLfWgOX4rpkjGmK_cekRQ0GqWrEb6CqeUs5itTMvSjm6E3ZFjXFcW8tHxdaUIXlQ61nbsGe_uDDV9dbyX2rSeE2z6HB9XzjZSWL0OtX5fpX5aZKJaMlDAwvZLfukxvvFGHtA4vP5_M23fl2gQubAxWP22G_BWu7-rHxXW9aoA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFxgvfkfN51NcmfVnRHLXax5pzxQdcjZhdRqrOc4vJHThp_puiomhEMAf5kxMzwCxchAbRGd_slmAW-mZ3zijX3ifKqnS8-gD8hPO7dclFxCKIov5Xo-UYFo9e7Y7yY6W6BhNAmP9eFxbAmLVlT8uZuwKaHl4Vgz6Azf6sSBFsLLZCZIxIZV5mxwv8UJ-qZBZ48PSZOoJLJ4mMPmT6F3ZUjyd05BpmtZ8igisxmvUNLR2XB3uBLGqKQR6P5Ly4ImEBTqNlfWFM9lA7_AYEDgxXF1MpJoyUc81s4mYWTlmTia6eICrUm1UY-QLgkKZFRhinJpoU-JW8QffG9oJvte645m6pktf9B2Pb4tzTWuMZPxOSiXOSjj6e7w9OUY2aMaQDVIo8kXnoNq_0bMwmSxPMEkhWuxi3ivouid-pj6aQJFw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHzpMFvMcMBP4i1tkr5EYt6lnh0_T5J3WTfTeP7tZb7ht1ETMP4vmfqgeXp8WYNOgyiPLYQQ1lIxWOcwQzS6DNzJcUpsLfmDqbkEtjoJ2ceE-f3IV5W61NUthhLgRMgekNmmt5HzfOl-QRdGO4jVpgKZotz2HzCTddt4sCRBdMJO0cHhvMyo88T7-JaXdrFp9oFLD9gzLCp2eVzErnh8ypLrel5OXbCO0YaCN1mwRpeF83g9mT-nES8AO8aEpIkjapf-ZaaDVM4OgRf2oCMAh261U1_xwdVSsJoQ91WapijITxmeqD5D3RJUwy0zgD3ABFQmCoiTVJTUFdmr2DBuNDDB2KFc_mXGXIrTl8U_2CyKywL_blwYcJtMuVN9sUyo8xB1vv8WCW18WKvMToUHA8y-96YAjwrf5v-oCFvdkRLaaiUR21eYN0IJ3Gk9pVV&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Foods of India', 'Ann Arbor', 'foods-of-india-ann-arbor', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '217 S State St Ste B, Ann Arbor, MI 48104, USA', '(734) 327-6500', 'https://www.tasteofindiasuvai.com/', 4.2, 716, 'Monday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Tuesday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Wednesday: Closed | Thursday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Friday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Saturday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Sunday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM', 'ChIJWRQCM9ivPIgR9eqQsqA1JQM', 42.2796896, -83.7406896, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEGraevoVacElLr_47IYJNVRMIRhBNMWrQaijJkujdKD8pVPyS98AE0AVFhsVRNJcrNhCDJXgi8QqTkjw4OIeZ4faM3h-IXLy_kNuo5bM98NOUJB1FEDAKt91JaZ7ICF2ztHIIc2gjQRY0CWJB5rXagtklYM7Gh7XqlNe5sjrTfQc43ya_I6ujnHNmTzXcMAVcPTJQuVbwK-v82g_46lzOTsigOys_0pl3sxVV9-xW2jPF-WcW_9a1Woiycw2DvbiT6PkSWk0RqXLIodvtLfhYE0HmTZKX569b6aBjJvJbQkA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGGaGFpc8G1xNrSKdZzQeqEJqec2wsXjHrX9JU20lc8tAoHC_fFUjWcvD6Tgobjbc4AddWMALIEedxYE5Enxs21kNgXkv4D3sDlIUvTNpk-A3753XwwZC4yhnoZGQ7lRit1fLZk1p0_59JnZxpf0Vhx_OitBoSfxt4cVgE_Xq4kkWylggLn5uptCzSQhliU5zRzLkFq8YIFM12NR-AfKbsnwTFqqpPJjEah_DyKRXw-ULEhm5fkT0rlUk8W4daCkscntHov3TDo0IokVQIPK7VUHl8cgoUzCjUdKTrFVni-KA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHmdjekqfoFfLKXc0c28FmDNqPz2N7snua26WuRrj_A3B_7-eOveq9yLGNhgdkswJUIJHAkgdTEL1eb3l8bCGGJmca4lTHnMmBFHolly4kqvSLu22m4v3TvmjNL4ftIaZGkn5suhly4E06JCVEm64hv-5_7hOv2igKmeSt0_CL-zwPUZG2P2eYO6YSo7RvtzMn5v3Fpbowru8ppqkdP1tTgfShDR1BDnZiDOpBjr5LCozxJjFN7ZKr0zT8etF0oGJdeHtgCzZba2Pz5ENRuToI9C9nWHg5KqQgApinTKK0HRtFoXSfm9QATlUuZ96NsCWsUNlFyYMzg9tnql3DsHohChzLLt25aA8zfgSDIlvAfPVILng8K5ulbYHJK62Iz5iC2cnlazVujlWQZETipZHcsy_9jy0R41ORCux488zoAF_-0&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Desi Ruchulu Indian Cuisine', 'Ann Arbor', 'desi-ruchulu-indian-cuisine-ann-arbor', 'South Indian, Telugu', 'Both', '$$', 'Telugu/South Indian specialties', 'Telugu/South Indian specialties', '{"South Indian","Telugu"}', '{}', '3022 Packard St, Ann Arbor, MI 48108, USA', '(734) 361-8111', 'https://thedesiruchulu.com/', 4.5, 590, 'Monday: Closed | Tuesday: 11:00 AM – 3:00 PM, 5:30 – 10:00 PM | Wednesday: 11:00 AM – 3:00 PM, 5:30 – 10:00 PM | Thursday: 11:00 AM – 3:00 PM, 5:30 – 10:00 PM | Friday: 11:00 AM – 3:00 PM, 5:30 – 10:00 PM | Saturday: 11:00 AM – 3:00 PM, 5:30 – 10:00 PM | Sunday: 11:00 AM – 3:00 PM, 5:30 – 9:00 PM', 'ChIJ_dxwELqvPIgR_bl4rfuAIq4', 42.2446215, -83.69925889999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEYPWDIrMdXJKVpZH10OcsN1WOXKlRid-Vd-spJcv4GqGpvZpDvmxjTLQ3g8-4FtiCKGkr5U9Yj6QqsmFIV_z6H1AHmlZ5UgGGu0a14XE_5Aa-bcS2p094Iuisc64JS19ozV9Oa9IBa_vimnEeP99ZPCwM0jAnXjOg4ggMa5-1sk3-_rnl7cRbV4H8MK-K_6Ex7jf4GBV7C0ahC7EJNR_ai95D_Yo7-GWDRsF0aYnDox72IoPwZUHppX5gKUni3h__LphzOiskDDid8FJRRT7dSMMPkFigjEq7vKylDDXtZjw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFz_ljYalBRji8ZkL4h26UzKeF4zELbPfOanHuOnDcgVQG3OHFC_mAsOZr2zF8ui0pHOQ7LWUj0kf8ewcdsYgjrO3A-dTCJr8lrc2TCf3ENY1ezQLqPc667RgUrExR9piGpqT7k4eUtWvs8U-rW0c9pqqYYZbiq5sTwKP0W9NQMra68VzNy-6HfZqAD4MaJT-ssSPWsg4keViBccFhd-l0K6dvBgRGt8dq46VImuExRm9eCqZLKuBXSxDl42nChMQgNntyXIfqGA3aaKsES2RpIxURo3yS3VZJVnVmpBOIpHE7LYp6CXt5gDxuHzZm2yy8Z8krDe3l_IWEUTopLLSp-PgamEPTqn9Vm52P6LvoebX5odj01j9BrjcIyZYEHETLLiNcjxgWVUoEa2d8Ve4NiR69r4FnLKuipiauhkw2VrMUJ_YwCpegEzqa5yLTs&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGA58h4s6pbwg_w7Y400r78rkZ6PTbiYyl48DTCGTtaet1FmDmEr_4lDv-QSKqgxI4wPM_9HT_XzjtpDCQcg3XPmwYzITWXS-gQFOI1OJXEYvv3ncy_NZ-e_57pvNwst-PHz3HK30DrcB9T5YZr84xrB3bQsm5yBz52Wru9R_8uGInpwijyVqOnftUG9-A2is556kbSCrcUdgxdVWY70St55pi8zfXOepJgQ6rQsqs9W8uhnKLrzplmd6xBP-x4kJRmI_kZndQ97lHt14-mUatD0Z_AVkF3vOu9Z7aPTkZsNx2GdO3vyWDs-LxxByddADP1v77I80O5HhxmUMxTLqbNtXCHBlc2ub-aA3bBUwckNz7zIR2mC1m5jbF7tRRWxWUuzcLTnUFozpYY48VPlJKFPykm3UsS0fWxzi44xMfxqw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Earthen Jar', 'Ann Arbor', 'earthen-jar-ann-arbor', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '311 S 5th Ave, Ann Arbor, MI 48104, USA', '(734) 327-9464', 'http://www.earthenjar.com/', 4.5, 325, 'Monday: Closed | Tuesday: 12:00 – 7:00 PM | Wednesday: 12:00 – 7:00 PM | Thursday: 12:00 – 7:00 PM | Friday: 12:00 – 7:00 PM | Saturday: 12:00 – 7:00 PM | Sunday: Closed', 'ChIJRwd_mz6uPIgRgP6vCT_-ctw', 42.2791024, -83.74588399999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGf2BLg5bNxS7FUJNaOQhooYzzhtBgcuogfmTxq30_yiEEBfA7brWlnMWGV2ZNrYEV4Pc-dkcAUKKHc9HKFM9rHkkQfMcpQe6FKqn0JJBhu2g4cn_zg3omM2bFyN8XL7cKKOiznGsT2gEd47oxyRSyDAytwQwnuScubNQ7DDi_j9ZRSfdXpEblZU6OdBQBHo5ijMiVz5QYbTLE7moTclNRyiVDCc7Cof3yfXIEwaRbGrqmBwAT2-ovNoRhM6S3EzeYCVq6IKkdRksR3G5cpeoHyU2fHZKpIY97GNb3q9juw5oNzVkMBgptppWiLtd2p7P5JUWWTXGFIwN5XdEe1DZeDwy3Zx3SrHFnSvb4QQzmntoWpwOcOcVd9QsQ9t3itCmqjXfQP7pymcXe8kr2ekvOfSZAqW2GBBzbROnN9cPw8jg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHnhVFh3i6T9erMAD1nAFvWH02_hxpaBzq1MaN-JgRrEE-u87n0gfRGsJbEdZJfRoKpvcTnfppxCejFYEPaK5vVH5KfJpxyvAH3KhpC-MBkUisbWIHJOly3gX8UXFZI9vb_mvcLf_nRmp0cICLkKOMH1EOcaAva9FfhHu4-atSzbRRAhchKzu1SAH76WLJmSDRZ-VHRNNY2Dto-Yc5OFIP4iQlyXmTc56Spd_lEKa_R3L9auzWE022M1PHnrcBgulct31ZsloM9XS4O_Rz04W7eRUR6Td76AFvMftQ64Cj0yiUV3HmRMKBTFHlKtPJo06cB7xWAV9nLx0fvBHAx1dLPnCOhRRh1d62Et2KnYgUmlIkXOsnzel1WAkqrb6Xy8sKPH2X_-ELwTymwt845b4ABVIxDBuZZxhq7mgyWwnyrx8M&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFyKYXLeUKJ07peCxwEwQXuVT78zDZlVbRtYYUNRmGGgmDLTGci4rFqVgvPmyM6KJH6ityZf2LqYJodWw9LlGuzziYIVPegr9xkjHrTUj2LWqFwar6oMrlcA2u1WmeErG85UmTo33YEBveHuWomWd6-KCHCsbaA_pBvSQllOXFpC4byoNdMI3M6HDasAH_0WirnU7SrXTkB7aketytRjPRXkGcj2Fl_bOStLhlCd56suUT4mnrEq5SpPdTEEy11b8B1H3MloJiXGDSM43NIWND0EHMnWedhsMLOoljR2-4gdrxdD2vlEdNyjTr8p8f00NIIC73bKIkzcFl5NeLid1ZIha1gXTUzwf5Cstk67er9Bytf_NedzapjGE3-1yarhOC3rpPaiix7Dtl9wxzQBc3lGO25Q8SCDMRp9Qh1vh9CUUw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Curry On', 'Ann Arbor', 'curry-on-ann-arbor', 'Pan-Indian', 'Both', '$', 'Casual Indian', 'Casual Indian', '{"Pan-Indian"}', '{}', '2711 Plymouth Rd, Ann Arbor, MI 48105, USA', '(734) 418-3175', 'http://www.curryonaa.com/', 4.2, 515, 'Monday: 11:00 AM – 4:00 PM | Tuesday: 11:00 AM – 4:00 PM | Wednesday: 11:00 AM – 4:00 PM | Thursday: 11:00 AM – 4:00 PM | Friday: 11:00 AM – 4:00 PM | Saturday: Closed | Sunday: Closed', 'ChIJxeTZUiasPIgRv7TJvB2b9aI', 42.3039449, -83.70689329999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFAe-HWeXK7WYKQZPpq5O4wxE1c1ehWKqmlVezlcv1qmFPLYSre7iJtnbtsso_b7LoiYLORvm0Gn56p85XZdMWagetCRxmTKmUh8ZFqrT90HcU9ZEE5hHhiw1yYysG687PuGPIsH-70f_-2uaba1bBKEQS4EXvZwVyHr_vr2p0nhQDUZ_OeawCXzZ-Lrpr4g5fMJdUTXG3fmCe2yEt44AuouPRbBDA7JsxYZ5OVDXS3YGSnIzIpWMk1SpJdPZrXRs2Wb7k9v2eykFkZ5zAtfeR5-BANAvkIZ8er_W2fzOKTqeM-SRRvHuxRDU2wQmriazTyvzB7mHoThZxJbBRtHGuaij_84MAyuU8ZVYr7b_kTDmktTaqGOvogH-gj0sBGx0PtKlPbl3cj4sl0VSpavpmCkZjH21nkE41voHGvRAzpGw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFWn4GyZbCWkDUhmbzYVeyHI_ghazyMbJCpGJ7nru-wt3lxavhCwrxpHgAnq2XLQQkfkwQQIfQ6e33cg95SXzyUxGBANQ0J7Ql3aEIet01kZyImtHsEECDv7ZbldrkbHu3VBgIRXUNuMtG6IXl4A-jsID2JzWEjGuI74oxAyWAUtjnR_nvu9NogkvtgtPtMjPdwAktpjeFYZoltvHWktgO83CtHzQwSi2_aEzoz6va6o0wVpvKJqhRBz1PuEiqoyHvdRwrRac6kwVUnPYFz2cF4FuWY3srBVR5pxXGDMtf3ug&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGR18FYJPgqPzIlJNop0n9SO90NQXEfewWTeXInf8qe19vC-ZrCCGRrNFQ9EgAEPFWmUdq5pJkuPgM3ZjKdSAxMJ0VgYkKW4NHAUM5aGJUb1ZxFbdNcrBVkOpDD87zMYOguk5RsOmzcs8ZfwPZty-8klKhtdIQ3Urw4nXejhpFmByMIX4xnL84lrKHww6gk9wMH7w9NqE94w7hJ8Y7riXv3mRC16t6hmf9znSeLRPpF_ipR6l0ucE7JtCpQ1scj4f6hk_TJsVxtGeAJCaDkUKEXrq4errI00pHHPqr_xUb758gy_vziZzy8mHPUYC9g5FleMOy8i-wJOHlVzBlLw-5zpWR_7YqcmDYSu3JRx4fFfLNJaIEpAVuzd8VuE8jcOjTn7TwKNtN0QuOngRLpnp8c-jBI6S_17QQu81DyvI65tr3YKokuGhKpD8qFVjTe&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('India Cafe', 'Ann Arbor', 'india-cafe-ann-arbor', 'Pan-Indian', 'Both', '$$', 'Chicken tikka masala, fresh naan, tandoori', 'Chicken tikka masala, fresh naan, tandoori', '{"Pan-Indian"}', '{}', '1797 Washtenaw Ave, Ypsilanti, MI 48197, USA', '(734) 622-0115', 'http://indiacafea2.com/', 4.3, 324, 'Monday: Closed | Tuesday: 11:00 AM – 3:00 PM, 8:00 – 11:00 PM | Wednesday: 11:00 AM – 3:00 PM, 8:00 – 11:00 PM | Thursday: 11:00 AM – 3:00 PM, 8:00 – 11:00 PM | Friday: 11:00 AM – 3:00 PM, 8:00 – 11:00 PM | Saturday: 11:00 AM – 3:00 PM, 8:00 – 11:00 PM | Sunday: 11:00 AM – 3:00 PM, 8:00 – 11:00 PM', 'ChIJyYbquW2uPIgRrg_cAaDR9gs', 42.2475657, -83.6419184, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG1WNFJ3XI2BbDu9BrgI6epAGqlyV84htxFo2UlIUh1X8uPdiTNAbj7B8aVqNkpMiYMTgEo7BxVyZ8940bJaobu4tQWoBqvjGopptI4oTzyn6mpFxy5oXVdj0vHjNcz0basbOQsMV8UesGV-8DS6XIK4A9hlnHVDyxzqC0huCWAGYl591ywz2LQcN9Untk4LbngZ0RkBFsagNcmtSKcd1vtZrgdSC-PaLTZB7dNSuM4iDCl0D6Odx7SHXP2XRu9HxbL96HtYFeqiNqaonZr8vXIZEP6Fur3t6A6Z_ibpjvzHj8OWD37xFszMDaxkmp_RZbyvHsUCyYgQIvHPW7xISXAO8vbasF24RDJyeQWk_qFU7hTe6OEYZ8GBPaHaTT8pYzqaGl2HMZwfaDvOYrPSlaASzabohzGcGTOLCtCuGstrPzw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF84TDl3Zk6uIa2_Y7AkJSdNzXkDP6HpRZg8Jl4SmnEpaJ0ef9-c1TuJhvTPAHoUPjf_fE2juo-eY6uPpogbujP_UJsuWUB2rHxY1ALvbop4aFh2Pja7ucCHwc7HwU3DnmnGqNku4mPe5DlzbetSTiR1acTiwLGo6N0KFlOzUgSay_BIkPZYGmGF6KmN-vlehsuYA5smmry6YLZBhogBlXTaTZl4aXFHvc6ntT1Q2zq5g07MFA3Nct1ytLR96vOLk-ASyzhCakHDH4pMOa-Vs2Q2UUHzrb_4FgpU8-UxYr5tghNv6sSWQNcUZQSd01Z8ficmKjXeRjkrSGqBVgvUo0jq6jLylJDqsSm4fBybPO2tATtiAvjp0VrI74xDw9mGdVSz2bK4GlNEzedaOtqIMgW-VghH6Psne-VWpGHTWPHyHKOY7V-jKvsJZ1iWPKG&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEErB34JFkpknL0X9BIpE6Jj_84IN19JM5OLl001LhwB9My1ixH7TetJGpPrzyg9rhBn57KFxq1CjMCqM0pUKY7rqqx-RDQcAApje1wMFV1nBoCm0q0BpXjhr00AhomFNB35USaWBHcaqTbM8GelUijC8jUCTByWu6qR0cs28PF17FCfj0Wp7tTF4MsR8EjJ3fEqIIK8d0f9mxMKcCoteX1pu1wHW8Ke3DqVeDOP5fqWruQ2uqqlTMcL6R-XtFrSy-E-0QnOTIfSLQNPGIn1Q8URMrVTFS9dNhYXzoFmndk0IQiagtJpu0X0_M0MAPWBQ6HRGP3vz5Fbx46At9FScR_REsA6I6VqhWXLtLy43Xw0iy65ymi6tVguDf8il7IyXxFDmSpHtYVrwlFA-RygEA8Ja3dERs6c6uTfbo0txlAP9w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Base Camp Restaurant', 'Ann Arbor', 'base-camp-restaurant-ann-arbor', 'Nepali, Himalayan', 'Both', '$$', 'Himalayan/Nepali cuisine', 'Himalayan/Nepali cuisine', '{"Nepali","Himalayan"}', '{}', '5060 Jackson Rd suite a, Ann Arbor, MI 48103, USA', '(734) 882-2882', 'https://www.basecampa2.com/', 4.8, 489, 'Monday: Closed | Tuesday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM | Wednesday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM | Thursday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM | Friday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM | Saturday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM | Sunday: 11:00 AM – 2:30 PM, 5:00 – 9:00 PM', 'ChIJ2Z6s_wm3PIgRILR39DhMkx0', 42.2875012, -83.8283096, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHo74jU7FPjXHG6VAYfAR6sltNweWze7T-TG7vl2q5qpCa7lHtub9TVwMjUg2QPndUELhyvsXLYfTz0bqYDL59ICsIlMrJe4O0m1fR_tKzdiD0ODDA_JWpM2jjFgipaRiaFUmqPp21FsT3LahIF4msBwGJUpAa_5wbO_lngLaleDIGr8aIUiifeLkmOJPxez48_JvNkZZAOvgYFnuUVrBGi18Qil_6sKNHgPMpQtnYRAMx__QAR3pJJXMY_Ie3PaO6fGAgCT_rPTtnKZLFQi4UEby_2BGosAOfjONqHe28OPg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF3ilL7Z97A8GpEIlBrD9t1YXZas4EBJHo1E38WrLsXYmnC7kZFC5-8TtBdJNNpUXW57MnToOJkeHBPQRyXkIYpm2BViTFtufn78GSJQ-eVq75I1_mlF9wNxOD9E34PQ3lp0ytTcDyzVs76vLZ8RDGPZJ0u5I9JjIC_X3OKOkzKpyC6FgouZsmh2ExpqO_nsmksbEU18JT8yZ8At5CHBKkAans9BlU558HZBYGA2yiNK1MBHSaJ2eXQJpXt2uI5Zo-pbIWABotUEJTjsZLYMrHN1fJ1BsRpRDcCSBss0X6L0g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF6tXJdpL-b2dj4Uq8LtWmv4F0YODzjobR1lsd3HI_c6GgqtFyPA-2jOhjn8NlSJaYqgDGrnYBoneK9AYkpI-5NhTFgrLQVWml3e6vO12Vv3wWoGfhISHazYwnWcrpLWl_P2Rahhvk81WwAFBfIjo3CvY-zG1Uhw857xgefqHpXPRf7zbe_ciRdbURncKNSWTyAkVYyDGDX_UyMhgcSlI-ysFdKNE9BRZUMljDnwMRZ8QaISitBAEFNA2_pbPmYh20QlbjguW-WJ7DpUSKI-JiiNo7NOUz04OVvInF0fK_WlqFv1jXlqPjLwwyiNmeWcLU08Zj5iyhNmA_rZ7fMORgIZdlP9VqIU3ER52ApmgcfsLcn-4dZtyjJaub5V1FgSzjxEj5dHIjkPWTXGo2RH0YYxYWDw_wjFq2zKRdE0fzxmz0tl51AfqkGHouX5daG&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Basil Indian Bistro', 'New Hudson', 'basil-indian-bistro-new-hudson', 'Pan-Indian', 'Both', '$$', 'Authentic Indian, new to area', 'Authentic Indian, new to area', '{"Pan-Indian"}', '{}', '32621 Northwestern Hwy, Farmington Hills, MI 48334, USA', '(248) 562-7179', 'https://basilindianbistro.com/', 4.4, 201, 'Monday: Closed | Tuesday: Closed | Wednesday: 5:00 – 10:00 PM | Thursday: 5:00 – 10:00 PM | Friday: 5:00 – 10:00 PM | Saturday: 5:00 – 10:00 PM | Sunday: 5:00 – 10:00 PM', 'ChIJzQmtViG7JIgRd5nfTqwfn0s', 42.5248218, -83.3534337, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHO8S1Vdkek6h7G-YNl4wOzUmEcKCDG5HE_LEqpF39YaiuyIYn0PbxUh_QUBU8YcG3oZ8a27uBYgOPvGcQ-Td1a3b-1r9piTsjJi1tC1TiUDpRqUthpx_JAbPKlo2s7DC7jZJ2g1oWtSgoFYaN4i5WUHu4FDJn1jUNr2HUP74nzBBHY3fNa7z1xvxYe6SzuRy-RvZhvFlhVLLA41Dx1FccyNFARDC1Fmg9YQeYpHSKe7QEr2-QVjH3Sj0ZAcff_GUf-m4K-JHe1BvoqWtArKsSwkem9gktcTBfAtmz0_tbykA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEneO-en_13PhvC-yzRL0YC1jTsvgGiWiRyfxVNkCLQ4nHRHZ80IQRfEbqYIHQuTTJcntvJkQRa2Q534b5aA6aSlh8UaRGPtfxNRc3TjQ-tsNoID8z0Pu2MUhxntIlp21PeBBukpu8vOlXnG-skVOm9hZ2Rsm3-TgWLylZ-ArFD_6c1cBLoMaeSotJBaf_lum1KgVf_m5voRI0RwLlxIjlh9zPq_TniPA0u2Ac9cqcRVJsxbwhptB_xTA8UkbKdnDl_owUfJuTR0hDQ8Gt7D8wiOMGhah8NNsXB_q9hreOGjg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGxgs88Nlt4rWWIOzT1CkxRFIpB7DaBXQYHpjQotC_UCye3eswjpBBuWAu6o6Nf4U2_DR-hID_Oi3ezRLVEYJtphDzEP2R8lURho5XvUPlNWsyEpG-cfezUjjVnIwtH1JiUHemmbLptoHmRLCYFb1t0E2kfZtgGuxZ86SMQtPVS2IB_Anpy-Y2Q4R1FHTG-JroJpF3NdWaEOLT3taQTc6episWLagXSrpJiquvonNUx2cE8vQ-XsUlLlQmqk7i_Ldspmqw9tqZPMLjcu0PYZM9mqn71eBldZNyPW5JNgHmQ2-X81e3G2gnvQiGEkqCsCN4rBb5IfqEz_EMFmhgi_BVvIYyEKwXq9Cww4gAfxC4VgscKudXAi7ph7xLhV5lwEkkzqHKNryjiNv0DkQYoE47XzS82K4JRSpmLH1wmHiNB1Lk38c96v1VIDvrZgE9p&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Noorjahan Indian Cuisine', 'Grosse Pointe Woods', 'noorjahan-indian-cuisine-grosse-pointe-woods', 'North Indian', 'Both', '$', '16 curries, fresh naan, halal', '16 curries, fresh naan, halal', '{"North Indian"}', '{}', '20641 Mack Ave, Grosse Pointe Woods, MI 48236, USA', '(313) 473-8001', 'https://www.noorjahanmi.com/', 4.1, 232, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 12:00 – 8:00 PM', 'ChIJPZUQl__XJIgRswxnafplqNI', 42.4427648, -82.907521, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHloQJHacSjYFK3vG3BKuTpYHnQwsMv0nSfLA9r69hOWJID1QGUxL_jpvAKWSnaYwsbXBQ5V0K02Rv6svhMsdG2vdWrqr4hi_1ZS-PSENySJtXH-KrITNDDmd84BwnzznkT9V_oygtp0_zLtftHt5husa5CEA3JKyBh0ENcy-YvVaANVMRSiNlTdLuuuNr2nR7imSayQBLi8F6hZEGkfgYvfx8rOo9k5rJGYhK6ZTKXrdMhBd0fc-lEjBwUDmvUPun6Hf-78C69YxGRZQw3sidzzw48pZCyN24wfwhdviV3y74nHeKjOp2a7d0ZK-FPdKLIP0POpMlrpfwF49raoCrnSGmk3oppqIpN0U3KdyD_TH7bK2Cbz4HUjjMJ-OcU6TzD8npl8gj9ck7pBl0rNxzlz2z_e0VHUGbKrEamSrw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGRz2cEVrPWQHw0EFPyBVjPDdOPMtQNKG1fvmSPs_eqU2wXdJcSBh5igF00oLdfl7UPGDjUaHifw1MUTmWxcEKkJnsTeuvWgQaPYkSt0fpQTTlnH3Ey67LYTthTohLZdv1oXI1lo_4PhG029fqGtiB0gd-wRX8yXggSrpWrDjCPmy76ncgYLziF4jOa0PWanKSdJX5hWYW72NLPzx2nITmIuLb6drMeGfnFd5vj_fyZtvNe2DlZHoFPXzmVI7Y1Uhs_mfzqR1n8Z2sCVeOt2hi5f_aKZd7S9ULBvtAsxhQSTg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHvPHpSb7RAJ8vbeR9mV9yzUr0dkakMyzYPTizNyLhI7gVUMJ2tStNZLtgQIwjc4GqY2cg8LaIC1NaRnLRHfiDQNBtkLHCd_xdoPt5QJFSYvc6a2FhQI1ne-fsIlbWGJzidLnWiextdwZWzjwNFcH69_GXIe9XZVFU6qSjpIPkroLuh1Z2CuU806yfVJGoF2wKxgrFDkn535MQCwInT9TUAJezSAOpeZWcbmrCXi_d6c30MUMWQKbasQow2RBQ0VJAGSSqvpMuWH4HcCe-xIR7wCVNaNTHParm1UtRQED5n9w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Karahi Korner', 'West Bloomfield', 'karahi-korner-west-bloomfield', 'Pakistani', 'Both', '$$', 'Pakistani karahi dishes', 'Pakistani karahi dishes', '{"Pakistani"}', '{}', '27616 Middlebelt Rd, Farmington Hills, MI 48334, USA', '(248) 426-9000', NULL, 4.2, 57, 'Monday: Closed | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 11:00 AM – 7:00 PM', 'ChIJ42x3VrSwJIgRkyLwApN75ow', 42.4979225, -83.33736119999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFC4EbeTJjVW9OgU574UJnpUhIv2APnYHrQ3YlSYzTo6ssUvqQbQi46wDvA6kNmEmOczYj5agT_mWeD0_rpAQTnqe7_icVtREM3-i-nuSjaXGeNj_AiyrrjafD204VnTxhBL5YWVWcjT_8ViV7JyMxCxJW67USlNNnaZ-UGZTkDIIilOcAF-z0LJTkaiPe8vCuw7rs7pD_SRcgiQGvi0wdgaMn_w1fg5Nt581QF8HXeX_0Fz-ZuCHzy_owASc8EOk4fiJU2LwnIHNzT8FujWXavmg_0qDhNdmxjLP-56ZGnfuIE-aqIyWgRTm7kIj-KeRzoTubzhIIzQV30j3AdG9YXRdgT7T-DaEJGkK3e2s0jYo6UsoM0U4oy9OuOGfAe2f3PUFW9cqHEL_bgQ49G_rOjEZ_Xh5g1yYhQV2BiyriJQg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHNQKA0Vg4vR0PJ8AxAFDV6xcMGXq3Ku3qAJ75sh1odz_96F3Ljtqsb9tvAlrZlGx5GcdV3KZwiddd7wHo7EC7UdxwaoWrc-zYbQOx7tzK3lhSGBgPisHqKJ3W_QvRgqCjVomqIoDDM8sX9PcSjXGFwKnhs-aJiXHnPanDDq9orj7ldQL7oz_m22yvQHX9UMw_BayTc7YJlWhBPZsWVJEC25MU9hrnKPYlP8YoyniZvyEKfdN6kklLD234-92wVHf1hivJb9NkKG6VjBVvznHeKmavEaOTeAM54ZEzYb0a5rWjKwlp66tL-nRbiygoiSkLuk5NV0wNbfo5lf2zoku_aNFLMW4O7iJb0E-uwjnchEt2sHuu6uMKfrFu-8O0HX6G_A1fwIMgtlyA1OdyyGEm7njezAZODfpdljB9mL81EaO4Nexiaa1DykHiX3Qfu&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEcrKyYYpxHGozGeXIknmbR1faiDbkO3Jt1S9mS2vPP_1CNyn2P7V3ndA6qoCKAlKVh98qYQca0y3ZLWgXaXZmiAqHMu9Jp3F4uwd7rOrQL2v6unukiKBibU59JekzNc8qCBbCUDasccDxWIavmXWz7XEcb-B6aumXUpUFfSUUEE35I4WWhi57KBfjL8MImFJX8l_lJ0fo7lkuet2wu1nmPpoBjr29H4ZcYbpS6I7_3zfxFAHjjAtCdlgKNzqnVjZXnhIPMXUZdvAanUSBioBi8FGd9GqjDytSKLQD0zH2XxpiT90zOaPaOBtYjIG5qKBkt92ofZzPZL2pmdJOXUki0ijBJ8aiu7d0SUgfhtAzOKzsSKKc44Ub3hReoO5ijGWbn4nTmm0bV3QV2TL8zAft03HUwclm4WH6QeQcGbtPHac71H9s9lYXLbR_IgQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Asian Fusion Restaurant', 'Bloomfield Hills', 'asian-fusion-restaurant-bloomfield-hills', 'Indo-Chinese, Pan-Asian', 'Both', '$$', 'Asian fusion including Indian/Chinese', 'Asian fusion including Indian/Chinese', '{"Indo-Chinese","Pan-Asian"}', '{}', '2079 S Telegraph Rd, Bloomfield Hills, MI 48302, USA', '(248) 481-9581', 'https://www.nipponsushibar.com/', 4.4, 485, 'Monday: 11:00 AM – 3:00 PM, 4:30 – 10:00 PM | Tuesday: 11:00 AM – 3:00 PM, 4:30 – 10:00 PM | Wednesday: 11:00 AM – 3:00 PM, 4:30 – 10:00 PM | Thursday: 11:00 AM – 3:00 PM, 4:30 – 10:00 PM | Friday: 11:00 AM – 3:00 PM, 4:30 – 10:00 PM | Saturday: 4:00 – 10:00 PM | Sunday: 4:00 – 9:00 PM', 'ChIJwWjT3N2-JIgRBU4IE7IuVs0', 42.6088793, -83.2997743, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFnYfIIFHSUk3d5_-zrVIJW_vQdbpMdHW_mnC77EON7Pf92sSQTmG6vQog2fn6bkzOe7rxvLBUubLK27VKW1Q81BBrG1GDTkF7ygtjgw4XbS9SczYVRWtavbimTtbQ_fcuMsByg8vokZcD94k5AVKkYOTWg090_UrZzXSXX7qF-YuwudzYktMGp9oUCaqB3Qhq19IdMa4eXYMq4zclHkTAWCSNAV6ngVnFHPBLdogPlM_WRtMeLXeMmY03W6sofLaJ1gCJlyDT8sNY_0KjPTiSEHiqpMNadbuaKrmAdA-7kyg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEhVblPf2smGIE_8fhTfJUb1tot0Vxxif8PD61K6UrfYAlYIdGeyYol2q0JYfWaV4Pk7EgjNS-Ga_0pfFqDdtZ48y_7M4uGrWVx7ctvjXWHeMay3ZKiyDziyHO9KXSpUnB0-P2VtlLmjXuVbRJIko_bKPu7o4A2v1kPxHcVeQ5ppVF0LhPXKj5Xptp4-LuFaETbwOI6_49MIbyv2MCaouZwVsSc0KaLTIh3wA3b3QuOaGddIdh1u_2rhrMcZJbAJhp-vcHrvLsdfwzc8l5Iv7_lHtKLjGFAFq6GsVkQMRfrqA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF6zbZBVSWqxz4hc7nhq6KcCkn-xJhE9ENyUTEB34pc_dkDEEUrMEYgAuXr7RU8wEHhfExBXTIrI1Wx9C7xzghMrT3vkhzrWsa2uiYG77WB9fmG1zcD4lB4S0hnVF6pfcMwGHHBJFKtWaotavmX38KPmJR_bEdDsEwreoObfKaW5DsOV1-sXj_XYaFlV-5O3kf2FOm4wkxd-5-uiGmWM41kRGlMFPJohvXSAnOiASSLP2MOs_snR7067VmCXyhVXoAv8kbEc6q1WKwiSbDKim0IPAMLdcBgZeshgmK49OEEfJaaKMSKRPq0r1jdI3x6SX1UgWf6OayS1Wg9uwF9pPSQj4WOZTspHMFCocmdIoPXC_w2w7JJVlf6gN9i7XqgYnYaGxp2nWM6UkvuGHukaE0oArWy__QqntfROQNBj9yvdPY6cTUSWaobj_a9bA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Mithai & Chai', 'Troy', 'mithai-chai-troy', 'Chai/Tea House, Sweets & Bakery', 'Both', '$', 'Chai, sweets, wraps, naan paninis, smoothies', 'Chai, sweets, wraps, naan paninis, smoothies', '{"Chai","Tea House","Sweets & Bakery"}', '{}', '4917 Rochester Rd, Troy, MI 48085, USA', '(248) 479-4966', 'https://www.aahartroy.com/', 4.1, 225, 'Monday: 11:30 AM – 10:00 PM | Tuesday: Closed | Wednesday: 11:30 AM – 10:00 PM | Thursday: 11:30 AM – 10:00 PM | Friday: 11:30 AM – 10:00 PM | Saturday: 11:30 AM – 10:00 PM | Sunday: 11:30 AM – 10:00 PM', 'ChIJI6ZYJIXDJIgR95UrvoRwR0s', 42.5909275, -83.1297493, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEeiKj9lPd0rrogMIdmuWD8xaDF0VDMAknq2tMQvwcbm22Avj2fX1QK80LsISbec_-P_vTcZ9dfX1Uwo-26xkB6tWkIkFIFy-OtYloRMmcQeDLZ-QZF2k4eHWm8sp7R3BhgbL1uBzrNujeWLcevM97e-P4u9q3Iuq5SnGfcZuSLZ__NS1JrX1lqTuGa-pSLnKFV7KSQy32yHyRGerwF9ruNfKZzt2j0PNR8JJriwv2dlOK9BSGzjd2pmMxVyqUgljlfBxJOmVJaV_MF1g0YQmuryfVMda6pD4sHCu67rJgtjUgolHQ52Iw1zogJ2EZWhW9JdnMg9zPmaggERTE4zM80PMqO5fpcLXT7lzWz_AYmVhqJxi00NijMnpwFJby9bx3TygQcq19PxslQyFEZ5uaZBInol2haGlffbY1Y8pD2uQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE4j-NYeZot4T-UhzniUeas3A0S7NS6Z0UK5HIg9pCXb7-YBpjFJRpkp1q_SLEbrFlsx4G2ypQF1lL4hABmTQNjd4ggU_6KpZEKG7G2NdbTsgywa0c5lF1SP-jcN9MbYMlqWNX2ZAmj3eqEbPaU2JgCUtvElRw8Gn3TLi_kAJ8uqOWxiHHb-Zyj1k4AtTXKOnsyxlqi-bTrfcXjJG3nhNbGPp5_LNXa1lNRX3HEEyvJIWmSJzM3Tvpk-s1I7mRIF2rm_Ph6O6GyiMTxobaEYLRDIFr7-uDY8nhbX5bVEb8sBFwKMpiehmTfEMiz9Ai_yHHrZT5O2DBRV2bgLExRlsOthIqzxGVdtxb37sjdJ8U_786OthkD6LpdSz7nyvvCIC8f7CR53cbv70M6l1_0UvgGQBE-EyhYc3ihYfezrwSF0Ek&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEDP-eK0Vi1LKNmumWbD8hJT3V317ATcmv94CIaDUqf803D-BbdWhYiTJfV5fk9dckyQp1cK66ajJXria1CYseSGxqsWhjv_yfegJwRRf1K15CXOyd0FS_kbpYL7kcltOoP5DYOZ5gb1pyCaa_QM1UhYdQsiUb-pYAztd9z9XWwM1-FJGtsqIfNkBOI_9Vf-BvmdPXd-env8KdeQNaOamdAJc3VJaBhSXVR-ljFLe_xDbV-meSavW9Q3Mi8wSfMkFXDkZGfsUoh2gsQ0DnJNZZDIpYRf14Hb-IUTXKSvpK74R5WRpLxMyyf06Cz9NvQNGx8FM74BDO1NgCFm_RLYlG_mYoZ0lPV3LglsTwHczuuWRWosJ3GxmPtPSQnNTIp-F2StB_vQiyzc-P0Jk1L-Vx1CuXqmsxEeajc4U-yeBBQY6w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Tanduri Korner', 'Farmington Hills', 'tanduri-korner-farmington-hills', 'Pakistani, North Indian', 'Both', '$', 'Pakistani/Indian, tandoor', 'Pakistani/Indian, tandoor', '{"Pakistani","North Indian"}', '{}', '6 S Washington St, Ypsilanti, MI 48197, USA', '(734) 254-1071', 'https://www.tandurikornermi.com/', 3.7, 586, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJSYRpYnRTO4gRJxllqjNX8_o', 42.2405802, -83.614763, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG-nzhC_yfVnACTSuqNWWNw_4FXPCy2XGayNEbZZmteUgVrP6aCtRE_mPmaYmkgvGgpiMLdxgDxLkUMU8KimksHdpGWlo2fs253u47ZAcA1lv3yAxMsL_hEgJtDuca8LwdUEh1ElHTlxGRsi2Id4Sc36RokqaRMv4mqO7nKPsFzVtQL404vrcbbjUT78LQvFxn3WQesdszmmDT2eouNROYFfNtUXg7JxcvvZ28gog8odbxrr6hVbEhGj0oVnWeNrkFcY322jYP8UcT67S8tyv0twk3f2xJJMKpfop2VSU1-Ew&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHwKmndzFwfPRmBbOvKacZW0jrri9EqOJM9_KYK35IZZK0nvMbMFYR1y-XyGqxJS2wlpRBZpaYLTctVlgMzowakRyDpSmFOvDJ1RASplL79V0SsJ1dL9aVtUz7FH2yqrnM7F6qF8P0xHvmlclDRz_N7huv-vySTALbuGfei3uwl3MyZxYw_spowOM0W3HRAxyTHcqwZtkIoCD2iH0PctrjNL_Ewx2tHkhuXgyn64hCOiPwyPbY2lTAyXsq5BHwYLN6YLSd2MRy8ovHAMIt39nbFZyUDdMhat_THwaogz0LO_w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHF9PQgE0GQvrGBpcViaWgQfnrRe4BzZWgVtiNwNIzCB5DijjRh-wHr0p3U_cWLIENRhnBF0CZC7m1LD3gjrSqDnoERCFBNiYB8OiBL6A1PYTxeQO5mfTqIuwwgTy2YWOINifWF_CPlouZAkSkkBUgN80kKQKsEknv78qEfZvAF6JF58vMQll972XOjFA16VzaSS9ZuK_v9bQDlHKLTn2eP5EPoNVysiCBhtRQGoF2DlclHNHVwroFcWxWmnUvTZit48K-a21XSP2k1UnhPVp70XO5sdJL0qGloN8I37gReUi-zRH-nH0n1PAg1wqyjLWoorj57R_-HpdeE8RlVNhxcdloXu03n5Zu_6x0fIpg0IgzDoNRpJzAkwkLSpOlgnxOvr_khcdMIERiduBFL5ukgPlCJNLXyH5ZrOnTL32mJbF6Ozi2Dsy_kTvTSgprW&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Khan BBQ and Grill', 'Farmington Hills', 'khan-bbq-and-grill-farmington-hills', 'Pakistani', 'Both', '$$', 'BBQ, Pakistani grilled meats', 'BBQ, Pakistani grilled meats', '{"Pakistani"}', '{}', '29470 W 10 Mile Rd, Farmington Hills, MI 48336, USA', '(248) 482-8825', 'http://www.khanbbqmi.com/', 4, 286, 'Monday: Closed | Tuesday: 1:00 – 8:30 PM | Wednesday: 11:00 AM – 8:30 PM | Thursday: 11:00 AM – 8:30 PM | Friday: 11:00 AM – 8:30 PM | Saturday: 11:00 AM – 8:30 PM | Sunday: 10:00 AM – 7:00 PM', 'ChIJa-73pwKxJIgRAEK-z5Z9PR8', 42.4709262, -83.3386659, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE9iM04I4YCYouX5yQQGbEUbCPrNoNqbPWsZnx-F0Kmmjk4bbMmNHAwgOUxLsT-TAkpPneBlPvs40IvJjbb3M3zXnK8Qdn0-8Og4ZhTUqk54dEHqOgMjfd43zqMnG9we2qcZMAnOjoRZk_QdX-irJOAVT5zs0LM-e8ws2zKslLPJOPmvh9d2wo1pl-ptP1C67SlNB3e5WHUudSQyfchxhcnWHfx8_0Lad9z1CnxbHh_vM6fH_FxtuWDp_lMRX3Y7cDMDnYIvS1HJbR1hT_M1M5J0LZLPg-bFs1-t944MieIRQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGGrjugW8R9eb2nL4B8M9pZMZHYz47RPE-rOecRj6otIKqPS5Qe-6fTts2W0xPKQ-D6ef7LELz71V6QkjoatKi5wsUHQOY1VtxABU557rVpv8sWxsaelUFJWVt5IKH-HPiju8Rin-Fiimv0iVBZTIvNQQ4-yN3fki6CdIq2eVGAGsLimpR_DZyUtjG03Pjdc2PZlyhbKoWBxXCtX6U9eoq-HAOrCXrrhtdYw9Zl6DuKpVSXw9W12XbOmW5h1PanIayq0ao9h-LEVNZkGLR3k5WdeJEL3g6wCQDzZ9HYqbB_KA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF-TAkKWfzQmdWXi7cbQz2YqXMTR8FTRULQ1H2wRabNMnYCYtrd2WE5fbu_UFSGUKPFNYrkyukE9YPrGF0DlzkVk9KH0rD-Fk_rOdyugOaNtMvUppArOisTz1Js7PWNyHx34K20fRQORTthNyh_fPzCExuo5P2DHX69MsJaGkLw-BzxAmN9D8QSSSuQDr1jLtI19z4MH9JCLcoOpujdzh5XlWvKNW2BGN4DKNz9RvW981PJbaY_j_9XQEzazh27JMoFZ8lYPDJxhWSy5wFiWuRduufdQqp1aNfQO-gadB-zyQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Seasons of India', 'Rochester Hills', 'seasons-of-india-rochester-hills', 'North Indian', 'Both', '$$', 'Elevated dining, North Rochester Rd', 'Elevated dining, North Rochester Rd', '{"North Indian"}', '{}', '2642 Crooks Rd, Rochester Hills, MI 48309, USA', '(248) 602-2121', 'https://virasatindiancuisine.com/', 4.5, 639, 'Monday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Tuesday: Closed | Wednesday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM', 'ChIJw41YR7_BJIgR9aKLwIC6x5Y', 42.6405672, -83.1723233, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHEmMulGSpJBIle_m7UamEA9IcTPYtYEWmwlnPWWcV6HnTyxfRdQF-kJYWwo2HjJ70ThMjJwVz8LyGg0TN3iv0QFU0rq-9OCPZlM70q2ZXiqWOuiURS2G4P-UdwBOZNE-ES3D47agQhiBsps2jCftwWRkIhTs5mtpRHiuBG_Z9jyzg7wXLCQe0EKIhQXdd2tFVpSwlYlolFmk5CTrzVvNqSY3eoasDXhglx9jrsFgEcGoPU5bAX2VNyisq_-flgv9yeiB8Ttx2SRvOWe1TohnqkNNSUIHZkfbxqsgn51gkaXQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEOPUd719OfcRYn39ZfK4Y6U53KQiWOItUYeudKpyVftNfF25xfJUcRZi7mYy1eC7fVAmhZW5wW5mcPSRKNXouC-IdpCPb4N2dkmsmcb81vfuzfRB92LV_ZXo8f4ialG0CHkpsnImZTkyPyxHDxFYzONU1WTaQ-OFuMr5DF5o5H10hgL0xF8CDCpl54VfqVqmldnTFfBVIPJtbS2oxX6oWBmk13wRTf0Ntb4Hw4CVk2AIR5O1R-SiUieOWT34iOcLN13jlTz_YXW6PqEhMsTDm-MzA3QIUzL5aC11gGyZNPhw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEESPlLqtuOA2oRpDeCQgZmrKBExvxn9xZvg4_R9vK1yeB1MDo6FB0l8GEib6Ar4CTdi1MWIq-ER3UNdbZRRqggTHrv0fwTs4a-BCZ3I9a8c98V8hZrd4CsA8yhIDO4pYn6bRXI5TjweCzh0emZQzVOic1fwMu1TMrssj7M2WAylVQqcPyjuPR66yBQcEi-YtMMvcmUli965anDu45boEVdGoRXzFBj2DKyLF5LjHR1GW_P3saeTLS4ZZ6NKPSxBwI_-M-_oddzS4sb1OQmB1R_uwoZnH6CmzIoty5vtyjkhs6aC7REUOHY6tZm8nIoDFgY2Y7eFfrdhX5Dt0DU8hBwIe7MGwnSffwAc3RWZABtlgSrgUcVjNr3wHi_lwktLeJksQ9hZkiazwnE0pSJNWavVwdm9mrec0SiTcQ5et4OlavRydxCXKukseO1xr7CF&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Happy Hen Bakery', 'Canton', 'happy-hen-bakery-canton', 'Sweets & Bakery', 'Veg', '$', 'Eggless cakes, Indian/American flavors', 'Eggless cakes, Indian/American flavors', '{"Sweets & Bakery"}', '{}', '42927 Ford Rd, Canton Township, MI 48187, USA', '(734) 983-0050', 'http://lucapastrymi.com/', 4.7, 684, 'Monday: 10:00 AM – 7:00 PM | Tuesday: 10:00 AM – 7:00 PM | Wednesday: 10:00 AM – 7:00 PM | Thursday: 10:00 AM – 7:00 PM | Friday: 10:00 AM – 8:00 PM | Saturday: 10:00 AM – 8:00 PM | Sunday: 10:00 AM – 6:00 PM', 'ChIJpdoYnx5TO4gRIc_8qAp9WHM', 42.3220095, -83.4637083, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEYHm4XpqBYn5P2uSpZhXAWvPDaVWO7e_ullhmM1TGDcbg74Ruk2ZSqaiqWvAkNN5B-qiHON4Q8h_ZTFxQ3s_6Ti8VDspm-nlsV7ZAosBJ2qoTIOfNJTHiFpV48tY2EGFLzHI5EwXnsJZm4w5m3rqrY3BDCGdXOtzM0c7L3vxktl1VPdL2W_MFI-jcqEyYp0jovKaycX8AOL8COgZWn78JMnlqztky2EQkno-lPkS83fFj5wDXFuUSojPDzvZ3rX3hpZMgl0z3XSn-sJ2hlJfGdd0TFb2yvH4fF897DMf_rcaaUMD3uAwOm35B4pK2_JNh2U-tqE6Qgtp2DY-0lF-BsCig-zjif7mZN1954HRP9csDuPmWOPQw7IOAM8-Vq_stes7YrrxKd_6aS-jmXkI_QeuDJM9uw_Ml08BoNakdzlcmO&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFctDa85sn2wT9FX73AoVgRhoDBBWDUGrtY_bsD2U8Z5wTaYjW-dWpPhrdtfvOTmE0HkO-Ep8rbK7of-KwxLL4dfi5yiy2eElKeMWdRbjJ7pg_wprW3qPbeXF4DqNHwbNvpLZymP7SvDBeuZC2WAcYUN4OEuXGMVSdIpIhLrLKb-LEZDTrMDWwWRDG63sGsLwNBU3CWGYHtgk8VjKI2MBLJMRss74kFSfA10PhujK37i1m3OhbKV8fD7GBsHwe30PcY1rSI9BnM2fJ0_zTi8B7K7aJFRtJdzB9sdfQqrV7yBoFS5tL-Gx1ky8GCGVGgJSndftvis3xpFWWy4mbSglVB1ZadddJx7UR4yhkgup8ZhMiy_NzVAeV4hjUMliROyXpB9QoX1Z5LhbqSLEmguehIwk6kqRtjXZa5L2irsrNQyH9FTAd6HqQVTqUdxmFr&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEAbVXop5RVk-KQVkzoYKXag_YjIgZ1NtFlSLmLuBgAHGRVXrCcYTYC6vYXgcgfm-707LnuFP8PkrIe0uuOqwcrwhS-C8j47MQDOUdcmF1pgv5xN8sSQMrfpYts2tZKrkA2n-bcy_zofMr5H-TLzO8Q0R0GMbin21sLyoYU4BPcaUWsLxbTvwInEZdd1Yo963SuyvsGt-95B88_y_Y6vj2T_SKpaiuMeJB4tnx5zXmjwbNg_Al-5EFWLF55R4WQ_Et-bMju3DAgCcEB9qAmbEBJPk2tKdURvP3MavFHkV8tSiqL6c0YvpmOQU8kjm0lnwM358p_yHVLJp0mUginMdU9YvGbyeaPfH3vxS0Xv-ZG_N5Nq89FHZjtGzyNIOscRIWkEVeChC77LREJKTnQf-yHOcKX-e6pisGWnaMDnmpVgg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Noorjahan Indian Cuisine', 'Northville', 'noorjahan-indian-cuisine-northville', 'North Indian', 'Both', '$', '16 curries, fresh naan, halal', '16 curries, fresh naan, halal', '{"North Indian"}', '{}', '2033 Coolidge Hwy, Berkley, MI 48072, USA', '(248) 677-3666', 'http://noorjahanberkley.com/', 4.7, 459, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 12:00 – 8:00 PM', 'ChIJfxTOXavJJIgRe8xiicRgIeY', 42.4913225, -83.18369059999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFCtHXFqP0jmnqGdztnUPmOLwcc3lrNf61DhgPNTnXtgxfNPSf6wwFrgOAAcPuB80vHFc63EXW8RxZBj6hOEU4IsOKS47Q2m_wZpQKCwOl1ZSDKHdrUanMCOPJmvZTW1eb3zGMGsYYXp1CKqAZCuspGQAE2WA4soYXEb03NbYg1JmlrpH-GWJqcr-MfrfDiDN9kyoS6UoamxQiTN-E4EiYpRF7gb4MzjBtH5vIQbX1oM_1SYggvAO53AmEAN5vRekege1UedTkPWFcpCHlZzLnxvGWdjvUI9s-7K08hPlFngA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFOf9j5MrFCRYCIbmLU6BHd1HAld0K1Iy0jOuJ9ieU7cmuQt5Q-2MT_vbi_Llmn9sRr1NvL_StR8wNUfGJmKQmE5jglBcUH9w3uFarIej5auI8ytVXBwMLYAMUGEN-65yKHDKBuzaDWrXf-pY0le2tGkWiKLFGeAZfgBzEiWuscMk9bgaHJb7vIxHNflXHQSN9OvEPNvUiKf1CO67LcOxyXFbsA-omOh-sVZECq-YyDgW44K8dR3gPt46oZWqkxYWNE8TjcH20LFN-OWJf42Q3HsncG1718qLEiCPaV1lkWkw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGTVWivpDbil3m5qtE1yyowx7qvQDGYx6jNt16oK8aV5ZI2pzKoAfCp-OBZTF1y0a4K2gD5XzGDW_M5S1Akl0WQ3MYUIoQUchx0aFgu2CbtpWu5-PA0Yretfqskzsqk_P6FEFaVmzKchbm5prOL-lwLkPBYpG5jFykOiT6a9H-8AwyVwTA4VwZgodXp8sICgViwGjticPQwdb6694nY7yKYZuxqrUgPZ4MfkLLZ3zoSAJY6NSinzBaEgPDkVl2d6sGD3Jw-NeEX39bM55ew6z3SyvTEI_WpS2HCZbFl5LRdjg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Noorjahan Indian Cuisine', 'Bloomfield Township', 'noorjahan-indian-cuisine-bloomfield-township', 'North Indian', 'Both', '$', '16 curries, fresh naan, halal', '16 curries, fresh naan, halal', '{"North Indian"}', '{}', '42787 Woodward Ave, Bloomfield Township, MI 48304, USA', '(248) 618-3677', 'http://www.noorjahanwaterford.com/', 4.2, 271, NULL, 'ChIJIanfdNq_JIgRw2f6j3ID2YU', 42.6018621, -83.26345859999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE5tu987n7By7sKsohEP6D1dwlEv2aTg1hImaPE4DEsJMtzlUAt2BLCEaPitvSTxxVyZNKbrO83ERuyJLU1-L0LPZL0wRar6NGZHSkJtmf5E8QSCPMtvEArn5FLHGVPQbYyHp3mFvvFjEXBzsnBD9K9fuY59gFGLOSoyKVUmRC_UViHlckvl1TMlDbEgQddPfVG6oZwURLODicxgwfuxT5lp7Ejdce0YexwJ-XgSZR6wE6Xj5rJw9ZnzWMLLd1AF-2-Hd1TnthAQS9O5d1ypH4FhPIOhqRhfFomvpH9KgA7HA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFZ8OOr1oq8tZsqJ5FnbZyVRPeO-nJMgdqI_uEPP7M1Ki3CofHPKuVu5bscy4ZZXOMfHYGpfkSslKtpqRxGCoMEdqInw77JSwlOOCl4Y0JsUEt1KOKCSX0uSrMHIj5im8TvafVHb3T-iM5ubPvPVsaDjepUsULUHDHdElLIdynvsdk_p8Pn1pyn-rDKXt29FzUDWVynug7R-QDLD0anQicCWG05Ql84ZBsxHQGvT7S-Um5iGzhM_OPs4ZBMukbIVte7030o7J14cjXyXgjiakhDN96YAuhW9nl5oF5akNnp-g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHYLWXfMLm5N6eDsY--8oRV1PSr_a1fYgNPyKs9VbhEMGBFhXaICuB4pIQP6FsGULMmP5aTbJax8W_3JZHa3fJQWrjB4my74UOPZj3RnC_w6KyTXqpm_KZEi_mjS6Gh37rs9PGf6AtZBoFnCUbgtlW8GDNZyAH62JxTYGvBGV0mx0oc056UEC0UV5c6uQe5cowXKRPcY_xQdA-Yw3qwa2jhGkSTprWq8T5gZYulDdZnsf1TfdyeJZSi_xukKYHVfrrQjdxvQker6-Cpllj2YEv-tzpcFgzJiDYZALfXyeaL7g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Noorjahan Indian Cuisine', 'Berkley', 'noorjahan-indian-cuisine-berkley', 'North Indian', 'Both', '$', '16 curries, fresh naan, halal', '16 curries, fresh naan, halal', '{"North Indian"}', '{}', '2033 Coolidge Hwy, Berkley, MI 48072, USA', '(248) 677-3666', 'http://noorjahanberkley.com/', 4.7, 459, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 12:00 – 8:00 PM', 'ChIJfxTOXavJJIgRe8xiicRgIeY', 42.4913225, -83.18369059999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGYEZ2Ttw_OroA3Gq6ZsjPSpHqQelu2e1Ulk9b9NKhWclQ_BBc5c0ZWkb0FXEGtKdBcYWNSIuu2Z6xgzM7w-ubJ-9RFxriQGrQhPBwQz9hVref6iNHhPSIoLyg-wwtvPYxpKgne21huVmI1rar6Us6zBu64mcsGTI-XugX0mTDmw3pDvKexzNXoOd0ZZAnDh3RNBI8IZJq7jWCMoq_wMjLSJDQs-Jm7n6iZzGUE19UEQOK_iYbwG6go3idb8-9Hf3zgDpl2AmpS6MDPNnTFa1HGBCXhpb-AwWpffgYT3FTbuQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF1uurANpz_1FlsviXC8Bvidzhx849c18wrE4RlkN3Kzw6-I7Ac2cnuIWXT651pHBAcCOWifB9C40oE1qlS22SXaCRtIs38WWeAijLr-DQt9SNZ3yDF7N0FZZFCuWxpC1ZHMySnjmX3Jsc_HGv6pqBbpFE2yV2jd_b9tIa0AU2OdbzfoA_lJhViR47KG8tZjXehNCjmxsVOqJG_DrxClXZ6NMmkLkmQeo448ncRHuIcuvTjCEkhRg1PzPlxL5RF_F7A_oxsxq531j5DH_XTQGdp2T56uf2nJfpqM9kc95n1wg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHX4KfArQmS_6X0Bopn_qZyZDLFUqbAJWloa-aUt5n4grCSceU8PfnaTiWbdRxBr-8d4Z4RlxNIXSRzo6r8e81snnne4SF4OciTd2eMLMX2FN9wsHpY1Tjl9UTBtkRbSQN9u7ihQJTux-JjiAQR7SWH8tavClZDkRq2SJzGXIdv5r0Rv63YmP-w6wIvf78zoigNLKNATK0szB4Ct7NpigQmlcrSal_uHRHBXHN3PRRf0entb9TLLEBzWtVSBXrVFmoBc869D-ffoEDRDpaFfIWN7mG_KxRYMKZor0c5yum_jw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
ON CONFLICT (google_place_id) DO UPDATE SET
  name = EXCLUDED.name,
  city = EXCLUDED.city,
  slug = EXCLUDED.slug,
  cuisine_type = EXCLUDED.cuisine_type,
  veg_status = EXCLUDED.veg_status,
  price_range = EXCLUDED.price_range,
  notable_dishes = EXCLUDED.notable_dishes,
  address = EXCLUDED.address,
  phone = EXCLUDED.phone,
  url = EXCLUDED.url,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  hours = EXCLUDED.hours,
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  photos = EXCLUDED.photos,
  subcategories = EXCLUDED.subcategories,
  updated_at = now();
