-- Upserts part 2 (30 restaurants)


INSERT INTO restaurants (name, city, slug, cuisine_type, veg_status, price_range, notable_dishes, description, subcategories, badges, address, phone, url, rating, reviews, hours, google_place_id, latitude, longitude, metro, photos, featured)
VALUES ('MamaEatz', 'Farmington Hills', 'mamaeatz-farmington-hills', 'Pan-Indian, Fusion', 'Both', '$$', 'Malai kofta, biryani, paneer tikka masala, dosa', 'Malai kofta, biryani, paneer tikka masala, dosa', '{"Pan-Indian","Fusion"}', '{}', '35203 Grand River Ave, Farmington, MI 48335, USA', '(248) 987-1123', 'http://www.mamaeatz.com/', 4.2, 913, 'Monday: 11:30 AM – 2:30 PM, 5:00 PM – 12:00 AM | Tuesday: 11:30 AM – 2:30 PM, 5:00 PM – 12:00 AM | Wednesday: 11:30 AM – 2:30 PM, 5:00 PM – 12:00 AM | Thursday: 11:30 AM – 2:30 PM, 5:00 PM – 12:00 AM | Friday: 11:30 AM – 2:30 PM, 5:00 PM – 12:00 AM | Saturday: 9:00 AM – 2:30 PM, 5:00 PM – 12:00 AM | Sunday: 9:00 AM – 2:30 PM, 5:00 PM – 12:00 AM', 'ChIJFUeXQkGxJIgRyYJvqVJ09pU', 42.4682408, -83.3951316, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEOWAjxfJBcFUCO11GvcJBtWWH11k-3Nd5EkIp1E_S0G6bJgrgwTb2kGQ1m1U0VZWsfA1_zhfnvVjaBrAaQ5hX69--2f0m1AVEu0NOvqkRitWCzdYFAvs6KG6erg3ZT-LVFqfztjwSil3hSQmvlRQQsvOuuN1g6kyqm1JpLasCG6MypSO6uRdCB__K1vuYCHYH-xhUGfM8cpOZMHB0lCVu6OtZ35Z9M2pTGLhAwoj2eMNF-XUUJ_F-XB9y6Uzsia2Ui6vdUvMriJ-Gt_VvEm5vKr0-KaCvSPm8nyqm6k-M8m9sxn9HZgtMf5wt5LyK7LN3xEmDQUft9x80-3FJR8EA8j7iwjSUhHbp_11JUvoSLAOkjXCMkd-0DC3KIiUSZjCrOFnzvwt5fi4S13NzbCb2Jd11uZAjAdSnIKd9fTCGe4DcU&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFG0uqV6tehEzSBwzokQCBEJdLdnc6d8G_Lmgf6rI40lc7U46v6NnbiqEWfCnNaKeUm6FJgiU3Lb6P3qXxLSCbAcu_m0ry_t_fWchcKT8mA1FdO6qk2_sWMBfn_efxuGp-8d1Yd2Rb_1XLsphTQb1bT14J0vpMgeYXK6pK4IwGUF3COie_LbHHvsZ7R50rpJ_e1SbPb2WCv3eHDiMhi5K69GrVTgpK3nVtc1Yub0Aci299QSV3WzgwJKqlz_PSd1jH4O_glovPNfoK5HnJ30VULKdO_TTnCsReynj0f30JmOg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEEnfGkpz11KesdHV1x4k7F3dtZR90JMbhe-jGo2dqdtcXbhCdiLiMrEHASuprHyK8UIl5gSnho7uXK5w-k6T1Yg9LJinkOpnTO3GRLmuTVFeNDAUjZvXBRP0DMWih01tNflgyajihKMNn3-Hm0RCAWgNDmq5uZGapb6jPK0VfkDRQnWX0L0GzZxyIgrdwlbu8WsLPbiT-a579ncLPO9zOUZ7xM0FvgfxkmKhBaeblJe1erpXdky3S2KRgJBGVMa3FTeL7VKz4k2FIHMSAjkkSb-oZM__BxfwJQGUKzE23EevGs2-Joh2oc14gZHGfzLpnbK5oGHqC3_W6OuDkOpzu2y_CIU2F0wGWQg8gufWYwrNB8Xm-V_tnu-pkvuSaWi-xOtF6iMf4HZSx1AtM9QVLKx389MhEO-lMj3iRcLccGHg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Paradise Biryani Pointe', 'Farmington Hills', 'paradise-biryani-pointe-farmington-hills', 'Hyderabadi/Biryani', 'Both', '$$', 'Hyderabadi dum biryani, Mughlai, tandoor', 'Hyderabadi dum biryani, Mughlai, tandoor', '{"Hyderabadi","Biryani"}', '{}', '24305 Halsted Rd, Farmington Hills, MI 48335, USA', '(248) 385-3451', NULL, 3.5, 1356, NULL, 'ChIJqcjTtiGwJIgRXi5gsUKnWCU', 42.4694537, -83.41657160000001, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEAzrPzVipFdhn8BWV2_SKxqQeg01-onKFkol4zjCq0GrT6odmOtgTZSvTxgv9NzVC2JHBk8qREDmTWQNdSvd7HO1W2cc88BsEInX94AQhMdxEt2qBuVm0WsVEzjRzvTl3kgZbzDsCQPf-Ta7gc_7UIYsPj0bFwa7P3M2arym-C3L2FIEEkPAhY2gBa-BpFFcDmNwk-v0jWKQdLt-tcSMEYyLcI5oabh522ZYFySZN2Jbvzk8yiGWZxS886OiTGX5-EdQqIEfx0fZc_pEzq8ZTWicdRQ0TLV549JlK5mAVT6pyTn4I8jhb44DUJ8kXYg8a0VhFcPkN7O1-MyMZZjl_ILmkjkX1ykpeFKQ-7UoLhQmxAoWlvPfrfRxW32zyDq_eNX2BF6feDYvLLleg3En8PCUiGAQY0azrn_ouIWB18DW64&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFtT9P92xtbgMxCgyRGtSqwAeXK79b7c1QJTjS4waOrB0ZD7j7g7-42nvKesQpWmBfwsE_w1xapxbO_eLnvnmtcpA6kJI7w2goK-Ke7kxlcGHs_LAJ5qAVFyarJ5zuXmCSdMtypfvuZiK0ckN5eR6hzm1hWXXUweh7Nv7hHcd-9FCG2e7rNCB8O8A9Q7aR30-MXAJg4Teuail13I42vbBCukuYuWMKHbPlqCMnPz43jNbcTQwc3BKeSi8GRFhgqj4pmPijL4f0ikO1hRPY6XoSB8F9KoTHqaEcNt5ePwMTRZlEi42BdZ2HPVA4sfCUlrbiTTzSFuU2CNvYm7vjzcrp-swe9UUN-dOifa-T1gDfysao7TGxfCdTURi5jrLl_FiUCyHJOAH00UDgJUnuSH1HEDyEM64klpHKV3ASrc29bZdCX&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFss8MnNxILBNM9wb9PsdZCKwiApXUgS6_IFSOOq_-T57uJ9nm0PGR77s1B4av6rtyuRulmUmoKy3mdcqiDdVBWH5aFOHkQyJhLi5EYPfkJNNEpC3bJfwvDhq06i0RkWcojs5v_gXV3siDUFshbLUZu-DaF3kTCI2Fjx3R_K2CCoaKD7g5Vr3qGnT_HXWvt0ZqNWJg-hGePYlZpuNVATq2UPpmac50b9pyGfNFu1ev3U2U6t9imY7goX26oZc5vBmo0QbDSO11Y-U01KVkmOWwNp4XYr29VDgtdPO-WH4dIVtE81UCTopknzUaclK71n_8DeiszhpkzLAKivnVJ7WNfprAlsVQEEC6BaOIUAdFkuboLHnr9fOEZqUIVIi6goLBtvrS3cX-KnMUNmB23iXD8UIvQga6e4obcWpfLK9BWPeFf&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Namaste Flavors', 'Farmington', 'namaste-flavors-farmington', 'Pan-Indian', 'Both', '$$', 'Samosa, biryani, dosa, bhindi masala, aloo gobi', 'Samosa, biryani, dosa, bhindi masala, aloo gobi', '{"Pan-Indian"}', '{}', '34749 Grand River Ave, Farmington, MI 48335, USA', '(248) 471-5555', 'https://www.namasteflavours.com/Menu?promos=1', 3.9, 1171, 'Monday: Closed | Tuesday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Wednesday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 12:00 – 3:00 PM, 5:00 – 10:00 PM | Sunday: 12:00 – 3:00 PM, 5:00 – 9:00 PM', 'ChIJlcb0ArCxJIgRZq-rHvOCCXI', 42.4681778, -83.3902139, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHIE_ftcyDJ6VfI0vaDzPcr6P8_x5m5AK2QUCKnIbZronlmNK0RNUAdf-7yEW8SpDeDX_mDjEl_Hh4yAa3h28Ocg-K2Jw5LsP7PNZVqKtqqF9CMU-DHg8o-CZyKrY2TGMT0oUrI1dFL4aBBk3WbilT-ofCzwLOtuJX4BohKv8GRUBv7kqcvfJm9BgNEuEevadiM7ApjqmgbuacrAampQSAqaV5XRRx8OyLfAD8GLOJy9VWyrBUNAS5H25WGbUeJ9qNUUwNPA2ltrzQabN-hQgyKBgC9rQ3hncCbpU3HXiEuTvI2ZNcPU5qhSgtLAdm1LKslbWEwyy5AUmTvoq73eFyt76eKeGmaGIsbM7i7t1DquMQPzMpZELS9acRp7V8MJqaydxz9-cldobz_J8ev6TAyaq0jrsGyjcjQtz7VulfgjWUN&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEYkzaQAzLHSMp0OAXIvsGn_9oTyrL6g6uHm_F8248zm0NcNY60enrMTqFasUw4FQsGLdrhAajYzdzjZ43_vP_ZMfuXKd9dMlTX3k-jxrOwafncpczG-ne-vHHwfIIgCuckPg8Ih88z8pqT1mtcoB4Ks4TGRHhcs_4nggAfqc3Bv158FlCmKUQoGI7UhMx3_sLcfGn2YRqwJ43zTZ8VsWnq8y9qY8AOLibNA2_xSBjX0yt7Ml70l8Ym6v-imlkymSexL5aSzkeByVdDkC0jrROGU4Uipyq5ILoh5v6KIfmrps4f0r3k5viRt02pFoIUgAIAi2vkMLntALB016wLX88TYWBukFJVBvQiBCFSDv1q5jQBCyU-vRNx9z5NijhJhM07Rr4as_A578FepbOwFYzuWhgCMVA0BS6yS09T5e4wwyHnVcaKpZfJDG8zI0s3&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGLpMFTEB_v7gDQn_f0kL6J8Jie2flCrrzZUcGCRu3-mLHZ9j1RWeQ79kIiKFP1OasyuugDVFKf_p46w0_-D6MOMQ4WI3rANkz_GlxA2pQEVSIMvqg2BoJNjGf6i66cfaGPIHKyd9hRlIrSspC0jzEP0F1_pbK8HL6tozsaHgssKutXtMn-v--NP541Ps08_zwmXfo-Pfy7t0mUpNdGy8lOmd0sbcO2HGKcQVjAa4aQbAw-we2cgg0_Ivb2pBzNTR_c_IAzFg33N7MsFtPvZuPnggkD5tnWGM7MCmbLZeMb_KRmJEzzR7q5AMb-_YbQzJwgjDhofzpd34hCgRBRybCk2HzN0EMu4ACUM_vry-1HYHISxd4JG6TJxVoTjcgW3PydWYJQ-1_URKipZA8CGX13PW9jXNnKjolP2y-RBNNqntd0JrwLezCWtVrN9A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Pakwaan Fine Indian Cuisine', 'Farmington Hills', 'pakwaan-fine-indian-cuisine-farmington-hills', 'Pan-Indian', 'Both', '$$', 'Authentic Indian, generous portions', 'Authentic Indian, generous portions', '{"Pan-Indian"}', '{}', '447 Forest Ave, Plymouth, MI 48170, USA', '(734) 892-2548', 'https://www.447pakwaan.com/', 4.2, 1059, 'Monday: 5:00 – 9:00 PM | Tuesday: 11:00 AM – 2:00 PM, 5:00 – 9:00 PM | Wednesday: 11:00 AM – 2:00 PM, 5:00 – 9:00 PM | Thursday: 11:00 AM – 2:00 PM, 5:00 – 9:00 PM | Friday: 11:00 AM – 2:00 PM, 5:00 – 9:30 PM | Saturday: 11:00 AM – 2:00 PM, 5:00 – 9:30 PM | Sunday: 11:00 AM – 2:00 PM, 5:00 – 9:00 PM', 'ChIJt8c47tOsJIgRyhNUNxzl5BM', 42.3694544, -83.4705145, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFtxVt-kPcUMMhVv76na84HgP8Jw_vcjI1bdHWsM7Im4vMW2KhkgO-47JINAzEnxfT-L8Qblhi3CK2SB4Y-IA0QJ17UQ9pS1Of9fBZeVu-2ougndf7jmdBPTd-3WXP5Lj3mg5p3AEWztgCgGLoq4IkX9-1VHZaclEvmc_KjNnk0qqXL_SYvamTvL58XHhnaAuagdu18vSx7ig7FsEK76cC0ClbPOijoibtxgkKJyiBtiJfpMamrqhV1WEJ1ENjj_hGKPkGlJJrsxpKzi9h-WTZxFLnLYXcBa27k3QwOO3Jpxl7oHMar8V2EaG9iugF2gNNMPsR05p0zgcbPYDNBM59FjsmRKLiPgip8mfqR0Z856lqM83hu5HTvfrpIaXKweS7zSHBYOk8C1_ZS7SfV26XY0YthvVyTW2dw-AtAq1eyL5eY&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEAozLWdDPYKC1_VrLoLRCrFLuiRrjQUSG0Bl9j7OTHu7GuLVIQCbhxZZ4sI9U_orxhSrc23V6Jl8_gfNz5m_fN4jFFZdhog7syMTexCGrzwpDnGScVUsDWGqcNvK-5JUA4KOC-33MER08YCpdL8PhE6C0Ytisrkneu6Gw8mhI_6TmLsDnN1U0Dgx-Qtvexf1VMCBltUYxvxl1ti8C7VhxE3GWSYK7bcpxDcR13pLnlYN3dqWmNCAtRO2jTWyf65rGX96WJpIXhPhdmVFu4tCWQbUqypJO1kChnskPnUfpym7IFbFyB4QVx0Av0ZpmJAmlL_5jQsZfKqe65TIITr8PPz0iPsgn5kjnR2Vf3iudDLoYh75E86-2z8GIgO9r8o3FdvohtYGNsjdO4VYPAqynKCEsIWA3eqolSvnj5S5oE3GJSmBhfUGZiixcuY2B1&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGjhkaS8PK1SP3Jh52LgsYQQWnUiwiD-a4H4I2ekX8kooZrnzlLqGXJAhVQ9oAKvZeieMTt4AN1U0BgQHS4SeK-3IbESFzLz_ILn6MMl8YiyWaGyNavnXCutsbprhWH63PlYAioRatYaw-6Nk0OyqsH_2Ecmj8r8jgIYm22W0wXNJqxsG4OrrXgexOtk1viy0NS-xGz6XsddW4iyxZ5w6No2pkRjTDPqxAeRQzsd3XXVGqHuOgtQ1NU7ndzFaZ4kyNVDIdCHpaRZM3qO9uPcuKKP9CTpMSDQAaA2BCBjnC6Jp0FItdHn6WRt_aezFTEGRI_JX-Bu7dTp7zw3gEV87Vv1DoX8-ZWDy2b-sE7eoklkErqwaMPNjWPRai4w7B7INDze2gU7Jfw-LtRISnqgEW3vaj3e3fY_Xyzew91YrBTzQBswOo-jZqRK7XypL9w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Tandoori Corner', 'Farmington Hills', 'tandoori-corner-farmington-hills', 'Pakistani, North Indian', 'Both', '$', 'Pakistani/Indian food counter', 'Pakistani/Indian food counter', '{"Pakistani","North Indian"}', '{}', '6 S Washington St, Ypsilanti, MI 48197, USA', '(734) 254-1071', 'https://www.tandurikornermi.com/', 3.7, 586, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJSYRpYnRTO4gRJxllqjNX8_o', 42.2405802, -83.614763, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFixEbCKD6GQH2ijsPEkpr9TsEyFQUBFIufxXaTTtmKFtH0WqvkzHhK4_FdF8wduskIDZGKZXQqn1p23THRePstb5wHhjfqK9M-eROOT-RYxuBZnWZIeiv1A-AyTJT4iwrHwkihzAiZ0ohTWS4-yoNMpBhl97YZCFIzwl-SoQQ93f-UkKD8vqaGBU4l7bUORN4o58-x0DovZ0m99A5ZIm6GUeF_DLpWFukuQHCHwZg6M_ChlwNADsPuuSCRJghSj4xclz54e61p7ajI26F0l6vrtezeMQ36xl0WgsAj7IwpZw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFcUhlY0cjsLn1TUwsdT8TivCSt-383qMgk5FFNpU4HciM4qvoor6kEBQBbz30yuLbDcnvGmNRoZNv6koSwDj-KsAv1yEPXJHVu_cwt1hMiD3se3VBXQ6jSI9ytFV-cxuWGgmBPHSCWwRjvzBRMBe5rdWjXAlVNiRlM4rIQHzmdiF4b5nXI4MMaXS9vV369RWDtGLTk6doklD3CwwEuzVSCtspZIXsbD04KCkW9OUGWmMlDoXgSetEBNptt2AIPKtkLodMOTgPX9OAS2svwURuwcncSLWs2FageCxz4TDeK2w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEPcizjMnfcj8BIgGtkPhTaMrO1SvJX0DeIHwUAlVKPwXdCe5pwYyrqC0sip08bmmhAWzJhudhgqprpKfUAw3uHOAgtH3A_leec6e21uEHUpZWNPI-EceOiNic6OI4hZ3EYtwFxs_0wxAdNeLPlUHKR0dfHR0O1D2ZF_1DyNIzSVil24FXSYDj8QdBMpE9DmoDlFtpyrk74WGEGYfXxct56MCCdw-G9SB6oTPYe5Jzb-6IllFtwM6tDVTfxxP8IoXBun_HSHI4k9YesOakHXlrOd4UklMvSQWq3X7rGdL_gBYWAo8gkred0mNvtwxdqWNauXcSJYq3KX-7ghJfuYJhdvpBw3QFd-fZ0Npi-pfEwOpuG4q5UGRhh3U2KYrbzzS5dw71QXGuCnSh6_AKq11L29Zyc2cKrHIS4fC2YVI0ZgXZwxxYc9xTRQblTYoce&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Kolachi Kitchen', 'Farmington Hills', 'kolachi-kitchen-farmington-hills', 'Pakistani', 'Both', '$$', 'Pakistani cuisine', 'Pakistani cuisine', '{"Pakistani"}', '{}', '45300 Hanford Rd, Canton Township, MI 48187, USA', '(734) 331-7909', 'https://kolachikitchen.com/?utm_source=google', 4.4, 683, 'Monday: Closed | Tuesday: 2:00 – 9:00 PM | Wednesday: 2:00 – 9:00 PM | Thursday: 2:00 – 9:00 PM | Friday: 2:00 – 10:00 PM | Saturday: 11:00 AM – 2:00 PM, 6:00 – 10:00 PM | Sunday: 11:00 AM – 2:00 PM, 6:00 – 10:00 PM', 'ChIJdciDbw9TO4gRmM8Kx59AgcU', 42.3295676, -83.4872329, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGgrr2DFqFkATnnrKj-YfqVM8WCWzH3b4o-osmSqOnARTE8wRbasiKHK7qpebFizO1R-oH4qdJ2aOUr25UFKwA_Kf2IN-K3y82sXZeHCmbt5GFrU8POwFV4vFtmd_1cd-o_wRKgMVn1TCZL-Ci4zTlolA-m56XjlkxFsECME8Ww2wrCbwPS1KrAh3huirhhxh3nTxo_Mh6kNHR6Il_c5zxsUz7T4ZPFbgtSEWXSRjpn6Pdd_dxaohFowK1yUrEK9eHgx5j3pVWaPgVaB0t7aWMaky0Azy2uNqdd6_WXKjqYaQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGauj8YGe338wuDEvhfIHvbhmLxI_H5VBYi5j2ch8HAcIURUIL6vjlxHKG13ctFLMSQdLpAGuS5fYlQGuzMoB_biO6vC5HCdHCpBbNqozozDdEA_qt-zz3BhQUafpTFfHpkLOD2AjqMavKZ1SvKSPlAq3A3nhTnDg-ueJzlo-Wy7DLR4tpdmxnTY6xrJS1cFstUY5b13NUPgY5XuAFDcoIqWblK6oZQtRRsTcaGQSB4y1s1EZSvljPYXH9Q0fdpvQ5JP9gLBoBVdz0laU2jyDTCrVBl3lotWro9cUXWXMXCDfaqWW6nsCMQU3COOCJseGqnJoVamMWbYS4daYepkA0pTiGrr2WGOd8-UFuxC1vkRu-MsLmt3un0d8YiCDwn-X7EF5QyJ4FShLojPogPUAQSe9weaNYgAsKsVN_BWVXRpMYd7JhsqczN214l_ABM&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHnwEEe8ENRrXMVasPo2xVWRYYU6Vw67IuoODVmW-uqG9CiV6iINumWTo3k6Zk2qsxo6qvqpTk_sfSaB97IJRjFbYb0tYvT4dwzdWYdKTckeVUzFBRItPWW37SG4EJZCZ6R6A2yfFEfoY26yu1xzDiZaMjXAx5lWJ5Q9Ki0TYxlBbXdwYWNYwsHvUG31Pg8w1Q6Ct7D8_xx4l_pm5scGSwCyRdGqillmT0wXj_wQoyZs4n7kEz3Tedq8ajo-Hfq4DNQ76MsJjdb-VhftCcgs6kYH-wMGOYTO3d-TYtgr0_iEg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Sweet Timez Bakery', 'Farmington Hills', 'sweet-timez-bakery-farmington-hills', 'Sweets & Bakery', 'Veg', '$', 'Cakes, pastries with desi twist', 'Cakes, pastries with desi twist', '{"Sweets & Bakery"}', '{}', '34767 Grand River Ave, Farmington, MI 48335, USA', '(248) 987-4898', 'https://www.sweettimezusa.com/', 3.9, 459, 'Monday: 11:00 AM – 10:00 PM | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 10:00 PM', 'ChIJ3_3bVIyxJIgRnYtvzopV3ko', 42.468305, -83.3903806, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHeQdUEG-Ybs-gNuq_nSH5DQi_wC-yzQ40JVR23e68onQfSBHjhxn7qJQT3lrG00Y3xQApjJxcrepLrKzl3_ZhHE3tAM5-HftFXZQ2illppUXYgbyZGojEJe8ClE_2dOW9w4d8-0NtY7nqbp7l1nk8bMLjpZbQ6sJGRrH8RqXYdQa6eqhN1VvVMpwmKVHC6DOEsUPwALGsliHiebNUgnuTm-Z7bN0XHyk5yTBNywiampOWy82hpPXxZLo3QQChKm01itmUObUQ0e-a9hAMVfcTDXgRTRwgONX0NSj4x9xOU0Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE-7h7yIOU5Cx68HNMCKxLe5dm8OzvZvK0md6OSD-8rl5OkzhgX6n252l95h8Sf0V_-2B_0uwzs7iAxCfk8e8HmobdvCoyg9NJcRoTATeA2saEF0XMF2t-sHeKASEihSCRaibd0g48CrC82Vi9M8jhBRKHZWVbFWPdFdHpLHAal5nW-pbAXNxIxpRGEHF4bdkdn-aXghicd-lHLf84K7yuGXcr7HhYyZQYoMJYaYIGYfuTupPnc2E68mOatouQL879qb3buE8j3J6ntLRh6WxEHDA0t0omDxjW4PceYHNtaXQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFQNJQ0OrDnAHded9TJ-Fb8Q7Kj5pioGrl8_WgPjAcnPF50qTh0SIwid3ixHrtKpeveQhxGjkonIXpLWjWteWRKOwiKyr5W3OpqHfF6AQllPZvhq8PYJG_1S4XO-r5gu9c7GQepXVcZa6Q2tvWXc63GrudNudOojJ6SHStVt8hKzSxLn8NM3g9ZL7ZFyhfKX3me2ns3d8XG0TWY9I7U392TUqShuR5pYznyOR76Ts63uzMHsxmP6rSynx5u8WNn1soumIZK1QRIqU18fF3Amh1Sdmw9EyAfJVMGLqsL1kuL9pxWXDmV3akyaKjLL4jpyhtofC-NUBPf3HTwU3LKT985ajSy3n6u1rSbJsN8B-3O40GpuWMvdUczq6mPb8R4g5Ib9N15uTtJDEWS6yS4VLMCZgPxFsmEQIFZf_RTTmx4js4VdBXDhPORl7GXLfww&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Kakatiya Indian Cuisine', 'Canton', 'kakatiya-indian-cuisine-canton', 'South Indian, Hyderabadi', 'Both', '$$', 'South Indian, Hyderabadi specialties', 'South Indian, Hyderabadi specialties', '{"South Indian","Hyderabadi"}', '{}', '45380 Hanford Rd, Canton Township, MI 48187, USA', '(734) 927-4019', 'https://kakatiyacusine.com/?y_source=1_MTA5NjYxNjU0Ny03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D', 4.3, 134, 'Monday: Closed | Tuesday: 5:00 – 9:30 PM | Wednesday: 5:00 – 9:30 PM | Thursday: 5:30 – 9:30 PM | Friday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 5:00 – 10:00 PM | Sunday: 11:30 AM – 2:30 PM, 5:00 – 9:30 PM', 'ChIJMxdmAQBTO4gRw0D-w_AVsKg', 42.3295818, -83.48748289999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEc5bhhuf_yD7FXPCXdP98btnwISN7jtc7Amzsr0CfoFbQn2XbxrDAO2s7baUxCDOCW_CnmWCpq5vEXHbLyqH67lFWyZ0CdkGB0qLYEtRl2w3BXplJ32HnTRXH3qgbTK1BU4G0Rwyb4HJwlNettMxXh6hx6QzAZG99SujoM0SQkT2zbjal8Sa3FmbkGcWJgjMAvbwr_uDBKfGqlghZXZAkaAKYnQulGmD8zaqSNpR3VzM24J7YGv3ytXcGVbrknmLwyIMQM8kbmp6nohBvoutMiIpth1Sydvi8lqan4Bkt3qA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEg4Mk2hul5IGGgMEd8dsrO3stvuKDrSHLWd6i3WoAZYerB980qiUWa3_CsgKdTllzH-7c6XSskwYPQKSAebajJqEhBtfLLoZCFjKXEfUMFb5P-m1ox3mQ1B_3atnYKDIMGeTVdXl6EF3j52ewphhSLwBgGievaZkpftkjwFzSTGFWN7Go9Qj_N4QKqjub3fIldcbHR5sML5azAjyL8Gzzn2Zrqhgd8Z5Q7GJy2kr_6xIkDlW9RSqE9JRpUXdmCWEOONkPsv5KWOq4ZJLlAVuxBeo-88HdaX8F6rMPPyKUNvQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGFheUGvJdAnZArwic-EQBsb5VkqK7ppn9p31GMbEhlPsnFQMLlizE6u7Y9IZ3slbYFNI-mxYpQXvshIG4gpJOUrCPdWP3hchjTAjRu50b2psG0RhTxs-Y-UTiAfJMn82m1eYiI3WHnyOx1sJmd6tr9TqRvm014EIp-D1vbsSO4qd8SXOKJJJNzrNlXwli38s61-wNOMJT_TyJqeVIWT7s8Ktwj6txxWxbkobjvuQH2SdLob9tb2EUdEU1SR6x_RW-cfM_IEeY1McPRVeQ7-uKZBHJtgLnr8IGkzC9fHrGpCA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Delhi Hut Indian Cuisine', 'Canton', 'delhi-hut-indian-cuisine-canton', 'North Indian', 'Both', '$$', 'North Indian cuisine', 'North Indian cuisine', '{"North Indian"}', '{}', '8491 N Lilley Rd, Canton Township, MI 48187, USA', '(734) 254-1423', 'http://www.delhihutcanton.com/', 4, 508, 'Monday: 11:00 AM – 3:00 PM, 5:00 – 9:00 PM | Tuesday: Closed | Wednesday: 11:00 AM – 3:00 PM, 5:00 – 9:00 PM | Thursday: 11:00 AM – 3:00 PM, 5:00 – 9:00 PM | Friday: 11:00 AM – 3:00 PM, 5:00 – 9:00 PM | Saturday: 12:00 – 10:00 PM | Sunday: 12:00 – 9:00 PM', 'ChIJj1NM_XRTO4gRylq-aog9woA', 42.3483125, -83.46102520000001, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH0ncmLzqkSvlAqAnO3iMb3V_hcrHb-aMUvTLgEWmJ2tq5NgS4deUa4rX9nq3JxWR3IArXprnnTyIiP5UsqDqtVJSKBl9UF_yz3oRc6V9TZX9I8L8yZmd4v9Oeai66Tf7q4ezn3iG0B1qpTd6ei8cOwa9wJIggI2yRPGr8LLw_AtBMFszyV365BgyJqAWpMZidc1IJl_ro997hUTTN2Uh6G6ySz88pFP0lZa-SoRxz2kLiI-o3szExPa2VS4aftaAiXDHDbokgsbn1EDsKknBn3eullRsKlURFNA2dEGRMfBO2cNGWedWsBVTPy6ckZpLBfwTG5-xy3nmvFHUCHn4X9QfdN2OalBzB0t6VurL737sOPRrhoglD_qNAlb2vnfLIHTdjm9RTR_8vB-pOvFBr3eixYGu1zEpNXk51g71Ryn7z-&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEIQnD5rtZ_GHDHjM5rTsMHzBQ7jc3GlRYHhpEC87PDn9lvnogIABXax3LfkVsIxTOADPxZkJXf7hbN_i5WauUCsHpjdyOFCkRPmwl_8Cip4_wAFAkQPwMgGX9riVFACiA_UcqF0y9SG_-bvI2FxGdlvBxCD77S2nKPpvNsssFYf5WJ1eVF2GvzrtqpV85SRadYB0iGhgVPPOr6ut8lw7YkPwSvAIdMXJqET3ixl34NjD68I_Q2RuKLG7AGP-haohYVBC0073KfIlTz9DA5yzTvdKLWnrwxhJLWm2rPWgXq-HvA1L0FOo6PzvC4BFP2jRQHYK0nTIaZABGwDM9OdN78yFN_dKDKDyNC9HJNEbvE-VY4pBDSTbA9aKqV6x7rxfA8bOsb7-9-0NuhWHJxDmXxoBX1s-AdmMBWa27Zj4w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHtQyehwK3RviZGulMhn9gg7JzVoRMapKVSIpVHwpeawRgNXPnuQ8N6ndCO_z_V7EqVYOL7-kR7D2bftU73UWpYg9rBhVazjeAnVeX6Qg-PRC2oWfV0HazE2jkIaa3xP2bvAR8lhN2dIlQ_o9toXCA9UYXZHvItLrudUuy6wHHru8w1ghtjXKx1tewQVN1ORPFiF_TCwOgEbBdSTtl-WoOitDwAu7TN8YMxLpch_aQFMTEn46OHHz4BKU37zd5OZPNNCTD10JFXNjpZJYjKDmC9SO2GNvZFq0Zi3e_X-Tl0qbzHQyAwV4Z2ztrTMiuWXOz1BQQ3Sp7eeIsHgfNrQERC03B1HrmJOytT7Ts1JaXmGeqQs4IzTxhl7_xuW6f5bs8w_lmMafKX0tfnxSWoH3ndEcl2120QXKNP8JWgA20jVQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Raja Rani Indian Restaurant', 'Canton', 'raja-rani-indian-restaurant-canton', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '45172 Ford Rd, Canton Township, MI 48187, USA', '(734) 404-5523', 'http://rajaranimichigan.com/', 4.6, 662, 'Monday: Closed | Tuesday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Wednesday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Thursday: 11:30 AM – 3:00 PM, 5:00 – 9:30 PM | Friday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Saturday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 11:30 AM – 3:00 PM, 5:00 – 9:00 PM', 'ChIJIxLZNx1TO4gRO48CGGIhids', 42.322587, -83.4853504, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGlg8XZh5clPDA-RTH6lqiRwnhvUY-C5lFguDlJi_sc_f3tILI_XE4LPHS9MpTnl4uK9aFmgIV4cljG3IzrwJico3j2ItFHDKOTOEjnmNPmf4Pf_a1M6uQH-rZGUftFXX2RCWNjLd9zqOhQU0ip0KreOqv5hoXkW-csPb7QLlwG94WTD-VPJDa7EvkfKCTeV2SHaTOR6ycgkA5lD6Br0FH6k1L5Cc-o6H7rVDXTXOjtINPm7VWNk0lAqDWC247F1vRXR9OiN1IcjGIgeq959koI9_AfPNyOVrhbYgpNZVBVaQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGbkE6QgdsFdT24vzk3bb-3GkUWYfqYV-PoSpp9LPYKp7WmbMpEJafdKFCvub9hpig0Vawl8dxSAulFYSHxWIeiNuwKR-ICrMo1kg13gUhh4J87LgB8yam166pMteP74O_Fe08NGbX9X1k0rpXNtj-q_9cLt7XZ0cmMFVr4S-Xv2mf4w0YQNGWHGh6oQm1ZiP9Waa_ZVA_H5JDSD9R6EmQ1crekg8jqv-cvGkyJA4nHT3BA_FmKpcVxPnfb-Y4jzuFNb0Nx2ewnSjImBzi_8M5K2t7twcDwnDGGKk8gxzO4sQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGxXTEKH1MLop_RkWNixAzruRIQGDNRpIAmyGQR26CmBTiBis3dtafLCIH-OnMBYZTxvny5Ywp50PI6NwR97upymtnxraHvGCefVZgYIHtyXT1F3YPHIQyRsFSizWYARJu4sAVEC_Xe_Vo6NCSltL4Oo6-FJqudCjuT2wO8ML4Vo5q7bZa-knuIh-9YNaLt8oSDDKVpvHdKmZjwRTU4dH6BNGSSR0McMX41qEMWBpd9jIT31RwANpJPylrnOcyQ4R4gGvOUC53QGIZ3RxK7OAZDbs_ObXzwwqehtofyOWdC9Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Authentikka Indian Cuisine', 'Canton', 'authentikka-indian-cuisine-canton', 'Pan-Indian, Fusion', 'Both', '$$', 'Curries, tandoori, full bar, banquet, catering', 'Curries, tandoori, full bar, banquet, catering', '{"Pan-Indian","Fusion"}', '{}', '42070 Ford Rd, Canton Township, MI 48187, USA', '(734) 892-2997', 'https://www.miauthentikka.com/', 4.3, 1708, 'Monday: 11:30 AM – 2:30 PM, 5:00 – 9:30 PM | Tuesday: 11:30 AM – 2:30 PM, 5:00 – 9:30 PM | Wednesday: 11:30 AM – 2:30 PM, 5:00 – 9:30 PM | Thursday: 11:30 AM – 2:30 PM, 5:00 – 9:30 PM | Friday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 9:00 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 9:00 AM – 3:00 PM, 5:00 – 9:30 PM', 'ChIJEx3iIUFTO4gRz9hJQU_a-cA', 42.3246275, -83.45720639999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFLy0UrOBsdhlwDAW4OFTNDUYHNliS9hi0rSzBiM3nbCOWNMdYrUFl1X6p9i0vhw2IOKjI3aql0HanMg-3EUvSoK0XRepS7cgZEgOGG8Lk6TpzTTVFDCQh6PJi9beIbh2dfI9LmS1ykf6Z1X7pRXVpnMf1HhqbZukBNOiZIiHSu7fD0TPE2P7DPe47YKe2qMttWCJTQKi1MAwAcYkCr44zTOmBpAc3GBL8BZFoYA6LvOoGUZmlBItm509x_vwsUXUYfvf_f44ro_Bu0vSj2hTiefKcD-SWd8A2gPcKzFvY&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGEmslHwFizqSe2XQVab4tidwoBUHzRYuQ2TYUAkx4YusikavkkxNFIXSvP6zjfPkru-Eh70zqI7Jqo-cAPL3EGPf_KnFn6FCVbEnG6H3wl1fSoq8PyEozucDzBcgV7kVOWs036R17cX3LSbPezZ-iEgLKNs1t9VbKScFqlrh5XBO70eQlGpIapZPU4vjhX97FOfTjnkoAcUi_AnAVcXlSJf1XMw62go9a0GkJa7pw1NOZnRpuUONIKmtd-XE0kYadBt6nK5r8JQpYhGRqLt7TUJ02mstXX2C29W6jYzJ--buFupQrKtW5N2UbeGE-zqbKLecRvoZNZ25-i_VuHsRSlOnAZXHOxyTYmNS6EgR9HfHMHA8HN2YNaO4tBsPvIe4V0d6U48BWexFyBCNW4LAfGPk9AhCw9I9zn0jS4cW26Cw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGsjzO4g-5Ltx8Dq1fhz1e2fju97P1Er-p0_7LpRdWPFnMyYBHF4-MvmSl8P6DzHYbMzp0HPqtQy6kKfZSZfYb-20Nj9d3LPHyrmkk__ngWk1LsBC5WP6thoJnuaCHPCmYJ1wbKB80edwvER_-ozc7g71vgaoxTxJdTOdyqlX8tKqclKY_TYxNgTW8Mxjp94PIMJaLGYeuTuf72O6BgqJbNzrqwBFWpW6u86jAY-FhTUJTA-gJxHtekEwFdN0v7L4PvlMQ_EhuRWCGXTJEuCNfaM7XGxmSJq49VN54Uj4yKPUbt5-HDqufLKdTpDAjByK95q2g0F6_PCslRgx2PrSi7d0YRwBcIp0LbS7LxOOxLQ4F99x-ugoa5GXOY_orJmQxQF_pxn30eGBoaetSQZAfz4ci0kZytfGYhZ5NRTz2zEL0&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Namaste Flavours Canton', 'Canton', 'namaste-flavours-canton-canton', 'South Indian, Pan-Indian', 'Both', '$$', 'South Indian specialties', 'South Indian specialties', '{"South Indian","Pan-Indian"}', '{}', '44954 Ford Rd, Canton Township, MI 48187, USA', '(248) 476-5555', 'http://namasteflavourscanton.com/', 4.3, 1310, 'Monday: Closed | Tuesday: 11:30 AM – 9:30 PM | Wednesday: 11:30 AM – 9:30 PM | Thursday: 11:30 AM – 9:30 PM | Friday: 11:30 AM – 9:30 PM | Saturday: 11:30 AM – 9:30 PM | Sunday: 11:30 AM – 9:00 PM', 'ChIJbVHtB6FTO4gRNH32eZ4pIyI', 42.3237696, -83.4829812, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF74df5aLuDaxqTlz9aBFeDOJlfjlF08LNhuPkMry5D7AkvaLuVOaIq4K-7B9oCy3TxjMxTNAapuDbmtnHJZnxWcBuvIWCR_opm3ijdT6-HjssW9HIGhQmIeSYhh7UFSIWXgFaLhnHiBcoy278ndzSuQ5PHkaUSBl3T0jgw7l6EfRHcrS0RyOvaJXHI46a-6QHRKPs3L4KxFnsMWYEj0zcJGMr8eifbWm0NfTx5RDq4Kq55I-rmKwJqdfckvtaHh955A081ifwqF05636CO2PQhF05SagZHzZbsleIdp0YsaQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGQeKvjkbjx86uw4in5LamvHHjIyJ3Kxb0yCUlEWU8snvbHve85WAMgFc-gskDYmIVAolzjr_rFVuZ0njmfauykJ0kq-Pf3gtfROloo59YvgVaY82MyWEDPknQ8-wNNI0LS5WOttC8gau0hnUEco6CXUZCQhPHSMlfU5az3jGDSgcSrBFg4eoPOEvATnZxMizeVoeKmTT_BleVtPilA9klQ4s9M3WTnmB8iXTe7okJlisHJjU1pQWyQynjMsptriu9qFSx1OUVZvKlmrrTrWklDsXJf0YF5-IvSjw-vyewHEA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHOkxkSrM0xoeHs4LLzDpVhY3-3sr7F0XY1u3YdsnnmXTIM5jmwymyosRKYHOHvjFTMAez3OG1HaN-AIgou5J9wL8-VcN5w-_liW-ciaGr8haMT_cCIksoD_Bfc96aRVXCnFG9uFcF1XiK_xmz5AK_T1aoWJmWLIf9nynbL0YarWC1CcpFddNryd7mwrYsQJqWxgq4tHIDCqIVYDX_YzYRa8SvXE70FTQwxjGWy5tDcn9UJWMVkveHMf29v0ijlq-IFOZA11CJBQB5MD_PyFdWYMTaRCdB85nFY25UQCxe0bQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Neehee''s Canton', 'Canton', 'neehees-canton-canton', 'Gujarati, Chaat/Street Food', 'Veg', '$', 'Chaat, dosas, Indo-Chinese, street food', 'Chaat, dosas, Indo-Chinese, street food', '{"Gujarati","Chaat","Street Food"}', '{}', '45656 Ford Rd, Canton Township, MI 48187, USA', '(734) 737-9777', 'https://www.neehees.com/?utm_source=gbp+listing&utm_medium=gbp+listing&utm_campaign=gbp+canton', 4.3, 3365, 'Monday: 11:00 AM – 9:30 PM | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: Closed', 'ChIJM4IENplTO4gRU_eMcp_ozFM', 42.3225067, -83.4895682, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE9dyLC8bXUIsuYnrm0a4g-VnIeQFTIExi8ToS1-__GOHjXInoSfqxtNCowyPejBbXuA9dt7I-HpM6SgOHxBDrQs0eXGd1O4aiouRdPNj4A4EvePMlC6k0tZWGbRXI-CjymOQ4IW-psOrx2Cq2J7scu55KHi15rcCFGSvmE_6_g41F6dzUqmSpx2iI38NFmK81-R8qBg28k2uzy23sf6fF5DrLGG8_tS8NOfbPiz2V2V0GcVQDiZQCuXo45E2rsdxzuFDeNIUejoiALY1gLdB0k63rnwV5A9GS4APMetpD4ykggIXI_HMbtG3FCADYKxR6nFTfjBlh5vRsjWarePaSgvT6vXuXVsg8Shcg4mvo6TWW9GmB-97oxdEJEKuMTZSdnk_Kw5yVU7F7BqBEBoF_Gayuiw5-Hkb0N4QaTWJedGHA2Ow1lxI5V4-zj-llv&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHbRV6K6EGmQ77NEQffg7xbYAvDFFfTCnFg7ZSG6jYI1cdpcetqng0mFxve94KA1tjlCywH9983olfGseoz5T8jWeBlBPtakFEsdAIOTEnStUaTNEmWTAscqCcwkaWbJZqafxrnDygBeoNa3AbNH_TiBrxCocbhr2451A-1PEv0n_deoMtdWkTGja_Q_LM41bbC5p7crampuPnJ-XjChh38ICpdik1oFwqcUxSNAbBVNNUcHKeQsjLo3c4I7CW3YAi7MlPKW3Gf_sPScpI7whdQF9PSASgZaYwm6miaUIy_QQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHvT5rRINCAA4Xtb9P5fCyxP0y9HGyOPhz51ANhIymwHJd3kcmnqxZQSuaSiEEIVfNpqdi_YB-knCSEypTrewwwNdyMI6DPARzR2VkjmXEhCIjJoRLyIlWvXXDZuma3l0UX6d1Nwtf9TXS1nvX-C3tLml-qlKjsotzs9o90Ecu2cIuNMv1wuXpJvg5xW1GzDl872bb_mHuHgub9kQOdm6CcEtR7aRp_yCH9fqF3FBPk6mIsk-Kc3yJR5iIo2yqgKl0OaLZVe7Ifo2nrGtR0t9lVB7CX3SUNG4ft2wG8GUbgC0W0wm-LBkhOqhdAyHeSOcQ1kKkVhHjRDdT2jsOgnXZqYg4QLpA_xotkkYLBUnXv18w79J1fuc2SVaAnEWbI5nYRMTEUVlbAMWJa7E4Yot0AGrqstAljYshFMG2pcEhPJTkTrI-7bVQV_Lui5PGA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Chennai Express', 'Canton', 'chennai-express-canton', 'South Indian', 'Both', '$$', 'South Indian, Tamil Nadu style', 'South Indian, Tamil Nadu style', '{"South Indian"}', '{}', '1440 S Sheldon Rd, Plymouth, MI 48170, USA', '(734) 927-4620', 'http://www.thechennaiexpress.com/', 4.7, 771, 'Monday: 11:30 AM – 3:00 PM, 4:30 – 9:00 PM | Tuesday: 11:30 AM – 3:00 PM, 4:30 – 9:00 PM | Wednesday: Closed | Thursday: 11:30 AM – 3:00 PM, 4:30 – 9:00 PM | Friday: 11:30 AM – 3:00 PM, 4:30 – 9:00 PM | Saturday: 11:30 AM – 3:00 PM, 4:30 – 9:00 PM | Sunday: 11:30 AM – 3:00 PM, 4:30 – 9:00 PM', 'ChIJR6YxsXNTO4gR32p7JXIBcAw', 42.3593704, -83.4802191, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEESOtED5du_T3453zXvCoLfybYiyD1buvz8NgkkZCDtZkNCA0s4-RcFqkHcogxl4qNodTzbSPwE_bwr1kMy7rPQt1G2zck5oUApX__uMJig2yMkGTXxfbLWS4OhkUc4lVC5STbk2ikur9qCQS1TwEQD_N0KSfmKbLziCKno4RqS-vqr80hJgEQy8MQvvIXnJYVeO_tPPg9mrPg1PPYlCZaf-_97Ap52iIqJMnd9qkN-sX2ptRpMEq_DOb88nSp_Ohsp4s48Kg3ul3TMHbvKdYDTBnJwkRUi59cgEd8oGNINig&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGkyIpXWr4jMOc3p5q5sNTKnRR1fdZRjxdNmBx-yl3H5W9k8p8TN06MSv_tzOW7Nd1MyufIVskN7pBvEkpR847dNLRecPE4CzBsXjky1yIJ8bGe6LfHQcCQmLpvPebmKD_tihpqk8rW4TzYlwWz4Zq43IFRNx2xroxwyb2ra1eJfnNqcKd66IRR5RR5q23JOHzE6A561Z-a8ShgGyz5u9DjtgaaVgsd7l12pkeK9stWY9BkWMSGbYh7nH56tlaD1rkHJ2v7V6oRUWws_rvls_K4hwzbPSvL_hKuVroi_Vq8bw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG3mdeXuJKWODArMdQ4Rhg3ei2R2XmtuJDY0WE3n6CWoinJjwC2V5Vg6wBNwQe0dNPM9Bfwujnyy0G6GAVPZWT4xSXehDL3QujGYZVd_FmmC1LQUbv9d-z9DB9otosMel6dLFoKYo-s6Nczhw13OupTSW9DWo-1zD21k9IINCN6gU7o5BVeuHHCDKZ-rIHjXcKl9IiA11t5G2okl-K425XxFQeaa6vfDYI_iOPXni6gQTK9-dYzGDC8zJaV02ElBKGskLj4uUI8IDtZkduNdwi-VoYHBuEcAE5TZrPD9wB1EdwxKacumgQA_f19PTUh3A4yZsuosFnpQ7cKpHctFLk_-XmnfDzyBiDpNXmSeyVwqVF9-35_AQLfmdYp2wsj0YJkQOMRVYlW7uimUnVcWMU62cPT__l7_8Oftr8eJEnucG6eh6QCISMYp6vMSQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Kumkum Indian Vegetarian', 'Canton', 'kumkum-indian-vegetarian-canton', 'Pan-Indian', 'Veg', '$', 'Vegetarian Indian street food', 'Vegetarian Indian street food', '{"Pan-Indian"}', '{}', '36520 Ford Rd, Westland, MI 48185, USA', '(912) 571-0725', 'https://kumkumcatering.com/', 4.7, 62, 'Monday: Closed | Tuesday: 11:00 AM – 7:00 PM | Wednesday: 11:00 AM – 7:00 PM | Thursday: 11:00 AM – 7:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 11:00 AM – 9:00 PM | Sunday: 11:00 AM – 8:00 PM', 'ChIJ08cyIkhNO4gRDq2-n55AWPs', 42.3258905, -83.40120069999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEsEKq-nh0xFf0i0bbefUWkPJq_6Ou_L8ZI1eO3BekUJg0GtJ7bI1si2546yAXLSIp_N39WyzBEKEsle7ypeKWwh_ZEI3vPrVORB1LHVgiyRXByIAvWCOC_1htKuHt48zyWFlv6vIXdIG9WuIJCD3cmWu9HDaNbtxMfFFlAktAyOQXsEHKvQgKoyK-4B1hjjKw9llSPd77bI81LW8U9zwK9u8xOsFEfYR1q17OOy-jcINLy-xSZaXH5uerkdaKNnVZMjvJPYcOQHPdEhmwYLvV9qm7cSWNjHDW1t83U2kVaZA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEYTRoFiHS5TYEiOqmFpkiHLVAr5NRSZAP8j_POwuZXQ6zt25SbXwFoU_31zMGwY7SsP-134HBMKknt4sSfvZb-qq2eDQvEmnv8Whz5Jx_sF5aHSRzeJlzMXX3ECFFkEMoXyY6JZ9vp19wxI3o4-LeEa4RCA4CzHHBNwdUbx095HxpO36c2WW84QXhSauf_RcFLmvoDm0Y4icg5m0xuwimBtvoLb0akOIE3fFXx0QGnnYhHDOZXIkFLowlX22b_ewroY2xupmWx6oqwe65UBDtncvQoUy9ntkjEnUFH4Uf8wA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHFPSbMQtpUwLsvUV-VEStaepSRyZNaepxnzQw6kN6glwb5bJKQA1wWTcbOPKOe0x5CHqWi1lie7L7gF4p7-JHkk3PPfpItYixbVuLenAGAj98d3TB1eWXOnJkJR-2pW7-sO9NJKIJrhDwlVf6170cUIlfCN5Ugavdk_T7QOnmE-PklOV_ylfdnZREGcq77s64bejnuns3esMtvCC4Jxq8HPUFZvEP37hF3ssOKOYOpDAG0wX-7xMpLFo0jr_JyDDpnNqEJctrmPClK-ZOZzdcKDxjf7aA6TVtsE150Ji59pg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Honest Restaurant Canton', 'Canton', 'honest-restaurant-canton-canton', 'Gujarati, Chaat/Street Food', 'Veg', '$', 'Same as Troy Honest - street food, chaat, dosas', 'Same as Troy Honest - street food, chaat, dosas', '{"Gujarati","Chaat","Street Food"}', '{}', '7664 N Canton Center Rd, Canton Township, MI 48187, USA', '(734) 892-5956', 'https://honestcantonmi.com/', 4.7, 449, 'Monday: 11:00 AM – 9:30 PM | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 9:30 PM', 'ChIJy4zD41ZTO4gR0SmHYjzu7gI', 42.3414874, -83.4879271, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEUCsdFGCilOLFKuVrSQGANJPkk1Dd0lA790qSL7vJenifGzov3ikp6C7zyGtf4g-Q_1rwiqtd29VxHskuOyhT-8Hlozth1I6ZBmOLrRtA2HJ0GeuiSxCEOSqY5We_baX8uTyKFtZmq75crAqmwIKNSCXh7Jo-S-EOMvLVR_vELv3lbPRnbRgaaKv9mGkW9hmwrD1nOQCZzB0Jck-b8eB6hSoCON9kUEzBSbj58dSfuI9QT1tovflgFSrW0oUIUHWvmwEgJwL299qPnWi1BhDWdFwsRX4h3PzDbVlGzIVqEzOBy9Ig-XHBYzn9XlcvAPoWW7nE6Mr50F4KKH_v1iypTzUUG8dTUBFANTcihoPJ6uJaiY1cbN_PbF0mFWfvdg0fUGuA96wb4e9c8Hev65c--BbFVIgmxPPg7ylgF6eGfBYaLL5DUvVqPtaZ8Btnc&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGRp-uup9Ci9ajieNkaFXBXp3d8IRICDAGS17OgDYu2K102OgQpCnAeKKeodtp8BleatGGhKX7RCtjMf64UIFc-UdB-JbDlcYi2BMJfyZj25pYdKNVeJs_Loft82jfabdQO6_66rF0WZG5hYt7r5tHPl-V50FixbZcfcyTRZ2m1EKw1LNUGwlu21Yid_GWucfJAOV9QDtqdWIHHChV5dVEg2DfbH8XH91OiKwmWIEnm6XmPpZCqoAKvG2weEQ1Aoub3sdeq4D8XW7zQK0-GWPJetgonsOEk1tyQ0K-LTOyaCQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGTs1vk7nnU836gnt3zXoN-eoozikWEohFdrwbZ0xK1ieeSas8Wo-WTz1rpTZ2Yedq2hNYPB6QET7coDhY9ZowowHCvw3EgfEK5NyR105H-OOIoICrDMzc9qmKYL9pCy3NrIQ-p6wsFpgmKC1ppvPkmoCSy1X-hrkUSnIBdPhwgLPbzKOue9IdM5l3QjOogTOyD-6HAcGNOGiXCjABG-6R8H_jPtu4UkdFfm8tQwIadzcWLFlHI6jM7yqG7TgidYlH3lhBJIFHMCRCUavFFP5OctBDT1oD4XLv2RoRBTRevaQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('BarBQ Nite', 'Canton', 'barbq-nite-canton', 'Pakistani', 'Both', '$$', 'Goat chops, spring rolls, chicken patties, BBQ', 'Goat chops, spring rolls, chicken patties, BBQ', '{"Pakistani"}', '{}', '40339 Michigan Ave, Canton Township, MI 48188, USA', '(313) 500-9760', 'http://www.barbqnite.com/', 4.3, 534, 'Monday: 11:30 AM – 9:00 PM | Tuesday: 11:30 AM – 9:00 PM | Wednesday: Closed | Thursday: 11:30 AM – 9:00 PM | Friday: 11:30 AM – 9:00 PM | Saturday: 11:30 AM – 9:30 PM | Sunday: 11:30 AM – 9:30 PM', 'ChIJv51jaQBRO4gRyrno1v-OcxY', 42.2790519, -83.4360193, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG_yS4LvGd_nzS3e9DQmU-Gerk07_4SDdWfoT5H2mejJ50Hr_LJcEZGaZURtK8EkOQIaWVRRaevhIpjBYeqEfgAPiExEdUCFYZDDWZbyqe5AiRtFqgH69EHWVpKwXk7DeZF79befr6Yu-Tc_55vffyS3P4QK_UaPuiOlpKkAASpepvfWJVSqPtqk40oFchmmVK2JujIugOXezlky_OHujApyM5WfwuXPgbzxYG64q_bygTOwqF8qRx7nix6mReKiEAkW_gA7yG6VAVaz1fc_g3w7kF1P5MKv9hhuBVcZJOhRg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFR4Mw0ZCGTdmwXIFll4ASl1JL9I98iBasd_HQlAQYiGb4P2HnaFg-4VNosdZHsAtoVCw2gcOU-fxfQHinzMKwLBqwhXHFoDa5snqULWjJMKdJY1oB4kIkRAptVi09CwyXbrMVmfQcYAT87UvPLnwFMZfUA5Cj-MT3xUYyFlK2AoFJtm_Eu5FF2BFpbqULWjTUPQBGENWiARSAKwTUKej9_DCJN0ZOYjQ0b_783bUVgl8N-LFLjpgafEQkb9fU1Ehh2AU3cveQDdSEVE2baFIO8EmXJcTG05NPOdwUPh7LQnhWBvGl2FA6f7xItRFEoGbBcgw4wdYb8Z7kkdFztvAoHaYzzGRhWB5RV-urrx5m6h8TyqY-So_dLuMDN1XlGgM5IDgHUxHgVx_p5RSOnb-XCEbWj6t05TW87Zi1paY8IUHOl0Z6Nj5IBsydSxiZv&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFYC2OJwj8k6dkAmG7CpeUMBuvwsmprU-kyvk_PEuJwiRupO6YZWYgm1ssZgTrlsg2ZzVJOX7w6CjkEmLIUhX3mUyCkDwJxmqqnwVKgpSOf_TqctWRZf0kkkkTCNrD9h5jdPnPER4DT2W1UvAC9Lkg2GPc-smE2fyGwdhgUVR1UPRCL25aL6oAFGbt5d1L-UBwZo01ryQiJ_JY_ZrRK94VbeqeWpdpX78S97W-ZtgksB2BriXUrMNLVqu6iyktfdpldhM72KEZqNIduv2kqOnKLtu_IqHuorVc169OUbQwB6A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Pizzawala''s', 'Canton', 'pizzawalas-canton', 'Indo-Chinese, Fusion', 'Both', '$', 'Indian pizza, fusion', 'Indian pizza, fusion', '{"Indo-Chinese","Fusion"}', '{}', '45490 Ford Rd, Canton, MI 48187, USA', '(734) 354-8700', 'https://pizzawalas.com/?utm_source=gmb_listing&utm_medium=gmb_listing&utm_campaign=gmb-canton', 4.4, 1343, 'Monday: 11:00 AM – 9:00 PM | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 9:00 PM', 'ChIJn938M5lTO4gRviAtOnXAPDc', 42.3225405, -83.4888776, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFRYO8tEIcgLaO80OvWgbID5fjm2mGoUXBgcqNgQlYAlEcRXkBTu7UB0i5KavNxyuybqUaxZke7xSqWPGJ7noAHAMeBY_UaDM9PeiZ1AGQD8wEmFjRadwe4mzLwuqUplLH0p-aAArDPya5g2hDQp6Yax7JF92ywQNDte1xxLluMr4IUHH-RxFGypl2hehAcd2bupHN6UX94VVMZYWQpWgiK9VLKQGvtz9gPRkZjQdG3CWGWkJGFscP-z6eVEIOh7Yd0Iqpv9-_Zpcv1r-ZNcCnnoP8iRGW1rKf5hddMy3xbSguLXYj-wksoQ8freyJ4taINIooijfkWAOdV_v9DqkpV-wJN0rtDYMN46L6oWfWAEM876rzOAsHU3oEMXga6Orb8RQ2jPgE6PMx7X_KEi0hNMCNo-S-Dtc8vU1xpQoJ0sexD&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFFNyneRTW2Bn_4TXQFg9QACpSxEoYhol5IcNjV34GUkWLvWGNXuE4RfzWHP8kIkJ1evnPvbTNnkHE8EJA5YhEgxfUqYQqnUjxi5-kQcu2wOVD38sk_fy0M4ih2DUdCy_DTr9n5ELNsh4DdLxiJ6-TiCiawo21gqhhlt0zWVHRbJXbMe-dpLaFUkWpHzY_KerXJ1FSiafwTyQj1s-z8NXP7k3L7lXnSeZIeDnfl_XIjgIpSPwYR66CSHUtrVJL1aP06NTj8KUC5ZF1vFi3HFWyysVaA3CTn7bGUkNitoL6Fyg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG9-BTXVwDKRd09zGrcgAKdRDGITxnBbZN81_U6Ftwloe9U5HCHirM5Bmh61QJuup-t-GLhv6WusdQZRszIUkMDMAK--fMKyUKgyKQ-Xb6kgB20pkd-0vIhJK7D-D84Fw15ZpewCLIWdNISxXg6_pPtoaWwFoZDgq7hH7bzz6pmiYh4PLr8JoH-rv87-tfSdqB2qXW593sqFJ3yK4KWwOPpwpG6WWfPDPtJWXGo20jWcWTZMhXPsAFBZ38CC8_vwy1-FrJBAkHEg1aZOpNeoRu0yhdSsKDW2mOcb8Q-quV75A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Punjab Indian Cuisine', 'Livonia', 'punjab-indian-cuisine-livonia', 'North Indian, Punjabi', 'Both', '$$', 'Catering, buffet, patio dining, Punjabi', 'Catering, buffet, patio dining, Punjabi', '{"North Indian","Punjabi"}', '{}', '36071 Plymouth Rd, Livonia, MI 48150, USA', '(248) 622-5489', 'https://punjabcuisinemi.com/', 4.5, 1570, 'Monday: Closed | Tuesday: 11:00 AM – 10:00 PM | Wednesday: 11:00 AM – 10:00 PM | Thursday: 11:00 AM – 10:00 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 11:00 AM – 10:00 PM', 'ChIJU-IGkgOzJIgRAo8kyZngfek', 42.3672386, -83.39870739999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEImWLPbs_ht3NWIHNmOhIyoR9tiForMVzUAVcngkWWS6GBfnc9fYlbPUHEnozG17Y_EeE6SX5BbfgTlYSs_VLLrOW_kYsUDn-kzjsHVR_ZDKVDJYAnOltvItzYG1PbRE-gBt4mSCoBEqwSYrSZq4sJycWC3BUAlG6SLFcuqVnZUFwQF-vceEfB19ULNFdumT8ryhaT5xTo_V4W6HNHcpLnlr2y0idXjKBI1yprNsc4vwpkll-2U0yD7fJmVswYVtv-4_WgzQq3pqZEBxgdQyc8703J7crSoHqiqJc0bU6DyA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH23AaNWkaOE7ysukgVnH4BpW1dD8MYLVwUyVWazgScMbfup-JATcXGnEVql1ZIz8kzhjCCDwBf5V7SSxJuDj0jpGjWiHUwCZ2HJgp9Qq5Zuy7XT1e5GRnVSghPDo0qz6iB1JW6oAuJV1mV8PzrZGgFlcSFhGWBulFnBw1qglliWioQwP8zyGYCyr_17TLtfK9_sItIiFQpSZ79amhdyHEs9iLwfJXn3xYn9alSNFK1zm3iNK5RI-leQjTU9ZUNqJRlixid_dahGs_StGfVjsGZjs5hL8Yr_5jDOzYEt9mnzA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHFwMrd6FjtYRMwYtKvY8AASApZFyl7y-QqnhzRL9nKQHJt6IikxVcH3vqb15eEDPoXVhcU_8gYaiVNis7YmVp37sHKKOmpcXg_-V0x3nQn_nWTJMX3Zva4Qvb_zFWmTFZ41NFp3EYdW0QRjM--7yLciuLGGTytSc3Yjnm0RKAuZcIsH_SEn6WCzVNHt_eJRcPHHPF3H4t_Zt-nRx3UYWoJi0wmakZ0QYVq0jMy0yOHObjKVQOtMOiJpfjdf2TWbA6qH7Td7XClhOunShWQKSmPSUt9QYrtxaWipnUCYv2KbYFZZVjFnctpMKRL23_fDdiyarjHcOobtLuL7arIJHWEE4qM6cxB1iIjiBPeZHY2YBaOlRQxUU1JSbqwLGe1LxeugZTQhXqOGBw9Y2gbSfHeBgl4eH-MGNW1OfdNuUzH01z45PErFBUWZdJb-xn0&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Raj Palace Indian Cuisine', 'Livonia', 'raj-palace-indian-cuisine-livonia', 'North Indian, Punjabi', 'Both', '$$', 'Northern Indian Punjabi, since 2015', 'Northern Indian Punjabi, since 2015', '{"North Indian","Punjabi"}', '{}', '37116 Six Mile Rd, Livonia, MI 48152, USA', '(734) 462-1111', 'https://rajpalacemi.com/?utm_source=google', 4.2, 1139, 'Monday: 11:00 AM – 9:30 PM | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 10:00 PM | Saturday: 11:00 AM – 10:00 PM | Sunday: 12:00 – 9:30 PM', 'ChIJjfjp_m-yJIgRpgVW9Wz31Bk', 42.4116607, -83.4107894, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGTAkISZ5Rc15f-CEHEEv2JULKrrut3y295gTMMmiFPFqdvX41VVF0MNMDt79l58LcSQ061kEInUt6DwZSYhW-1ugIX8M9eGIzg7oLuOuyFYXgJTfRM4GCAXh-i7WpxSqbr1wg6-Hyabi0miS8FE9v5PbuZAKIjclUMt6OUmq7AzUACty37dc08wl-_sdDTf6noP80ypNByBIICgRjrBhlNidwrVMXmnZG1DkSDoTg1rfiMbtzi8seVFb6UQKDiTeTSyMee6WTUPABzs5hJO6d2C0cJBQGXYgU2_lv7YjVcuOw4E4iLulNolK2_S7mP3BrtDhzoRWEOyu1_UGuCGIWECmexHHZAjTkj2kq7M07dvbwbvkwIXUaPx9oG8-gRpQjsd9_8ahLzoG3gTT5jjvVkb9RxDuPdArm8xPWfgyk&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEH4QDWRsow-x74FHCIY7I_dK6d_XQdjEQnyE6Qrn0zAGECKwhRG7jtQHozkeIoSECL6iuSFRYlonu5UB_QWTtICkHouPbGimixpDm-EQzH0Kv5GXQ0mD7RHQbNHJ8UmtAidI3vZi8q7fA__aWv-Z6zR-Ee4fgocnL7PVwC3SDRKo5pvbqm1AZmQw0oiPckbfrqEUgmKfyWwVzCDNupKg4uzrpY_8K_BttMq6aQwATYqq5612zn2Dzo-c7b57kjr4Mk7zUtlHKZA1JlLYG1JsJJKsYBDU232ZgHHKp19l4EdVg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHLGtScealABQYPOatTNWO2sj1ac3XPcQ8AY9xXrYJ-GNo3_ppPdySNHdOTmO4BYNFyt46l0w4emqbcIXUCssVMkzTfnCnAdfgjqmhs32c7S6ic2J3ZCbTIQF-8VEBSGsSsLcffK5Zivn_5Fy26U6hz2hNh5MJ2wqpBAVIZ1myUIl0yeWxlcOpZyF4ZP2crfgKKHLxub2HJTgQBrrrj_SiaKnWaBf4wydPfMjoXg2CchHg4we94oTVlJq4lKsRaV9rXVjMNVl2E6cMaiSbv_rAXXHNv8JZiRWdvqJgclKnxYA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Deccan Bawarchi', 'Livonia', 'deccan-bawarchi-livonia', 'Hyderabadi/Biryani, South Indian', 'Both', '$$', 'Hyderabadi biryani, South Indian', 'Hyderabadi biryani, South Indian', '{"Hyderabadi","Biryani","South Indian"}', '{}', '17933 Haggerty Rd, Northville Township, MI 48168, USA', '(248) 985-7209', 'https://deccanbawarchi.com/?utm_source=google', 4.4, 1975, 'Monday: Closed | Tuesday: 11:30 AM – 11:00 PM | Wednesday: 11:30 AM – 11:00 PM | Thursday: 11:30 AM – 11:00 PM | Friday: 11:30 AM – 11:00 PM | Saturday: 11:30 AM – 11:00 PM | Sunday: 11:30 AM – 11:00 PM', 'ChIJe4lP5LmtJIgR5puN0YQBADI', 42.4157749, -83.4345663, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGJaYbi-i8DC0Z1ejLCvdvZ6MUBrPIVxad1A_n7omYO4M7lzfAGOVt2tUcHpj8z35c3MNS1whYDoynxSxMatezMV5Z0Io_htfvI-jnyh70dJ3vd9bgKRpU57_gFs-Vx716XpI2iurO5D9_5jdDzB65D6__1MU-Ifw3Hh5Uk28uInqUmy1A5e66GdLQtN63xMxz7ZQRG8Hy5WTEo6f9wdfaZoMInJkDgwXkxCYwUuKoqmt6LBOgdxJy8DI79NDvqcQazlALfvgrfA8_9Q4AiMD3lK0yuk_GySD8qQbPDgwIDAg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFLVp3ITkU0gOCG6HuE7vHDgSjQi2fmrNjIjutyHZs6Le-NBqZem_-bar9tqQQoz63IGoJFk-7Xgqt6uHJYBpDXApU41i1n2NsEIreuTp0vR6XjDKolW3_Q0jh9E9tCGsNOeKzUcAR6l9-5rpVd4xzYi_sqYGSIpGJEv8DveSzYmTpTIajLoLEfVLexnmlF1PUH6CykaIVx3xwrLqBZC0Lw7yHWmplTliA8pDALfbn5BgJWKKfVHp-GI7BhnT_xG5cY6iuS_vangvlzj3kzuK9U8jgEDEIinM7wYR0TFV8JYw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHGqhJu-OCGIDOlNY0Ypg8HUUBnZEHXAnv32mxvxTzW2kaKgf7JBKhwH2MWGPeHeuTmJ2umcjxiZPFLAYubA1SBv6G_ZEGsS0QLKk-bbwGqanht27r1KFzMa37q-pZhU085dUTRrAQWdhoIpi3rYqQXghrIGhC8Q53K82mLStzCVeBSalxBmdbZIw0W8JemEyxNdO4hCuQzdirVEguSFTO-MqOwDrgHXF0hirjst6ERXOD7tNoi1MBmBuuvosJaoOQowaE6l1uZa6YWMLsukbeVTCvBfGjcpXStgGvaoK3Ggw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Madhur''s Royal South Indian Cuisine', 'Livonia', 'madhurs-royal-south-indian-cuisine-livonia', 'South Indian', 'Both', '$$', 'South Indian specialties', 'South Indian specialties', '{"South Indian"}', '{}', '24234 Orchard Lake Rd, Farmington Hills, MI 48336, USA', '(201) 565-7339', 'http://www.madhursroyal.com/', 4.2, 176, NULL, 'ChIJ5-x1egCxJIgRlabaAp7TeQk', 42.471029, -83.35675979999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEbzxQIou3a69Q-95B7VqnNr1D5YxbdSCmoWrEXerBiimltO5-N0n8X2WmVx7gvkxemiHScYPPW_l5ywF8r5qXoK2my5JCGsmzuv5FkaQ4o57YWvTKASgfsW-LTeNQk63OOeLDbtTq_BbCk_ADOVEPH9q-y-7A7HyYn1N9n85mIqHGvSayflDdmzThXNgtP31yVL_VlNf37xyqPysIkqg9gIPCtunbEqG-fsOyBij0DPCFnvnqac4BUuTXkvAqmRxJ_YQSu6qeFhJE4FtykreBV9FD7-gwad8rHa1GipA_stw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFy64jSdmFsVPJuN5saSet6ZmvwWsvUX-UNSChv0BtAi_o5kDL3Z0IhLFlstQ51zCvpBaS64-Ef89esqTnXgNIBZXDs8yQhkNb_hiQFeOuPiVPZ8Q4SD6gM51djfneip7v6LAGTcIx2fou5uoNbRbWmN0_h_ga0PdYOhm__ya0SQZqjv260BpkKX25byHHy_wy9XAD47fYbhiTCcJuCdhARjArM1AB9FCIeI43FHurZOtLNv3eMStO3YTOOKL6z7YyzHav5tRu4bhGIiGLvAIi9FE0d0EquzdtSSwpY2KcNBA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEErl2Hl7flEBS63gIweWekSaf5fHCTjhG_NrryA_D6tTxsVepXvW9sK6i9VgUZddX0w-JoqgRajv-CtpsVDTGH2yX1QG9o6U8iorsVcL-sEJDYukKmJHBIJNrZUmU-F5NtH8xjAv3buz4yl36vkz9LRctO-AEvyApJUbvRUs1KnyViXjyOBHG_9zn9_DH03_PqRBiYit_aziMwRPuNLZDqH7QDskoZoLBocQbIN6Zn_e0iHA0hWTbKTbdeLqdL9JU_vWR0PRRjJm3J2XMHe4YP6WMl_LrZm9CFnPG3NyI2iNQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Aahar Indian Cuisine', 'Livonia', 'aahar-indian-cuisine-livonia', 'Pan-Indian', 'Both', '$$', 'Indian cuisine', 'Indian cuisine', '{"Pan-Indian"}', '{}', '35564 Grand River Ave, Farmington Hills, MI 48335, USA', '(248) 473-4500', 'http://www.miaahar.com/', 4.1, 2099, 'Monday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Tuesday: Closed | Wednesday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Thursday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Friday: 11:30 AM – 2:30 PM, 5:00 – 10:00 PM | Saturday: 12:00 – 3:00 PM, 5:00 – 10:00 PM | Sunday: 12:00 – 3:00 PM, 5:00 – 10:00 PM', 'ChIJdXXJe7exJIgRitP0fgXDgeI', 42.4700723, -83.3978035, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHQ3qe4ppV9vYHw-sE1diJpJ09W3iVoKS2Wd-0Phrbr1heboJ51ZeDtlK1X4Oa1_yAAtCt-D-oNuJwTvoMXXrktDMDmS1ZnfK6bJQrptfRRT8-Vtr3RX0RKRoskdujYr2YUipA-pFS_iEimuvcemtNlm9UKdCEaoiFjYd4sAl-zgs24BMcm0SrUFxVFlE0-L5wXBRVAPSNzf-6Z-JAaqdxXtS4rhEd_LGLcBfNgmu-fX7LbS7QTtzcaYsEZ-DysijxZzoy322XDrjXIBsydQZgqhPfrfS_oS1CH3cza-S7bSlqgwZgDGB-Uywt_yQ_6GUfWvN3oehOAlHWEfhK2pxK-K8TC5Mn2Cd_76hPkzW8ANXIuPQnET2LBfu2-v6FJzrnXHBgDIEdULaVKBrjt3Xh5x703qGFE6ZqzASqoYp8OLxpx&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGHYrhv1MKIHkLZPjyCK-6RQo2QJIh7GqqOsjvoZqJkjaTr2NqGjlRG7AxJki6GxXm9dCWHPBnYL5o5S9wvziHVAAFmS5ROYbOQLXvN35VVNClGL-0kr4rQiGBnZD80xXAsJuamWsF7pDixxt5Y5RhYZmtqp8j4o5Iih4YFv3kXQSAsMHn2TfrZ6kd73w8CRG0kIk1O8QWb5pEm5LyMMGEvOC-j7TAFKFcZWaoCZkM45j4Uqc2Ys50FIVkSQnILm4h1nEWHHmfQxjKtSA1XELMe2XxLPcvn0gFCWHZcb6u6LTeIDNNt6cOJWIASsWMgpN8_lhsCxqFGOUTWvSbxctuAEDFYvGqjW5bjmbCaC9n9p7a1tDxtGuM7LZLWJ0GnSyf7HQNXzPNY9ED75lK7mRqLhgnHX6PBDu7NxGJNm3OUzAcOKlpkuZELoFrDivuA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEH_QMWuWUFKikASgrRf53KF86J7GacYL3QqrT9bWfSI5rjCg6RqENFBvJzfEQM_v0oDX4huh5Ihtsw7QLWF00gfjBk5_-Dx8WNkLFbjMXRdv4lv7nTYPvYBBX0xc0FQ3gQ95Ia7pm7bkDk3tbSZ_FeGCPkziVnN_DD5FmKGJzA6S06g8jsosQ5yrzaptiWFCrCWwUBXCW1y6AEDyTzoDmlwSZXIq2LgcdgUzR7tdk1DBmiHhX6S5-yw_2Ez5x0i4ft0l9_HFi0200T2RbVWJnZ51a2VTLs70tiv-Qb4MP7rfq_v-0CJHOqpbdfX9olOinVenUJfH82hj4UY_M_eTa9FVbmk8kymRVy9JPbcBbU80aHclWUIIcJmJea60z7ZNj2oFG7uyb_LbZRDvMa10llDqE7yWLSr1cyQFjH8QeVuw2ZlMJAK04e4qxcuJlv&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Pista House', 'Livonia', 'pista-house-livonia', 'Hyderabadi/Biryani', 'Both', '$$', 'Biryani, kebabs, Hyderabadi', 'Biryani, kebabs, Hyderabadi', '{"Hyderabadi","Biryani"}', '{}', '17933 Haggerty Rd, Northville Township, MI 48168, USA', '(919) 665-1888', 'https://deccanbawarchi.com/', 2.7, 23, 'Monday: 11:30 AM – 1:00 AM | Tuesday: 11:30 AM – 1:00 AM | Wednesday: 11:30 AM – 1:00 AM | Thursday: 11:30 AM – 1:00 AM | Friday: 11:30 AM – 1:00 AM | Saturday: 11:30 AM – 1:00 AM | Sunday: 11:30 AM – 1:00 AM', 'ChIJ4TOANWutJIgRvazxxJjRQRE', 42.4157749, -83.4345663, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEaHMkIVDpGiWIdKLJxMy1IV2ntxqlkINO4xs_8yzl04lqVA8WkSE4hLvfWpqcdnX9pgQkPEtxz65pnLDVouRUoXC8wiq6vMJlOLskpLnS9AYxy3xBI1y0L30dN_B-7guAeODbVFTjGik3H-YMP6xFbF1pd6z6cvk9r042GtMBLZMUIlHwuMgzQ4tcuzazaoK5hmdrxmhNqwgR5mYAsjHPUnFIYYq3phnWEpAl5ecO3Pt3nh5K1VklNqmoC6_iwAQxNu9bZV3Cra6XIwOU-j9GfMtUG2KK51YqOunR449Ma-A&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEF7XGgsf3HUxsA0Qwa5Ta7lbStPRNWNcVmQn4TudIlNJWGztGDisiFaKZZJJr-n86VFPdKJBxKMhwUIfe1RcfhaiAiBDXIlk2P_z_SyhP0sXOrJFt9ignOJ82Snni9uMwS1WgFvkFXkQ_fEtN8JOrIr1Zv11CzUk9cehzGFvsNF8YfXDw7_xdAROiAA5z1cIdKCti_QwfLILo_jWtoV1R812A5k-rW9oY9Q6aQ-_68Zbr_M4qQMsivVj8LeEndPMJuYPp0L2w4Mmy4qxrGjefFCrAX5ZPA6tfI53XMW4HvTnZllBOpd4t8_CDBcrNWYx86oytxJoKmNj4wI8qkOpyqyyV43qBIa8Ru6-KBJ1mLtvpMtZiLu42IvGQJkD9roNO3VVw_6KYU75itBBZp4akzSF_C8gcDJbrFRB68SBG8iW8zc&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHNg-mTZocJ2NREB8S3ItiQwrwdobPvbq3a51XyY2ut0UCNXCNZnf8Vqyy3DrLfl9Qlq4E5nP9yYPbK4NAMBWkMqj88j7AbnjrqRjHsBFI8ZSm_GIAt_lcdKDC7_T5SAXzkFJqORPVQQNvEVbD0iZzK_VEquTJzmXUKkoWub04Oras3C82Al4jOm-G56V7SiclvYhF3kBvimyVovkYluIgUnkTkxLWuYtuENVm6Ya_GZLcpieV4Ts-aXhXTKlj3rnTfznp1_TtEAg0e5XTht2nSy1ZzrWC2tP2h4e2Ehh6Qcw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Athidhi Indian Cuisine', 'Northville', 'athidhi-indian-cuisine-northville', 'Pan-Indian', 'Both', '$$', 'Egg biryani, diverse menu', 'Egg biryani, diverse menu', '{"Pan-Indian"}', '{}', '16923 Ridge Rd, Northville, MI 48168, USA', '(248) 773-7259', 'http://athidhimi.com/', 4.1, 152, 'Monday: Closed | Tuesday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Wednesday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Thursday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Friday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Saturday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM | Sunday: 11:30 AM – 3:00 PM, 5:00 – 10:00 PM', 'ChIJbSzjy2OrJIgRNGAg3aEnGag', 42.40604159999999, -83.53131069999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGMyZG2nurj16zHclAxiVR1-iY2xW3lGq4V46pTuQoucz84POM-WKHdX7Rai3XN8660qCChch-KfYz8dMpYA-899bw4dJqHXgBLhzp5OBcvSsR0k2baQNlAGuyhwD4AEJPJe6xnvuceEs9lekUBJib_5EqRhbdDFhDGOB-kjfMvjl1SD9ZnpyrBsydbpNU4yA9nDwNTGHLqWOnuOPprxGCa0uEex3sri3Th6a-AwxsctzulnqFK6EVxb9LwOAiTpBvNdS4v_P5qUid1xtpLbaxGA4BYCtu8egIJi1j-4g1w2g&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEaw9Q6I7lQgQRfDBQTy-TRFa5q5sc2oFqKf5nfLeJPSRcAzPzMmJFXxQ6VlACaacSwUaWv2TEogcJ5z3Ghktov4noRwFe1EJjckUh4nUgZVLoG7RI-JU-umeRyeiPExL02jQgCYeROeZlX-c5y0eQ6S9FchpxprtyAGcpXNjf_xGouNcrEfStk-ALyq8wh7QF-lUzYQL1eQSQmJ9Orawa5Q0eDVEwrRuXfErAfou7x56x0t8u2VfnxIwYaXzZed2bZKTN-e6ATbIxfGoPhjTNREGy1qIAgRCjGtGpvgg_d-Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFoceahUXMUGrDZhi0LF3MN-LJFlsUZkKts690SBOrtV-iatn9zWQ6cmcTaXCvBaUPC-fVbyL8RpRIK9nsMjpdF_iVssWT1qByedG8HeBCHIqOhWTfyq4FhIlkUmE-tmtljX43JI3c2AAuICy0_oPOnKqhsV-krbnWGT1E6zEfyyKbd7reJY6k909aMhCnPWGc5VqcdKuzZvhfW10uTc05b_RTFyHl2oA_XU7ZmPmeel_4XjwAQ2py87wN0_8Teu5zYNcr6hlXv9OWUVqG1vtsBfHKpmcb5ejmV_IFevVrmdLrNZ7uMKJdpmleE-kJ9LlM8hH1FY69x3ABwIyXK0Ylptz0s65JSaPw4DBDP5HMo2EbZQsji9SPpT0UdEutzI7f0mKEu0n9E04aqdmaSsvqNueBZ7Qt3z8um_UJrAEEwQg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Basil Indian Bistro', 'Northville', 'basil-indian-bistro-northville', 'Pan-Indian', 'Both', '$$', 'Indian bistro', 'Indian bistro', '{"Pan-Indian"}', '{}', '32621 Northwestern Hwy, Farmington Hills, MI 48334, USA', '(248) 562-7179', 'https://basilindianbistro.com/', 4.4, 201, 'Monday: Closed | Tuesday: Closed | Wednesday: 5:00 – 10:00 PM | Thursday: 5:00 – 10:00 PM | Friday: 5:00 – 10:00 PM | Saturday: 5:00 – 10:00 PM | Sunday: 5:00 – 10:00 PM', 'ChIJzQmtViG7JIgRd5nfTqwfn0s', 42.5248218, -83.3534337, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHtU07pz5aVN4pqBgXzQnLcRbiXEtl4UDphgroNhxoT27Of08osSF1s42hIjGgdez4NLnokyvrYYSLZSNJuCNTRNys0jx0hj6QSREYW0t28rwD5qqJAa6u7SkVJqMg_JtpPQCeQqp0fzSTBwjFFM8PXK7C3ddDvwGLJoSPxWsHs21bcVz37csb2-Q04zi3KFHlbZUAAI8Cak7YIfoSZHMNyuvjeFlOQ5eqrvWJHzJpxpiUU9OrqhubKDgMyn8JocPiAVb45w8LAYrgaKYL37AqoNJWtWMzNBBSiutIaqQZQkA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFbA46EaaRYzKaPNyrbg_NUyMeN2AuOZ5atWedX4QF2_8R1csAZEeHkKEvOKDdM4xD5h6SZcWYvjgzbdwa74qDITyub2AtH1teIG6tRwrehEUZLD5yCaCKcwRxvYEoYQ6sivkgRgxihFvaUBZyHMkhqE4KE3WXGImsD3GR51rk-jWM7zddkfUUlp1uU96MkV9T03zEGiKBTHspQkt-k7yTJSqAjDxbLdXhrENfT0scNTgYnQN9rOnfpCVckDwxKa4sUxyGrdFZNGLBJr8QfBbg1fgsl0NF4B9wZKDKPwrd66w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFTU_lBOURzd1_y8BXm_86AX1CWKZuytlx4QqHGxQ5CR2IE3Q1Hf1jwInzrOs2JY7cSMlprtqIMMn8XDjIM1u_p0wRoBhdbWgccfbu_X_LIYFJPNZCv7WlHbUFmdeo7f1Ltw1NWoP0KZNqiBvYVdnUMD5VE6ir8euHrRaqJdRKBpMV8MhYx3lrk2u0NLHkOr5_u6NqrB4qIbOp-c86KrIiYEodqtq1PepYB2t88lBMzWPxKyxbfGRseucWTcvfH_qcg7c1DCRlmXBQCo_cydAVJJoZXOxN6sKFFlCuYarYyZBnmPor2MjdwcmBxKrPZ5ZDHoZWKsIRQOZyp-AXUdPfGzB6nLNJbdv-iRBNTYXY--5OirBoUZRWl9qkhZpoJ4ykc51I7CNObZ4_vW0BQPeEWjx8WD3bMNY3qzqbOe2Vk8rjzWoCeWwI-ZwxFKC91&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('CupsnChai', 'Northville', 'cupsnchai-northville', 'Chai/Tea House', 'Both', '$', 'Chai, Indian snacks', 'Chai, Indian snacks', '{"Chai","Tea House"}', '{}', '43339 Joy Rd, Canton Township, MI 48187, USA', '(734) 667-2196', 'https://cupsnchai.com/?y_source=1_MTAyMjc1MTM0MS03MTUtbG9jYXRpb24ud2Vic2l0ZQ%3D%3D', 4.8, 634, 'Monday: 10:00 AM – 10:00 PM | Tuesday: 10:00 AM – 10:00 PM | Wednesday: 10:00 AM – 10:00 PM | Thursday: 10:00 AM – 10:00 PM | Friday: 10:00 AM – 12:00 AM | Saturday: 9:00 AM – 12:00 AM | Sunday: 9:00 AM – 10:00 PM', 'ChIJd44gs7FTO4gR2jISQ9k3vf0', 42.3500664, -83.4676732, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGzHKpKmwnwec600Yl_DLCli-1riGg7H4fqNWVlPAjNs_KlZKUHYFqcGviMTmQ-U7BkaH_1GImzkjIeDmHPLayG6rgZ_XDJr0UWagU63igL4ESSueovRdHvXm2f3kc5_Yl36Ui6gy4wgDGpbUbX_nqrojRsmVqAueBhYpQL0LOy3wXvTCyRh464FoJnnvzZ5Kvj0H1CQk-afdRmfmmerlP7iuVF9v5wYbTyNM_OugLr4ft8Hc5iz42PM3gTEp_vrQrialxySU0e6kup6hOSyAe3IC2bTQbEg2nLhQthWBao5w&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHSlWTB1emyZ4WrNiek5Chyveq6EVSn3MjM6IRZNLD7-uAN22V2q4Z-VewuM_81T3uuAdz8DVtmbfjhkYGoFLWqvQxoyli-0j3OJGBiH7uK4_RqsbRyejVQDRBSdWJdm7J9lSo5OyMuHlu7F6hmBSjyyub6HjDgBiUD5AdYlM5vGImUwB3qpHisjU5PDSNV-TgUJCjd3pUFLx-_z8qZPvmY0sE52XcjYuTnBMCn_bh3J-X8AoTjkj-i7MghZTqkHjIRakP_0JVHFp9TqS27tjhovg2v4OfVbSdm9Z73eqngDA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFkFNs9KfOaXk8qqVkb-Z0j-Kc9b8Ngn_Lag_K-dhDqeH06H104yMk1KUCGJkAnWmEkpY0aTDMhdiYrEJoild2uA8bVNZ3ScHNFWD3W5zlllUdtqPn1NsCJd4hgZ2B9mEg2tKS0QNsT_ZA-b5fmPbA9qLq2ClJQ9uKQ1iS7f4GhM4Y-W7ExXMFOno9sMjc-J5VrZZI5wsXkiavw0N1HelLvHPdDr1HRRI81ihiMIHN7ZzdFBRqn9jahXsthYcVWxrorr2Qbak3TOdrzx6tdgzOmUeSTI036rLke91OnfrTPy5KkHqA3xHUkZMsqQ4SEqUJMi54u79USkGfUqssJtmnsVkrAy1bXLY9CE76rzURct7EYX44f8JtfUg_3-s41V9wqfIzrqkNRaRYXpx4quibrWs7spwHTNUFj3b5Jdh7ie8HvCkZX-NjJR6kVPI9Q&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Deshi Kitchen Indian Cuisine', 'Sterling Heights', 'deshi-kitchen-indian-cuisine-sterling-heights', 'Bangladeshi, Pan-Indian', 'Both', '$$', 'Bangladeshi/Indian, buffet', 'Bangladeshi/Indian, buffet', '{"Bangladeshi","Pan-Indian"}', '{}', '43095 Hayes Rd, Sterling Heights, MI 48313, USA', '(586) 566-1006', 'https://www.clover.com/online-ordering/deshi-kitchen-sterling-heights', 4.5, 442, 'Monday: 11:00 AM – 9:30 PM | Tuesday: 11:00 AM – 9:30 PM | Wednesday: 11:00 AM – 9:30 PM | Thursday: 11:00 AM – 9:30 PM | Friday: 11:00 AM – 9:30 PM | Saturday: 11:00 AM – 9:30 PM | Sunday: 11:00 AM – 9:30 PM', 'ChIJwZ4NScDfJIgR_tiKePVAxw0', 42.6136567, -82.97332229999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFhofjxK0btlr3hTTidUUmtRXoOCC0Ymcqw7wn2SC-XdsytO0GvY7YfWd6UNdfdBviw2qWRBNDN3N9Y2pB580qltSvx1zQHzU_cHyHcA96OepTDEgOpwrn86da2IOS1V4eTlBpOkaKXBHh3V6x6dz-e0nIGor7VMYdKkGDndY7P-OXKJT8USJvannlI2dM7-qoxXGruXGFv1TCqOAyD67cwxLx3VcX06rYcsUQuksItIZ5TaiPXUTRfgzQjOxlhJLuaNgQA55SdaU7TcRkbmZfQAjxyge3LijAll-vgYEFTmpjiwUIfiIs4zOpwU5xbsdW3nUuoUFELpjcS0F1Vu5Zk0CWOYxiPSw2I3VSNkoUY2O6YF968gCm29yN1fFPl7Qcy7MFIDnk79HcfsgvP_JLXU8GmFcxYlhpkiz4Ub0oL7Ls&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGX22Vm9jXAr1q843M_uUxZXFEww9RvWsn2c1YnoCONKiKgfDncAKSNpmf_WZkYJzfe2v9bSK1EWWRF6a_KKlaZyfljPzk19-Pxqd9JkGfch--tQakTomyp-5OPJHMcmdFhvTspPYHqdK6uY_CWJknsT90blf3RpxElL1iU43ZmsVqk_8CHEQUR41qGk5tJteVqOo3kAI72-PDpNCnAmU6ITqtaY23rpwQfLK2blI_nUh-3WMKmXfJ8HxFS5FPHbhKKCjUU4uXcsZcd_ol8KP8akf4m1__rD4MjUA8LPXXfgw&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEG5NzZ55oP0XTiAUWIC3nMut9fCgkfpfyMMGKwd31PNOo_CF7qMsUlSNdopvTomnj0qxYA4T66nGhA2DNkt199_wEKul2HJ9DhqDp93SCpGACB44BVcWpQKxc8IAIQlK4jXuqM-JYsU8HnIiRiWaIwZ14EZDdPqE4DvBjnAid_xa4Us6PU5DzWyZIkJfR1LxAbiDkwTXaYkXcaMUYNVlcfcKB4JzegYrwNVLrUMeoik3PvciuCuul8Cf0rcXPo7l-Ub09TZuOfqKv18NufIzabdgLldUByxmY_Gow3bRL42GNNwFTk6fSwV7sDtseUGEuuQHLksFJ7qZgB7R1k7dhKdWnB7z1r25HCJaV-AfO8RjGGQkKZBb3QNg2kk32KSgBPg0VpACXKR5o80G8b5eM1EvKO_wOpoXcExyLDRO4dv9rAu&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('Kashmiri Kitchen', 'Sterling Heights', 'kashmiri-kitchen-sterling-heights', 'North Indian, Kashmiri, Indo-Chinese', 'Both', '$$', 'Lamb rogan josh, butter chicken, biryani', 'Lamb rogan josh, butter chicken, biryani', '{"North Indian","Kashmiri","Indo-Chinese"}', '{}', '44631 Mound Rd, Sterling Heights, MI 48314, USA', '(586) 726-8811', 'https://www.kashmirikitchenmichigan.com/', 4.4, 676, 'Monday: 12:00 – 10:00 PM | Tuesday: 12:00 – 10:00 PM | Wednesday: 12:00 – 10:00 PM | Thursday: 12:00 – 10:00 PM | Friday: 12:00 – 10:00 PM | Saturday: 12:00 – 10:00 PM | Sunday: 12:00 – 10:00 PM', 'ChIJoZoOqTDdJIgR5nXC_D50Pyw', 42.6216014, -83.05626029999999, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEHUn_qU4gZ77HLIoRj2ZPC3iRHC-1Snz0_Im4cIw9tXOi0ppKfYJPzWswSGdikZM_VfPse6y5QpIEO6SP82QWCwPo8dpwior6YeWDIHWT_e4pwkTCeyZGJ6OQp3XNIAug8RsyRnVgyyWNQlHe_MwcRPhwEzvSvEhqtyhITjpJ6CebZQCQrwqXLcck-O3CSdyj0NrHLuKWWgSCa2zq5Gnw35HxWw96zZII16T7XV05soYd5yoQiGnN_NoHgEcjZNciAxWGxXkWsWLfTjcbKOr3Yxa8qOh7lb01AFyDq8A4HBuQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEE-DHlTv6dai-SFzfYmB1rEJq5Im_hc4SC2E5mz-ts_QbpiVM3FDqbpxshG6EeJORypCjBI0aqApxZ2q2Ic7XIP2KrcEnve4InVfKMg4ga4fVe5lwDr0-X-Jdalwpa-qKko1U74ANTn1W-ND2V6uflm4rX9rdtkKx8KE4mGVN0aCuGzEwS70j94FLgg9J6CWMfWLiOblAhKoYcVg29MkoVpjkMwodVMaLD5MFVkzUOEFtuqlOKO5MWIKhuiDK7KJo5Qkd42OvicPQfbC_ltgr7_Jai7knU0R6Bmzu0_WgZaYA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEEfUYNroSn0DToCOnLb5TIMMMwloqCdbvJVJAbsDP7SvGsWQC0-NsIb0cdKbSN_eVpS25fGedgi5j8oRuN_yOnVkp1nxFgACVTMbzk03sgEO4zqhruF9wLv7UFcoJePyeoDDiEpGPHb7Iluy3jRIhWZcBKSk4T7TARvBfkJtsYUTqdIJKIw9YVKoHGg6moiaEHAD-A84HHrh3WPnUDbLY_btxIUcTZJ0KzFw7IbNZNbSq5mQuGybKwOYEFFdhf5PWnbDMJ2lJXG03i6SMByA8hLf0UwcdwcFdWzXq-fJE09Lg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
VALUES ('New Delhi Indian Restaurant', 'Sterling Heights', 'new-delhi-indian-restaurant-sterling-heights', 'North Indian', 'Both', '$$', 'North Indian, halal available', 'North Indian, halal available', '{"North Indian"}', '{}', '37206 Dequindre Rd, Sterling Heights, MI 48310, USA', '(586) 264-3333', 'http://www.newdelhiindiancuisine.com/', 4, 271, 'Monday: Closed | Tuesday: 11:00 AM – 9:00 PM | Wednesday: 11:00 AM – 9:00 PM | Thursday: 11:00 AM – 9:00 PM | Friday: 11:00 AM – 9:00 PM | Saturday: 12:00 – 9:00 PM | Sunday: 1:00 – 8:00 PM', 'ChIJ7VfPlbDEJIgRt_IELgOMjdk', 42.56556, -83.0877201, 'detroit', '{"https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEFeKgAwAFjL3BOYvRJnETRoBotSz00wS6-UdreGWxitxBMdbFbNOGKHvbFP0uAVdxaKrGtCRBvijNqnooctlG0mraYzxRc07jh0xNDs6u0Qer68VZJ7NE0sj2CLON1b2b4kuqwQk6qAB2cCs8NroFeXk3qDQh59grrKRKNeJy_McC8y3aGUtKZ6RBlvgOmhSZWiTGi8VohWSHhDQryQ8guqlDHdLXMwF5bj10cx_QMLeuB_noONc9d5TZVRWZn1IZkaOtr2PB11yM-VnVt5RmRcDN9ILDxhN9DVqsLvt0hEgQ&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGZ_l3_TX93eOxw7bVtQ_44GBL-gV7ZyL1FxNHpdK9n9OFf0k5N0sKvs1Jrs18-urmtnZqNUAbbk4ek8xrzac6JjMecNY90CNW5Kr5yPAZFU5UDVDd4jbWSLCAABhglGyURn6waDGeWCACPr4G3c3GX5EYD3Rl2xtFuV8zD_sQEIKD-nXMxphREjyu9hCh1_kZKEE9AD7Xl8NiYQbLkS_6NBXEAK_dXK5WCSIW31EPzIsMBKfxHT6Mp4KT63AvXTl1jpKmI3nSUADMha71jDK4VD_tzOCj6PfqTG6jzNRBeRA&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c","https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=AU_ZVEGCkBFTjZ9udlqx0A_EA1mP5Y5MeVwao5w6BJhByGfpy5Pbr4GCrqq4j46feZ6iUrXscAHwT5L6q4FZldz03i7IbwUSB2gAaWBoSLN8Ero5kRqPaD7Wv-9-Ozkt4-VH1yAeXi4aWynALjR81nRgbsDJEN9B3SCq85AG9MtNXSm2wwcKprhn4_MuIaR163DBEChr33FvJBmLrHe1GVeZm5Ld1L7mh07tzkHobxJaX6d-frFISTisymG3zvvgcKcaX_VCD-0IEpK6uJH8fSCbgWg0hudKw8IzG8DjMNHBUvPQvg&key=AIzaSyBy1BCqf6qOiZCeyr9YNVkIEZ13jwBJl2c"}', false)
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
