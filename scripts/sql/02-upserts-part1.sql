-- Upserts part 1 (30 restaurants)

-- ── STEP 3: Upsert restaurants ──
-- Using ON CONFLICT on google_place_id (requires unique constraint)
CREATE UNIQUE INDEX IF NOT EXISTS idx_restaurants_google_place_id ON restaurants(google_place_id) WHERE google_place_id IS NOT NULL;

INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('Royal Indian Cuisine', 'Troy', 'royal-indian-cuisine-troy', 'Pan-Indian', 'Both', '$$', 'Lunch buffet, extensive menu', 'Lunch buffet, extensive menu', '{"Pan-Indian"}', '{}', '3877 Rochester Rd, Troy, MI 48083, USA', '(248) 743-0223', 'http://myroyalindiancuisine.com/', 4.2, 1059, 'Monday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Tuesday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Wednesday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Sunday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM', 'ChIJJxRr4nvEJIgRcdG3N48RT4g', 42.5755722, -83.1290556, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHQryjhkTr9PBJg6yYCjX40KVpRExgY59lOY0rIFdOmc8jONC0mFC-_HzI3raz4X5MFCMZbpUk_SuR78hrHxgQesuqgS50We6QHb47KAkNBEx7TTOko9LRRR7hHH1B4A_S0YsaD3jyUQ23bk8j44GVqVYTt8nS_4hRDmDLy-GScUtKfVNoGy1DW5v-f2E-9T2Z3-Y3-M3f11D78JBRioeX1TbJZ-vqbC_CAnut41pgzdTrHf2V-oih2ZeUvhCRPQBQ5lwqggxtJG5seoGL-ru6elhOas-ori9VdkOx6TUcGxCe27ygR5CmALUb4cnSTXnnxHEQPF5e273cFY80c9ixIXzt1Ypdx3m-XlrAdPFYDp-mC0VT_ZTSsGjrh4fn69WU2bidi1Jn4lH_zx349RZzPMP9JMHEGDNjdgyHQSF1tdLr-&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHH4IeFeQW_yfHGxQqNC_oqCpf_gpDcopy2G-AeWlzwyUEG0bYVb8lDaTnWL-gNTEJtmZwFdnMNu8emGeehekQo2GhxPd0gisQ8cBbEC_2afsOc84KWdtP5tG9HenIz1F8EVUh85Q-kNO1CxkmFKHeLkb_1DKJ_qSsaLyc1--gKPeBA4JRehq4PSl6e6ZiqomdYFiK03FcjLCm-gxknlWvz98duT5bSbgZV01KbYIpq5IMNK-D8VT3l_XVmIfFpoMR9Gc6PUZbodW4ZnTzFFreusMKGPUrLF_vbnPlgk5i3IGPtsQMyqPGMRcxZXMQkxYv8Fe9y1icD-WGUBWlfoZV1B1Kmzuvk6TBdepnr7T3DHGVB5OGCMo_6Y2pd66oh1MaqcSP1lWGgMVHrBFpybPdD37Nck4b1Krjs-GgA3yyEYA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGmyYLk3RTE_nKC50Rfni1C-Ch8RcNMN4JHqiPkjY3E-8P6WBF03R0cPPN-LQ7XkpHgIEp34cEIoULt6S1nElXGN_YCqOK72p2YsHNSstXuGK07-scaEXokOtGVOiU0wLixe2P0J7RijwUT9IoKZsN0CGsW27D5ijL7OiVNTcszxZ0xNU5gNNUhyXj0rqBx7EbbtgT_jxplBZl7Hb5nEpgt1Ttv_HwqmbUZojkd2AUp9NzAfKU1UNmcR_7pRQqfARR_m16_azmFNrh15qGYWrOQF-zJiGfL1qrg0cRoNh3B0my8lQXQeXqapNpr7Bds-wq-3MG8XngfnJq38qg6V66ta3S8qFTBNSDRANWtwKmnD_CZNaiJkOjGTs_xrx2ErPgBc_K09ApX3L2GxDSdwO4SC7tDJu85ovTr7iV6fp_HMg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Ashoka Indian Cuisine', 'Troy', 'ashoka-indian-cuisine-troy', 'Pan-Indian, South Indian', 'Both', '$$', 'Rava masala dosa, chole bhatura, Indo-Chinese soups', 'Rava masala dosa, chole bhatura, Indo-Chinese soups', '{"Pan-Indian","South Indian"}', '{}', '3642 Rochester Rd, Troy, MI 48083, USA', '(248) 689-7070', 'http://ashokaindiancuisine.com/', 4.1, 1416, 'Monday: 11:00 AM – 2:30 PM, 5:30 – 10:00 PM | Tuesday: 11:00 AM – 2:30 PM, 5:30 – 10:00 PM | Wednesday: 11:00 AM – 2:30 PM, 5:30 – 10:00 PM | Thursday: 11:00 AM – 2:30 PM, 5:30 – 10:00 PM | Friday: 11:00 AM – 2:30 PM, 5:30 – 10:30 PM | Saturday: 11:30 AM – 3:00 PM, 5:30 – 10:30 PM | Sunday: 11:30 AM – 3:00 PM, 5:30 – 9:00 PM', 'ChIJSXlVb3vEJIgRWzkDiJ26b3w', 42.5719444, -83.1269444, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHD40kPr2-alH9_2kzD2RdIPYd-Bux_32KuZtctx4ij6-E7dBirK7VMHngV4m3lAmdsWHOLZgrLZ1dE9FIfAwzp5rz7LK8GP4XhNKFMKFcWlC4dtttbIGrBbBC3X7kNbS6EKvTpC06vBT6rj4ELdYS6PA0jKLuA4awqoabJm45VtnGmFcoRez5VFo3b3_PZmXW73ZxOeslk2132lXio6wErmabjUOg18hRWNSro5QK7JYy8x_ZlCAYutOk8vbWbIUafjyt_IfbpzxiSyCkpxlbqVCvBP2ZiwDoYL7LlXruLpLz9gXbasZhEDxJkQd7VhObip5HvBl_AKuN_I28V--09_ogsbtLoRik6G1mgQoTBjDcbOP7sEVW-6N57skU9HQCI-eyxzKhuT37QpMJaYd5255Hc-9tD70xorKjDiNJhny_D&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHifzmt0pFzOVKVbjO82X5THfBcShmg-ThJtlFrqR2F7RBdp3YTxnBYAn8HL1R3VnHUlZUlZf-3Kru8S4vDvjyFnZt0h_bHORZ_0rimOwevR9ehRnvO9Ylpx4Prm2PZ6mBzjITdSaPZCPTthvGz9ZKaOr-F82svuGxVNCfzxzMfwpjpLpMrtE7iSICZnuNfX_IrrIdRnr8LzuruXXCBmsDgk0kMAA1MkMfLvPosa-FuvTojs_AReaK8ky-VwAY52rD5x9ccP4rhxNgsX7i5k8r5lAqq1v7hmxK9AznpDZIYYwwOaCbWVv-bfZZhRkiEJbD8LvaAJTfhyLlco-ibG1ZYlyf55BVVmPyj0fsLbjTpxR0za8tLe3XLvmRyVdMzRdJaG3LhdwM68W7F0V7DPQO4o6WTwpjEbW3HCJLR_oDPc9qfRq4DYyQV6HH-Ztx-&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFIOqCtW_1nD9pa-h_AvZKfPuKQrxOd2hLYsXBrTglzYU-4hiAeolyJhBWcUGCBJXkcdquJIu4zkFEBJg2lEpxmQ6gcDx8ECzI1dZS9wYG3YpGAgm6SAazcbR5QDimU1ds6GEoVAj5EtvmqgeK2LmD1bUYNdDgeuY2LYN0_mHBwAzumWRRm7FzYZ-UlQLhc4auiYkYRTiLNTdeJeuY0oAcHq3iHwo0j43cfTlmcpb_jL7AytBJaMuwCqANvPjq2zY6b7B1rB5iWTdl_m6gEUKix8vVTXHhiMAjmJwFKofB1gft9KVFRiE7GSrD6ZTGakB7xuT_mkQcd6oaoLxzr5uD33kjuvXvvP7KgnWiWWGI32ztBNUHa8KkfBvMm4t590V29lbEuRQCpAa1yHGE27DCQGkA-8lrFTV5GGhVUE1Tkusrh0-ZE_ovse-wwylEV&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Charminar Biryani House', 'Troy', 'charminar-biryani-house-troy', 'Hyderabadi/Biryani', 'Both', '$$', 'Hyderabadi dum biryani', 'Hyderabadi dum biryani', '{"Hyderabadi","Biryani"}', '{}', '3059 Rochester Rd, Troy, MI 48083, USA', '(248) 817-2753', 'https://www.charminarmi.com/', 3.9, 1280, 'Monday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Tuesday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Wednesday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Thursday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Friday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Saturday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM', 'ChIJI0CC7WbEJIgR9tKqD1Y3ClI', 42.5639571, -83.1293536, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF3vrQiIy0WpOCFYCwOIQe7UJWEqXRVTygUQEG9VrRjEH_LSq3_Yh0Ntb--DYjMYzxzhNUXoeIAgCr5dOFMM4MZtDxMoCH3jBt7xEacYguF12cxB73BQ9EpiWHNRERHfGEnEg9wfWpbOCiACF6e9SFr3eEpfAiwC-SkHSIg6-j_uAU0MszGVbxKyyWLGCNDoQb-FW1PRHUfVGreuevBTvmcExbGd6TsQwVfrJp2fYdZs_cbAfX7otXZuLdLifnFtpbm0UfNUnDba20UppZAIC2svuHF1FB8sCnQEWEd4st5TjtglhI6piPfUMc19otei6e2_JRgRKCbix3hTcOAMEkqdcdcffU5aIkMnstRnyUPYA6JWGO5p2O4EIqElJ9FlEewyggnbvi6_QdWvMSGal-r-ZbKEqb6j-CjouNUv9w1WA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFVINozMBAI5TGgdMla_FQ3bbxyelv0iLtVB-TUaaQImS6XHa1RKtCgFwb4IHOR4v8PGFuXiUg0ePnINgzxhKiq8gqHQ7G3jOvrZFVlbhZ0l6w1k_RS1WeuUd0eTVYZNc7KZDHLVsxFnT7HW_X60GUPw7XA9YaQxMe0j0p3kX8lezhQnCMNmC1Wb-KwmotvF8hf2SYQn_yZ2-dLyHIiKTGjyG1Mg-FUXITMWxFHWjYTBFVPmal7Q93OmjHpNb7YKVee6LCOCU69IFWlDgSXcMpEQjU2UvRF2Ywri7UeBued6Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEECoQ_Y3xhClW4Pp0Q4f1xj1931L3og30kV0uaHfY7F6pER9oybgCi9zgdJlDHiZICB9PwvWG88eOfqr-vKwL0aYcTrhmrxXcBhcRiCPTGXbg5htr1pIh4ETOW-t4D7fuOD7Ydjr8nWAggn-ZvV5r26BakMHte4RpEied18h9oNtUj2N_vMCgcddhQiqoa7w8N7i0JvNtvNq8JZFRurRobh8D_zPZeIDVI1My74E1nm4KL1EWea_Q_45_hM-07B0TVwqjvBiEaE9hHtPLsJVCc5WixNxuFXDN-MS29jSGvNtIB-B9gcjT9iD_pJFZpPRThruziCotzK1aq28KmneZsY6mmMT4Wv35nqO5h_OfMBEjUr1lxUnE_FCucOm3p5mRteNsezchI3vRlelElKngqECda5-qeHlQKLj88aY4Qime4&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Neehee''s Troy', 'Troy', 'neehees-troy-troy', 'Gujarati, Chaat/Street Food', 'Veg', '$', 'Samosa Pav, paneer pakoda, dosas, Indo-Chinese', 'Samosa Pav, paneer pakoda, dosas, Indo-Chinese', '{"Gujarati","Chaat","Street Food"}', '{}', '4924 Rochester Rd, Troy, MI 48085, USA', '(248) 250-6335', 'https://www.neehees.com/?utm_source=gmb_listing&utm_medium=gmb_listing&utm_campaign=gmb-troy', 4.2, 3149, 'Monday: 11:00 AM – 9:30 PM | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: Closed', 'ChIJXcLtQZvDJIgR8NOPl3yLKO0', 42.590762, -83.128334, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHB9EtFdytXOD61U6BJx7XA1xmEA4kr9lAMzSPHiWqFgGfW8ZlYsiB-3mnSdJNaTF8slosfOUtGogYpJQxU-8sbEJeZV3THVc5WUKkQEGeKO7QT1Gx0NpP6AJYfdRhwZSdePpCs1l6RuPzJURaFrGkCg7WFo6VZCWk3Ntd8F-B6BYW-U4p04cZY3R8se2P-W6r3cKOElYCj4EaGZaO_D5aql3MDW27eSw2K8nUi2JSVnOK11X1icoEGSbQ1w0PDT5LTAglKz2d6Mdv4QKEgh5QUjKC12C7QgemyxlYIU33S3g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFZttq7f01TOj0SPXrPy9RAEpEdYhudyi-OZELa8U7AmH-p8CBXPIpqGgSWZ9dAm_OvIOHEcAd9ihWtzS7Q17C9XFzWpJDFWaNq0mcqPBsdBxKHIh306S6drG9E9DTFJ26R9WwQ1M3z5rzb_TYUbjSmc_oLQluhoP1W81QqGWLNENSVOH4LSq0Jh5LhSkmOfdrM_kRGu_31Xkdn-q5fyV32ZH-ulRRPVY6IiWZhybd_yK9SlfeS9VxyrE7Ca99DMwlaKW9wTg2PxJbn0ZiQ3reDJuR6u_qkgXL91ZqZFTrbyA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFK4K0mRV7MA5V-T-_W_wj8lnwri6mLXN2Bgyr46isPR2FvIriAmgX91xVR4KVUJMiXLKwPV8oYsYV7HKpsxs6C-andjiDsGa74fxt8xUtakOtvMlubEZq6lEfFnp-k8ySvfinr3svgM0NDRW6UmGGcFTP3oXgM3abZE896-IIcnfGboRx6e8V25BwFVB6T2UomNuhrFOuXSEZ_LD6zmFv7m-fEhYbn4iVXbuwli_Q-hwvlZ7n4sRBMz-tkaV9RnYmsD0SMsBv9oedABuT9SCYelF0kwcKsEC2--3G6xKjuKhLaw1ktD4dk-6RjQS8TiucqZrn5Qk0NP4h--ewl7KGW3Ib6Jk5CodVqy1At1eKTgr_Vbr31Lk9ddWAHa0tG8399lR3vniyP5zmRaZm0g2CJpoVGDHf8VAItwjg-LNMvbn5he0YGZgVH1mvK1g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Deccan Delights', 'Troy', 'deccan-delights-troy', 'Hyderabadi/Biryani', 'Both', '$$', 'Goat biryani, kebabs, Mandi, punugulu, rasmalai', 'Goat biryani, kebabs, Mandi, punugulu, rasmalai', '{"Hyderabadi","Biryani"}', '{}', '3516 Rochester Rd, Troy, MI 48083, USA', '(248) 509-2255', 'https://www.deccandelightstroy.com/', 4.3, 344, NULL, 'ChIJa_TIMU_FJIgRERXubFuXcDY', 42.57046010000001, -83.12688870000001, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFYHVfQ0x_pYz3hsBi_pkV7WRrYUPSzJT_QOBtAVsr2xpqxknAxbpl5kERLf-1KOIEzfRqmETbwtuQGrdXruirCvKUtpYb3u1_q1Ic22TIolOzuFW6_MiGNgJ2Q0h0QN1o5GzdWhnEBywIw174yVxrfielzuZr-Hgk5plMgvG0ktUftRNi6ubjoAXXL5w9sMe5RrHsWqCdiOt6fF16E_pSUzAKfKh5cWxqLkVVZOk7kpfQeL0gE6S1D5k1uJZaGY3YBUjmX09btVcT5kQEp-N7ANf8Dd2f9r2YHTp7d8oNVAg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFknHErULkvxc12WlCVliYVxaW-Nk5ObOTU0x26JSQdU0Hv_mgGH0j2KUB6Y3FkAzY131G4R_-jY_yVXzJ39KlFfJgddeMahWQ3Ml3d2Zufb_R9uGwjF99-SCpE3A_sp6l04FI7HYDvHrRDwfxrYejCYUmJJqLNGa0eNASErQwSVKmkabNd86EIPTfRjJubqoxlUhyJ1hsf0_OCz6Npn6NBAYnkPEVIMe8870gNNA1XRhBjA5LxVMAZgKccjI9qjWeVVKDTuRGPdMaMfELMzezCGgKhswo-ebTOXNExpPACTg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG5UcK2HNmAhc3Ocz8CmaSJVT83OIyapDjf1sFMzriL_BbpXAjOVK-1eHxv5xkgBmnqvkvu0HBLaFOKmqQE9P5tKsgyRyYZ3OmEOYe3ewT0Mgpl1MC0Pcbo5Llh9bELy5wot9Tv-sgKZx8g5mbvVr0DE1BgLbhO1Ckp_NIYi0fvivFFbdqPQN58K-Ag7VrFh2ZsOU2enX2vBkjnzA7WWCgMCFgK3EwWqqsawu3smurPX2fI1c3wuc1z7T7qoJ-8swYi-HfY-b1Xs5EoK5ZL3Wt-bM_cQ83-atL7YcgI9SlR1mAXzN3WIbv6sn2srHqZMAKmYTRPd4xNAdqmeUdGo-Nv0v3g0ZCjmPHcKCgN-FK0O_8RsIEBuwNcWglG6-kQurfbqzvZCLSnQxv6sOAaftSDoPizyXiTMLqNmv4-S4so6cjXTVAi7vTGvE_A0A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Honest Restaurant', 'Troy', 'honest-restaurant-troy', 'Gujarati, Chaat/Street Food', 'Veg', '$', 'Bhaji pav, chaat, dosas, uttapam, Indo-Chinese', 'Bhaji pav, chaat, dosas, uttapam, Indo-Chinese', '{"Gujarati","Chaat","Street Food"}', '{}', '5029 Rochester Rd, Troy, MI 48085, USA', '(248) 315-0234', 'http://honesttroy.com/', 4.4, 1233, 'Monday: 11:00 AM – 9:30 PM | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 9:30 PM', 'ChIJ-XgbIUnDJIgR894njE2W7MY', 42.5925991, -83.13047209999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEKJd-jVTuAyEH9JAengnkNvW_bjsS3jvLcyLoH0KyKjPCDBzrp-D9nja_mYnX5ztBvl73pjOvy7vfYv1LSbFMwH2S1abyGL9aos2-BRYCZTRY7NBnFHMLGvFOCNaiEK2sLyfuvehSNODQu4FF-GkvAOwBGGT1jfgqRGgL5rLHtPrEvMprZWKUCl-ksN6gMja9kNbR3Hm7neopy-X_9o3kgxOE0GrBwhqRoGc4y-RxbpYcaQ9zgRZkdzyHThYZal2xP4f7WZH4kPpjsHznSonJK43qXLUjyEhFVmg5Yas5JDg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGnLV9hSiesrVSPVfYEk1xyj5EYytE6zWA20mmwzKjBbV6OYPPhE6MKzMU4z2h1mjGTXTSr_U8KeG9dJibbHkp564zbNkT8NHmEc-SuBbIUUoGhx4GwcvolJ2_yvMOyP7W-k6Oh8eqbKJfXOo-N1MqKok6OKXTC5BNMSDyTqkWq9sCQKrgp0YMye7K_PcWq39agBmuw9rIW4Cfr2-RgZINpULZ89uzBuZ4kJcvk6WSUF-8pMCe3VtEdvTKrwcfNJdhCSTXyoIczqUAizoPDqD8bLxrB_LSGxbXuI8iQMrdEUQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHJoxmS75LpuSRlshbvdCxukmiHB3kg-C41IDHcP1do_5r6zs0mc8WA7kErgmMDdOiu0DWejw855OI7REQ3B2rOk_e7D7FXdz-Az796oLcXWqm9RGKdBWVPK2LihmJu_kW7HwtzMsNEnRgire-b-Ny8bYLjvJWXR08j5Fi2QGpYg-2bTrrXtB9oSQldFJ_TNWJtK2VtgMzG6Zo-FVcXSHFzK_JLvfn16PCFfgT8hqpbTnrVuKEf6RhWv27hIgXBnmoi0a4p-BULB9I1dNq6br6ftVDX1OExTQxtccjS6l1DMaVMYwKIogHqLXOx0U3dNgDLF7WmFK54kAtKfBVWdthvqRsBCESSyrl3pVQuaWoXqa-7EGxmzDAATQSRWXyFdGidXUAKku22wRLLAfvvKi-oHWy7AA4BBppA_2mdWPvzDw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Priya Restaurant', 'Troy', 'priya-restaurant-troy', 'Pan-Indian', 'Both', '$$', 'Non-veg curries, sweets, snacks', 'Non-veg curries, sweets, snacks', '{"Pan-Indian"}', '{}', '72 W Maple Rd, Troy, MI 48084, USA', '(248) 269-0100', NULL, 3.7, 690, NULL, 'ChIJeTng2zbEJIgRTUr_4BHVnqQ', 42.549159, -83.14799699999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGwf1t9rm39B12dcvN0xGKtMuI-obQwWI-fQOB_738q0SiYmUbrUCIEVq0UD6uZUtzfcJH0slai9jqz5MbY07dX2is3BPUMylVQ2HOC3-S8HReiMpQOGVng2aONC0jqktECd7s4K3XfAhhyTSxM08D4YZvLsDVQJnl9C8XmBmJUXqJSY55NgfqauRfKVNhMSJtgs8nJ6U7IwtssdE8su7cVOjcBg3EX9zT32CA4gJcfisXNCM77dxr9XlJENt_C4v21wZcd2KBGnCUJGKRCGBdMRPttVWWc7atJ_ULyYM1ktdvDDjUVN10jaRq8rZCkO70Xa5mQwVVhRPbrbI6uZPaKTpbihQ0HeonYjpbv9luj-s6eDbyjgmp_QSCkgbbOyE8FD6khazsJJfcWZGced_qKMmhsmD5hTabGlj_nYDmDZQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHdbKwrAx_3mJWWeMZNHBuswvCwb4e7IUANY7D1DiEBNcn-q3ziIHgzNdvjevQCDgnKOOlGV1dUHpgXQcbg-saYqBwijVOfSOwmvWHU5HHAqSSe71mEu95FBLgFc3PxMemoNOghLGmXOLC-Ls2_qaTbnemKc78MKAx3hSvbz-nHYSmPkAKjT677hqr585q8_T9DvsO4Y5DuTcZnR4lyVE-kPjbHpXKrVqiU-qg_ju093ARR4waTN-u00dzwpJ4K99NmMQtJc_ZYYmWMhfeYNk6SPPXMPnA1aQh-qDEPepM&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHBp7VDsCEH1raWeMcFu8GpiBMA24kis6FMV8D3UxwvxgaewBEbCpSN8xkERZcCxPp-NQP7d8ED1yDiLMk1m1eiXNZqR5hBuMrngDiYQq4zgFj9SQIxGGYA3kg9ypnj3SMjTQz7_v9SJRPBB5CT1cV8peAKTEttxo0h1el3KtD_-TXFcu_Xn5Y3Id9KZVx7EkRZ50uK6N2lgopktUwAdIL83po_ELOyA0mJjGbDYlskZv4okfn8bA77Bt2iJsykkDe88oF-JunvSYD8S1Ll1Cq7dZcfEX7x7pfGEQSPV-QvV27ibYml-qRIvxBAXE2vjzVqiLSPB-Y0EtSeRWDJadIyl8qFJnZjFbnk6SGNafljAZtW6zHwQ7Z0wMAeKgOftBpVt5Hz2pMHngdx-AMhX3pWdXkrmT-FK54CGL7jJ48D0g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Bheema''s Indian Cuisine', 'Troy', 'bheemas-indian-cuisine-troy', 'South Indian, Pan-Indian', 'Both', '$$', 'South Indian specialties', 'South Indian specialties', '{"South Indian","Pan-Indian"}', '{}', '72 W Maple Rd, Troy, MI 48084, USA', '(248) 269-0100', 'https://www.bheemasmi.com/troy/troyHome', 4.6, 906, 'Monday: 11:30 AM – 2:30 PM, 5:30 – 11:00 PM | Tuesday: 11:30 AM – 2:30 PM, 5:30 – 11:00 PM | Wednesday: 11:30 AM – 2:30 PM, 5:30 – 11:00 PM | Thursday: 11:30 AM – 2:30 PM, 5:30 – 11:00 PM | Friday: 11:30 AM – 2:30 PM, 5:30 PM – 12:00 AM | Saturday: 11:30 AM – 2:30 PM, 5:30 PM – 12:00 AM | Sunday: 11:30 AM – 2:30 PM, 5:30 – 9:30 PM', 'ChIJHbIqDgDFJIgRjjwV7WCdXZc', 42.5491141, -83.1480121, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHqut-whYhhkwjqwXX73rMD66xDOOBGcSbI9RE6gQ6JrYYt3ahnOMKImvNJt59CNdA_GjK6l11AEnV8mmTpku1VFZombghL0r71cv3Om76ynOyyZ_Wlrenx14zM-Frgno4TJ2sW3jOfXHUG5-SlDcT_YkiK3DxfXJ3BKfX5AIOaOgaJXHEvKbJCyxHDuyutMSaAfc8uqf1fEBpldwU8ruq7qO1Wg7sw78VZRhaiNcTh4NcSIJdTfCjRYfDw9L-6_Az2_u6wh5adJNziNIaHE1x65seO4LldGFS7uYlmiyv4QYqWF1R549md1OT1rznGuveHDEmHDkRT_YRxjmCZE_aIN7f4nDkc1pCAonC1n0uEg8yjbz00qfWjc2GxWVXzVXcG7L4enSpRw1TZLxQhcZBzfgaWtea55Uy3JjZP30Y&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGe_YG4FMgSfjpR0vdGpWuYZOSBHO1Qtw0kPfWBuTh8aXQI6eYyNbp7mFOLU36WCwVxUNgBRp46dImzizc3J_KHi9qQ6IB-Pw9xKU9ZpYHvjoWEOglp3aH6CDJskSNas88Hp8oeHaUOsvrKB_s49oNnd-bEaUQB_8SkWZpcrrAOntgsgL5PIe1M3pWnCZPpiNXgg5jA7MRtQpOSEHWCtHzSNbksoUB9NBu7ExJ0xxtNKVt-CTHfcLzS0amNzUVCeiP8c8EfWmaPoEDVkAqjo6SNp6R5ecLQhRrPY47sLEDu3g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFUB7tLmjU3zdYpDDqEL5nbm2KRq_tHqH67KePuH-4iVxH7IKv3lVhLA7cGGHUuKZdeZIHurrqtpfaSol4aaoALJo3VEUoVYUgP_WDX6TZEgVNwvUZYnl8HrDZGZSCl2IBlh3KOUTaRItmaosqsFFgBUVCvTMaqyzIEq5IDkvyLhnqx_UjdnR3UBSQ-JtLE5fFqa7UUXB6zMvrRGJXVufd5PSHsi3lHFxlkmq8pfQAa1BRYQLNOTxwknkTR8wPPL5OLpuWfh2eMQy75x0naSZhcyI2yf6_rr9LwWxCmlWuDS-kgnvdR4V9AS2SBGJXyjk-VUkWPmEKd4A84bpg0jTWndOFYdP_azQRSJo2YGPuu_7CMAAFYxZV3zI6jiG8vvLLbiYPqdR8tfjQ3mLPPx9gAXsmaSx7Tyvt96aNnpNfM-M1t6ErWtEJ_GNiQPQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Virasat The Heritage', 'Troy', 'virasat-the-heritage-troy', 'North Indian', 'Both', '$$$', 'Fine dining, North/South Indian, Indo-Chinese', 'Fine dining, North/South Indian, Indo-Chinese', '{"North Indian"}', '{}', '2642 Crooks Rd, Rochester Hills, MI 48309, USA', '(248) 602-2121', 'https://virasatindiancuisine.com/', 4.5, 639, 'Monday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Tuesday: Closed | Wednesday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM', 'ChIJw41YR7_BJIgR9aKLwIC6x5Y', 42.6405672, -83.1723233, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF1xYSeEZBTZeOK9eiJe18pm0qPkdcYwt9ikHiVBy1nY4_2VOK7lie5g2UCB3frXs4rEK-QZbNhXIFr_UQSbqJc0RmAO8XfHxdMv5N4nDQLQMhawbgDuKoTbZhgQm_lUhPJfSLjUnvgTYmemJKfuvoPpqgSVq3HDyEd63tIxMw0EjS03duamhlEMJXiynluI75gHZBLu-8DAjUezNfrkrNIz-XdsC7_EDbSXp83N5tZ9Zpw07edhk4iL8LzipbAKAFL4OSbBnD4CvIm-_b2bxy-7Gb6y39sE4q-pQdsZNMsSA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH0kUd7ByU6GlI_dgciurcnn4GNWBimi6AjZX0DAVaDskrdiI33b_n57IWt8TrwzShhmQI_DrwWRh7lbuU6L7K8UAIWMB_A9gJNwinnB7amK9fhZbhC8IIjShgwOr4dE7Gl0F8MdIi6OhpYB-bUhrCIumEAJVTRbHP1vD2LGJYUo0iUUgmalEWAH0MDPsVMw5sQvhepFOcYLaWgxypzu-BHRUpAsJFbkLqCpg2M-5S-VAejvQKhMWUKghAbu3vj39g3o9Rv2mBZsK_dcsSuI7PUb3OuOu1qVePfXLN4ssqfjg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG3a3-neFhtshilAQ0YT6B0IU9-C0_oGyMu1kgoJ8iZZ5tYxROcj-llf-9HQrXVoxzF4OPaKxWOOOwdbVXXHRFxhzzxW-STtMC9yKgg2TEtc5egtlRkGlOW8HkLkuVNCbh9DuWg0yudGUe2szWt7-lnbub0MMGUx2Q4qiH_MOKHvEWQ2kfs77dj5psRGzmLCJLOI6EZjglruExsRgkmyi3w_-7xiPX4ssba9tEOWHecmtjV94X-A4iZD6JXBgCDPNhdUztZKJdVvtY7lxfnbpmloLqRz75WtU3ePYhoAsV02119uGd36LEGOlZsivxUizt__Ylmb-B2h-I8LQbYNlfMj5n-Atym6vSlaivh13RpYltKpgpKXS1AoNShi33g4dYJsNH2sSdXEKCDEDOzDO3rNvjw7d4RNWJRJ-bNKZ8btT2Aw8FQ7AILcWTtG8Hp&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Main Street Kitchen', 'Troy', 'main-street-kitchen-troy', 'Pan-Indian', 'Both', '$$', 'Diverse menu', 'Diverse menu', '{"Pan-Indian"}', '{}', '309 N Main St, Clawson, MI 48017, USA', '(248) 629-6677', 'https://mainstreet-kitchen.com/', 4.6, 1065, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 12:00 – 10:00 PM | Sunday: 12:00 – 9:00 PM', 'ChIJ7U76VaDFJIgRExykUP3qTSc', 42.5356471, -83.14686999999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGX4LNxEmWDAV-ITXwcsSNLTIgqFOWJAUs9ltROjuXebZtlTDYEdB--XdiKbDiUa4YqME53TdPBEj9La7n0_PTC9kumf9sb_KXLZTc20KFvXUz71ZnU6_3IvEaNFcG4Va25LANGJFwq5lrUlXZOJgd_19dioSF9YTr7GbQ2v-oVMMkTXeh383WaX0IinFNaSQabFzJGMhS9zrQdUwqDtB1JmNZPSPzkifWV3yLHTmfi03-pFXR8eJVvR89pa4lJPVyy_eYGGYZI2WN9zyu4r5TMoe9NYj8uQV58WhSDjCHHTVbk3YdTU4Le7XH3FltUBRVreFoKoN7Zhhe2C_ti-VG4rYi-hyHVKWzt0vZaEbC_AOI2-dkXB36nLpobo-H67hxTNZ8NwalK8Ve7dbNQviHLXGgmZ8krpuLwk7580KIgs3J6&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEErEnrtAs5nqLPlrRYTGmun29BeMmYtttZzT_NrJ93C0yOmZRC4fWp3jM7l7xPsP5EO6B5qNEZrT-Nt8pUQGWaLxJJTq93p0lGai0eCwGM8Q4vVms8v-qR5Mgr4YUzJ1SYlSS7frZbo2_X3cY0OiINoh_80yFcctSgRgQrqK5lVYnA_X89tZhl0yCBrlkyA8ke94TLwFsrujJgZQFoKbylMrbhgIjr3w4HQ_NsupbCoHqzohbkXzoJ_BU5b1UC1EWSHkqt9hANrO8fcXis-ZO83X047o76FHUanRv2NVMB9yA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEdlpZZiNgpGzpl8B2Q-if2bE1ddCGkMjx4OCuRZmgVf13OpMiO_6dX2U6wVEu2zrRTcRfboJfYahhqhVeNzJT0MkOdbYiAVsfgbOX370wqXl2ocw9dTXrBg7gkjesEBCxItnnkagERB6NakJajT2RGAPWknLdoR4palVaZYUpVa2N8WGQfAxbrAzuWj_cxgvuZFxGBDtCQSW1dxPgdNBc6leFX1WcJTvwRdMsB4bLZymfehQujKY_QZJbgdp5LYnMr5Jg9pEYLiibuCdmYrrlzZ0dmZGmTWNYBfG2uop8J_dB9nYOc1yROnQ8Gfc8B6zNgfH0WbmwImWZ4rds1aEZgl1dBiPBhOHPfsTnI83By24k5lVq1bYrFB6wRvNyqZghOa9qiVe_Xg31jeHIwGUyN5PK7DXnvzFDmxD-0yK8LipDXFvcFFznqhc79GICW&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Sai Sweets of India & Fast Food', 'Troy', 'sai-sweets-of-india-fast-food-troy', 'Sweets & Bakery, Chaat/Street Food', 'Veg', '$', 'Sweets, chaat, fast food', 'Sweets, chaat, fast food', '{"Sweets & Bakery","Chaat","Street Food"}', '{}', '4917 Rochester Rd, Troy, MI 48085, USA', '(248) 479-4966', 'https://www.aahartroy.com/', 4.1, 225, 'Monday: 11:30 AM – 10:00 PM | Tuesday: Closed | Wednesday: 11:30 AM – 10:00 PM | Thursday: 11:30 AM – 10:00 PM | Friday: 11:30 AM – 10:00 PM | Saturday: 11:30 AM – 10:00 PM | Sunday: 11:30 AM – 10:00 PM', 'ChIJI6ZYJIXDJIgR95UrvoRwR0s', 42.5909275, -83.1297493, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF1SrJum_5WbdEfbqOrFMq6VaaU6awh4XxgoiQ0gsRTXOjpo4UxcQLjc6JAAzbj0rMFWJqoRSm9PURLPDJy3Sfp39UCaOQDh8ji0rcHV-q3ANlgsfRuL51AAlj7ApfWng6b64nbnTnPb3qQjPVpXZ7K1zqCfS0aGcERul-n0wIGmAOgiusLP5c_T5Fsc4Do3Bl1TGGHsfp0xYjyHaGKrHmb8ju6L8CsGYfTl_AuD9WAROqsqn-KOKPLyNx0SdKacb9LDO4tizkuGt2A59mQDFHq4bhtzWOiDOe6JGR775mJxKkcFo7za9U5r7fAFCzf8TFORej2PW0xm4SmuDgrLlH6hbnCNgBM-m1l1iUE8SPaQjpkIVUNDQXp2k80pZewIpiVJxsKmLj6goRFiseBY7-DJBzdi-WIQakwAYoVOOVccg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEL7X7szbFGkSlPUL-ap8iePPkxLgjbq9xkz6KUE48PXOc78j-AsLd2cDZI7Y3x-87EsFViHu2qdlc2BraP8vwxSESr0J2Jdg6ReVqzqn4_Fq49Guy4Bhb5W0jHhzt3uQpEEChYbiIoq2L6dyhhGVcf5lEzpF2HE_vMRkJEPweOFeHOLKk-u3nhCBAwnD-3bu20l3Ncxii4nTpfhKd001lxlR1Wz49LVHDqg1jzDYuGAjyZMFEwuBitd8SuKXJ0zItivPVnutGGTSoYW4n4nUAI4vq_ZzZOmWn3KeTmZmePJjwNENG0Rs09fONXCqrAZNc3qr-JVu-1A6U0CPd7zq0bIATDAKKmIjt1GBrRheELCm7IpVuqhXhxuIBj0LtQCUDETyCIMKczPDQs6njdhB2s-TDC1GckBmg11B_0hbVmdBc&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHwtBeRG1MnLzu7J-rtHoJLC6xh8FNL2P_puncsvvn8R-hnOIXbfpCYBMvXo7m0NDWdITwnptnOmdYNeI78fAs8cVQ9vR_09msaLOW3wnn6VJvvp_DbNQvI078HCno_fGaIRNxdS3GelGb89p1dO2Yc_D96EkNK82cKgcNOqbVKddEHFLIagUF_-y2Wh9aW_GcZ_5rFgX9FS3gQfGpUtdzr4j0lFy84ooMjFoonR58c520_Oti1xCC3tZlwkXsr_UwNchrKREeZiiv7SFEnqcvbPvIzVU45A4b3aZ-ScZOnXNUC3pzscme23vEbkD2OGZC5VWb4MJSBMTKeiFmKwkFXX81EkjEqtl_k1cfnVN7iB6R5e1iI9hFUYn4jvsANBGXV6bdMHWXcqIrkBgSe9KB0m9gV5ZtpO0XYsu7rRyyflxk&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Paradise Biryani Pointe', 'Troy', 'paradise-biryani-pointe-troy', 'Hyderabadi/Biryani', 'Both', '$$', 'Hyderabadi dum biryani, Mughlai, tandoor', 'Hyderabadi dum biryani, Mughlai, tandoor', '{"Hyderabadi","Biryani"}', '{}', '4880 Rochester Rd, Troy, MI 48085, USA', '(248) 509-4327', 'http://paradisebiryanitroymi.com/', 3.7, 1840, 'Monday: 11:00 AM – 10:00 PM | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 11:00 AM – 12:00 AM | Saturday: 11:00 AM – 11:00 PM | Sunday: 11:00 AM – 10:00 PM', 'ChIJNZbeRZvDJIgR23L4urg4bDI', 42.5903115, -83.12846880000001, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGDqQkUFTqgFRNmdJTj6ddE22MHkgto_7SvhDg1fNME0nD5MryIvOEXVg4KkSmgfwLjmwnu5e59pAGT_0lNnpxEG1gVyr4UWX7y-A6NioC53PG0Tpr281q-j3d06YQ4IoVrFE3yJ5YF4PLlrIGzzX0AFS3WpNrxa9FrEpFY2_mUueXxgykFPiIEfHpBYstKYQuvq8Jga8NQxnEZaDckE6ZrsYQA5-VKGKFj69nAg11x2yaaHZaPdrh6xfAqoeQiYE2cZ_smqywUVKexwdhLzk9EzgtTEKdrWEjKpiXFmOxJJ1_krVssYyErqpiqh-72yyrPFf7sKOlsY2nq_z2wZE_ciZxo5vV88OM2hX44qvAnbWtklYtUCKzT1MRBgmcew87EhOp2vsTZ9Ijz8WPdQcuPFLFovkxppRTsl1fnt2JspCrX&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFyohSljJrMlqbCyWuVDtPdwu7aIqZrPqGVJLOpkjSq_ntj0-7u7Z3sLt6D2TUT_qbYx-o2JWhTGWdPyYxUZ167Eh3WKk9XEtWimKh08Ms_aD7_6ClIf8s0bYkzVFC8a7Ml9YOM6Mp6kf3B7Hw6hgYrzX2OBi-002V5dbN5t1iIav0HTZ-Bq-QJmNqAcVJXxOvRDKlBZnhPsRObc0i_4M_JyOx5I40Lgf86pVHXfp8v94UxE0TErCDuTnl-3L3Oer1ohO0tkWTnp1fo8RQofM4vGDYoIyD12zft4H-GuoHSVw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEw3el1_NDh4NBNlw5ejJFeWWz-XfL5Xe4saXTP2WoMS4qvvayjUV_hTlbPqpNc8L3ZsxYf9rHvtogmVE-yPFha63ctSWrxTRc4rDx4yybbhET8B4umYg-qE7EtqXtr_zqcCQ8hhkW8oGLT3cBqDAi7jcVep9X5cI5EmuO693SwpKzrdSfoxUUpey1ULksVQED6TMHM_Sb-ciInGtlYRP-SIPGXugK6Da8SunW6NuCM-sYikC50oNjlW21ZlrrcZWeyuf7rF6mvqtIchB6b1fRUqW-uuZVP4U5pNtenmByiOc1zoidS67HlyxIDfUNGeR7mvJPql5ZVTVgTqoFyuJA6gjyTAYVhbyEDUt_jOuwGe90-QRQvTLg_-7EoyE3sxiXmswNPt7kRmXlKHNcBQQXapPJjJCE6NMsm56tz573mUkHoE4iQpKJoW5QmKmh9&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('iti''s Fusion Food', 'Troy', 'itis-fusion-food-troy', 'Pan-Indian, Fusion', 'Both', '$$', 'Fusion Indian, originally Gift of India grocery', 'Fusion Indian, originally Gift of India grocery', '{"Pan-Indian","Fusion"}', '{}', '5114 Rochester Rd, Troy, MI 48085, USA', '(248) 250-6510', 'https://www.authentikkatroy.com/', 4.5, 405, 'Monday: Closed | Tuesday: 5:00 – 10:00 PM | Wednesday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 9:00 – 11:30 AM, 12:00 – 3:00 PM, 5:00 – 10:00 PM | Sunday: 9:00 – 11:30 AM, 12:00 – 3:00 PM, 5:00 – 10:00 PM', 'ChIJz_uIBuPDJIgROZUFgItahBY', 42.5939473, -83.12838099999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFdDBm2BGLq-4gf7VUeabue3WyQ_cB3kZAqs0DkVq_sMGBrkpkQYI9_D8DOill5kVAP6SlOz1cJ2dWVZxRZQ1WXr-xUt_4byww4e-K1KvSd2gAg68NS5bi9W6p1vvbEyXAy_r7jrKl5yjJzr2nHctA3DaTxVwASyOvWrMCBWw3Z4FxDYlZBY0JXVcMZkP4Mpk3jc7xCB8Ka-EgIhbrrvOFw0NP3lyVCUYgn2sziZ177bCY9Gt2mE11PV_5rdoethfJc-edKYFMMwBQC3U3vfOgSJS1Bq16ZQzf3HkPmJMp0by8V0b2R_1MIvLmT3A3I0CcX9QpwYAlz73bZgdGCMYgwz597-et92gT0TpAeXQD2owzGdvwVgT9xIjFnoVlFgHJHk6uJo6L2C1MQHLEEb0bOaqsNDVSSFdaYHdgyNeI&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH5Lg53dopc0qlIk-gxTtZdUT3LfapwRbwaKmEO3LuJk5vmCRMEDCr6acy03JprioTftAnGatXDm5TfPcRjudq_5AtMN_qHGtA3jqupkrOjnzvXVXZCgbzV_81DdmlSLzp7nkabq7JfWhgNK3tB8FMEhubOp3XnTrLoPcsmMzcbYpli1rJbN86O4BM1qEVWzQbWOuuqJmeTKL8117jF8W4no2C_tGesuSikArHXIvZOiyKzf0TyQXSD8_35x4TxAWZ-yyNYM0HzoQI-aBN18mt2gsI6Uc83ZHjl8kkR7OTi8Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGw9sp8VmAQvEjUidJZw7LAhNkP3VuyRqc0lU_E4qrvbIGcPDGcd8_mYs9Kdmxk_WzxhD2r9_94OmAd2z-wLYlfMZyrHxucpH47856AjOe2YjLs9s-4DhHRiYgGjONMuwSLKMsYiBHKY96Ac5h9v5LrHP4vmR9GFqFGaiZMiFAM-22yQfhg5vzC9reZG2qaTH_TKH3cW5CCOgc2zSS4IqfPerUYEbRpeQtaQlDWlhqlmx3-iILT5jIlOoFFBBoZZI4D_doAAsrcjlVZlVBh606I_2vyMskwedxx3I3lIUYyK4eSpKLOF0S3Z38xvlvqki_Xy93U-mHrSzX9fIo-94Sp8qZbS-T50EnhJq8-AVnXleTQ7Cpot1HrD3e6BklyhrgE_mbCWBmel_qrBleWGKaUTq41HCae3JR7pMNcU77uJC89-07aQxBpSD2HzVIW&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Authentikka Indian Cuisine', 'Troy', 'authentikka-indian-cuisine-troy', 'Pan-Indian, Fusion', 'Both', '$$', 'Curries, fusion, brunch, lunch, dinner', 'Curries, fusion, brunch, lunch, dinner', '{"Pan-Indian","Fusion"}', '{}', '5114 Rochester Rd, Troy, MI 48085, USA', '(248) 250-6510', 'https://www.authentikkatroy.com/', 4.5, 405, 'Monday: Closed | Tuesday: 5:00 – 10:00 PM | Wednesday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 9:00 – 11:30 AM, 12:00 – 3:00 PM, 5:00 – 10:00 PM | Sunday: 9:00 – 11:30 AM, 12:00 – 3:00 PM, 5:00 – 10:00 PM', 'ChIJz_uIBuPDJIgROZUFgItahBY', 42.5939473, -83.12838099999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEwMB3zdvfqvE1ouuNl2byk54F99V5dzZyfQkulolXUONQsEHeg33IVayIjksi0hKvCJnEZb7mVhtd_I8X1gde6qtGeAZ3YXBkh40sIzIEZvYWbgavQTT_cRyvKsy55Ks9WDlullDdfQbf9OqXIA5Gz6BgpIPf79N2-lTteAnBmRPPCKm93toyD47C_SR3TrfWQfJgaV5baEbcfV9ln6Ird1SOjI0auOiYMbS8w4lXcXYMx98EqKcHjhTz1rmfLFrGi83nNiafip9f3eg-BwYSTIRdMAFvexFdBI_XS6p3MG4kmwgHWHTN2q8ZA1YzW2OmCh72cJJLlrmVVyfWX0xC6ylH6oB7qzuPVN78Snke5jwyW4NQ-OjJL9yg7CbTAKpy0Tu58DzoD1MLLVXiEUtK_galnjxWCX0CBrBn4ONA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFw8iuGmhNq2PdENz8aYaiVnFDFAYdBH4XAhuMlgf69DJBHFHFCUOhzWFnZ0t8b6h5pdaLgLyJXmjNI5IMKL1Qlvn2rYs71zsxY2GApxatto0c6GeLIlSU8spUsUoezI36h733FR9URr7phl725IySAblY4sJdKxHZwGAhmPd4k7Ddf3RAnBzyziT3OdQvm6Xd6WZko6lYcQBwcOXFq0RacxAXPGcA4OQm6RG9E3nFHhRv03yMap6d88sfH-yS0XPT0w-ANMrjR0S87GnjDT9chPRgT_fRaU9KadN6MW9QU2g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGKePeOLeilM5mTjrWcOOB5viWtXH7mdnkYZ6yGHkDZeoxhnkNZb-X9v3cDv3OGmWFNJf96hQ0zN7VdhiCKuUOmHzFoVIVI3NaTVXRzMlY_QnO7CaSOaoX99iNDIhsaYWPa8-og7iHOTfNRSg_mT16Ks-WFP2oVlpC6yegQFjnW4L3azQYWA9fBZtqI5i7bcWT6a76C3LmGDVWiFEAzQY3f-uO1ZgB9O1vLCdPHorly-fEgPP-vUEOqttye3XxnYl8v_BocONPGyp15UyF5ZveprIEMY4vHySjlF30xsYc52thX94pMm23thzde0zyXCLrE-PnWa1RnoRqyLetkmWuX_30KwXDGyuztk1EkW9A6Mv2KR7-Qrjs9BXJ6V8kCye8P19mB9yZztBPFftTnn9NFOuLwutjmampjCfAzcZ9OcZv1UZUmfvrA-yiCxPZv&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Swagat Indian Cuisine', 'Troy', 'swagat-indian-cuisine-troy', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '31632 John R Rd, Madison Heights, MI 48071, USA', '(248) 597-4500', 'https://swagatindiancuisineusa.com/?utm_source=google', 4.8, 170, 'Monday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Tuesday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Wednesday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Thursday: 11:00 AM – 2:30 PM, 4:30 – 9:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJDbtIKQDFJIgRdic32WSYe5k', 42.5261661, -83.10602949999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFY6rHfaeRY-sEIJ6xA9wQm982n0KsCbG-AF2cZs56RkKW325nRJbtb1rweFtumelehGkFayX_XwSzmluyPKRcPXksSJCDDKV9sSkNIUsXO8NpeVvY_oD5FpS_2WD10mDnYpy07P-smD5ATqBSpw0W5-5HeOBMoxZX4Zz3h_ZKvMBB2jQ76EprFSiVLPbOulnsUhT2WwYaNn5EPBXGstqVO58hZWAq1TUt1p05egykjppWUuoCgOaUhrfDkTOe6bAOyZt3y0afTGX28DyjSZNt7yFNHra36FY9U4ax85-uuQw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGdOLCcF5_FvuZervASjUcRmIrrbOwaLNV846TrFfRDM6bBjvc4xIbTPObD3-CUKVS4SeuHpAIYhY4N9vi_nyNby19ysDkHlOlSN8vGqFIhF8i7j1C-zp2X_WV8c6Ls46JY0Yuyou01CxCxAeCgS5D0PDQIKoPszNi24RRyyi_hbezIsE3ztwNWNRrr2m6KqvMXePqmvgkh_oQlsC8atiaQLw3gAKzOkWfB0jm4q7oWbN-UAUygTl4o57exJKPkl1cTzmBZho3q3bBALqpmVQkO4y5JBcgXiSU5t-b_0RxJOA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFVB0ureEla2lIp3SXzzd3Lt_rhjBGYR3lQRd3VIcmGz5qbALHx85nhaTJxMHTBijR46dEay5UmcJ-NJSDxXQXf5_XWF3RxL8KuvRD-GVqphcBaG9NFvgshzL5TYFnxyrgbHuk4E-07r3nxu9SWtpTb0k_YYduX9xaAhaNdk2Ekrmgqnfc4yfApeE1RawudjDEea5UYPZww1rEsBZQkJX_xi4kOKf4pps1jJVERA6pM9lVhdwdkfpSjeJxbJ4v_T49XL5ZD9UVc26Gxspx6BkVmKE8kVsEhQCxATVW0e92tqg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Masala Indian Kitchen', 'Novi', 'masala-indian-kitchen-novi', 'North Indian, South Indian', 'Both', '$$', 'Dosa, biryani, chicken tikka masala, chicken 65', 'Dosa, biryani, chicken tikka masala, chicken 65', '{"North Indian","South Indian"}', '{}', '43168 Grand River Ave, Novi, MI 48375, USA', '(248) 513-4821', 'https://www.masalamichigan.com/', 4.2, 903, 'Monday: Closed | Tuesday: 11:30 AM – 9:30 PM | Wednesday: 11:30 AM – 9:30 PM | Thursday: 11:30 AM – 9:30 PM | Friday: 11:30 AM – 9:30 PM | Saturday: 11:30 AM – 9:30 PM | Sunday: 11:30 AM – 9:15 PM', 'ChIJrYdsF7WvJIgR12R1yg3dA-8', 42.4805196, -83.4726049, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFocAjVMdhoRGGdL5xpBqXGaLbaqv7PS-ZPoNgo0pITLy-b9Vg06-dVQmeyTaejjcPLPbgbPp7POMdng2cMWTi3gEnM_AYFu4Kyr5d3AkdD-_jFfwl3W75o1--JBohp0JGEYYlwNBxUnX7c-SgVkj1x9OMLFLBOViWYa3Pnm1tEGA1FvvtMRiCsLI8tn_p3vf7zHlrjek_CQyKAUlgqf0MTUUwPFFkUT4f-jJjbgKU0dhgC7NY38WZe2Aiuo-eR_kBMbx1Pg1V3cCGGydfSq1Ln7WpZMKKmWXAC6FHtE1F8rXJWWbksTIh_0HPhaci0ZEbrvgt5dts24Oz5-0UunFf-vFaMO0BbMeD4CRA_SPpwZKqjBIyWZdaPtnYnuVw-GPfjtbMgl5mcYf98qC5grTKFu6e1rIaYqk1Y1W7UnzeW7QOO&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEzjaUpShKEdwK_X82F8Y_ZcsSKNFXU6ApMfKU4JIpYxaDDfbRx_F5t_mD9lypGsl5w7_ompGZtAS3lMPUZLfkKBUi4qygu_-25QHPNsuo5ajGQp70wHHGQ7qlMPz5ST2QRTwHGFNgQUdOrSXDRKQL0aK6oPjzYaPMNRD_R7qyO40GYJJUYkdCobvfNVmfIAeCGhW2m47aO-FY1XSJjWdPQXLOl2X9I-tYQE9KhXx9ux8yIpaz_-Vnwt86sO3CK4r6Vap1v7UEFPhrravGphP2kU0rR-G1NkqQxYGrhI14&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFDBcABhT_QskrEEgZEYEvfVG-_UnmPxjs9-lEgKXr7koWC4x6-dcmNnuy7RpVXq_MEUD4yGyGCcyQtS7D_ZFejOqbdWJrxDdz55kFCeZ-b7uEMR8twoYg-fYY14VAc26bY6ewhBF9D-k3pkDjfOydsvJYaiA0q535B5WK9TzfHz9DW62siyvSmBNB85nF3giqbjH-Kcjt_zUc-RZD66f1m6crsctmO7oOA3ey72VAPUHHt0WqUqKj4A45xOPuAWKt_N1HF-5VwVlUMkJlQahhpZSJu5k7PZhEK9S8jYAqtNvAZsoImxQGAtbksi1n-WSuGizzcyafot9tr8bg1oSgcCjZV5JvXBmZz3o-vZsXZSffbSi7P4mqvJhJLrtZYnFfjk25z9kvE5pLxCahp3h7STGQoa-uoYrVRIWTYunDCRA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('1947 Indian Cuisine', 'Novi', '1947-indian-cuisine-novi', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '25750 Novi Rd, Novi, MI 48375, USA', '(248) 946-1974', 'http://indiancuisine1947.com/', 4.8, 185, 'Monday: 10:00 AM – 2:30 PM, 5:00 – 9:00 PM | Tuesday: Closed | Wednesday: 10:00 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 10:00 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 10:00 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 10:00 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 10:00 AM – 3:00 PM, 5:00 – 10:00 PM', 'ChIJFUGOjC2vJIgR0zht65fIbbs', 42.4773018, -83.47459549999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEwqX3D5CRAmbXEHIfyE5UotaI8qcnMDoq5Va2ivFAKPL7r-uyec9lp73_kCcpc-Cw6BQ-_rl9QXC19sxgxhx8PBmOhrkEylD7lLVREOZFEyek8ssKDkmG4r4FVxFOq0JZWOqwCCcwF-HvB7_htPgPmHVSNWwLIcDH8uZ4splGpSegZ3BO3ZUAM2ek4sK7TMQDYVFnNIJdtW83DRDtzl3qUBabhAnfFDFa7bTye33VISfpp2nA48imQvG5zhg6s-q2t8g0KvEdzTlnU0U-SaCqxHt1exY7tJTGRqOGzTdyW8RiETcMP_tZfzkm2RS_5COn-kh3NTZvA0OylKPuezyn6bzQ_FTZ_-VC4IIcyg-KupFKMSKt63v9khVhbsMgOxbLbssRHVxun_ZQ-4uoCyoZMRdyradlsEmsm3QLn90QIL8NfiV3sLlWLrY-y7QVP&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH00MO4L2dJGFkgHa88vb_VfJmc8kejvyrSzeKO2cSMijTp-I_1rSHLKfsHxMrxFrQHeTdggEaSqGnPvR_CEKGk0qSyqPWZWMao4LsYweVQ6lXy-3iQdCNyDl0G8uBB6I4U0mH9TaDNNcNIC2Esxy_wv5CtpEbTdRASJNuZ4rTTubwV58o_mCAVrZhKbr6UtMdQO7F8dwe4qARmXulnbUplCH7Nr2zbkJHi27HqV0VtZbpHinXhvyWSGL9iITZMHpalBmulHACaoL9g-UzMYEW4ZBV4bqOnQ3VQvbrUHHSq6wv528hVs0BtSZXchzs2_IrKf206z3hiQueMmn6EUzK1Nr3UJflIEJu10UEY8N8LX463I-JDj_wOLCs1qmJn8WBqy9gzuQQ7rkvS4Ucutbf7il7Bmi9fqch7Q94pHrlwDgvcwMTpwdWJI8C1Ig&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG7Pl9jlySmJWe7cXvTcU47_E5ltB4P22nGUBH3sECKWnSLE-5eG4tSbGinbsuWWPiOboVt2sc0Q_eeytEP4DqxRbDVguL5jQ--pupy4gOGcP3C0fAcZdUNSxgsli1Pfhl853azrGpwml-vrNQ5CMQgzM3eAV3qx-j94oTW-o4l8UJ5Vdo3i6oDkiTwXZbFZjV3iIuEtN9aTimNH7IQ8nfrI0mnVLbxphpOw1S0vMzrt1mJyZ7CioB-jIfXct6RlpvJs5fkjWQZhikQAogVKsYJeCtxXvJm5gh6-exS8ZsNyHYgnvjbxowvqm0ySqpscK4W0qUGKSjbKOHnoqyPYjhPdleuSG5Nn0gwKFUmAwfoeNUjb057lHRjqDJUEy17m2H6BlFB517qzrUBPj8gWQi4IoHbPgyO8LvCbfP303OKn7IsLDLXzzEtXfd5Wkp8&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('The GOAT Indian Grill and Biryani', 'Novi', 'the-goat-indian-grill-and-biryani-novi', 'North Indian, Biryani', 'Both', '$$', 'Biryani, grilled items', 'Biryani, grilled items', '{"North Indian","Biryani"}', '{}', '40240 W 14 Mile Rd, Commerce Township, MI 48390, USA', '(248) 863-9102', 'https://www.thegoatgnb.com/', 4.8, 384, 'Monday: Closed | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:30 AM – 10:00 PM | Sunday: 11:30 AM – 9:15 PM', 'ChIJRV46D9mlJIgR7GVvCfQjPoI', 42.5280078, -83.4434496, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEEhHPmBrFyQlrDoK6aW-9xwU4moGOiez-VEh4xazDcdeUO-IMlfxH2OLvSWoG9quTES2s72yQ150iGJ39UbMGciD2YGUsdcKrVSnL3UcejrZZB0K4Di-WrJYlpBxuO2GOwTn27JYCkQVJnFi4yES8RBskL7NIh_FsYiU8Wwnoxh7yqkFX31omLaKTlzgl-KccEM_QIrH0hjcKtRbQfOa3FmJDGQ0q8-tWEWn_W9GBsGeQjP0GeEiMgrP1fJmJoRE4y5aJ7fsHgZt5Ld1DxuUHJEmP8vcHPsn05N7VA6NPA2Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFRtaYXQ_zF1uPHbFZOTx94E8zCmCni6HoaecmyQuZfaioXefIgRyE0Tnd2opxdBHTPt1Md5neBD0uKzdRKVMIne5dcnFRlWEUkbgEUNhMZk7sSPKdJaBcjZzMhzySTTjQfl7VGAFmTuBIsRaCBF7l_vWVRUJXu2qA667nB3z6X4ZgET944otJnChCqjJOKh1hwLxy4E3zB_zUnvUYIX6r0KKhmyMU5GrI9ozvsvSIeanjcnAp0Axd4T_IEJS1dtgbobo_8KQ5TAHvwG2llMv4g_lfviXluFbIard-GAOOAZA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGygdd1_qffGT7_5hFMN1uxYfnDpPrrwLxAaT9_eRWxgUiAxshS3yqOi-xlrDMNgTH8QJNK78nWXaR5nIWn8BxHbbcPaPqMlGzwCjPlMILgb1Wq0Blo0tPl_OJtCqr-ZkccjWZjjy0YNSOsuzjTJI674Ju1_gjLBe1ttXG0hqCPaB7ay_oXC0cfqMqdAG-wbb0i7Sfm-WsjKTZShxgmBbwZt5BdIwLE6JpcwqULsYXJIR5f__i4hQ4ptgKsquWEMuQ_wuGfV5BFySm9RdG4upE_A9Xt2FgQK4B9bQdsf5rwXg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Turmerican Vegetarian', 'Novi', 'turmerican-vegetarian-novi', 'Pan-Indian', 'Veg', '$$', 'Vegetarian Indian', 'Vegetarian Indian', '{"Pan-Indian"}', '{}', '24259 Novi Rd, Novi, MI 48375, USA', '(248) 513-4392', 'http://turmericanvegcuisine.com/', 4, 1482, NULL, 'ChIJeWU25e2uJIgRF45RIQUUNSI', 42.467635, -83.4759777, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGX6OK2DfSvIDTBQg7Zjfvh6yVQbT02zeo-pxuOYUfwAhjlSjWLwl8yeutk0krSlP97yOBbMrzD8JWYPkc85xFJBZCi7p4MYxGgHM-BG5rFokuac4viqnR4WvP3zZusR48kzzuesn-_Me3FbthAwwpsb__WjsxLlrtgW0N9UEMNNErmTttdJS60fBGphCWKIejbN0Oc4mlj4hdJn5wV88j3r7aDDsWXMrvD7DADqjKSEzi9GwANfirahh0b7d_FFnM07XQj0qgXcPHshI1aKKh_XCbYQ0Fht6v6tiiPe6grnq70IZnarOgIBSPVMty33ZhkR3NdTI0HZq1y7RIpG2E9JTcRmaPq3eu8IQd8T7UgrfWbrpP_Tz1kxa_BQksGuAG-U6-JQf6OrSLUa8Xua5eGOjIrk-3HAZcKKwOBmU7h9A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGdSbyuhn2FmqnpkDhTjbPkkEmbKanvNtEdPpEAzihCcJMtK0ZVHNeAWUD61s_RSYVXV1-6vZ1e0dAySVWcd2AH5LR_yNy1Kwz-eSkB7VbH9j80yqf2YF4XoHuqDsI3wdWEQPqk0pkMzlbkinilR0xCVuR0vKG6zR2KJCwLqqgpNbrjU82XEektX0IzWKa7bUEa_s76W1lKTT9sxVaeDLYn6KNwQZfvgua-uIwSnoacvW78lX1cxkwxepjnOvJ2V7CBrH7QqIYyS6Y99gCV1kZAUYU2vhCFCi44Qu_6DVcni0zAAulwWeFsI6YPU5t_Qtnyp1DGskpaoZ_gXtcx-MFcrZQdH9hJejAhE6EV9uhPNfv6tOvZ8LBY_YJ2XqdmA02Z6T_f0HQMoOxlwJM2l1guFSIDdS6hAPN8LypOC7Av2oT7uibLyeL5mv0n9Gdw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHhUSxdaj80ePMRiVO2AH8UmaHOQDuJmDue64NCrKCpHOJlVHasoPwcO5zGabBEmqGHvDDXrOtBphTRVo8nnB0qh5RF2S6o0xXGfysZcwp8y5nTuEWhg4sWOh44k0rnkUVBmeGBCdndbCuMjGik6jXu5BqijiTx5NChlTEZCpfavqVmOIIMzZPT7Ko9oU6nNs2RGeiRIZhHqeIHaIlUPTteIGmBufTId2ybp2Q2N1CVrTou1Uk5kmPqqqobpkEYe_4JdpNF4kjBLHzguDB4BWj6A6SQMDkyLrPZE4578cq6Ql-IqvihVqQ5KcbxKKq6AUhte0ZAOM5rYa0KgDtXBs8oyxG-JL_CpP12PTakDx3snF7MgOtc4vDCILrDTHxcbXaW1b9tGzo3XRZMVDXCiCM8vwplcvp4W83z5BqG25w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Roti Point', 'Novi', 'roti-point-novi', 'North Indian, Punjabi', 'Both', '$$', 'Rotis, Punjabi dishes', 'Rotis, Punjabi dishes', '{"North Indian","Punjabi"}', '{}', '28221 Beck Rd Suite A9, Wixom, MI 48393, USA', '(614) 209-8345', 'https://www.rotipoint.com/', 4.9, 57, 'Monday: 10:00 AM – 8:00 PM | Tuesday: 10:00 AM – 8:00 PM | Wednesday: 10:00 AM – 8:00 PM | Thursday: 10:00 AM – 8:00 PM | Friday: 10:00 AM – 8:00 PM | Saturday: 10:00 AM – 8:00 PM | Sunday: 10:00 AM – 8:00 PM', 'ChIJY_ohe3qpJIgRHkdqAO3SrHc', 42.4985778, -83.5178651, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFOH0Gyve4WFXzXj46DusVlFwTrhFTkNsz2ul6PjQdWDZk912tXwOdJJywSJbE7MTiu0xqcNipdb5pDnQg798Wu403wVGLvEH4XWzx1QP1OQMJ7kWqQ8ZrdRxtD8vdmGBu9gqhZzvwbB_H8YN3IwHGWfUzPeg6inkYtL_nrE4AonEY_gKGvVgUUpzzcM0KjeqI0dCsDdk3uyyaAGbziUJlKYLVYpGHJwlrYMKSSrQ0pcw4hD_Woe5j05kcTQIoAY4aetsYVQVKtScIFNqgy5WI8nc13PbRfQo10iAJyIwN65Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHKHZP3K9hkvgNysKwuEzMbo0AIl2YSUUATOsXEGjCNm3lWEWlimDzvfqO61ORdnyJPlFBtgbfsdYNpw0xru4-Ixg9uQaxnbJKELjBFUZhyG1YREJutjpiUdPtSKggttvS_SbMWlP5gXzrZHeDDNhdAXcyaDhgjRmh_IJ7uaNvp6d4HdATexSBwJCFwMKoLQpndGTrqMFqWKYwhlm77QTS57tvs2ObOxGZ-1qfw-EtRC3jA0I8B46R9d-90hIvDbj6klDD4kQX0PZc9wMGrBT0KzA8yDGIG5lsJMCJMdwlNlrrMykkxrCMyY2_uUXBzLFuvUk15KC8cU3eXLtYSPkFjBJphEse-a9qksgcxYG_7gsajOgcbcWvoMBGq_FozTHYfyEK51VhItt3MAaJbEfw05bN4eif0cdl8v21BX3XTnMLTplIoTpgbAOK4M1kv&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEFk90FDjQddMvD0ZNDnC9-ypGaOYTMGZV_IOskPvSAKu47JXYC-KYqcDYdJ8TJ_yvKUU2Zx26MZMHxJs3i3V_gX9d16kFSgPF6kFi0LFYj62WUDLKNLVgUf-fZB9SGkIQpzr6sKKFZA0Wy5gYhW_JhJJ38Igp0W9OXChrwsRakFzq4kluLrDOIys4BwwbR93Xyd1-kNwbBG2Hlk8T0yUJqjY7IlUJKIHmKgUhDqoVhhhoMDxDlD5Y2rQEq7Z0Wtpj127FB8utNh3P6Zmh8FF3yE2eGrPENPGqldGiOMdHJ0w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Dhaba Indian Kitchen', 'Novi', 'dhaba-indian-kitchen-novi', 'North Indian, Punjabi', 'Both', '$$', 'Dhaba-style North Indian', 'Dhaba-style North Indian', '{"North Indian","Punjabi"}', '{}', '37700 six mile road, Mall Food Court, N Laurel Park Dr, Livonia, MI 48152, USA', '(248) 277-3250', 'http://www.dhabaindiankitchen.com/', 4.1, 363, 'Monday: Closed | Tuesday: 11:00 AM – 2:00 PM, 4:00 – 8:00 PM | Wednesday: 11:00 AM – 2:00 PM, 4:00 – 8:00 PM | Thursday: 11:00 AM – 2:00 PM, 4:00 – 8:00 PM | Friday: 11:00 AM – 2:00 PM, 4:00 – 8:00 PM | Saturday: 12:00 – 8:00 PM | Sunday: 12:00 – 6:00 PM', 'ChIJn-UzbAiuJIgRnLEdy403LJE', 42.4131607, -83.41695519999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGZRQV4NIk5I349xc_RDK5EQVvWhkRpqCotvOrrlSBY4JGeFQJ_ghzIT79LFjtuZqwQFU8SMpqrCBrffKV-FzkF7hz5vGJ_WSSmCFS5qLfV9KBADFzkoibajzyoMteBeQNxGYvo5Ex86j9hiEloubvFoc4vt6YgPJL1FwnX6LzV6O3p3KncoC5ntV8r6_bpo5luGyUDOZ4HzMMDY1MCYDZVGvFLlJ82-gAl1jwHYJK3a4nRmkrSnXRvDWT8Mi0_AggDXNchCsQPLs7-hFuNlipBRpc5MIVsrM5rMuoy7kXCOjdqrh1T4M6pXOHfT0_c4tg9oO02wi7KztxjCDitkXFkpnXK0NDx5KFBnBTqbgnehnTOf8owKC8GvPStHYkkvEwvmE0zB2LEEL3pJYkBlZUJBZa5qFJ3OEhG22lGvgb4OA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHPkdE9i5yh_ogdv0PsrwdCK1w3Tjrtk_J446GSCl37IOxKYSTIrJJt9A_JyBI8diiT3z1bQBp04wU6-muBUFNTnvscCUdjusjoN8gmSLPSSVuoB8jyamnU_v76Gyl59Gtwp-JuUa-KVX1EJrSI0wY4IXJFyovmQlcL39DXgkEctx_YWBNY8sPDCLVBkt1hsMqIrFlWDyzr5Gw1PyYulnzCP6V1yyhuD2CcYumpEOn3VxIywIjXWo8ZGPUDCpN-0KwFmVL6x5FX_qp1LeUquC6YaytaeZAhikahnPUz5EPMbg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF1yb5mlJSCyHfMBwKhLrdS5GEvgciT-oso7HHttk9JVqdHE9x5ClweFkljxV_6S-14yrFE9U_JaDWIWv43gF7NjxCKmbeHDqZRdClK2J1QIrYV0ICDpDUxcJwU--lHjScLpIHK9kodkEBGuoh-M2OAxHQ0_nt3PRUksfNwaCcHZIpa6PsObKWKD-a4kZ2n0N72d7ydvQKf1-idCl1ivKaW8mGXE40gSRiSQurk-M5fCvo8dZ3lsR9Kp-wvgvjtMlXZjep7i7ZLc0bj_nGZwsQ1d2_n0TWv9SWMgfLkngLDpw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Kabab N Curry', 'Farmington Hills', 'kabab-n-curry-farmington-hills', 'Pakistani, North Indian', 'Both', '$$', 'Beef bihari kebabs, chicken tikka biryani, halwa puri', 'Beef bihari kebabs, chicken tikka biryani, halwa puri', '{"Pakistani","North Indian"}', '{}', '28853 Orchard Lake Rd, Farmington Hills, MI 48334, USA', '(248) 957-6933', 'http://www.kncurry.net/', 4.2, 505, 'Monday: 12:00 – 9:00 PM | Tuesday: Closed | Wednesday: 12:00 – 9:00 PM | Thursday: 12:00 – 9:00 PM | Friday: 12:00 – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJOabYQpiwJIgRFrJyUfOF_aI', 42.5096147, -83.35972989999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHTY1KZc01WWIWlcfNRkRNVR0gYjmVsAM84s4tD1-fVH4rkToR6hCNv4B31otl51CR8_Ztufg43CUI1-GSJik0kkCjX2_Lhhfr_xGeN_Q7w5s0xm6bCFfgAgbIpR5X6HqvFRVAK4h3iJcFZ2O7oqHZgbWrp9a9G1T-9SHZJ19tyS9XAiRXjfFoQ_CK8rX6GDgICWS8qcSSqbjxr5fyP6D_SgKzuFuYOfHMBNmRd2JzsLZGi0uDY9lhXF6-KCFHcOK4kKf-C9Go04OE7VoR-d2uY02eoOsaspDNFKKe9-RhMJxQmwzG_TrSHTgHOoM6KBonkRu1psNyYwlQJN095q7VKLEv6UWkqWOmb2zg-bf1pW2qYLnnT2rLslO7TsRIQrMyxRf2uyc-sPMFJH9AmxtVojsgSfYcOZlffs9iQYv5NpmrH&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG0fNhnaR9DLaV2XEjxx5Lkdv4120BwMoMF8qDVaT96TJgZhrjDh-sVWa3lQEdfQ92Ck-G7vImi-4aTzOdVkjrnoEOOP-yEFOoJMjswcWpagEQ6squ9iw3bNXzs5J1tB9OUdIbmeVTf2hcqMFP81dM3HizY51tyZ7q91BCLUTp58R-7RUxDYkTgbcsZS0NSm0VefAKPG1BM159Y1DK1EBYdbNhKrOXHEg4D_xiDzmM9nWTVvJUnIfOYn_uxFHAiZMsEzXqq3R6g5NfChVbSnAQST9Hfe0js62rOvjJR57eEKw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFQv9zBiGeLXQRWkaWCmravMQ5YnMiGhk4VLEWKsGb_WsaTzQNwLra-O_oLD-k3V2oP3nxzsUv6RrcwCMvk2mrkEnWERdink_ac7j9i6ZAOlhyIWWuWX1tOhammSMfIlX5Au-OJEOEJEftTkHraC1WTU2KPSU3Xh5fZ_tqB0NGCfFTNu2qArmssnddvB7vEv4WewQvbYF65Ge6OSv74UqaZEXOu9FIHzbcZ6YIDjpJyt_jaW0EXCkBnl6bqW3eLXxnLxlz-RDXybwOFLbQA6BxD3Zs65xJGyz1JXJU_x1XYDvxlp_f0mo-veS1SFsyxonChb1VTCkLh9rCzXNEx2Nqd4Bv5tUXblh35OrG9G2NfLFeJpVTX7Tn9CltGqe4dPY92yFwmMFG6jjP47gHx9Kk_lT1cWrlQDNkzlKH08kHCSUitOX-a6dBIWUomirwg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Zayeqa Restaurant', 'Farmington Hills', 'zayeqa-restaurant-farmington-hills', 'Pakistani, North Indian, Indo-Chinese', 'Both', '$$', 'Halal Pakistani/Indian/Chinese, samosas, kebabs', 'Halal Pakistani/Indian/Chinese, samosas, kebabs', '{"Pakistani","North Indian","Indo-Chinese"}', '{}', '29208 Orchard Lake Rd, Farmington Hills, MI 48334, USA', '(248) 851-5557', 'http://www.zayeqainc.com/', 4.2, 412, 'Monday: 12:00 – 9:00 PM | Tuesday: Closed | Wednesday: 12:00 – 9:00 PM | Thursday: 12:00 – 9:00 PM | Friday: 12:00 – 9:00 PM | Saturday: 12:00 – 9:00 PM | Sunday: 12:00 – 9:00 PM', 'ChIJf2y9RJ-wJIgRmzamtTBKjUs', 42.511334, -83.3582653, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHbYrx2FHp2tMeINOe_UwJxHAjqIleRSuKMbTebgi8RfL0B1mz5vGDbshYIVZKQgB2yueAyLWRFeCjDnTbxlQEAuiTaAXVUHpIEALkuciMpieGYeN5pMSCHUoY8udscyfn1r6JQxVg8GIlm863DadypFW1Vo1yiHJIsiYM0A2EMoG10QMx8pHF0PUx6xq7O0rNWIVzxOiJbrsZAfTxDPVgwyrSXGGVQzJw41ZQZaASUlUfmWOGebay-fzDYF11TBviqJ9PT9fNWN79azzR0zl7dn-LdejUg8frBlNX0FNPXTIP1eGpuJITx5V7lfwV44rwrRqgGCgaS6CT7AG3aECl5LjSvDOq2rNmA4JcUkISY0q99jQsU5X6N7p6WEccQhby9A_Iamobk_o3L6nRehFgsYLeAyP9ccwayT_PQW1lVU1I&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFUmffqq_-5nF9hwu8ow7RbWX5dX2frhO3PUnpMNJlUHngebH6TOKFb-ewnGW2bReshy8CwNeoqX1FVrS64NvxLpQixm8Au-09zuJaS9PC31i-gruNP14CplFp125RuRo1XNyDxZVkET57BNKbMbbJBD8lgrharAi97a5TFCIW119jAkytcNT0t0XeeKp2C-N9FPQOvsPmEmrCitLlqVT9RIjgxnrIc2woHHgNBpzJyfUyQxVHGFMZshLtpMrhmcUJowRKEH3m7E_OHD3Iy-0SB18Bdf2iqrMu1W215S9Jm3Bayy9fe4UwH98igwXyaBc4TgXbI813eWsrfN91AVrrVXasnwI0UtnjyL0uq7SjZDEekZkeI2XYxbBGAx_-qaIXKGYWcBco2rRSfb3wt6LXDkL4xlReG__HCIQEhYrjlAQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHn_B0Mkz2iLV630pYJZ4qlCniFFUGVsvjs-2ApXX63ygBiqGFiC73kACOKrvg-tz46VaUavJZ901conVO3OvZnWn0aMVwUidcLUhd4lS9DMWKAvJYGB8nG4pGbce-eu-uiPDC3psPnXwLleo9yMxPDpelUnKnH3N6jhukfl6jPL7x96h4g9g3FtdubSlgnmYviknw72bf8-nB2kOwCXldbfjVAymTVnOFBPH00coVIUEtmznejVltf6VrDP-rJ7rNIxy1McMgIh63rSVLzkZ9BEYiavb1GqsGCKdqXrczHF221fC-xAZ8S90zJpfISjUOmVY9hY8GCk_QKxcwr4MlMRvcGFyFMes9kYiz2BJkrw3J6DebkWb4_w21N9aWuCk9ZcISE2RfCrTXY1aZptL75JMWklWcqiv_1iJWWX4EhBc4&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Akshaya Patra', 'Farmington Hills', 'akshaya-patra-farmington-hills', 'Pan-Indian', 'Both', '$$', 'Biryani, Indian cuisine', 'Biryani, Indian cuisine', '{"Pan-Indian"}', '{}', '30701 W 12 Mile Rd, Farmington Hills, MI 48334, USA', '(248) 987-6382', 'https://akshayapatrafarmington.com/', 4.7, 1695, 'Monday: Closed | Tuesday: 11:30 AM – 2:30 PM, 5:30 – 10:00 PM | Wednesday: 11:30 AM – 2:30 PM, 5:30 – 10:00 PM | Thursday: 11:30 AM – 2:30 PM, 5:30 – 10:00 PM | Friday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM', 'ChIJ8_JnlK2xJIgRyg-nJ-x7-d0', 42.4988709, -83.3557927, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFFEMBvmT2farV_XaK87U9917iNLBfa1yxUB2IubFzhb0FO4Dgi3k9FP4HpfLiWOF52vV9m7FI5smr8i1Gfgyfg5ouV-uRAGUPzIPZlwB_ET5LBzjkOQ5Q5UOw6HzOpBqP5lvAKg4OVVF9FyrQcUUG36cP2z0w4PBmVGz84FO-UBaNpA5KYJaiZPIfIDUiUgM3Sn6-U_k4O2ym8UtwsmFrEXX-Zh2uZQCUlOlKsKCjcKiMZaFYPOboKjOrXSExwEjAxkduuruMVz3PkvwVGnwf7PPtEq7rP1kpGwYxjTnb4Zmm57FywchCHTDukX2qo8rnzY7WnzMV-lO9Oyk_jj5LKEsAW6Khn1rW1E1hfIPOkdouZgjVp-Miy84rQo8ee3too9bhP9uYLA_lmEa_AZlMpaYAGRu5H37ufD6lZVdg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGgYyL2azKEkK5bD4SmgNoPa_YaC4s2OVxQwC8pmbbth6n7JZpxJW8ynrpGAfqeLatCiM6dyaLM7YCTqVMSm-Qtj3oq9bow0rqk3v-Sx0mMeI-mpYtusKuh3rgxU43G669x1lh5Q_HdT7ZnRcXHlDWyFd62fh0k3NCkKw2x9Ixzr07emMp07hUC2CGF9PQi0J5w0dFQ5XCD-G8bPPIMqQ7rs-P2xxzFrhsT1D3E24uZS1sbwjm8llknEneOpFe0HmhlBvmDRbNqJlVA_fW51r5iAY2aSl-jytxKEOiRzkNJERdEEV0ENGNK0DKcYQ_U2kE6Cb-IsnvB9Gbt__La6X7yUzXX8bvrFDE8HSHNADm1K6KWLP6pT9nMMxWM2EKAa0EY2VocOW4wxbGN_Dc-3HJu8N9fybFKKs9qmsUeCiQInvkhnMpK9vBCrnUjyw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEjFzoKp0MjRdGZATBwXaLZeoxLVmqke1ck7jQJMeRTLpkdhXj7shXBxZ027yGIF_43NiDU0E-roWlVTIPxA6gPwymSiwCl3Os95P8LrZ71odcNxWdnE2UrKrPcEqDIyJeS5rWmCYojOtQEwLDHFDsbTe2emaE2uFcxYyza4LreykW3uDi5Cob0FJxtbBKV9lq0NZa5-Bp05vWmtW45fKIgUutHmRoc-0_kGH-1bYEAUcgV2kfXg0olkv_aFcMz5MYKY06KGOAnnqvqTrdM_jQQbtrdiTsk0etyYBVp8nP_OTN6zwrNes-icarzZoJwfVnFImYzqvmPA1bvisp8TvVKPk7Kwzik3AueTWAkTnnDqiBM6NIdZrm9x2GiU_BQFAFbqU2fHjQgOSTRUiOZ-mhQYQ307Ykc2TUQGEqClsBZIMQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Saffron Indian Cuisine', 'Farmington Hills', 'saffron-indian-cuisine-farmington-hills', 'North Indian', 'Both', '$$', 'Traditional Indian with modern touch', 'Traditional Indian with modern touch', '{"North Indian"}', '{}', '29200 Orchard Lake Rd, Farmington Hills, MI 48334, USA', '(248) 626-2982', 'http://www.saffronmi.com/', 4.1, 458, 'Monday: Closed | Tuesday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Wednesday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:00 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 12:00 – 3:00 PM, 5:00 – 10:00 PM | Sunday: 12:00 – 3:00 PM, 5:00 – 10:00 PM', 'ChIJO1LGTZ-wJIgRoiFCrMsIQhY', 42.51073, -83.358352, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGS7qC16YWFWb0Oc6PdbxTKmutB87fxE4jBdyCXNECylNWiCoWj17QnuauVWbhwldqzBl1-tSV3AOIr0LaC3sWJXAiNBxZ5KWqlG2hTE5Xiahgfu2ajWjwAcVvPIsi9NSbhxITQ_i1Q1ymD8iPDQ2chODR2UsAyCTu8v59T63gbkfDbvh5FyQl-JYb9u9fVkIgVs73i13YAx2DtBulzhd_GU4reFvsfQu2GWwpvYiBoaERUERWGbEf0cGa3L53FuR5lplbsw5EMa0V3nmqmYAs45AdB_Ls3ehHKtlzU3QbWXG1Ju-rVwJBh0gw5xBS0z1NOhTBmtKdkVz8p9A6kxtyDL99x-3VZ6XKwTfkbEnXMwaI4x8ObJNXjIHgXtVyqON_UwaPf-CbKV1MOVHt9lmZGfkkm2aHzodROlfSzCLM&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG75LIsw_nEqGQcuAKkeGWd8AJmZ97wHN_njBwgKlab2u5qbAfXH6xz7r50kNMDsmUmfhmXq_anxpU2z_C1pQltshoMwDDtVDTG4Pm1-GDq_lpARWT_jV9W5HMbNvDLZjM-Uk8_kyKPyn26-XNJAJlUb9PDMqtLeqDTunUI1zFZhq1AG5E8xgrhc8ZMW9q7Ul5F1-udmsUG0lgE4EnzFNzjJPXK7_PoYnRhhp3-tCMo8Tob-vMK_oaXhh0LtQYzvgxdPmwtS7pItujUUxi0z6yUG84Z8SIt95dsmbmdUuW0C-zPm3v4EzrMfdoY7hQ6_I7w-29ZpHUri4__QKkrqJj-0dT-RUmH8JTU7BLit8jZQHFDCXHNg4H6POOyv3DK_FEzA6AAusyPcPGMGVahQSMslRWtl68PZLYhxamE_w9jBug&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHnzhhWfTBd1Nod4GZaulpmcScQCJEkqUXbbbpqfzmdaPL21eUVG51TwBVc0-_OESIlyTL7zm_fUWzmlQbulCjILvDFEhW7sDeoQP1XbbORODMMrlDP2nOzAIEM37cBmk_HgXy_vI3Wb8MoP3S2_N8NMzAjVUppoyoCgTmKu7T1_UTTxg7rblj0yiJNTsWa5xJsPkUgmH1QBgmQhzfjFANWHChuw6QUQT-UGQGv4t_aOI2H7lAx5LCuA8a-oramqZqpG6yaOfjyjY7UbybDrKnnThNsbUj0OBUzCdhHbvBWRDUJzirOuYPZs3GVxyXlhMauZfBVfLEaSvZMxeWAfFmEweHb7N2ry_A61x-5UZ3VJDfHiRvlxyaQrzl1RV0vLS2uA4cgX4V1UGuMoTcD3lTZiqDzb8aPy5YSOQXOdnYGFfqD&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Chutneys', 'Farmington Hills', 'chutneys-farmington-hills', 'Gujarati, South Indian', 'Veg', '$$', 'Vegetarian Indian, wide variety', 'Vegetarian Indian, wide variety', '{"Gujarati","South Indian"}', '{}', '38259 W 10 Mile Rd, Farmington, MI 48335, USA', '(248) 476-9900', 'http://www.chutneysmi.com/', 3.8, 1173, 'Monday: 11:00 AM – 2:30 PM, 5:00 – 9:30 PM | Tuesday: Closed | Wednesday: 11:00 AM – 2:30 PM, 5:00 – 9:30 PM | Thursday: 11:00 AM – 2:30 PM, 5:00 – 9:30 PM | Friday: 11:00 AM – 3:00 PM, 5:00 – 10:00 PM | Saturday: 9:00 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 9:00 AM – 3:00 PM, 5:00 – 9:45 PM', 'ChIJBS-D7SauJIgRZUll5jOj74g', 42.4679205, -83.425726, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH_p8q8E8hPgj_LF73HoUzOBlA_ASXN0qcq7_MtXdeXYVbogTN8EhdeiM_Kw3RdtBb5Hpw6EUrFAfGYd4JXaK41jyI3GREjsfG4ZHKp8wLsQSHQpwUxxASpFTw0XXCv5HtgODzVIUcJXPegAzAq1x-EWQcAOVYytVWYog7TX8UNs3_hKvQeF2tg5b0MfSMAAXuFLToLE_s2Yf3Od0mJPAX2w1DVk5BXVgzZPJqILAauKs3Mg9wlXgQiGU6s-JwF-kAFi98c96gnQGmSMX3S3y5PVsK5FtJzHAisygL0CqGbC5jTse_ueq6bcyFRgqQp3owJpPbA6UV_MJvs-6QifwAL7hx7d3JaW4hcQ8Jmjk1KSwKtMhxcQ05Db-i1r6GHhsj6RaT0cFvNlLPyiI93Duc4pq8TGH7V42OedSpM33dU9YjVZCC9a7ANNMflj0IJ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGMLrZ2r4Ge6XETrt0F6MO0-Fvocqa_bU9C7E8l3w4vRdbeaQGxx78Cx0xIE-uZGDdbN4cyOm4QEQq_siJI4gcn0rVEsthpcJMy7rq48aqCVLHA7K0BunrJkfMm1wXOEAdL10OTwbuIEuVD8iQFvlceJF7u0uYxL69ExnQcPprG9HPVnBWnUErR5hUhdS2gZ5Nzo4dXjS7E4WJaOOUPQ63M8wZrisgpeDlL0pHZutmqcvAdZStj8jP1WWz4XcoK-tvmGlIxa70fUI9y-dkJMZHvkdbKjwQ7jGdFfIbet5vXwQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFDRxju2ZD0raMxYDAMDrdiN88z8RIThWw5AjnxENw4_vU98nJ6n9WfHmTLOhRkFbJqwS9qQJothOnHG40vTLZorxoUyasb5DmXhMfPA0jjfnncLHLr2D8Jv-gdVPvJ72PVF8FnMZdRHF3p_gCyKET8BVXnzQi0L0f7PIcLMb1uMcHasTGjFcL8Xig0pN2HZkrXGsIjIb9o7PwAa3OIM_8Q3I5lA9q0J-V7mzGkWQYOM-0nPukbJNfGvwbYPW0-cYgQkEE8snrItuz5G4-wBe3dbVdUjDCEy2Thjm0ccbTwr3z1amg-oHFchSDzqGsHKqQO9-zIOXyUAH82M856wRByskX2ILieyNMw8p8Wc7yyRmE9oAfrcW2_Slj1Es8Kd6mHeTDcoHoLwJji9ITFVRM6IN8cYNScAyMIor5abqoD4otGuzJWeTDCnJ8gmhFI&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Noorjahan Indian Cuisine', 'Farmington Hills', 'noorjahan-indian-cuisine-farmington-hills', 'North Indian', 'Both', '$$', '16 curries, fresh naan, halal', '16 curries, fresh naan, halal', '{"North Indian"}', '{}', '2937 Crooks Rd, Rochester Hills, MI 48309, USA', '(248) 829-1975', 'https://www.noorjahanrochester.com/', 4.6, 136, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 12:00 – 8:00 PM', 'ChIJ1Z6zQKbBJIgRklC8mJD_vOU', 42.6364438, -83.1696944, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEdXJogWaXGwMpjPTB8JAsBmiezGbckdFrVhrnjywSidFPzQ1Y7OhjVDqTiAXxDTdNZoAhs6zK83WHXvxBO1OowiXgmVPG3MdFVCfu_soxMlvbOVo90FoOXkAsBdilej998JmVOkMjPwRbut1cpok0lb-Ah3Jg2hxb4VTTH8gq1C38ySb6gv92mbw0hmked8kFKpOoB5nMWu5fmp841SP9xD0bJO3_wt9uBWTgGU1C6rIE0DH8KXadBmrgHMfPpEYWF30Tw95sAOpMteI-LvSGX1G8biCOlm3dxdcbaSjJDR-tH-Q2VBgRHlaTdvPWzgMRrZXeIiQ3blef-jHLK_9TrBTt7o06BKIrW5dkZhutQY7i9CPgo1Lk8bYfsOFgT83Q8EUgh3YuMIommVrYnV4syfb0kiogKYUhAxuZ3T5APuVU7e5goY0zI2nB3VQU9&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFWGoPe-wM-sEhFNRfJjIQMMyeY_Cb20BtzwR8K5Jajq4FajAOw3CZd8gwsdix0PevsKYmbMoiHOnC22JwJKcLBiTHrycE-gf-WSOfTw2FrYlpqCKqA3TbjuO5ErhEDTLGIV6M8nTzqwLEb1AH2K22wxQZhpnnt5k1U08gFodzYmlVEDrBIjYJboxHOhEg9novaXYhwV6AlhSc8zXZzBbevfgDnIAjjoN7S37ut8x6qxYtyHz_lYQDFJ0-bgBL1L1aoqm_XC0TcmKj-u1jR697S4FZDIxPkpL-IbDP2QUvyGQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFU2NzAxQPt8zhgmUhqbzXFm4PoiIllg3_xVuicRf9zgLgd5j8DQDrKQsVQZBEQQmcNSnKlnFYV2GHBfL8Jvlcb1vWE2xVMdkYqqqh4vly5iO3eifdF9QKljtcK6wgmeSxXwBN8PwgbfuVr8LzzbMTcwDvSmlX8if6vWcHynWWQWSx3-kfw52_B1-0tL9mLNRfqcHEDsKKh60GNVfB9wXCfBQkiHZvEtIPtGRWoA_u5xo0kl-yVkuhAiOqM3CvL189IfyYE4IOk8GZxd6lO2pKcRptiWsIemQg2NrBoP_woDA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Daawat Cuisine', 'Farmington Hills', 'daawat-cuisine-farmington-hills', 'North Indian, South Indian', 'Both', '$$', 'North and South Indian dishes', 'North and South Indian dishes', '{"North Indian","South Indian"}', '{}', '29210 Orchard Lake Rd, Farmington Hills, MI 48334, USA', '(248) 266-1866', 'https://farmingtonhills.ahabiryanis.com/', 4.4, 116, 'Monday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Tuesday: Closed | Wednesday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Thursday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Friday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Saturday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Sunday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM', 'ChIJURETUBqxJIgRyOvoyLZu0CU', 42.51156779999999, -83.35817240000002, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGEmFXgd4XjvIpGnFRnVcuHsRWcIRI5-sYnFHVRms5biiuwY-KkUiMmq548PReVWEmJW1sbNkF5yZx9VFarqGEPaqHrhf0ll-ShJWjGq-2UdugEnQWP24f82uup9S41p5gBV8qsTDafvO1IZSTPaf83TmzK2lahkdcpeXUSQRdJPB823savx3mdSpQSUIhkejcx67wkJ6sT0HngnIJfd9GjFSc7IbLMGODQIsbPMi2h-yY1km-fHB4rlfnQAcM-1Hhslj--Nvts3AnsjlEc-mu0nnwmZVS6Z2MEaLsyH9su4g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHE4hxYbMqnROs1qAgrf52KoowFyFbiAyzbExjD4HlVqCkHb0S0ntbqi6T2H-zCkI9Ssc_Qh5GgLRvEfvNQFCDgw-hwnPLFwhP-FqXoMMdl2ZtFlk9gzLLzHc25Ty2NcjZZlJddCet2Z8jndNhfRXmC38MeuGP0MzhEQK5C4BDBAAcnLR54XLEZWHr4YiO-siJ2NXN9Nr_GLpwbQoq-WopHkKrwjiRmd9huKGar4wABUpgfRRbxpCCUhu5xVaiFr7C0vX7yr36i1eMctVHkRvcv7xUGgcCozlUY40aRBf0iVA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFZo5CZKqt64lijHuPwmQnZYOcr8-KeBRH5l0IovpgiRKdzPKs-EsCfN6vUzpeQat5Q-rAQ80LxnYO2kcABvX3d5SiT-VejxF_5IwcY1X1b9pKMq-HuMsbuZpdJ8bvnG8RsZ6hSPDwtVg7tGJ8ebj3ZruwvnhfqLm48bRH1NpeFqenvMpLBhjCt5Ta-JpFoepEixSVmwAD4ApuvlPWdrepXjIGHgDfDMXbyEJGmdtdPEQhX3PiIcEk9ZUxs6G_U3zzcej2n9kx90vxursJ36gaOSJmOkojCuBYfq-DNzHnWhg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Nihari Cafe', 'Farmington Hills', 'nihari-cafe-farmington-hills', 'Pakistani, North Indian', 'Both', '$', 'Pakistani, Indian, Chinese since 2007', 'Pakistani, Indian, Chinese since 2007', '{"Pakistani","North Indian"}', '{}', '29410 Orchard Lake Rd, Farmington Hills, MI 48334, USA', '(248) 254-1667', 'http://niharicafe.weebly.com/', 3.4, 87, NULL, 'ChIJz-fppp-wJIgRJ_lv29vZ73g', 42.5131333, -83.35817779999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEJ-wXfkUyewcnhEeWY18-whtbF3hlShCY3043IjVQBqQ63mYX7t8Ry9nmTYJN2UqKNhlEKCJIBwhmTg0j9rPxVy-aKe4lrLW5ImRQa-S0pfPvI7iuZGMK_PZK5FVA4_l7JVcFcwfsfiMUNHFgLthJjNMKj2k-NZnqPck5wghjXx_TAmCBcP3HkO9-fEjjCv9tGVqLVpZzXES6jXHIF0vEnBjGfwBNpzCFYiewSOdlqYnbMcq1qrkhHwpBMp5xWjZeX1ZV-QCI7NhGghbMtLOeM1KOf9SNA1xzNsQdh9u-OQdemx-JMyQKJoc7YoSMUHr74JmtceOWIowM8vi3Z43KhzkTcGhRLY0FidBs_vakFhUd5go4l05ehJurcyGk0TfUbdp5LTLeqyYv4g47iAzl3RhcEuOGXDecObAhVEic&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEE4-benGoq6rPZzli2KObeH87OuDXmwl_7s3P5eRD6tzY3cvPHvEWLNB-6DDWWvYcxQnLLbCR_CADuCPVCPlqh4hmXFi0UIx8iq6IfqaS2oYh-9ljYEfn2JctNyrLxwvWsdB7VgCg6-KKr4NNvCihxWUqf3e3j23Pr_LKV3KvpYlmAfSuPrK8B7NcKCizIDEsn1Cr3tFRIStQMC4HIFWULpzTyLh2cAc8VjL8TYRfaTg-8-jD5xTlgewOJfRpxfx-T4CM24vKu8dpMDi6kAwEv8p4ANBhvt_NjVtb0IMn3SLky2vkpLESFkkE5BnAEOsrwmbpEG6FtxVJsGN8tMptzmUbprWuBcLGU07EirwWYQoeYTyQOhBe3HZKZUjShgk4hkIV6KA8RyA1d8OiygI5duB-n3QxKaa6f0t5aNQbEpQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF9Dtut6gSAtgsGIs4LY0NW3huagJpVLGz-wBU4ZBi4S3sJtDSx64PvTRR9BFtv5eFFKyIot4P93HGNVLs8haMNS-cwPEtA9kD45S9gpUZ1GSbjbS4buv-f4FUNysMecDXlwQWx2JEv5O92TuMWdQtkpNwQc3w8j12nMMnjZzDmQ6CaV7QrORi9E-SH1m2W8dgzztZK8_m17fplX7hpkHnz3E8INqQxhbxAWstWAgZfPbnR4wo2br-9sYRKKkzNlLkZz6B_cZHySjgJIr_g1y9nZgbdSSLcqZvFfn9TUR9hK0_Y-6R5Vb_WCHWxM6ub09o2C_H_svAGLfddvZkwUPxdjPIwcldFRGK6cxIM38XoaUn6adtHFneoFhV30YiXkVwtYhvKU0bsdahpw5ZJyNGWD8NryjzkUvDRKZk7ZkyqU4mh&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
