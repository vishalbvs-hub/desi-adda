-- Upserts part 3 (30 restaurants)


INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Red Chillies', 'Sterling Heights', 'red-chillies-sterling-heights', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '43743 Van Dyke Ave, Sterling Heights, MI 48314, USA', '(586) 803-4388', NULL, 4.3, 259, 'Monday: Closed | Tuesday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM | Wednesday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM | Thursday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM | Friday: 11:30 AM – 2:00 PM, 5:00 – 9:30 PM | Saturday: 11:30 AM – 2:00 PM, 5:00 – 9:00 PM | Sunday: Closed', 'ChIJi6fcB6vdJIgRXplPErYqU80', 42.615476, -83.03282, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHfyKBYHDC8feP21GAd0yZGrH6k1uWKVK3I6-pyDfRLxzZqx0aBMHsS346MOwFs1ndtdgpJ9wlS3LFf8rh1xqQsjxeFCgE7EPrZ4NnCnqfKDHFYJ9UDA9X7MP7J6RyOB9Pz3XHkye8OJxa6arnYrHwGTVHf9s7kRBo1YVvyOMZjINZgvXQ15lOIL4g6yk7Zbk_d5Mw_AfSd7qeJtCbFwD-qO8tOlNXFRa9v5yWYRZl1_VYB-l2bb9CxO2r9UIjkshvw6szZt-Epajb3CrECsoZbRYCdqSs2Obf1wyirBjYYlw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEe0wyB6CouNXir_q3fwR-5ccXtiOyO1pEr0gxxl_OQQiyKxvX01z0K3qHiHr5kNJo9zH-tLqSegFrah7KtYws_jwKBEu8M3VvBDuc40-3tQMJEKiSIBQPxUWwe-HodBVER5HlgcUYJGT5TEZ_ZRgo9vauKBy3JUzZn8C_dCYSZiAka52RUmXKtTC2ZskteNSqW298dBJ3DclwTlJ8I7rhxuNsJMtl_k_Xi4OGctMWgrx5jStyvFcKdXOzMa_i-Ry1KGWypRYvYDGn7FgjVPNQUFQoE5Koc95ylKGE6_8ohyKmM5WDXJn3bi2Qy2csItbWqzotXf-YGbpqUynQqsVd8wlUUze73BvyAfehHix0iMR_fy81e6Fzsw_vImkfWO8zYe9yoyVlW7QAetaMZbFbTnQWJDubLD1znWBbAWYdHh4h7&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHRVh1Ff_yLlEsHFN9lqMAE42RnScp8vwYBSPMzFfeLHATMiOa0h2hB-R1hgSudQAYRtRWLh2KEWQwkyzyuGSWunDmhxxSP3KVMv7TjyD9CL4j6tvUtAYkcW-j8Hut7UpMSEz6gbB0l5jcw28Q6LFMn2oh9liaYQWT8vtf4wGMBQt-WvKCqUGZTtlZSUGLsT70oImXlOJDXg6ikEmJN5IJ8dfIFdoYJEfY8LnKPUSoUmMxCKhSPUlLxEBeKtgopNA3oSFhKqHXwuffuDoI1izesmO68_eKgGQ5-Q14jUpIPVA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Masala Junction', 'Sterling Heights', 'masala-junction-sterling-heights', 'Pan-Indian', 'Both', '$$', 'Butter chicken, samosa chaat, masala chai', 'Butter chicken, samosa chaat, masala chai', '{"Pan-Indian"}', '{}', '34869 Mound Rd, Sterling Heights, MI 48310, USA', '(586) 838-4330', 'https://www.masalaajunction.com/', 4.8, 612, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJUbR-ulPbJIgReFQc0UDRh8Q', 42.5494891, -83.04932099999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGgZADUXPCCaQ5CbfexzIkwHQxck15D149D9Mg8Fdn2bsfB0WRJlMtcrJdZql4B2_lwOu9GOw_c3dhgQ5_WizWdUCuTAij0pguONY1IbaulGkaGntgZGKfshvzoU9GX_tR7DMwxZKJhacIG8lWfU6AgckcRKhEEl4CZjoHF50knyXiq8nDBdCxtyC4r9YSahtvNNIbSfF4KhsKjPH3LNmFCC9W65eIcj-xVpWbIypvn6btPWAabDisdsrN6wNJa_9jKfgfN3rdLygzVU5JrFoQS2A4opdvFn8SWqvR3_1K7Gd0tdMO4_kj3qq8T5OZkL0GjSunzEi7AsV8MkMjUAnybWfIVtaykpFF1kdbvv33sbV8ObkrSkkUI8YnqtZ7cVwUCbCYKBNa4jBXhLl3Uk-MiH9YSHHCQQIPiEC5lKwmFQuXm&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH_CkMxS1nOtgwjqNBCi93cDO7XL1kNxqVB--jXHRYEKgMO1UAqjyrl-cGUz0nkpOr04EZUvSkV04adbd7YaWis-viWTKXfGo9PsQjo4A0Dw2_i_7ZEfsa16cmOb8IL4m1gkY97tpVYA-A1JoJiYPHiO9Tc0lhoddiFSt8glj7EkwKjW5bKO_lm_fO4Ws1nCRJ7Vr6mZu7kGJv4r9AsxGo-xLSdOv3ZkJlNvZwHOKw9X396AmwzIh8sgk4dGQ_sqogNq4jdifqbVNVrRESgbFeDj9NaSZGjEGo1l6203QpphQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH0Sk_GNNxdzsX4x5w72q_RsvE16DJN07-u_PfgH2EhSISJbyRAhyX4hCqVJWhR_YqErsPCSdGmBmJCHPaqfDBoeP2yxMBQBpwBlTQYCxjBWsVD_Oh-r4sMRPZAu_NYcsTlc6YIcqmMbZ0E-_JCVJDH0sGgU34NAeCdiAqtJkQpkn6oYz6us6BVdL3D6MJ3LPFsiCWssS7-T2Zs32J2Kw3qxNcW0LWaUWht-vEZc-wJ_OrF8UjyW4Z-Y9xTl7dEjs49wlV1MyHwJuQQ8-SK0FlDjc5whEDgR1YoOrq9FpfaFysFqob4KXM47ZZFKiryBsk9aj9ssF-sii6mFOTC_kHqVzh2pzUlPSstX6sG2hkuXhJNNixn04vfludFMRdpc5D9ojhlNoY4gwpt8UNjwPlEyvIwdfUEB1jnWncJArUukOgVLsbzZIIlx3v2C_lh&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Shahi Palace Indian Kabab and Cuisine', 'Sterling Heights', 'shahi-palace-indian-kabab-and-cuisine-sterling-heights', 'North Indian, Mughlai', 'Both', '$$', 'Kababs, Mughlai cuisine', 'Kababs, Mughlai cuisine', '{"North Indian","Mughlai"}', '{}', '2079 15 Mile Rd, Sterling Heights, MI 48310, USA', '(586) 722-7363', 'http://www.shahipalacemi.com/', 4.4, 295, NULL, 'ChIJqUXjxe3FJIgRSACBDdDvrzg', 42.5499144, -83.08681519999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHX-GI6KsQEvjkns3zpYC8Nn7f4jZAqLDZpzDuWVDax_h_BQGhuivTdAykT4szmhzEznQG29BWvrIYcmlsbxOJ8-GlBTTMe_HO7HSMxfrKyJNnog7y1VItQI3wJt0xsBkU5s3gyn9kTG_IA5k87lPuO4lER3kH0NM0dTLVP4SzbLLZapMO_EnSEuEa5K4umAhnrKC2cf25t8XWZcDXojaWgtXFcLUs-44BpSmD_GthhnphPcv-IF-V6k2NYQ0L0zM0m1AS21yK0PRRnclYaDjRs3DIhBf1CvE2_uWvBQJxoCA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF9yAjXKmHTmmQo0Z4Guhgbn3yV_hELhoUxnZ53RzRd8qpg5YPHYfYbSClqV4GfPIElyCR-8Cj4VF1F7tdgCXxnzPx4nA2JOo0QFpy6HO00WW2zZZzma1Zx-M_DcjtAKw9D55rNMveNrCFepwKv1keLjRqaHis1VfCzQYBh2AkAkp8N3uXFsVfJrIX5N38fY3ewALPjjFlHrW9TOjjljiTLmk6nnzG7lPqnNqNmUUq_8l6EKSqg25LHObpzNGwPSsY8kNOf_hh64NN58K139Q-tG3cwVZhbMRS5-NZQ8Ryy4w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFLWbWdevgH3_JoZPn3Yjhe4Mqmp4PYaz2CLdh8afiwhr3rK31ZhPYECs-_yx3PYQDKZ7vbmEK6GMdLRPCsvtEW8JH70yeK3jLyppuLk347F-Y-ueJ6ngZHEDytKd10XlQ9lEYZoSQGIZHOyEj16qRMfC6WPuczACZ-9V6wvV4ncVERCA9Uipxp2mAJXt5W3QxfVJ1sLx2oPeg7eCq_yTc7hL5cQXqC9oBsW83SHc3hVleGgm6sxo7CqjBYJOZSUzxyr0pcQRj82Sw5bpyQhLI9Z6Yv3BrC5D0LHUcQguIjzJAFqUDCa36CvQPb6vrfgToDwpKZAXJsqrXrGeiGbf05EEP1SC22F8UVyAZAYSydPRKNp4T5zIUGsBf0PGFcJXwWNxGjrt68Ro1YhiA9CkjukjNTCfVCxI_v7yzD6IX2ug&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('New Little India', 'Shelby Township', 'new-little-india-shelby-township', 'Pan-Indian', 'Both', '$$', 'Indian cuisine, serves wide area', 'Indian cuisine, serves wide area', '{"Pan-Indian"}', '{}', '8194 23 Mile Rd, Shelby Township, MI 48316, USA', '(586) 932-6111', 'https://littleindiami.com/?utm_source=google', 4.6, 1884, 'Monday: 11:30 AM – 9:30 PM | Tuesday: 11:30 AM – 9:30 PM | Wednesday: 11:30 AM – 9:30 PM | Thursday: 11:30 AM – 9:30 PM | Friday: 11:30 AM – 9:30 PM | Saturday: 12:00 – 9:30 PM | Sunday: 12:00 – 9:30 PM', 'ChIJQVZljnTnJIgRlNHUcRZxCmk', 42.6681361, -83.031733, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHb7sFrPg1ENJkZokCIvlqYySgTcYtEteZ-k9ivQyAABCcwismYBdK07K-EUUNToTaYRoSisUQXl2_E3rho3utAxbuTiMFcazcKS2qyHzBv5JAuZDLVZa8I8Xo5sI-wZ0gd5CBcouzr5t7M8b4VeDt2ELU6kaZfVCTVDEx4S6HJy2Hm2rq9pMjuZ5YuEFwPgagrkWXStqCbMhIVtuAvHIaqFpgfyp1Xt6UUGZNI-2igNAa2A06RK_9jK_quBF9qncNdykSPpq8Y8n341s54MS1VLQ_uwfvuar9b5KOY9dBnlg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH2D3yvIQCApUEQLf1UQfOcRIoNX58zsWWulcYOgUU4fvzeC1n9GmbU4x6_IisTDeaL6fzRvgZeOQwVc-bXdW32nrWl24QuIhja7ODsuaGRrvDB1iaFBWe7qv5q9IJ2VQmubr7LnzVTsX38u87dW852k3LY4-gRs_MVyonnHC5aKhiUGZImBKsJOgnZB2NBkHcqzpVHGZFm6mwJWA5BfDdtlVK7fQJs7zCFyQe919NVrKlOaPmbZbB0nzCITPE8yy-QQV8mAT2ZaaUafK0dmsBJyLG2LNhwGVa4l2FgX8qOdw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEEJS6_Etozqpmo3fdeyX_gvZ1IW2K0F1NL-g3pRXSQIqErIMqh5_RMshk7gIPa2uv57qRRiylg3rjzg7wA7UUkt4wmSKrmwHwN0bbbhzjKBNRIlm3CPPNxZAgkNmzNHDPW_6fus_jdXXOJ3io5Dnp4YjnRPwwcsG4Htfro1ssEmyiaN6W-8FZTlcMQ0QF7wCrZQujAt15P4hSRO_mufqbXx_9t091KO5v4ucVJDBhzFe5IwSH33yrLpYL3cqjQi-cbZK3OYgivAZNWpePgS7bAiVWxiUxCxZs2PiQSe_OaTg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Pink Garlic Indian Cuisine', 'Shelby Township', 'pink-garlic-indian-cuisine-shelby-township', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '48935 Hayes Rd, Shelby Township, MI 48315, USA', '(586) 980-5142', 'https://pink-garlic-indian-cuisine.square.site/?owg-fulfillment=pickup&location=11eed80c9218c835941e3cecef6dbac6&rwg_token=AJKvS9VKFa3TzWYWcsQ5RR2rc5ymLVqQ1GPhrTkjd2RyDNNdPVZkmtwztGN5WWYobqvqLJGEUDiE-z21nvZCog038JbZ1Vu0pg==#most-popular', 4.8, 516, 'Monday: 1:00 – 10:00 PM | Tuesday: 1:00 – 10:00 PM | Wednesday: 1:00 – 10:00 PM | Thursday: 1:00 – 10:00 PM | Friday: 2:00 – 10:00 PM | Saturday: 1:00 – 10:00 PM | Sunday: 1:00 – 10:00 PM', 'ChIJu-RWpBvhJIgRMp6bEk-1R_U', 42.6558754, -82.97644140000001, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHssZOALw50pN1X3jC2Q8tX0Tyoq4FH4mohotW-d_wCjVWZdkBsHu0VD2kAPOOLbd-VAy5U1G9KEmqWpqGMDT9s8cSdGpVi7WEeSiyiwUgV8FWrwMzZPFKXyXxE9P--hZ2aJi_7J_qeY-MbjRVDJ9DCCgi6Zff8v1HedkeAGAym5L2vLsiPvmQ0YWOUS6nYvFQOk5hMVxphy2xN_qbe6sidRD3CxhSvAWbT08oOKwPeu5NWO7FrbVxgfhEsTjcKhSCCS7-x7bmAKA_skRD51QN8PL4jDbKm6HiEebRy46rd5Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGRhaFPE6osAUc6272qtnX_C7fOK2LxbB2IzJryWtXKe7P1kRNc-Pahh9pjfGCqgYrLE1WqZZVEzBgersshEH5LOznnyvaq16WUxn9_gKsSqGOP_HPaFek73Qfw1fC3weOHV6k2n3_EK-mx_k75ocQs_o7YUiCQN64WTo2n2rHse1ws4hf56-slFcGMHwLSKoDsA9KUDjwCY7sVoEuWd9TkPKeRsXPrkxmODdOQGobGbDISgaVW7ipX2bfe0PGVnjM5dMLQaiqtCqYHvSmmF4GR0u-YfZIonmiiddEBpsNaiw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEn8F8ryn-QgTbJqh5tHgKEPYDr9vG5ddHtleQuRwgha9BJyO2B77lXthAFam6eGe-LOZxfwlaMYCExVSQBoQ4WQOZng9jV34E76XCiOQOt5n-kiUSXQpj8xm-Vs1js_KuIFCfvR7323Y6Vn29ffaXULHwYgborNjwOAufqP7I-vCnIvAT4p5gZ2RA6d1OYAg-Bw0WJZ_nbbwtNPvfynOIe6A7885nZN4tl6CwTFg-tVwM1K5FJqTOSmAwEIxo5YcaiXu4uAUkzYlMwwFicVGcT1Li24ZUrFvvHqhKYkiswFQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('La Peri Peri', 'Sterling Heights', 'la-peri-peri-sterling-heights', 'Indo-Chinese, Fusion', 'Both', '$$', 'Peri peri chicken, fusion', 'Peri peri chicken, fusion', '{"Indo-Chinese","Fusion"}', '{}', '37891 Mound Rd, Sterling Heights, MI 48310, USA', '(586) 883-7515', 'https://laperiperi.com/', 4.8, 397, 'Monday: 11:00 AM – 9:30 PM | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 9:30 PM', 'ChIJN8OqrmLbJIgRH1Kadn4Trq4', 42.571921, -83.0504773, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFboS7Y36q5XP21MIoI9p81o9Ps42IT5uvMBErPgAr7YixFTF5toJp7NKzX_IT9VejI604XaaI1K4tgf02D7m0_D-FGUrUqFpRWP6bE8lx_UpN7DNPEfG4E1glx4NOpVcUqKFnAZk4N0zgYjE-l09_AY43PwED9IdvLgs9p299q4XoZwStuSkmOJELpQrhsrm4Q8MF5y9-vpXWpdRF5weG3KmjdlUogJLLZPuOk_g_KjV2BP__cczj5Yl96qvXJWqwTek-NwXGSjBfJA0-tTu8ZESBeWgKxWNaau5wBCZh8vA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEBsYR4YOB7NLdrbgiexlGQNokqSKMJlLLdm47WADnSCDoTJaCER1a3YTOqYp9zrd3RLMHKfPvrvaniWeLoD6O6uGKlebf5LNIoF3uVx027T9Cg5QphSxf1WoS1Ge49CC8o8cP8qAX-FbzEPFj6yBv_39dD7Hh532saId6Vc8xRis42aI1bJKTwp2d0cS1_sEoENyCOzQSD_pnwkNV6IjEhHCCX3JTlB9_fYIxB35QQnhlCjMqWB4VHYPyJqZgOdot7BD5xn7YgBA7WZiYpLkvHPBf7fJPj_mazcCm35SzO7A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGLbTcd50kqAMxqBfMMy4h9bZIRXN7kYdJ6RXXYy3tFU3HMwT_72iB0f7SW1WWuU34byZi1aPkyHFgTBakgb46bSgBZgwFFzmrvotI6tsAp0-M0fxF5h_Uy01lpzkV8XLF47Ao-B-UHORaAfQVvDx6ioh9xz-XcCx7tSiylFZDbzLt9V0hfSrlh26zdQTsL-KXMKq4sTVgqcNukXNXyvtQjhEZqxtR9FvAgWQ8WseSK7rUl4cW_UiPiEtHNmY3UjcCbialTRd8wGKCUpXw5eT-HzgTw2u5GmdwwG1jrRWcLtQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Shaad Deshi Cuisine', 'Warren', 'shaad-deshi-cuisine-warren', 'Bangladeshi, Pan-Indian', 'Both', '$$', 'Curries, biryani, tandoori, delivery', 'Curries, biryani, tandoori, delivery', '{"Bangladeshi","Pan-Indian"}', '{}', '6060 12 Mile Rd, Warren, MI 48092, USA', '(586) 576-7913', 'https://shaadcuisine.com/?utm_source=google', 4.8, 775, 'Monday: 11:00 AM – 10:00 PM | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 12:00 – 10:00 PM | Sunday: 12:00 – 10:00 PM', 'ChIJ7fmtM2LbJIgR6s8inf7pLoU', 42.5057356, -83.04404590000001, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE6PcKuu80hhUjR4X0vL2ixw7VpF8NegbS7bu3bnDOeE1JLPNXii1YXAR9ydUEBxJClbokMiw3bpFkPYm-z8fxjvAsUQ0HVgeRBZfHyTpLRzRUSa4gmIoSDjkmxkQymWfAEo3NXvcp78AdmeNZ4FyH6poHRn555skmAYd6hf7D0sz3nKstFOk6Vk3lET7ZwBB5xcKR41BemVpfB3CEzi5ZrZwMv8l-vSOoJaXI79yZPxCbzg2juxAWBYVVIGlUtYQeP-JDFW-S2A78-TJ_LNQyHvV88EDKHZxHOlGoYqk_sBA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEHGCVDm4Y8r-9E12D5HVIQRmE7OudXcy84vJJEhCBRLX32J0Zu1zqdRnWGCC1RpcefGxV1v3bD0RFeIqLU9ur99ekDNFMjqn1Pv5QXU_yJh55PMjLI8396a-RB5XGKcFBCWsgF7xhruLC5QOSQFJdOvSUN5vyk-TTykNFAgVEiEzh3jsHxvkD1C6WLCZ9Y8FBwgxAGfyl5PlTm9imUHcCNlcl8AVJlkZfME8CUHJr_BSHouuxSxCmVKFphGD6HWtTEpITltz0hfk8EVK8zDWMfUlHJ9kb7P34NO1mcVy9SXA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFAdzWhmfdo_Ht75edkfptd0vQA6pfqoj2QvnWlz9hzd2cNzEu3iBXtasw9MdRPkQV1kC17wSS4svdr1ruOUHLJDN1aFF_QpDpyYeXyxCQ6kwHwcyLqT0ZeUe6n9R5ZmIy9Stw9J1oSyvyH0U6jqHeHEEdvERT0_TbW3N8mc8iCiweYJId5nfMi81Jrq3tWITHYSbylAw0ZDiCFS7VmitS5VCuYAzWY0RTzvGeCYrNX_Pb7nJ0BMxlwJVnEAj9msAqUPATVEZtEV8v9hKpoa5aEb-NRdMppM8sy5coX8lfHEN62_AlaVwB-nWhAFnDoZMuuOVJnrPNofVNFLYsYx5-GS5PvTo508vDpC3jlhRI4a3r-WSdFhcOSzktpj2hf7eEIAI7qF__YptqiR8R0pjjpnJ6uUt1_M9hlxt-3sjpN3w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Royal Oak Masala', 'Royal Oak', 'royal-oak-masala-royal-oak', 'Pan-Indian', 'Both', '$$', 'Indian cuisine, carry-out', 'Indian cuisine, carry-out', '{"Pan-Indian"}', '{}', '106 S Main St, Royal Oak, MI 48067, USA', '(248) 850-8284', 'https://royaloakmasala.co/', 4.7, 1473, 'Monday: 11:00 AM – 2:30 PM, 4:30 – 10:00 PM | Tuesday: 11:00 AM – 2:30 PM, 4:30 – 10:00 PM | Wednesday: 11:00 AM – 2:30 PM, 4:30 – 10:00 PM | Thursday: 11:00 AM – 2:30 PM, 4:30 – 10:00 PM | Friday: 11:00 AM – 2:30 PM, 4:30 – 11:00 PM | Saturday: 12:00 – 11:00 PM | Sunday: 12:00 – 9:30 PM', 'ChIJB0pBc9nPJIgRiQXEeiz-MC8', 42.4894801, -83.1446485, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEqLIIYbPkI3GU-RS81_ynewVex6y6fALyvD--zLrw4x09bCU8dhm5aE09kFdPpR3G99nMkzI42duZfq1eGMi_Bl7JD0mGC-a7wzRtRBgGZZXghYVPUS8KM11zFgl_0td8XlSyDtWzBMgd7RhFfvQxVgUy0HsXwaK2PjiN-3XaV9iP2bOu-5OBgQtYTd3VLO1E7t3Y8i9XRsC-htDzpBRXoEVKK_ILlppmapf0azmQypEjKA3Iy1wGqKYeYdItL9qC_Bk9YEODHvAgfhpdTUpOYx2jU3MC8GlHi6u2sPB7Fog&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGOkwR0CbpidCiDQQ8eyQq4HTG3pJ4LOe_vWJFoBi6qKH9M-EQI1jRvRMKj98Uauydlk0Nb1Q1UFdahPm_cz3mxPwdmzHDBx4D4-Slb4kLKfQKtstftAK0YSCxMmQy7rOylZU5gQqUwWGaAX-KBA_Q4_0-Ex6ERdYmg1Y4Mxfw_LA7UZINQY_7fuqy3-KHSKbus2ooWTj8umLNdFO0p7USCAAnu176gbEd12Qkq0iGKF5VSTDKcMrtdWMgfnQvqC6_qYnAk9j5Tl5JLmn8nMkNG_XwuusCqyeshWQIOzv4E5A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFa_CGt9NRlSxlLBi4OMMBpWuqgeDhw4Nksscyed8IVyVELEUhSIYuJTQv0_diXmnpeMl72ovnQM4mOCjRQn4xX3ILspbBxIMt7LJ_dT203E3Gdbjh4Vfs3i3CwMV8E98g_NtA7hgCpsKvbk6A1RAp1uCd6PhPK1r-IlM1nQBXUah1FVzD0MG8NJYJb9rsQumEqSgs1UnVDieyW3zEdp1ZJs4H0gP4j6h_VFEmZSHQjBBijUuwAoh85xvwWSZwR2i00i-T30mIiSmA_ebLTZzM-BObt6UL3FR2aE44AFCZqJLaQFiWtKcCqSdzSDBQ4Mwb7AzFEBjstl7nULIUleye2matRCCN5kqelkUsrT9MascktYJNdZ1Y6V9l3_kvhtZhpwXjQbTx4zKNZ-0I4FPdALzx02xpMY04sHwPh-KgvtQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Nawab British Indian Cuisine', 'Royal Oak', 'nawab-british-indian-cuisine-royal-oak', 'North Indian, British-Indian', 'Both', '$$$', 'British-Indian fusion, upscale', 'British-Indian fusion, upscale', '{"North Indian","British-Indian"}', '{}', '3354 12 Mile Rd, Berkley, MI 48072, USA', '(248) 629-4090', 'http://www.nawabcuisine.com/', 4.9, 488, 'Monday: 11:30 AM – 10:00 PM | Tuesday: 11:30 AM – 10:00 PM | Wednesday: 11:30 AM – 10:00 PM | Thursday: 11:30 AM – 10:00 PM | Friday: 2:00 – 10:00 PM | Saturday: 11:30 AM – 10:00 PM | Sunday: 11:30 AM – 10:00 PM', 'ChIJ042CrufJJIgRQxGuSpxYeGg', 42.5032113, -83.1931377, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHX7MVA0y9jjjj6Dk_roVyqpIkLNM3zJQ3P-ek-2d4t7to1FcQPWdaofm_k7UwJxHvgUk1zN-hiHKtzgy2NdrnxRCDPN4y_bjVOYj5n9SkRMkGS7lXO3IDrCwdYStl2sbiPDxaAkVsZg9Ykndq3BCp-qYOHNDOQuCwroXryjoYiLGyTf2IQsCKKEsUQMs5qxSrFG00ZgYXeH4gtJ5OOgIefSD_puGjoYY9TK8ME5i4xNSGZUhikPLTBSg59zhsuaWffPqfI3JWs5udUlez-HBgMfYTeuqj_VVRRCaEP1NHZF32_Q11bUNZoM7JloUYE_23G9Jy5aKEg1zLC6XFKqnrliplrN0xC5rNEvxrIA2Seb4Dkr7HBKIMHyDeI57AZrBBM4wL4unZCf50nKzW-mBYK22iO46DziH4c9DpNDWDO9cwQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFub_Z3nkWkos5WEiwScxXekWNn9zvC1DfVQlY2f63ipfrfkEt5Lxu8yQRokSFLRJxVo2zynV7Kd_-R0_9zpEVAMTba5QUrJyIK4BMrkv5QA1WnCxpiROjfNXMd8DNq3rJWnUtAl4nQIL-W5bDYOSokG0STvV0B0QzDg8rmnOv5xIBA6GrMRXt3ysXJ9W-xIMxDqwkmG10GY7pu5ttCY8LKDp58WruUNljM5Vdaauhb-cBSV9vkCX38A8qgxjf33z3ZAEK_i00b_i-vjroef4E9B5HHZx9Z1bMKMyNH-Ktc0AjvhH6x4PJkblgPOh_KTR3sChAKex5gM9o1pvowi_jdacd2O1Exs9BWHZaYV0Tknm2nE46J2z3Nvc3ooyuPnu5JFuCzCjRztWzF5ALaoBdq223SPx_gv5fat40soopfJ8M6&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH_ImOGvcmERBg-DYROO6zGDld7mtSliCrOBXLRa8WzFr9Cnw41qRVbXupa_6q1Nz_UGRpJW25Cr056WPOa2mnGNDwSXx7sYJ7-AGkUOH-VyEpPiSiuda-hyuFPP2rre7f0OofpIDs7HWeErupLpoFsWJs7EQBdvw22WCIFa2YkIF_VcmqApCnzn1MCbWj5QLxGZl6D6bbvqwvZL7uB2YxHdCqOxEigpLgzLbUYTi_xCDsvVBl7gNJjYEvTytvsigUUUCHql5XxVSKMIzngYztUASWIlqXNaDRmNFJMs4w4_gmwYwxnHNY-ybpjI9XqNBDUANUzkr73Rzgcdf3F4sxxlFXdiMNe8A89jYNNlFCO_EC-IHX2yG-OkiGWk5rQwZQqCyGSto-px_PYCNlZs9HmwHYNwT5eEveYhQGbC9OssQtm&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Moti Mahal Indian Cuisine', 'Royal Oak', 'moti-mahal-indian-cuisine-royal-oak', 'North Indian', 'Both', '$$', 'Casual Indian dining', 'Casual Indian dining', '{"North Indian"}', '{}', '3823 S Washington Ave, Royal Oak, MI 48067, USA', '(248) 298-3198', NULL, 3.5, 197, NULL, 'ChIJ55FWoEHPJIgRl_T2CM2gqOw', 42.486855, -83.14621199999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGEx1lEsHd5VScdMQXNxP_W-dvyWJsXhOfH8HrscjhRpNo4M1_DAfY905Ezvw-6LYc9VNKAOS7IfqYtXg6Z1q7ixkAjywdjsx-azeaxsSago4LVz4U4LlNtvE7lDs0QCHdMkl_bTDPIxFToJGBaOiSl3gxbeOFFN5JkHKu5xIPcBHQ1CbADb_SOpPLzquiymyPFdXnNmXNUA-7Wjm2Oc9tGWdJm9qHn6dGWhTiYUScaE8wEraP7wbfH5TM8u62mwtbxlpnR0s9vrwxxBw0kgsM1z28ZCknHyUJ0ec09GiU1fhJnhf5FmZanrBjjx5iQ5AdhFJyudz8_twerNalmngYZkRdTnJDe8qb5YhJQ-g2gD7nuuJKkJuKcvBO6jCVpM-KgaH-9EBVdQRtcDJZHmCo4TkEWBoAik2FXjd1izVLSKig&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH0fgp8eWLMI16KDnrI_dtT1u8kF3qC2pzx5HCIijcopoilo7E1gZrF-b4MuX-20d62N09Uf0ZIAHogfamLZ91xAjNOnf7XRFvTQ1Hy3w0yLt-BGJBas7pacgiDS_YXn1mY8XGL_ujye-ZJkyTITDNGLLUMv_4ouFf5RaNybBAla00jgHMnMNSewgcJcgZQMWIdIX-6Tx6m5RQY2SenSOgGFEa3q6F9i8LQr9NyzqikbRCIcIMuyQtCP_ffJn2w93FbkMbG-bKjy8XKG6uky1SdMoO8CX2G7yow8IvDcI9a8o42OeSflHIYbyY6fn9lP31kdA2ZFSneu57G79LZ0KtXNI81PtLN4CHoR7SwLBYtcWmp2XevigE6DSow57x2KWlhNTmjCDTgFVFThC1ymfv8EoV65Q0oELxJ_-BKUBG6j51Y&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHedzycZ4ByzGwFcZR7s8bTo0VUWhHhKiNdzLDRNsFXNf1jtDBNydW6NJBJGLfeHnbQp-Qi1ZOmIf28Th-vTspWLf4fnBdl26i3fv7TGZEpn76pGmxYkjnn2PMUQM0wNj1gdbPHhVo1ThjUF4PaU_FgMzskYH-ZK1eNTaG2KuoaQhV5zrB4bknvOCL7QBEdsGlrez-Ys89N-N6oBp69k_vcdQkyY1Aw1-xAavNLoKBAycqjMRlT7dC70k3xoKz5Jpo7156qPdeBBT7ccKGKj-YKsA8Z_Dab5Mj_Vku3aNgH2dLRVxgNKb_AMgnxg615Kch4kH5CxuCAGzlRT6V3o8fh_CrWvwyoBqbLOGp5hSixMwQiXZCQxi9MQJAJ5BpmGxaXuQ8q6M33kPjzvhPF6PG8K9CBJAGVd8wFdtxZbWmhLHE&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Star of India', 'Ferndale', 'star-of-india-ferndale', 'Pan-Indian', 'Both', '$$', 'Award-winning, butter chicken, samosas, garlic naan', 'Award-winning, butter chicken, samosas, garlic naan', '{"Pan-Indian"}', '{}', '180 W Nine Mile Rd, Ferndale, MI 48220, USA', '(248) 546-5996', 'http://starofindiami.com/', 4.6, 1357, 'Monday: 11:30 AM – 10:00 PM | Tuesday: 11:30 AM – 10:00 PM | Wednesday: 11:30 AM – 10:00 PM | Thursday: 11:30 AM – 10:00 PM | Friday: 11:30 AM – 10:00 PM | Saturday: 11:30 AM – 10:00 PM | Sunday: 12:00 – 10:00 PM', 'ChIJzQf2suPOJIgRMHDAtde7mgs', 42.4608418, -83.1360323, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFLORyvKnMB9F723AnNg15yM63TTvVyN3AIAQwnOgwEKGir4Ebo738tNgEe5B-H83XV5xblzyzPdTBL47W_hmk9BSYxKRlxAa23VK0YagiSl2eiszTegTJrfkFORoQsU1fs3g2Giy2kZ9eSZEQHgisypVA33H5ipGvOSGDNatmjLUq0XN8mbIBo3TgJY2AJqcmIIyE5uN4c1Pbm8Cv-1ZX2q4Aje7sERTZyDUvpKe2lstRYy_VqDY1rlWEhTOH3Izj8ulaWrNCCguBJAbB-f8_DLk_qqum55_pz-D9tfrvPCw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH50mPtLUAeltlwzKilrGaYVnrayqi52GW4gUDJKKqYttbNZs_PcrfZyustF9tqCa1RGptKPFgdm1VoUdDagvJzl8v3Uh9qbt9vEVqv1B8jRitXH6ZBdoZDuOGA5jcXEIZWEfxfadB1D7z9xf9iMN5qTYyUABdVCWuk5JZSvw8zj8dmU5RnFNUW3nufy-FvoWFuTPcZz-0s5S73xQ8iqWqSGP0YrDX3kvUn3XER2iktiqExqiWSoEcFs64z1i5MzVcbtj87rNTlZ5kcgYAMv8Io9GKRJxwBDIvZnUMp2jyUtQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFFk4jy1iLPlvDytxLKp0A8XHGPisGG0RlvVFMfxgoDuZCPxwyXV2sbVZxDQkh3p-hXxGUgerRGcWThFyvbcQFuCBc_1lEEjHOTQzyPA8pCtgqO3Wnwya62pFhJsbqwnn60QqS5E-yqBavSd_Vf3dIjMhRPLQIB63bgmgi6ZHbO39JBM1jiGkP3FWmkcwmOMFjsS_bEuEEd4acZkq26fyx8raNC6quYNwCNolA7H19WC9WjA2eUr4yhNz9OZVVFxWfPyOpjMYmTBqFB7X3TKkF6iRmK7qFpeT0sjLEpnUccLJnO4qU-7_mNt9R8NfvqSMmGBJXjEnmH9lKzCfTjtyVHuCZL6YHnBPs-hUM60Po-_4kkmy5mMJe61jUvcCkpkjExHofR88BwY7TtAWbXIbksWybftCFqochSUPTaJHg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Noorjahan Indian Cuisine', 'Royal Oak', 'noorjahan-indian-cuisine-royal-oak', 'North Indian', 'Both', '$', '16 curries, fresh naan, halal', '16 curries, fresh naan, halal', '{"North Indian"}', '{}', '22821 Woodward Ave, Ferndale, MI 48220, USA', '(248) 677-3666', 'http://www.noorjahanberkley.com/', 4.7, 107, 'Monday: 11:00 AM – 10:00 PM | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 11:00 AM – 3:00 AM | Saturday: 11:00 AM – 3:00 AM | Sunday: 12:00 – 9:00 PM', 'ChIJLbGeconPJIgRF3M5l2sfeRg', 42.461059, -83.135561, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHX02dkD8rf79kY0E_MpJbxYiBNuhkym6QzkVtJ480qfsb4c2RYU3UX3aYPIXV5Isr4AYLoiUQSxVZPeRVXHE8JimGg4-X_kvKAWOpCV8zwKS_a_ecpDi2apS8ZpGWwrNAURaah9B8EmiYmsdU1Nw_yMomAJ-ZF8KW4lWUwO9_L_Jc9QzM3TqTAaGhAoZGb01DM0XfaqbuAMOO4fCPquGbRqL1gOTmAroapZ84mbEEt1z3fPoCv37PceiYdzZWJ8RU3X_SMJF0--Ct3rPQetiDcTnifEpBaEDOZXZPNy62wzsFl10JK164hvTHwFpD_csHFuyuvI2_gnckhpFAr54IFBp8RPpGFs09wNqplhnmE1I5n__Cjt6hWh0-xf4kKC7JGjZ10Ue0gaDIVl5zHFUnGGlkNH5WGk0iqoO6Xox8U7zPS47cfdH4N1G9Y6dfD&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG1EqItZR7FImwJDQF_10HGABzR9QY4tsjZJx_km3qIJkhgnf6pJp0HrCZE7rY748TCjj1lzKQxQZToDVUta2VBIh1iTg9TX2ije3hWUHLYstony_RfLJuEnbdwB4m5ByAcCUxUGplXm77-a0VjO30ElGbzmjSFL5wb7eLutunDgSEWaXqHZgWGBly6Y8g-asWiEHdjiJ70pp0KekZO4E42e8_N3WqIxS82AiOQIEOXnlMauCbfZJ4Jg3sQITA0GcMl3_mk_EK8KcIrFnd5BKnyNLMbnyJdgzIHARxguKl7QQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGmfC7I_v0LDIeWMFThBLRH7rOnHVgh2jBvPeSWzi3pJKNNLyZ8oKBD6sA_Jt7Ol5j91VhJKNQCsw51DnNz26CoZ8jREOI1jux_Dxxro32_pCp3uX5b64jnK6rfNVPMYinuOKCQmoSxKcc2x2dDdyuNoN1vTxfdkdHyYkhPKVBHr0Fqb2WMOODF-xlTkZnW9waHKQTdMSSG7KUgTL7cli8vbhH6FjeK3WYq0X8-5OdsLcpabvS0701QJmUAZupGx2JYK4bPkj2LOBsAvsjtvhwAfULkivnrqIeb1EtyiXOdz0slQyCJeUW6PwXVMd0A80O6CMbfZ89dntogmBefOL_42GcM_meAxM7n0vM696npZ8Myd9vDf6ryX0KQoY3gth8Hek3vb65yFB9yY5z14a-ZRRarAYVE4WDFnH_OFuBP4hpftVhHPVKToKRbKQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Detroit Eatery', 'Royal Oak', 'detroit-eatery-royal-oak', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '200 W Fifth St, Royal Oak, MI 48067, USA', '(248) 850-8770', 'http://detroiteatery.com/', 4.7, 1302, 'Monday: 11:00 AM – 11:00 PM | Tuesday: 11:00 AM – 11:00 PM | Wednesday: 11:00 AM – 11:00 PM | Thursday: 11:00 AM – 11:00 PM | Friday: 4:00 PM – 3:00 AM | Saturday: 11:00 AM – 3:00 AM | Sunday: 11:00 AM – 11:00 PM', 'ChIJBXWMX7_PJIgR7IldCaA9XnQ', 42.48651840000001, -83.1456164, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG-PC_-rIe0NSRJB5-lSSVKWsEAhbzMIvJKPo5G6Po4FoxO9oKgBckKCJCboJ4beL-VIodJ1TLKqyHgwoHKb3QkflujOq30rNjpV7Ifnjldl0kfrVAaL8LSKouNcvCyL9l3gNRPkkhU3GgXtD0YcoXX3vSXYMSMKHQdHXJu1yjB5XGx5lnd2ZqlatnT_pXEkmeIFzUjJ-Fty5A5hw5jVfsXdoinixx0fHZcgaY9GR3blVTbJ4NCxPKX1_ZeGPWDeOatusB-5zSgZAcTcnbRIvBBgVcidiC3wTyEgQRAiF-3Gg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFqgOTpCybbCTKquU7NbXfJxVOIwxIqsSRSGJdijL9vL_gG12VRTqw0lEV-TnxuL42eQqIzSlgtoe_gNz48CwlkxhcZw1TVZZ6oAfVJuaArf_zijbiMnMOuhizr3s31tBN3dOgtPO-ts5jR7un86kMKCrivHxSrKYF0bJhMQdb-otPw7Jr_U2z-9UVHDwrHgFYJLltBUeUd-peV7Pf_iaN_3T37eta3JKXptfq0rnr9nwxGXJyHnxrTQ7L2-Xh67_tMnE5YWvrg6nbXzuEzYgmKurjpgTsv_XYMcog2A4KK_w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG2WeU9RLra7eOq4Xy9Ua6S1D2ebYWid-FNeq56kW9A3iKXlqhCGO7rKPKaFxOxw-4T-7ZVVV9wDcmLijAwJcRZFYXsNz0A92ycBEKzb_hDZx-caKiU6Tea8XesmMfsu70mjy9vGo_lcc536cv5Q-oXOYmjplKvp7qmJ8Q3CFznNDzXahUI1hRIeu1h85pq-k4HWIusfdrnO9ydjWpIcbqslCDEa52nJeGOkvYQyLshyocAgmm830a4w9eDDsKayupHD5c14pEMvxv-3UEuz8OI6WreGmF9rq33y5pmTP3xYKyRi3XvybjhfZNsNcq_eSMnM-KdLMvMWmc0ihrXEJmyaa9ZwcL-sfHBxtLfQFbhNIiQmuoC2OEvtzuRFqLlcDknTMFldxE63v2sN7mETT6zc5Cnl-prHczBpCI4AVjc3oVZ4zrU-2upgrInUgJ7&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('The Himalayan Flames', 'Dearborn', 'the-himalayan-flames-dearborn', 'Nepali, North Indian', 'Both', '$$', 'Himalayan/Nepali and Indian', 'Himalayan/Nepali and Indian', '{"Nepali","North Indian"}', '{}', '22266 Michigan Ave, Dearborn, MI 48124, USA', '(313) 908-1193', 'https://thehimalayanflames.com/', 4.4, 1199, 'Monday: 11:00 AM – 2:30 PM, 4:30 – 9:30 PM | Tuesday: 11:00 AM – 3:00 PM, 5:00 – 9:30 PM | Wednesday: 11:00 AM – 3:00 PM, 5:00 – 9:30 PM | Thursday: 11:00 AM – 3:00 PM, 5:00 – 9:30 PM | Friday: 11:00 AM – 2:30 PM, 4:30 – 9:30 PM | Saturday: 11:00 AM – 2:30 PM, 4:30 – 9:30 PM | Sunday: 11:00 AM – 2:30 PM, 4:30 – 9:30 PM', 'ChIJLfisrqQ1O4gRoSRwXqR8Fms', 42.3054825, -83.2494586, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEFTK7hvItT9b1ylAZv-tiZf3ZCB-0F23TzUHLpfwPBy0DKiODsBfdDROuDS02SuNBNaZhV4E4dzD_APNEcecOVU9sy24uZX0U99BRk1eb1SoBftlcl-5bBMrtSPxm8EdJgZeJwuYDaOJA0vNH4bAw3mpYmrbsfoUCMh7GZnNgHL3m3Aj0oGG19ecUcppvB-YuSQWjnroIt-e6-Fsayavg0Y4ot7DlcYKnlVYR0ud1U7oL9AUronveJRsaemgfcq78qoqSz5nUqgD0379obeHZ6tWiMC4gAjYDubuMKS5agGQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEh5t_IdM-nqnUpFpzuO4uWO-IC9ojrOJUCtNf7gNbM0aEAMk1YWCKu3smRbxw8XjgRoJfPVEiR4Q6mjgL7EgMKSvttt1sV4SWoFASzDgVytEQ-MHlcQB2oMsOJlRm3kk3s0kSu-DAlrT_sRQPwXKxzbeFMG-T6cGkwqYujxRkZyrv0RhdPJzS1v55LNBAL3OJ-WiGUzdDiels4Hr78FhusnBjs9ltwJ8fKKD4HC56kOjzVIkAFHbadlNkhQhnoYoTR_T19q-nyXn_ETldA9smsXuwdFrUk6UaKz4zelwnGeGqijsh1A0a3K0XQMmuOyx5ZqMqS9POkZzoKcve2RMtVW2na2jKW2qRRLwMYnMfABktoRoSClcZezntHDAqJ-b2_2QuzWrJvgClS_M6FDTklhNGRaf_j-bmv969dFzPVlrcH&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFzrvIAelM2MRJoYdbkm_OOlBHOXVNkvPSLNG49iG79z6NAHM5ZXCFhpfi3s1hV0TciY_wgGG0GQp5lskpWu3P8a1xh6QjC2dSPQ1wZlFFgjPM6OUiJt57f836eE_Cbwp3Xzw0xTearlefSZ1nhc-CSgtGEjNrijv-Cqxj9Yf7_AWhX1lTd-JKh4SfvogtYvHEBYqjLPg3GQ-pEUzJipIdpoEu2Piu7t1Ciy64tWPfobpSSX4irHDtvJY1_yLDWLzXJKdqG-pjkdieldrgr8y06wp_jPwXR2u7TzTwfu7l7r73MgueuHR34bH9pcvL6ClnsUGmBU_vezk93p7vqnUCWW5lO3j0kUkOAyt8bsPBwKt9z-YeSwlP2uygvwV1Z4G_8z3gx60XBJf8gax76rj1mRUT4mPJP0xEjoCNxmurX_rWAni9Ew50x-puQiw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Paradise Street Eats & Biryani', 'Dearborn', 'paradise-street-eats-biryani-dearborn', 'Hyderabadi/Biryani, Chaat/Street Food', 'Both', '$', 'Street food, biryani', 'Street food, biryani', '{"Hyderabadi","Biryani","Chaat","Street Food"}', '{}', '22001 Michigan Ave Suite 130, Dearborn, MI 48124, USA', '(313) 406-2806', 'https://www.paradisestreeteats.com/', 4.4, 2480, 'Monday: 11:00 AM – 10:00 PM | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 10:00 AM – 11:00 PM | Saturday: 10:00 AM – 11:00 PM | Sunday: 10:00 AM – 10:00 PM', 'ChIJPSISIU41O4gRHFggQ1WUNsc', 42.305913, -83.2445876, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGjE5mG5iLS8fhKw9rP1KDD9we8dYwfErkD0F7SdpDLy45D_A3hAbUAU6Y5A6tuQSg6gtRn9GNJ10xWvuFi9DkbGc7dDPQNwQ02xtY-0sgXVMMa7NmAgoleFAEbc2k3rHcVDiIgXFcjqizTkHRPVepzRw047JMFtISl8kLi5-hzyWhKYSsldxpFYJbx98OCikOEnTvXAL0ohnLbK0MjxCjeK4G218PbYY2ByiP16-MCCMdfn0LDprd_kHVnQUca0b6qK47eGCo4T4VxoIganOogeka4jfhyiwgq16i5uQlWdw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE6sqXvQWj2ogh5w0kaCNGpLD0WpQLltRM6Wn3Syypt7dEUMvsDftomIEi5gmeKlI_VlnN3gYAhatFcJhVA9leLgZ4Gd84jrc0cNrF5YCjTVSHWriST67SxHsnsWDA6JktIgEH0IWoxveOK_RnyyrW_b8PMZcMiP6T05n76P9d0C3IK9AxLCojL1SkqO0Xonv2ctrZ9HFnUj50I4R1hnXeFvEdzHV6uZQC1Dt3IBHoUxwdZ4AOisIZ_eao9uGOj21P40YtkTwk08Zxwome60gLr3-HqP6yKCl1io6FvawQKCA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH1XHaFwyqkXpmi9KwxxwNRH4na4FToanehABezYQOgpQGd8YC-f-ZinUmBNcNeCewl073Kbt0RDiTKXWWYc-LUX1BCln4tlvmtJtp3UQh6LVmaIo8axGO0u8aPAM177VeJyRQDIkbfGrFzGwDsuJOrtaQKg3s2urNdywVADmDcW-ORW0uFavKqK3lFuf686X1st8fJdazKpyzTcca2DdcuycouwVcv29ugifaw5umt4S9Cj2R3jBuRNJ-ABHLbyRQDlmxcqV5UBP7ENtsmfhQc05u1LusbBaJ8bvq2Hfyvbf3rM7SQId7ZClvE-yrEvIXyKcLyakzaHgQvqVN56PGFbhkOjoBayPmCejSf2hd1ILa0TSDcdqAR1kbimDEzO5r7xZ2mlJl7s4FIlYsXkFlBoh0GkKYh6zdSNmgsKKvxefAMIGrlEZ203_u8e95S&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Charminar Biryani House Express', 'Dearborn', 'charminar-biryani-house-express-dearborn', 'Hyderabadi/Biryani', 'Both', '$', 'Hyderabadi biryani express', 'Hyderabadi biryani express', '{"Hyderabadi","Biryani"}', '{}', '111 W Warren Ave, Detroit, MI 48201, USA', '(313) 974-6236', 'http://charminarmi.com/', 4.4, 704, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJ8dQ85ObTJIgRowOmgdCBGAc', 42.35594080000001, -83.0660245, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH4g6R5X2Dn_QRDkLwJErdoZ2OtToLkGEoy8JJs1frU0mACjIqkZR4kA1Au_HuglR7wrG7KSF-tSuBp8L6d8tfiTBP4OX6377f1cSiegdfPdWE3th6nEzjUVB1VTCyZgMn2VyZlc5dRvB3qmp0B8oY0KpRksw-iX7o57kupPD0VbWdkyGp1iwJLIOnDQNYQq_FCuSdd24NU0KYRiNXVhX2NJpwL4sUkqbFEdjzB7E2DcRtcVU1cnA7lAO33CWURfll3opSEK2XGkuzJeUxW7Tpf_0Ga_WgzaeJatIrt8TrZjQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFrJGP-OHpw1zO9KKGiTgiTMYp3yskdhwvrXSOzV1FkksXQi30TdI5Z7TAceB_PbEai3XgLBjsDvIenw2Kq0ymLfeoqQLF9oB7L_jxr15cliLZTemiJjOCzebukDzQuX-JsL2PIsIn8Umz0E7ORQDROgYe-q1mtQjpKbgiSTsA_Qi6d1fnaBBBzPArABj_MNK2e0YKVzYvzY_9wtD7RiToNAA0LJopPPUmcX0V6Bxma51TzV1uokLFsuvzDhRvBrJ8wjPvued1BMpy7Lb2CMzNcr2BAwik1Pxv4iXg2c_FvHw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHA5KTiXw-K-cvoXQau54mke_w59hDKE682E4VetAunNcxA9sV77HDZTsQgIES03l9n-PNmLP8RZGTz4PmrLuCuSjzB5awytX09Bf3nSmmCCheATmR-cHtT4sX4fRv4Kewr4XTd7DQ9lRzRP5Ih8JDpFY0exP-XUCruh8Icn54N3yGe-Mm6z-pmjmlBEu_ek4x4YDhxsDSfIPUbbmZW2p9w9dDuE409zTgcAYCiR46Z7WGEynfs8sM3MlOmMZYjh8SPkIob5-Uz1C-_ckQUxaqEX6hg7ziPVg2nuwXUpiQ8Q7F_2wca7NhpLsgy0xFX0YU7mKGU2f-7YghmsULrpzUP0gfy9oddnSEH3ZW7rWSz0VKkqR_8VeDVFGO58zG6F8WWT8ZAAezGbfspWCJKhY8HSx-HopRfjKRb-pE1ICxiQ5n-gv0EX3_TQRVyRycw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Saffron Indian Cuisine', 'Dearborn', 'saffron-indian-cuisine-dearborn', 'North Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"North Indian"}', '{}', '16351 Ford Rd c108, Dearborn, MI 48126, USA', NULL, 'https://saffronmi.net/', 4.2, 66, NULL, 'ChIJkxXGAjE1O4gRYkRpcdz_A9g', 42.3278633, -83.20327429999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEDCtQDASXgU1qPk-5uu56p_2Mo-2AQ-9Shz4oQ7T--Mb1graU7OvlQx6sfiIz-ktLAOkSTVSD7uWQIaATq23sJeYAS96S_dFVNMeku-oHNCAsF25p6b7XaU4wjqXmrRT0E3w2byNWYKpt4m6_t5usltYrxZ4ryhgTI-3w65jQMsVYNd7kbn0ktp6qh5qmFRV9VWjloaYFjdIX5WJCpAcW2o7WnXUipbY2wsQjJAqa1NUyUf9qWX2EWKifQSIA_vLZIZON1T_uou2WWJHZOy8R4QVF7vgqGqqVKjCEccQzxjt64W3GhqvP93A7OYQkSZh40CxF76Yq8leP9m5shCh8QIcFMCEnf3uOJJPpjhrds8iSfZ-XS6OiOFDWhgDOgZoyyBAWdkRPR9XP-m9xPce4KJRImoyBnOYgZ56AM7ECLhRFR&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGRIqCs7kD1gDsyjO_hSQ2EMSyIVaanrWnEXhFfKdU9_PwQ6zJv6RNy27Qd22M7lGMP4UWAsaC7U6Arpko5pILrrS6_lWItIv-ub3mv9i_XQujhbIgaULRGaqeOJxC5rjFkIeTrpmR91ae15r-5hb80Oo9kmkzRWpBdTaBDaxUq0MWUJML7VelNpTP0tWASKdJPsRAbhwbktb3jTLvHBmvx0YwrIHaLe4_Ichc_NfDSqeEL3ZAWHbEglytapN1eWJsuMdLLlXDGQYUQZlwv9z-7nbceLOPe9G8sfXtSVWVoo8LgXVflwO3CurXSxY3YePS-SeXgnWpUvrEwrJAzMY3V0USJtv4HtKZAaG1jVAFVg-G2SqTDbM7azJWDUxKz3nGXsvOkQklANQSv3trMhtgXrEyBvhOevMoSJGy5oDk&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHwEcVS_K0o46yZNcwruTDdAFUumiU_j69nPonpajqFpsr-G1FGFkOs1ysq-AZaM07KS5hwybInrrIg_zpB084bpvmFqc8FUWjz8VL2l0c57uZ854XnoOrGCoke9KtedEHCO7-Kx2pOnSdP6YvR4c_b4fAHWH3YWArMWFHZChOgYYubEiXr4gmrjVIUUl7fi0XG6CI_FkdtSolnZuqQVrAx3T_Uy-Y1vwCQoV29wlyhCK37ETWIPkZ2PK9NzC_UCeIKGQZi_jwitR9a4rCK7Si0CZaCy29-eqGM2AARMHC_-qfV47gYMyf2tjPfpwWgZKTDsYetd_pidQwx_ZoiMuJ4_4pKh1yBiVudPcQ5Yizx7h8fd9CvstI_dnCBDGfUgJGV6chHNqzDNJoo8heR4gl0sF1PoLax6HWO2fN0YN4&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('The Coriander India Cuisine', 'Dearborn', 'the-coriander-india-cuisine-dearborn', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '16930 Allen Rd, Taylor, MI 48180, USA', '(734) 225-7361', 'http://coriandertaylor.com/', 4.9, 130, 'Monday: 11:30 AM – 9:30 PM | Tuesday: 11:30 AM – 9:30 PM | Wednesday: 11:30 AM – 9:30 PM | Thursday: 11:30 AM – 9:30 PM | Friday: 11:00 AM – 9:30 PM | Saturday: 12:00 – 9:30 PM | Sunday: 12:00 – 9:30 PM', 'ChIJeymZQaY5O4gRAEtbVGhV_jo', 42.1850059, -83.2286633, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGbaDc-1h7YPKAriSiHOhGy6k6gLtE1mAFWFpzCbJMhUjoB-tXWx7-7mEsIIGtbMBB6jPRXS2_wt4JQQdio2UaV6V11inxeZN9XSb2TmzLYwXyjZYdlCtVE1K2NYjDMW67QZ-vivHT_2Bq9urGQk6Gtx8KNms9GVcPFYDyyxQKPjku0G57hFNNbRtW5k93rFsy4tyr-QvIgODEuc0vwKAxM_GR4n1m0S0qb7-zj3huEqjASqrUTrcANEgFo6E5JP-SPvQUAnVPPTBRnnou6nMHV_yQLBkWUA8-0zsnnFn0eLHq9QRHBSssGTGYotYdQsM2UWnUlTumf6sCDfq8oWpK_EpdCeMQXFKDihvMI9CFtbRJPGrXoPB95wVk9nv-78koUBmwzugAVsVyH12RTVmCXbFpnHyXEYsJl9-yvvu-dIfp8YQ9odHV653nXpqo8&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF74acV-2TEbrwe9IT9wStldrZaBZvbDgI9PlLFZlXUzm8GeOIc0aiUSYx68wNWbA6K6k8HeHfXPexZkFYvwO--DO2TiwiLFjG9_akTGEObNJm1DkL_EyVKREbUnvd9P2ySOFHAwISqQtguU8Z0ZTBth7ukb3cFc9pFVOwfosRk8x7yUXSfuQ_SBcmMRGFFg0KP704rnspyOSUM2bQfHNlR_MUEFrS49nnsjeZPAZEWn0nNBgHqrFsdik2YFHJv46RS3IXvWJ3ZwfkMXvE15Av4NVafoWobNY3ujT_5BVUS_w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGLtDW6CY4y43jy6hqbogS8QQZeGQNJGcytGeiyEp5Isw3Adp1N2JZVDrIioI5V3aDBWNl3tTwflanthlRRAjiH-MNiy1SATPcPP6Qm8stisPco3cg_AC45P4fW9OyD1yvQRbcFsc2pt320QrVxtq4x6oNW9iOUC9YytIdAosMM2mLFBJ9gi-bGDg3shXHZhgGdNS3YZvLTUmq1VxPNXbXTkzdQQ7SGSEVGmPyEA8_94HxkJwAUmfKfbq16cIapeyaOjxg9JZ_759ZUrBl6plO3X7PctULe08L2YN8GI4UVv5CWSQ5rbiy8uIHDHHo2TqqBNTZ6nTvgnMPuV0fNCsM6LxFlPVvJ_KXOjR6Q3l1BV4IX1FtwDRAEeAoXR7xf0Z0e55oCuxn5I3vN8THOEMwRC4L3zyFTasWIA7VxNQpncXrK8ZtpAL8M89b0Aeh0&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Pink Garlic Indian Cuisine', 'Dearborn', 'pink-garlic-indian-cuisine-dearborn', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '18625 Ecorse Rd, Allen Park, MI 48101, USA', '(947) 948-5680', 'https://pink-garlic-indian-cuisine.square.site/', 4.8, 1198, 'Monday: 2:00 – 10:00 PM | Tuesday: 2:00 – 10:00 PM | Wednesday: 2:00 – 10:00 PM | Thursday: 2:00 – 10:00 PM | Friday: 2:00 – 10:00 PM | Saturday: 2:00 – 10:00 PM | Sunday: 2:00 – 10:00 PM', 'ChIJ0ReIYzU3O4gRtj4r_NBWg4M', 42.2562441, -83.22568439999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFGmZDZGAgwrmXN4BAzg1ma3bIK8hgjfet9pY33hApvKpg8LvAJSb3aXZrORuKC_SWSNUImUOZ-eltqiigyVai7jqgoCYwgdICAu7Eu7MPTHNZu9VNaava5sVsTHtl7B5JBqAsU1IGNtTDsQWG3ksHEhn1sAZS-g-MTl7mf9zgA9omp4mrFcSI3YecKrXCK-NeXXq_mEw9b2A617AU-LUg7H4erBpwtvJjYEcA72kKNFMWxJLsmQeUtSPZhD7qZfeW-_SA8jafFV3qPCd5jn1e_4-XlPfh8xJg28Tva0LNghQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHz8jBjERwbWuwvWL9mM8NxKHJU_MU3iwaziDehv3-Myyq24s7Wmqw0MOHEKL3p1NkUpeZQhxoufkqGMaXQlO0ZeL0hQ_FvTXz5BMhi-j992h7xAC98YqniJdIoUTq4FwHGxIspx_bGggpBg29CUqwUWha_-jABiwNLjpSDuGOGzGSVWJwFgKcNbScOBZ2FOf4RZ5O0FJh2HnsSMbth9FVcDpGInu_mqikC-jDzB2bCKh_BGdTqDlrREM-a7nAceOu-8JM3YzJkP9n_GC-eC4Nr79of1QFeiGQx__Pw8-kxEQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE3JrvbydpgrfOG7co2PefLLp-mXMCZYucWSx9Xh78KLSfQi2wBtsFsIxGaeTQ6EQxs5x6cd1Ha5PuiLsmVmyE9l-IlUhJrz2axX5LP9jZwyk9j00T1-XgdWXeMhhbLRWJUHSSBfR_2mk2_VwRKltL0wZj7elJElvtsrFbiB-FB5rwNC527cBEHpXoy2NygVkQOfeQ_dh7a61to_zpaasxaExVsBRDuofV3Cc90kuUZ5fhBwc3dvAHFToA9r2QvL_WeeVmYViKXd1ZVxVY6Wu0Z5n1c9u1FZm92YqLVmP7YEdIV9rb3Olo7NBUrKG0f3zRYeDWN3ufHOLm1QtAVSLCl82PYGqwkaOFdWbRkisvMQXwvZu6z2Zr6sKV3TNATYQ6GP_4EKeqHapIYDqyJklxUk2ZOHFyd-X7mN_XCqfmFsgrpz_do5uPOzHwcLAX9&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Basmatee Indian Grub', 'Southfield', 'basmatee-indian-grub-southfield', 'Pan-Indian, Fusion', 'Both', '$$', 'Indian fusion grub', 'Indian fusion grub', '{"Pan-Indian","Fusion"}', '{}', '17378 Haggerty Rd, Livonia, MI 48152, USA', '(734) 744-5149', NULL, 4.6, 294, NULL, 'ChIJOXMmwQCtJIgRQBkLczlI6Aw', 42.4142406, -83.4319603, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE5Flt1Kpe0iuzR2MW2rBsf9hmlcAbXnDw8YkP-fu5HBmsh5gjOnPkrZFAHQLvqOPQezVmYSXnU0b466MwR8fZWFdFmJhs3mKBTJORreORvx-8n_Sx0ik6w7iiC5E9zIHSBpHedqLYwg0Z9ROa5bi8NzSqvyLIFTiZLNfRdcFL46Z084gAFrqkbSPtT1lbIHVRDs1cohZFj-Q5BDH9epTiHawIwUANJJPKVv80IjikL_szQYHxCA4QAaR6I_ttJSj-Bvd1uQ9oe6md_sSRnqGvaysQjnBt7uXU31eqQgvnkTNcQ14Zk3QrgTc0R3W8vOS2eDY47xfhNmFtKSeARol6O_DO1SvHaCU2wCbX86K6KkAYh3mBCY61rLvfqm3S4EHYlO3TX3dLhzEfRy1fzhAeO8-9T8F8UuZMQSCeEI7gDM-Jo&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHvLHJXuIvzQmHQY5wohtuzraPDh5RBMjjQF58UcIMUqOKNeoo-hhFmPJ87mDaZw0kOYXKJFkN3yOV5yejQ8qqpYD4QzG8jTW0JbzKdIt8EUMjdB7C8SG3WQvhRvLukWFWBSzRJxV8i4Nh_lumNYRXpvDD7vA9p-dHnoSume_-wcP8a_07Ja3ctToEVLGmMukbwbk3O-p9-_dWaJJGAeDMYltJAdsulJ77bR169va_Ro5l5du760C6hLP7N1jdVDUUa-zIACOLSa6HpGNLA6JruXy7wZy64NYLmryAOjwSEtYDYS89fCskNpjkzYcjnKEe8AlQZ6DIYkq6D0ISG7cAFYscHNx65zzLywKQmUUQFxxqK9MLNtvKXmrpUv1iMAUt4eqz6RH_6BBK_Q9aRmw9I-Qz1yaO9yYhNS1P4LSRsUw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGciWxz0q8ArjfqXSMrkAhZSNCGCRuXnu_Im6Pt7UxwbejALhDZmpwffLwhpYRzZ8Yn5bPAlEpWlVQE0dmmWcvIYOtkc_XSK1aq4h5KwS7FwJtRC523sRIBGw7RDJY9FUNFmvLXimHZNv1_VVz1jUMw3nYm7qAVwdUZTJvvHiKJH1YKK0y_2_k1rPKlYC49N058Ec0VMseDr2lGODttCwhvlyEsYjWAL_sw1dESD8fBx9g2lGomraZnD7NsaWaUTrp6Ep3xk8jl8TVlAF_o8nXmwGGbld0r3llwU96YZoxXvnTTWv09qHbSm-0IlWMqnhokrUPr8C-xWWugOud0Ag1ou05leo5j63Ynbiffph6tFGAxvtcDz93vqwdOLoiTksrluuHLkQMFVbsmWpaDv4EM8EIZoQvnESsYXVwiLQWUkH0V&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Deshi Bhoj', 'Detroit', 'deshi-bhoj-detroit', 'Bangladeshi', 'Both', '$', 'Best Bangla food, dum chicken biryani, fish biryani', 'Best Bangla food, dum chicken biryani, fish biryani', '{"Bangladeshi"}', '{}', '12835 Conant, Detroit, MI 48212, USA', '(313) 666-0082', 'http://www.deshibhoj.net/', 4.3, 199, 'Monday: 1:00 – 10:00 PM | Tuesday: Closed | Wednesday: 1:00 – 10:00 PM | Thursday: 1:00 – 10:00 PM | Friday: 1:00 – 11:00 PM | Saturday: 1:00 – 11:00 PM | Sunday: 1:00 – 10:00 PM', 'ChIJS2_G4k7TJIgRAYwCZzimzv0', 42.4121177, -83.0593293, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEERiJz3x0PCvTL0-Wce5Db7bvoBoY7Od3tFKLs82QDoBOTj6ucPZuE4e_AN-8PMVH7Co-FqVywzvKqyrw3A0FqeiEbcbIGfzAnDrJsIil_2q2MzOEp6XTkT8fvZMCUECXpMmQYH9GTh2_UhiUus27gt7z7uBe42fXjiS1ReeCMOuQx05GEnklOWEKITjywmdlaTxNsyMqZI-yw3iDAwkMYY_EJj6CKzkEkl9KaOpD3Bf3j-1MSBoq-8_KQZRLfDKfNT8ebXoAYvrG71r18_wXpgGGr9GIq84Bywhkte0M8bNA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHVlSN3L7d_mvuvYZ8SSnviIHWlptlCZid9yCRqTEbYwGMWDtfjkgFAoqtGVmmvqZ8R6lOpd0Z-Q4fxJPGT4cy8ck6tLL2PiTMinIDwPyjjPaGYXD_yF98esTOQ_oXDRtbmSGnBwTXcvncyP1n7dO3LUH9GcdhjsE2ACJ9BdcpEeaQPmBewAudWAckl1dRTuIEM3f9Tkpqj2t4q9FA2Bxm4wYt_WmHpp3jMmbfcl_Xq4T56R8LDYFJX53R8o_p4QoxuHoc4H5GTuIY0VldowBqiI5lzaSGoFfBYCEznucaXDw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGfgGYRhv77pR0P1lAXWd3_H4cNpaZbSDVyFjk5tj7TjnMAEifKVwTesygL9IyjrwH9OdW07v7-ZKyu4dYg312zI9UEPh0Qrn90qi5wGyhnPxK3MAMb0fGDY7bfzU_sJWUPOQNeLEFVSV5hyl6vreMhqjwjZnZSQi7wjLQ8ng0FWYq_SSYncXZLO1fcyPC3Mrh3w5JskvLWDsFCFivQca6jvELa_9VN2JuTQajj9x3qPZXDBK7o_6gZVzwzN2p1cOWOAL35PDz-8Glhhp93TKvPGupMkoBoYTbwJrHekcTLxg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Aladdin Sweets & Cafe', 'Hamtramck', 'aladdin-sweets-cafe-hamtramck', 'Bangladeshi, Sweets & Bakery', 'Both', '$', 'Sweets, chicken tikka, naan, roti, Bangladeshi', 'Sweets, chicken tikka, naan, roti, Bangladeshi', '{"Bangladeshi","Sweets & Bakery"}', '{}', '11945 Conant, Hamtramck, MI 48212, USA', '(313) 891-8050', NULL, 3.6, 986, 'Monday: 11:00 AM – 10:00 PM | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 10:00 PM', 'ChIJScacpj3SJIgRcOky0GfFpAQ', 42.4066469, -83.0556988, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFlC5T3p2Zhot2uV0rzX3Ebn53OFhp-PdlCCUuT1H_J4GG-Tjgd4no0ahoEUilEFN4Vt4uYmfoO14k0Ec0U-KwuIybjcUbtYgHnEd2fA-gf5DQ0zkgu9M1lo5ekSGG4zGQ2JVBpEbWqeHbLzHJWsGQelSJwS8KWVqh8wRFVY2qzd3reEDlenja18d900RYRPxDhDHodafxGjWCJN4rjfE0xrBwOp1VZFu9legW-inW4xLdPMYjFjcxnEM64eAzz50etSkZUUCAgr9UvNIlodl_ukyPZm3GcMjw3cCbx9k29x3ZB3K3xYPIfbdIlIBrpVxKfCsoBL2reUu35pAC5Q9skz99OEHKS6qPPh6BZb--PzJ6w_LN-k8laMLdl8eo8Rt7dhqSHyHB0u6F81-ZwuDhmTKbNkfCCVkGe1mF3wANEkw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGO1vX1h5LUq600Sv3E1hl5CWipCD_9tyNYAAbrz3u4ld8SsMDoReQJlKoRSnYQ40M4r3e6ZRL0M7s4Z_UD5cwBcFXMfxOWS5wju8SWn-Jcz5xwBI9FcCuZZgxeq2rdBRYzYAAOxjprW2IxHjWE1Iq_j7hPFLCOhUiyehl9EGM7-df987qnrklouttIaFbksHAiF9iW8s8HV_sl5aiu-1yvygiOSOe5Qa81GDT7oMdZmh1ZAd37m0gp64PxhR9TdnQv0BwiWbUKATJbx6GwyHs1Cl__qmmKt0oPi977e2HS6jmW6pJwWovclFpebG_vd0kfYdI3TriQLIKxgR65fBUh0YuV4ri74OcnomeZ0xw4rYc5S6SSC6tYuIknedxxG7yKyyEPH5NonfJnO0il7WN4TovMPnUSto9LGfnQAIGSn8Z0WJEVQ0nRMBdf5eAU&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEvxchgCSJGxAnPyWQJ5Ty10T9Qewl5aKfwHP19KlM12gu6z7h80SUHidxEDXotePwhkk589Phmdg_3mhWDh6ATOKqhBqqPCkZec1YEo4uaNPklSioRfZS3Wm0-8-_qLDibwKKfWCBFtyN4wx37xwCSpObKyT5kz3CSmXcBXkYO4USq0WxH4itiwY54gc4bIo-FclvxRZCdiTS7txk06wmW7Hy9sCYqmEqxNX7UDJzWLIE8jvQl7WTZBDvAi9tfatb0eKV6dv5oByqCZIjJotcenzPt1FZtTmWP-YAG7cnJMh8HbVF6MFkTQCx2WTf8NqukLHodlT6bbie_6YckC190kiVRyuRjyOHIUAfeNFToUKVHdGm1F__yijMNEllnvj4wFnK8S-VvzUBRH8Hg8L4HKEA-683pib9WhYs_KzQAdCDm&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Bonoful Sweets & Cafe', 'Hamtramck', 'bonoful-sweets-cafe-hamtramck', 'Bangladeshi, Sweets & Bakery', 'Both', '$', 'Bengali sweets, cafe', 'Bengali sweets, cafe', '{"Bangladeshi","Sweets & Bakery"}', '{}', '12085 Conant, Hamtramck, MI 48212, USA', '(313) 368-8800', 'http://bonofulindianrestaurant.com/', 3.4, 233, 'Monday: 11:00 AM – 11:00 PM | Tuesday: 11:00 AM – 11:00 PM | Wednesday: 11:00 AM – 11:00 PM | Thursday: 11:00 AM – 11:00 PM | Friday: 11:00 AM – 11:00 PM | Saturday: 11:00 AM – 11:00 PM | Sunday: 11:00 AM – 11:00 PM', 'ChIJ__9zcz3SJIgRZkNLhh82u7A', 42.4073761, -83.05642019999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE8pvuZAUUExMztybz_3III-LMViVZsY_Lf_e_eFSZtMzmvVYH1nh9lKdkhaC6QTpXiPcACuC-Ir3pSEzYr7sQdHEbVf3dvxG7jtZq07CX0F6emG6tX_H6HrX85mHziP8iX5wy7oZvyChqdimoOwgi70zVZR18tDTuBjyDZGco288j8tJ-LhAOL0mTXqAW70PM3aWTnKpxeil2WITdjsV2QOz4Du2iPTGmi6O4cVUAfX5DyjcBONfNaPsgxpHJMYrQMKrGlPWgS0jvPEdH-4BCkHBbaM9POnijMvQNoDA82ZQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFe5BgjMfHqKOLo5CmCGOfM92rVreZmn1DlFF6hUYds6koOhd2pQaGcvTNvcRujlGgmdtMNYYeeAL5zt8CCbHqCOWbgzZbFhRkHaBk0OZT3wyyJXXx9ZnzERBxTTIJGgLav8_qgFnwJRnbsvFleYKdUDHQjYIwkk5wPVQ1p5S7vjql9TfHEEeRZP0rIEwy-lQYEB-WAvYloMA8IeVvDEVqeJtSbt7y9vj6cwQq3czWAOR3feUL8nfz9BA0f31LFCKhxSu8GJNZa0nNmoFVTLBmhEDgCWSEdl4Gw3e9JGOcn8lxlqP9n9UE9fOBxLuWQZE7d6mVh7st6AVIOS0riN-P-jC--ltCw_Pze05jTgplKTEqxPMtR6WbDegSJXWG2n1hObwRPHVQoHhDUZJs8itJvI3OH0t1uv64e45qbgK0tnzdK&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEgR5UGh5tB8qdQXpNTCBHmFzRjXCgRqFj-NgAtb9nj7Ml7H6JjrpszFQ-1asb7gjLvS2QidiUKX__QXLhmgWx7yzxP3_Ywh8YKq-5r-WmvaGz2AZdxfi1K91TcFoNKLwAk2hBDsjenF1Hu962YLBmXxlVf1oaCNE9boBDf4HCXa1MKj_9qfIlyZTzlI15uMzvfJIDbsrHDYxAJgadCrmZJ3Qacha1RV8MistP_6Cmtjz3xPFAQpPxb9INeWgqK8QxhZmlQ_Ig_H8zfMntwEjooUZx584c5ymLq_DA1XNpCTb9X3_k1jyHhQIWncWHTZM6rCufbW-6c9V74KnuxCmIDYm7oDuqE16KwnJer65musK8s1L82hhuyRV0Ic8-RNg7HD85TC7P_8HJn3N9zq-g96FFfMSijXsuSyDwh5b97og&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Premium Cafe & Sweets', 'Hamtramck', 'premium-cafe-sweets-hamtramck', 'Bangladeshi, Sweets & Bakery', 'Both', '$', 'Sweets, snacks, samosas', 'Sweets, snacks, samosas', '{"Bangladeshi","Sweets & Bakery"}', '{}', '11357 Conant, Hamtramck, MI 48212, USA', '(313) 707-0986', NULL, 4.7, 18, 'Monday: 12:00 – 7:00 PM | Tuesday: 12:00 – 7:00 PM | Wednesday: Closed | Thursday: 12:00 – 7:00 PM | Friday: 12:00 – 7:00 PM | Saturday: 12:00 – 7:30 PM | Sunday: 12:00 – 7:30 PM', 'ChIJM-2T_yTTJIgRqpqEXegjZ4E', 42.4031835, -83.05340389999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGvaDHQ9NK3G6MTtsIjyAOtkq9juTyGn9ebjoAGIVIUkGFEXtMkX_lZmh-ZZ78UYOte5P31vpp0KzLd3jjE4TiCLNJ3XV97TuIw9yJ240XWo_2QnO4nkHFmy2u1Jk4bu894zFyhjf73lbtyxrWJ5PddLS6Wqvo29SsncmvQtfi8mma0iDpjeVHT4pIRmH2TJsrW-jgzY2qwr5lbELxKSCUdFrAmNgr-KjIYUaH4sqG4LTVAiW_lA1k4PWeqgQXUWwYolbXTptYHSLx9Yra9ugnBN8sYsYDe3fgPa60teQSlXA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGKeAYa-YxppvfJZe88JdGuI49zrcJZrA_M3Y-jW1DldidG2EpyO97Md6Hd7JE5XZJU2sP2R0lR3-9nqANA_61Q-dxgU-WWQxl_RZ-lOG7I66_sXZ7BcftcuMOPCeELNILkMgNI0KD64xYpkMMgPKYzzN7yQNmiyk2Kzxko70slPkMuxWD5CfsJ_WOhN2BM2OVx-b9IaZz422kBDrL6t60yeBDcrcuwkJz515KXK_kpYlp60n_QLVIsG-EhC0KcASzmbKrJn1LoVIxFYPfTiopfLHNj43p_IScpFVc4ixCZVoC-57dTO59lNfxgtajOLYaAnirJzk8Wv3llM9pDkTzba-OWDmHlYqc-1lCimFOxz4uEPooBTMM_-yzrnvGLVE8BkLYfmogHtXzvDRQlk2nK7jJFWadZ6V5w-psEUMUCDA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHOMRDRH8IT3acsFy82cQbGSasgG2q5N9PpL6V_rw9UUQmgQyxcG9zoyfk1JdYhyZyfuqtWtBqWbqNDy6AsmmvUAZBguOs96PpGGA0tkPYnSqGlUa8wHRlDy0kgPFP04aEvu8Ve3iRwbUTvw2CURpZ7NiNfLHGPD2-Bax6gx7fqXb0UxOgUbHmm00bx76HORfVMIGvWlrkU8rIpxpUWme4f7kZBvWnRTTjuItZ2djkU-_jtpU476dD8k2g00ZgjvJKHOl7w-cvE6j-Zf7KwS9nKouuTn1zPelGqlB3sZ4icRg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Flavors of Bangladesh', 'Hamtramck', 'flavors-of-bangladesh-hamtramck', 'Bangladeshi', 'Both', '$', 'Authentic Bangladeshi, curry, biryani', 'Authentic Bangladeshi, curry, biryani', '{"Bangladeshi"}', '{}', '11341 Conant, Hamtramck, MI 48212, USA', '(313) 436-6069', 'https://flavorsofbangladesh.com/', 4.5, 448, 'Monday: 2:00 – 11:00 PM | Tuesday: 2:00 – 11:00 PM | Wednesday: 2:00 – 11:00 PM | Thursday: 2:00 – 11:00 PM | Friday: 2:00 PM – 12:00 AM | Saturday: 2:00 PM – 12:00 AM | Sunday: 2:00 – 10:00 PM', 'ChIJWUNC1EzTJIgR5KGfpHRe9m0', 42.4030429, -83.0534175, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEMO6ckzNAtNTedSUHtl_ibw9KeYWOekMTPK90NBCloI6S3koSpee7uKlJI0KQP49CgwY4xRbcEjAqqgZgMc6-LV8VAOxV11dJeSRh9Nq3ggp6xtyC_QA-iLg6CnU6oSz1B_9sXnGkF3fVx7foImKfMSSLKgfz-VZhc6K3dPYnxJQE7MvQ1w3ipFEB4hjkNUxcfOH4jelrCr6sKf3dkd9eZw-WSeg9I1yEQDF2gALC8trulEYdS7LVL5pP6cg_eSm5D_bhOW_ZnKNZcEsYZwuq5RVhK9YfWZ0EBWBxsLa0CZGUPMBglvWxg9aAlMVpq4uLFWYj5YZmxHlz6u9ApeyHZRKyPLcM9Tp0s_wpcpAP0uPu1lAgFRNb3m6pbwQoyt5ws3GsuA2XJG4MM61JvBnklgXkDGq_IKR_I0NjtKS-LbE1q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHKLcXKlaFdoHr5AW1qqvnbHeebqL7QjtlPoG3ryKBzG5xf-QAdGIl_Iwu7z8QK3qVB7tctBhCHDpq24thmlxg_zfpbFrsYsozI4Q7WnsQUnNWFdiPC0zEGFIgGkFU2SR1Zqwh56w-ZE74c3Ik2mmASYHEPFxAba2Ueebfc43ZZViNhg6FtV57bHEbbJYUzooP3MYw041DSbdgAOgLYPSacl1cCnidI1SuDgEbavB6nBHxYuDqAhB-_ys_3tFV9KktwqAK8OUytornBN2tgKO3arlgLbCy7mr5lB3dc2JySG4e7zTQ-eK53dm0QG1gIuw7AMFDPYof_-vAOOWQuEzbCM0FYv6uVYSgZxRB6CeHemw-h3pT5HdiIlESse6YagfhR3RY8GHMwBFS3L2MbJaMM1f1VyRz3uHVoDEHl-i0CzaBj9aNrjNz8J92hOA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF7YNgIeE5uzaw6AeKw2hgqvvib0saNwep6Uh3AUNeX1UznUfeG140vlMQ8WLmJCwZcny8lCir34b39XHtrtsbmS8QJMFez_YlvrQQnnzA3Vyg_m7p6uto06dIjf8qSRplrSjmmS5hxJdsjg1yA9qWFGu5vhcRf8Ci2_8hqbZ4LJbgsF1C0kxDYS8mXN9j8pRvRhSMFmChEf8ZMJyRDTWBfAGJxTU1K1Ad6A-6GMuM5omh8HaxAsvcTwBCYnib8Xo_b33cJZxmeZO2eDp6TqkL7E6FJhzgyS6UM2Q6e6ENy-Q_9ZdD8cWnBmCRppZy2akwZdPbPEw6ZuKlKpl1lwj0cKlWOrQTDl1pse5Br6eZ02bxG9rcYs9O7LmexU-WVR8SKgpshoZImfes30FAuWSejoxSZxiEy8GgGbyccQMN1XXCJzKwkLtIAkvMV_YfL&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Sumaiya Indian Restaurant and Sweets', 'Detroit', 'sumaiya-indian-restaurant-and-sweets-detroit', 'Bangladeshi, Sweets & Bakery', 'Both', '$', 'Indian/Bangladeshi, sweets', 'Indian/Bangladeshi, sweets', '{"Bangladeshi","Sweets & Bakery"}', '{}', '31632 John R Rd, Madison Heights, MI 48071, USA', '(248) 597-4500', 'https://swagatindiancuisineusa.com/?utm_source=google', 4.8, 170, 'Monday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Tuesday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Wednesday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Thursday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJDbtIKQDFJIgRdic32WSYe5k', 42.5261661, -83.10602949999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEkkKX2oPo4QWU4Tot0FDZm5dPLuCEE9uUN9_n59qB9TWCWRKp8ywwu4f22dC_66b9E1Mo4obkLJblx6PE72RaQTFZ3l3vTnZS6QKxe88vDCEfdu5at2CSGmYYqfzgY84B5Uc2N2eIBOF9YqhL7DKWVRzQHX51JUmZZsC-Qpp6iLZDZAevE6FkgRfPYPsuHVr-IUQCk3mno0ALPtvxeXyraJLpzW8Y84y55-Vg6Vkxe_it1iQXCxRJjKgy2dswStqxwc3WaYh4nQnyMZALMhBQ3Qzs2wCmNZgc2177nYTcQhw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGzg7Fgk8TZsIz4Amnv4LKw0fLG2nni4HWoV1Y_jZLAr9p2cBzxgotbSa9QDbRjn7Rxi5pXLc-QLbegalKPX2brACmflFvkgydSUdaWHDCEaEzycWhRszw0QPEYNQpJzOv6vLXxd6K2-uRsyyrmo2xEzcJ3aH6M3_7gObvFrhAgy1CmupMTPLHhaNrnRbwTnblwmDu7nsiVuPEFbnrR3EiI2Gk30z-eFX-o78l0zzDm8323UXfiODgW6RLjn01HqEdVQUVVZ7EjyPe1zo6P9YsVBwD5wHlKqrbm5y9qP34R8w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHKAgRGFu17M3QKmT450Y1LY5eQ5_AbwUNlcy-7XO-5npYdQSFVAzTF5nmh4CGzr35nk1EbUZAC25A-PBmB-cV01JueDhHafPcRdyJo7JE8NWteRY5N63Hb2ZOx4eF2giIG_vqK0H4n6iURTVELdz5jV0zWjezKy92wUPdZ3BYmvmLihWFssVTKhaaVrF66WiUhBIYCsfMKSi7rv6-n3-hczgG20UpkOylDPpYcV3hOBWqI-U5UF1H-f_96rAbs0qTz8r6tFDprRsGscJzoUPaoHATCoFXcqzTkLo_oMQm5bA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Amar Pizza', 'Hamtramck', 'amar-pizza-hamtramck', 'Bangladeshi, Fusion', 'Both', '$', 'Bangladeshi-style pizza and food', 'Bangladeshi-style pizza and food', '{"Bangladeshi","Fusion"}', '{}', '12195 Joseph Campau Ave, Hamtramck, MI 48212, USA', '(313) 366-0980', 'https://www.amarpizzamenu.com/?utm_source=gbp', 4.1, 836, 'Monday: 12:00 – 11:00 PM | Tuesday: 12:00 – 11:00 PM | Wednesday: 12:00 – 11:00 PM | Thursday: 12:00 – 11:00 PM | Friday: 12:00 – 11:00 PM | Saturday: 12:00 – 11:00 PM | Sunday: 12:00 – 11:00 PM', 'ChIJfWlYOzzSJIgRznPPUo14-yU', 42.4061098, -83.0644804, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFs2_Kqeh05PeqaTrbrsbU3Mk_09ETrZRNQrQZhGDVHVX7T3bhQXKHaJVCW8yJUcvcf632YVLiw15hCazKt8FS4rFPYUpFyq1tgDaSpFLKl_lk6AIOWuFc5U4J8OUfFCpEwiw9GqtJZP-IPoisNDC6EngY9lqJ6mUK4Ac2gNJGQV62s6gXMVAIcFn9K44udxI-C_a6W2SXgVkhlnaCq7iIv2R_RLlfLn6tDl6PfnfdjU0ximp0fe1-NTmy4rwpsorTpopZ8Jktr7LkR-OHHGPw1tsuklzOClgeNtxIw_PRzF91nc-s4I0gOl9vI8mP-8uMYpygcO3Vmp1YWJQHowhf6L6X-N-1wA0GKGE3mP6OHXgk-D-vfxlIjugQ6THu3SS6Mji-DX1mgqmfkVU3E5cUxe-tT3B7QPUAanR4-hN-pAe1N&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHxlCLDp5IxcwjKExuT7Vr-4s44zWL-bzKG6d33iDG-wa6HhSR78Z2oF8NvyCJuPzw0bopf-M2TvZ_U92pcBu4FjB0ST2AoxgKm8EtZI07Qs4Dlz1TOqBiaym9TmIevsCOH2gEVY62uVJa3FL6V69-bRDOkUoRqvqW5QilvekpUZWYn7lNoOUjBFkgWilLqo7HXejQbI_Qm3usz4ilVABWCWwGza_v74Jc1sP6E-LQHd9dCq73a_cApmX-JGAeu1as-foiIQ9lZDD9n-kfwFzGqQ6LB1xPoOX7-pnx3RduzmWy4QPCZhW8f_bmqVMv0dO1uzXb3Acy0HyJGIQLTOP9mSw9Qsrg73SjyMRpy4e0YrJFQQAQqcXqW55E62IbQF-iyVX_Ck1-eENyaQg9nlVG4vnpMndY4uPqmzlb5wDzUS34h2DmrPuL_phWiVw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHpk2v5gA_UTGQg2_bmeSglaslPJKIRowunsqDhaL-W73vb23QN_kbCK9RduBLSD3wLyF-4PA-k1IxXZyfHmCs2lG5mdmwKyRFMmk-wxB1g6cwINTEpohePK_sOt8GiRkoIePnWVJmpmEEXmRdFceRkn9hh68ckVdDgvjfC2BRJKPtk56uysHs0BpKGQKgDsKwaeSPzYIgNUdbtRXsTIGwsGxOTYTMAPpGpx2rGe7pcX-lBldhbDitn1qf1bQvW_OIYbAneh8XNLfkJvn5JxKcAfACeEMpx87AASk42G5rs9gbucNL-GD5QDbm-cP6kRLmDG4LsxGSGcmO5qjcMRGbkmrF9oTDnVqYIZRjIj1FVP-BOLMbmsYW20Kxl8HFbbFqY4IN0aQPUafynfB0EYVrvREaOVFUX54KO7UBi9QkR6vAs&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Kabob House & Mouchak Sweets', 'Hamtramck', 'kabob-house-mouchak-sweets-hamtramck', 'Bangladeshi, Sweets & Bakery', 'Both', '$', 'Kabobs, Bengali sweets', 'Kabobs, Bengali sweets', '{"Bangladeshi","Sweets & Bakery"}', '{}', '11405 Conant, Hamtramck, MI 48212, USA', '(313) 283-7131', 'http://www.kabobhousemouchaksweets.net/', 3.5, 93, NULL, 'ChIJEZaT4_zTJIgR1Dkbrqc6jBY', 42.403288, -83.0535507, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEaJezMZYJZ_2ZAjvKBhcSio5j50BTjKzo7htXRlPKrFm7gck1-yrwN6W86EisAR8imJtMIWNInuYj29asGLo0GnjyTSR46yObFUICJWDPUVJeBzghxapGlFVZTDHP0HGjIcXbKXFfg4vwSx8_jHLYXWGeKbGnQ_yq8DJYrFLlaIEUcWv605zUMbA-Hn-0MizF9kFsW71qijNnfbGzPi-R45N5nKELieMY22dZKvWHbiNxP6eytuehfCLGD2ej8vW2Z_5AOMf44rPcDcW1xX6Adm16UzXzcXE80m8szRYmKL7rZvbY2zJfBj0c1QpEsj77lCLwJBaVEpBUx5Hmnc41NUs-pBCKdG-6sc0h3FglRAoAM9WbFBmWYHdF-wBU4K8c5nZfY2u5x7ABqoMk7DyK2vkNBmr6EguNEgfAqFGM0d5pE&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHaRwj97yYmQS-x8DxiReDnDTnYeup0KX8k3qrJxH5VKa_-YbO2LySvEAl7BrOByWeqKdjkFCinc_G6t27s2kUu0VrW1Jx4yfddR6RbRs-R1TDemOjcHxfW9vzX2vrAJXHSFq_EvKxRf77YnYHy1R33bU22fblcAhbcKY-WqLp7dPPVe9jSe79-wkQbKNzHJMqtK_5lwGK17-OuvBTDTQz6cJmB9pENgr2_QpFLz6_6b1HZqgl1tev0JsRda-JX6zN-yUMSlDG5JTbsXsEniN_I71Y7eKqxbHgvwlAQIlRoNw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEGJ4wf1PflU9ZNYcSJlA3gkvxdSf0G_I4qtn5RTylL0IfoUBD2nj3e646fWddFYk1vX1ILUXhBcLuxdkNh5kXXWoM9Eqk7y1kmIzGukn3euUmHIc1J1Dm15sLfwkOy8PdNvT1HDoe3hkleZg1R0MxtqDahfv0i8Wjk0bAIAMxJEUvdb2JLwDUfHsgFkj3R_R2T77ZC25aMII2V8td3mqHyKfasPcjyd1K6PWVYZw3qqG283HocEzFtGvmYNhDOgIHedWns_y3Y8-OETAWdI2JPCPFbuMNra5MRjG2MNve-u0WJMTtw5n9SZt31eHAdQca8_b4hZEAb87CL6hyRsywvQ_kJJ2h3kWGXqK40qMxVJqt173LKESD588EPv8Lg5hTbadmueRxyNyYVp_9zXGjCIAQ9uLL4cC5x76d62ZUQH3K6&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Reshmi Sweets & Cafe', 'Hamtramck', 'reshmi-sweets-cafe-hamtramck', 'Bangladeshi, Sweets & Bakery', 'Both', '$', 'Bengali sweets, cafe', 'Bengali sweets, cafe', '{"Bangladeshi","Sweets & Bakery"}', '{}', '11357 Conant, Hamtramck, MI 48212, USA', '(313) 707-0986', NULL, 4.7, 18, 'Monday: 12:00 – 7:00 PM | Tuesday: 12:00 – 7:00 PM | Wednesday: Closed | Thursday: 12:00 – 7:00 PM | Friday: 12:00 – 7:00 PM | Saturday: 12:00 – 7:30 PM | Sunday: 12:00 – 7:30 PM', 'ChIJM-2T_yTTJIgRqpqEXegjZ4E', 42.4031835, -83.05340389999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHzUMWs4CwIDnL4azTwXHx92VTxpPIgEVs_EMij0i1c6lkvqUuJCaAxZcVLjcL6nCL8cMMXsO43nYJhmD8xZtx0APL7pKz0VwwsT3S0U0JUYIQW1XeWHZJhjRsrHJZcZMng0FeNQgeAVoNuRXgOXVNiC6xhI8cye1Fwpi-ti3R3hErYHDUDz_YcWt9bofL0NY9uZffr7eDA2b4FyO875Krje7qlTt5W9nNN9bWSJdJ4po_55tD-_iTUJsr2W9pL5pCryTJirGIAqIaB7mAKbcRf_ugiSr1bauJiWFqkH6h3xA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGwsLdBNQd3HVzOIpkJPf-e4FF9cIu-9b00Cz5NWJQwm6hLKMI6DETOb2O9xjX03Q2somjMgm7H1nlr5Nl4GMv57f3Kqi8IcnQJPwfpursHDGWt9qFDx4RyN7Zumf2t-KjUs_iHr6xk8oP6q5j7XdB0OL2fyykVREiz-60OZQ31toY2BD8r8O_CUjAPCw0gSIit9U6Hmc8cjr0hWucSyhc9rjLXR_-csSDIAiXBRdH45ID1xsb5SpUx8FJpb-HyEqcF73rf1Qrw_-RRNXtDkNbIgjYHW8UPvOWmYQTUt6BHiLZvVD3FojjCmxjtutPnmZlgOivAELaojoZgdd1UaTYXJ0HLZ0BZUni_xou_h_tWwjqCzx00HWJ5Ctb9gKknGilsxEW2g3MSiS6KxL49O5WqKKUTTTrDZ2bkn5MhpTTGpw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFzc41pHgOjbqINbQU7xpq4W1exoiF6cXk9YX8r-MnuswXwhOK85Oj1Gaju9gdFaPwVw1jQcqmc1PNsMiOvmRgDKxL2yV4IKanYqbcfOXtIr_m5209OQ9Bjai3tdSeGBwHWYo4EHVaRRqWMe74PoQDXlz0iOpkgcyd_D0c42nsN2BmYJk7c114j5nTf_jbk-ylh8S-Y6LmHHTaQ1NRdtMMGHCpvzBAapzyBMZzk69W3A2-wTOYxV0Ijb_v9bAmnWEw0SLHaZgASP4hdlZpYq5uKT-Yi_0y2Qiyb5RmdREW-kQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Radhuni Restaurant', 'Detroit', 'radhuni-restaurant-detroit', 'Bangladeshi, Nepali', 'Both', '$', 'Bengali, halal, momos', 'Bengali, halal, momos', '{"Bangladeshi","Nepali"}', '{}', '12162 Conant, Detroit, MI 48212, USA', '(313) 707-0621', 'https://www.radhunirestaurants.com/index.php/', 4, 451, 'Monday: 11:00 AM – 11:00 PM | Tuesday: 11:00 AM – 11:00 PM | Wednesday: 11:00 AM – 11:00 PM | Thursday: 11:00 AM – 11:00 PM | Friday: 11:00 AM – 11:00 PM | Saturday: 11:00 AM – 11:00 PM | Sunday: 11:00 AM – 11:00 PM', 'ChIJHbxzPz3SJIgRPxcz3kvDbNw', 42.408282, -83.05626649999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHWL3lvP_lpfNXrP_6zcENdLV14x8RxS2W4YKGyFsl-xawso6O9Jqc906-llli5jRN9hvQx3gcNljIeJa3E54w-h-AkriWAzTzMEas3W1bzi1-1qhKtS8fIvP3n1iyF5YtPts2ryUNkTsyTf-W008MyVRBc9bbVkmyKMueS81Hn-yeUX52r_RKwSN10JWIIG7k_x5UlJjincIfebdUJgRMlyVgAGCJDEK9D5sgIy2hdHuz_S_Llf3lSzMNkiZTNdC9b1iAbD8Owj11wkPtsaPWUcRMlwF2WWu0sBAP6QkF5kA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE3UqvGd9MrvNtxJVHiCjeRvnmXNo6LSSJWKsvDqH5nVvaHK8Z2DCXh-rEhqAg27BpHml4gZzqjnJ2FeqZHlCkNooe_tQY-jbsjIjFfWBXrjJNroysCWLau61c7OXXT5Gek6P6cGC4nqQxUUitt61sHYasbd6l8HQkkgIkalSzCooqM9T8Vbvk_QGJ8C6_IP8_oeJ7nHtNlury1eypWK5GsXG28A6FPGoGXMTLB_i4jKuDCPfNouMW0OJCJ_e3Zv-XsXCY_dJvSGqMghBzDIZudX8kKxJlNA3w7nRTDS9zaRQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFzv7znWDF8cFfOolT2BOl37F_Xs866cV3pLOzT6aRgmqFHSRjJ6siy10jZ-UhBMlc223L3QJyCSbIYWs4kN7o0qoy2J6B6rzvLN35FnDygauyCg2LjnjzmfExFA5Li3e9TJOvjZJAD-fnVIUE_DAcoFebAvewB8a_cZw9VSKUVmsC91PdDadXrMmFGWjYyODR3HJ4wLgIuzD52mqYW4VK91HtFtJvL5MkriBVCim4HmWwJHULJEaMZdYI-gUZD46G6j6u2yR7rNJXaXNmAIqpx9QofE18QZesygu1gC-3pkw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
