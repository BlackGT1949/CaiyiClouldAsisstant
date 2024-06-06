const fetch = require("node-fetch");
// const data = fetch("https://6566d890783b53000119b89d.caiyicloud.com/cyy_buyerapi/buyer/cyy/v1/reservation_orders?channelId=&terminalSrc=WEB", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "zh-CN,zh;q=0.9",
//     "access-token": "eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkM1qwzAQhN9lzz5IqPrzMSGlhZZCSA45FdlaY4MtBVkuTULePXKUlJ6S4w7z7ezsCbyZYvvuGg-lm_q-gGnEkOcTVN1x6S1CCa9vH9-fUMA4VYs_UXAhrNJEKlZxRgihVFdK2-RL5Nr3s2mx3a3WSRlivZ1X2ysoWdMYjYSjJTMolHzhmMEnNkHgXAD-7ruAm27A--GJ_NpjMNE_DGlSSB3QxBtMJdFaMK0EZzoVPIwRh1ww7x0w1K1x8f-TUvqNlJQqUcAPhrHzDkqWP-jM_bDzBQAA__8.Nv3hLr1MmItYDMl6yfKVxkpYZrpwQOCS-gevVJalshEZ9otCxq8lVej_AnvcrJ8yFFumaax7OhIWhppUkHvTLqsqvPAEZQI8GISC2kRZ7_SC32DHhSGDNCMD7EqWsJHlJY6ktqntasvPtbZefcSfCKy5dveHbg7EsTAH153iK8U",
//     "cache-control": "no-cache",
//     "channel-id": "",
//     "content-type": "application/json;charset=UTF-8",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "terminal-src": "WEB",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "Hm_lvt_e2e961d5194c236ca2269b84361558fc=1700123989,1701517000,1701592458; ssxmod_itna=GqGx2QGQitG=oGKGHiwnDUgnYG8bCrDuCr8D0vrveGzDAxn40iDtoxqaYpimnrQDuEsInYnDhK5=z8hhPvYeZ+eDHxY=DUo3hmxbDee=D5xGoDPxDeDADYEjDAqiOD7qDdEsNv/8DbxYplDiULD7tV4eDjmd62eeG0DDtHU4G23Q=DYS3xpLbBeoTqQY=DjLiD/fqWoY6YT1a40dui5PKrYDDHnPoqRPEKFBXTKqGy3KGuAw2yfQH9nLUV9x+T+i44UAhdG4mPGA4rSYvdb7GPSiec2pSQSoxK0Gfj6GDDGRGUAHD===; ssxmod_itna2=GqGx2QGQitG=oGKGHiwnDUgnYG8bCrDuCo4nIE7wYDsP1DLjjDL9bDqnb4CvKdUCiGhxAUhKb7Qvxr0Rjniwv=+Kq8iqYdKeqcAKzFQCtXigpkfWTDKwDdDLxiQ44D==; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%226573ffa9e05ed00001687460%22%2C%22%24device_id%22%3A%2218bd7492ec43f2-07817fd032569d-57b1a33-1821369-18bd7492ec5401%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22platform%22%3A%22H5%22%2C%22merchantDomain%22%3A%226566d890783b53000119b89d.caiyicloud.com%22%2C%22product%22%3A%22CYY%22%2C%22merchantId%22%3A%226566d890783b53000119b89d%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThiZDc0OTljZjE0My0wM2JiNzg0ZjM5MTk3ZWEtNTdiMWEzMy0xODIxMzY5LTE4YmQ3NDk5Y2YyNTJiIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiNjU2YWM2MzA1ODU1ZTUwMDAxNzdkNDQ5In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22656ac6305855e5000177d449%22%7D%2C%22first_id%22%3A%2218bd7492ec43f2-07817fd032569d-57b1a33-1821369-18bd7492ec5401%22%7D; user_cellphone=166****7513; acw_tc=76b20ff317099639127984476e74515e6399dc4aad7873fc419702a067b6dc; shopPriceColor=FB5200; shopNavTextColor=FB5200; shopColor=FB5200; userTheme=LIGHT_MODE; currentThemeType=LIGHT_MODE; refresh_token=eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkE9LAzEQxb_LnPeQkObfHiuKgqVQ7MGTZDezdGGTlCQraul3N9to6UmPM7z3ezPvBMHM-fDkhwCtn6epgTlhrPMJuvHrLliEFh4en9820ECau_V1KbgQVmkiFes4I4RQqjulbdEV5y5Mi2i9f73flY3L_X5B24tRsmEwGglHSxajUHLFsRr_kQkC5wbw4zhGfBldyaCScrqSWgnO9AWxPWI0OfyZNpS0PqLJVwrRWrBfSvpMGV39tDbjMPYH4_NtW-WM2_wG3jGmMXhoWa3SG_cDOH8DAAD__w.V02BCBwSh-ekMn9HKOIL8jstBwcY4CTC9JNV7ATeHWcdLvJ_yINAHRlbPAuW_3bQAJbKsBN1c4aJvoJpzKmvMlSonz7aWbBBp7Bp4_IkKDx0XGSXfTmFxEnv-6B4eqpFjh4XpllAZ2tRB56BuXAK4YLE7rN8cMFfStkm9o4hRQo; consistent_code=eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkM1qwzAQhN9lzz5IqPrzMSGlhZZCSA45FdlaY4MtBVkuTULePXKUlJ6S4w7z7ezsCbyZYvvuGg-lm_q-gGnEkOcTVN1x6S1CCa9vH9-fUMA4VYs_UXAhrNJEKlZxRgihVFdK2-RL5Nr3s2mx3a3WSRlivZ1X2ysoWdMYjYSjJTMolHzhmMEnNkHgXAD-7ruAm27A--GJ_NpjMNE_DGlSSB3QxBtMJdFaMK0EZzoVPIwRh1ww7x0w1K1x8f-TUvqNlJQqUcAPhrHzDkqWP-jM_bDzBQAA__8.Nv3hLr1MmItYDMl6yfKVxkpYZrpwQOCS-gevVJalshEZ9otCxq8lVej_AnvcrJ8yFFumaax7OhIWhppUkHvTLqsqvPAEZQI8GISC2kRZ7_SC32DHhSGDNCMD7EqWsJHlJY6ktqntasvPtbZefcSfCKy5dveHbg7EsTAH153iK8U; Hm_lvt_e2e961d5194c236ca2269b84361558fc=; Hm_lpvt_e2e961d5194c236ca2269b84361558fc=1709964010",
//     "Referer": "https://6566d890783b53000119b89d.caiyicloud.com/reserve/reserve-detail/personinfo",
//     "Referrer-Policy": "no-referrer-when-downgrade"
//   },
//   "body": "{\"reservationConfigId\":\"65e9a34d3a1b0000019f6605\",\"reservationDate\":1709913600000,\"startTime\":\"19:30\",\"endTime\":\"21:30\",\"showOrderId\":\"\",\"showSessionId\":\"\",\"reservationAudienceParams\":[{\"audienceCellphone\":null,\"audienceIdentityNumber\":\"500102200012117998\",\"audienceIdentityType\":\"ID_CARD\",\"audienceName\":\"王强\",\"seatInfo\":\"\",\"showOrderTicketItemId\":\"\"}],\"src\":\"WEB\"}",
//   "method": "POST"
// });


// const data = fetch("https://6566d890783b53000119b89d.caiyicloud.com/cyy_buyerapi/buyer/cyy/v1/reservation_orders?channelId=&terminalSrc=WEB", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "zh-CN,zh;q=0.9",
//     "access-token": "eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkM1qwzAQhN9lzz5IqPrzMSGlhZZCSA45FdlaY4MtBVkuTULePXKUlJ6S4w7z7ezsCbyZYvvuGg-lm_q-gGnEkOcTVN1x6S1CCa9vH9-fUMA4VYs_UXAhrNJEKlZxRgihVFdK2-RL5Nr3s2mx3a3WSRlivZ1X2ysoWdMYjYSjJTMolHzhmMEnNkHgXAD-7ruAm27A--GJ_NpjMNE_DGlSSB3QxBtMJdFaMK0EZzoVPIwRh1ww7x0w1K1x8f-TUvqNlJQqUcAPhrHzDkqWP-jM_bDzBQAA__8.Nv3hLr1MmItYDMl6yfKVxkpYZrpwQOCS-gevVJalshEZ9otCxq8lVej_AnvcrJ8yFFumaax7OhIWhppUkHvTLqsqvPAEZQI8GISC2kRZ7_SC32DHhSGDNCMD7EqWsJHlJY6ktqntasvPtbZefcSfCKy5dveHbg7EsTAH153iK8U",
//     "cache-control": "no-cache",
//     "channel-id": "",
//     "content-type": "application/json;charset=UTF-8",
//     "pragma": "no-cache",
//     "sec-ch-ua": "\"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "terminal-src": "WEB",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "Hm_lvt_e2e961d5194c236ca2269b84361558fc=1700123989,1701517000,1701592458; ssxmod_itna=GqGx2QGQitG=oGKGHiwnDUgnYG8bCrDuCr8D0vrveGzDAxn40iDtoxqaYpimnrQDuEsInYnDhK5=z8hhPvYeZ+eDHxY=DUo3hmxbDee=D5xGoDPxDeDADYEjDAqiOD7qDdEsNv/8DbxYplDiULD7tV4eDjmd62eeG0DDtHU4G23Q=DYS3xpLbBeoTqQY=DjLiD/fqWoY6YT1a40dui5PKrYDDHnPoqRPEKFBXTKqGy3KGuAw2yfQH9nLUV9x+T+i44UAhdG4mPGA4rSYvdb7GPSiec2pSQSoxK0Gfj6GDDGRGUAHD===; ssxmod_itna2=GqGx2QGQitG=oGKGHiwnDUgnYG8bCrDuCo4nIE7wYDsP1DLjjDL9bDqnb4CvKdUCiGhxAUhKb7Qvxr0Rjniwv=+Kq8iqYdKeqcAKzFQCtXigpkfWTDKwDdDLxiQ44D==; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%226573ffa9e05ed00001687460%22%2C%22%24device_id%22%3A%2218bd7492ec43f2-07817fd032569d-57b1a33-1821369-18bd7492ec5401%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22platform%22%3A%22H5%22%2C%22merchantDomain%22%3A%226566d890783b53000119b89d.caiyicloud.com%22%2C%22product%22%3A%22CYY%22%2C%22merchantId%22%3A%226566d890783b53000119b89d%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThiZDc0OTljZjE0My0wM2JiNzg0ZjM5MTk3ZWEtNTdiMWEzMy0xODIxMzY5LTE4YmQ3NDk5Y2YyNTJiIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiNjU2YWM2MzA1ODU1ZTUwMDAxNzdkNDQ5In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22656ac6305855e5000177d449%22%7D%2C%22first_id%22%3A%2218bd7492ec43f2-07817fd032569d-57b1a33-1821369-18bd7492ec5401%22%7D; user_cellphone=166****7513; acw_tc=76b20ff317099639127984476e74515e6399dc4aad7873fc419702a067b6dc; shopPriceColor=FB5200; shopNavTextColor=FB5200; shopColor=FB5200; userTheme=LIGHT_MODE; currentThemeType=LIGHT_MODE; refresh_token=eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkE9LAzEQxb_LnPeQkObfHiuKgqVQ7MGTZDezdGGTlCQraul3N9to6UmPM7z3ezPvBMHM-fDkhwCtn6epgTlhrPMJuvHrLliEFh4en9820ECau_V1KbgQVmkiFes4I4RQqjulbdEV5y5Mi2i9f73flY3L_X5B24tRsmEwGglHSxajUHLFsRr_kQkC5wbw4zhGfBldyaCScrqSWgnO9AWxPWI0OfyZNpS0PqLJVwrRWrBfSvpMGV39tDbjMPYH4_NtW-WM2_wG3jGmMXhoWa3SG_cDOH8DAAD__w.V02BCBwSh-ekMn9HKOIL8jstBwcY4CTC9JNV7ATeHWcdLvJ_yINAHRlbPAuW_3bQAJbKsBN1c4aJvoJpzKmvMlSonz7aWbBBp7Bp4_IkKDx0XGSXfTmFxEnv-6B4eqpFjh4XpllAZ2tRB56BuXAK4YLE7rN8cMFfStkm9o4hRQo; consistent_code=eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkM1qwzAQhN9lzz5IqPrzMSGlhZZCSA45FdlaY4MtBVkuTULePXKUlJ6S4w7z7ezsCbyZYvvuGg-lm_q-gGnEkOcTVN1x6S1CCa9vH9-fUMA4VYs_UXAhrNJEKlZxRgihVFdK2-RL5Nr3s2mx3a3WSRlivZ1X2ysoWdMYjYSjJTMolHzhmMEnNkHgXAD-7ruAm27A--GJ_NpjMNE_DGlSSB3QxBtMJdFaMK0EZzoVPIwRh1ww7x0w1K1x8f-TUvqNlJQqUcAPhrHzDkqWP-jM_bDzBQAA__8.Nv3hLr1MmItYDMl6yfKVxkpYZrpwQOCS-gevVJalshEZ9otCxq8lVej_AnvcrJ8yFFumaax7OhIWhppUkHvTLqsqvPAEZQI8GISC2kRZ7_SC32DHhSGDNCMD7EqWsJHlJY6ktqntasvPtbZefcSfCKy5dveHbg7EsTAH153iK8U; Hm_lvt_e2e961d5194c236ca2269b84361558fc=; Hm_lpvt_e2e961d5194c236ca2269b84361558fc=1709964010",
//     "Referer": "https://6566d890783b53000119b89d.caiyicloud.com/reserve/reserve-detail/personinfo",
//     "Referrer-Policy": "no-referrer-when-downgrade"
//   },
//   "body": "{\"reservationConfigId\":\"65e9a34d3a1b0000019f6605\",\"reservationDate\":1709913600000,\"startTime\":\"19:30\",\"endTime\":\"21:30\",\"showOrderId\":\"\",\"showSessionId\":\"\",\"reservationAudienceParams\":[{\"audienceCellphone\":null,\"audienceIdentityNumber\":\"500102200012117998\",\"audienceIdentityType\":\"ID_CARD\",\"audienceName\":\"王强\",\"seatInfo\":\"\",\"showOrderTicketItemId\":\"\"}],\"src\":\"WEB\"}",
//   "method": "POST"
// }); 


// 两人的情况
// fetch("https://6566d890783b53000119b89d.caiyicloud.com/cyy_gatewayapi/user/buyer/v3/identities/batch_auth?channelId=&terminalSrc=WEB", {
//   "headers": {
//     "accept": "application/json, text/plain, */*",
//     "accept-language": "zh-CN,zh;q=0.9",
//     "access-token": "eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkM1qwzAQhN9lzz5IqPrzMSGlhZZCSA45FdlaY4MtBVkuTULePXKUlJ6S4w7z7ezsCbyZYvvuGg-lm_q-gGnEkOcTVN1x6S1CCa9vH9-fUMA4VYs_UXAhrNJEKlZxRgihVFdK2-RL5Nr3s2mx3a3WSRlivZ1X2ysoWdMYjYSjJTMolHzhmMEnNkHgXAD-7ruAm27A--GJ_NpjMNE_DGlSSB3QxBtMJdFaMK0EZzoVPIwRh1ww7x0w1K1x8f-TUvqNlJQqUcAPhrHzDkqWP-jM_bDzBQAA__8.Nv3hLr1MmItYDMl6yfKVxkpYZrpwQOCS-gevVJalshEZ9otCxq8lVej_AnvcrJ8yFFumaax7OhIWhppUkHvTLqsqvPAEZQI8GISC2kRZ7_SC32DHhSGDNCMD7EqWsJHlJY6ktqntasvPtbZefcSfCKy5dveHbg7EsTAH153iK8U",
//     "cache-control": "no-cache",
//     "channel-id": "",
//     "content-type": "application/json;charset=UTF-8",
//     "pragma": "no-cache",
//     "putparamstoobject": "true",
//     "sec-ch-ua": "\"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"Windows\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "terminal-src": "WEB",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "Hm_lvt_e2e961d5194c236ca2269b84361558fc=1700123989,1701517000,1701592458; ssxmod_itna=GqGx2QGQitG=oGKGHiwnDUgnYG8bCrDuCr8D0vrveGzDAxn40iDtoxqaYpimnrQDuEsInYnDhK5=z8hhPvYeZ+eDHxY=DUo3hmxbDee=D5xGoDPxDeDADYEjDAqiOD7qDdEsNv/8DbxYplDiULD7tV4eDjmd62eeG0DDtHU4G23Q=DYS3xpLbBeoTqQY=DjLiD/fqWoY6YT1a40dui5PKrYDDHnPoqRPEKFBXTKqGy3KGuAw2yfQH9nLUV9x+T+i44UAhdG4mPGA4rSYvdb7GPSiec2pSQSoxK0Gfj6GDDGRGUAHD===; ssxmod_itna2=GqGx2QGQitG=oGKGHiwnDUgnYG8bCrDuCo4nIE7wYDsP1DLjjDL9bDqnb4CvKdUCiGhxAUhKb7Qvxr0Rjniwv=+Kq8iqYdKeqcAKzFQCtXigpkfWTDKwDdDLxiQ44D==; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%226573ffa9e05ed00001687460%22%2C%22%24device_id%22%3A%2218bd7492ec43f2-07817fd032569d-57b1a33-1821369-18bd7492ec5401%22%2C%22props%22%3A%7B%22%24latest_referrer%22%3A%22%22%2C%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22platform%22%3A%22H5%22%2C%22merchantDomain%22%3A%226566d890783b53000119b89d.caiyicloud.com%22%2C%22product%22%3A%22CYY%22%2C%22merchantId%22%3A%226566d890783b53000119b89d%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThiZDc0OTljZjE0My0wM2JiNzg0ZjM5MTk3ZWEtNTdiMWEzMy0xODIxMzY5LTE4YmQ3NDk5Y2YyNTJiIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiNjU2YWM2MzA1ODU1ZTUwMDAxNzdkNDQ5In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%22656ac6305855e5000177d449%22%7D%2C%22first_id%22%3A%2218bd7492ec43f2-07817fd032569d-57b1a33-1821369-18bd7492ec5401%22%7D; user_cellphone=166****7513; shopPriceColor=FB5200; shopNavTextColor=FB5200; shopColor=FB5200; userTheme=LIGHT_MODE; currentThemeType=LIGHT_MODE; refresh_token=eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkE9LAzEQxb_LnPeQkObfHiuKgqVQ7MGTZDezdGGTlCQraul3N9to6UmPM7z3ezPvBMHM-fDkhwCtn6epgTlhrPMJuvHrLliEFh4en9820ECau_V1KbgQVmkiFes4I4RQqjulbdEV5y5Mi2i9f73flY3L_X5B24tRsmEwGglHSxajUHLFsRr_kQkC5wbw4zhGfBldyaCScrqSWgnO9AWxPWI0OfyZNpS0PqLJVwrRWrBfSvpMGV39tDbjMPYH4_NtW-WM2_wG3jGmMXhoWa3SG_cDOH8DAAD__w.V02BCBwSh-ekMn9HKOIL8jstBwcY4CTC9JNV7ATeHWcdLvJ_yINAHRlbPAuW_3bQAJbKsBN1c4aJvoJpzKmvMlSonz7aWbBBp7Bp4_IkKDx0XGSXfTmFxEnv-6B4eqpFjh4XpllAZ2tRB56BuXAK4YLE7rN8cMFfStkm9o4hRQo; consistent_code=eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkM1qwzAQhN9lzz5IqPrzMSGlhZZCSA45FdlaY4MtBVkuTULePXKUlJ6S4w7z7ezsCbyZYvvuGg-lm_q-gGnEkOcTVN1x6S1CCa9vH9-fUMA4VYs_UXAhrNJEKlZxRgihVFdK2-RL5Nr3s2mx3a3WSRlivZ1X2ysoWdMYjYSjJTMolHzhmMEnNkHgXAD-7ruAm27A--GJ_NpjMNE_DGlSSB3QxBtMJdFaMK0EZzoVPIwRh1ww7x0w1K1x8f-TUvqNlJQqUcAPhrHzDkqWP-jM_bDzBQAA__8.Nv3hLr1MmItYDMl6yfKVxkpYZrpwQOCS-gevVJalshEZ9otCxq8lVej_AnvcrJ8yFFumaax7OhIWhppUkHvTLqsqvPAEZQI8GISC2kRZ7_SC32DHhSGDNCMD7EqWsJHlJY6ktqntasvPtbZefcSfCKy5dveHbg7EsTAH153iK8U; Hm_lvt_e2e961d5194c236ca2269b84361558fc=; Hm_lpvt_e2e961d5194c236ca2269b84361558fc=1709965914",
//     "Referer": "https://6566d890783b53000119b89d.caiyicloud.com/reserve/reserve-detail/personinfo",
//     "Referrer-Policy": "no-referrer-when-downgrade"
//   },
//   "body": "{\"identityAuthRequests\":[{\"idType\":\"ID_CARD\",\"idTypeName\":\"身份证\",\"idNo\":\"500102200012117998\",\"name\":\"王强\"},{\"idType\":\"ID_CARD\",\"idTypeName\":\"身份证\",\"idNo\":\"50023020010408045X\",\"name\":\"何家玮\"}],\"src\":\"WEB\"}",
//   "method": "PUT"
// });



const data = fetch("https://6566d890783b53000119b89d.caiyicloud.com/cyy_buyerapi/buyer/cyy/v1/reservation_configs/65e9a34d3a1b0000019f6605/instance?src=WEB&channelId=&terminalSrc=WEB&id=65e9a34d3a1b0000019f6605", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "access-token": "eyJ0eXAiOiJKV1QiLCJjdHkiOiJKV1QiLCJ6aXAiOiJERUYiLCJhbGciOiJSUzUxMiJ9.eNqEkM1qwzAQhN9lzz5IqPrzMSGlhZZCSA45FdlaY4MtBVkuTULePXKUlJ6S4w7z7ezsCbyZYvvuGg-lm_q-gGnEkOcTVN1x6S1CCa9vH9-fUMA4VYs_UXAhrNJEKlZxRgihVFdK2-RL5Nr3s2mx3a3WSRlivZ1X2ysoWdMYjYSjJTMolHzhmMEnNkHgXAD-7ruAm27A--GJ_NpjMNE_DGlSSB3QxBtMJdFaMK0EZzoVPIwRh1ww7x0w1K1x8f-TUvqNlJQqUcAPhrHzDkqWP-jM_bDzBQAA__8.Nv3hLr1MmItYDMl6yfKVxkpYZrpwQOCS-gevVJalshEZ9otCxq8lVej_AnvcrJ8yFFumaax7OhIWhppUkHvTLqsqvPAEZQI8GISC2kRZ7_SC32DHhSGDNCMD7EqWsJHlJY6ktqntasvPtbZefcSfCKy5dveHbg7EsTAH153iK8U",
    "cache-control": "no-cache",
    "channel-id": "",
    "content-type": "application/json;charset=UTF-8",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "terminal-src": "WEB",
    "x-requested-with": "XMLHttpRequest",
    "Referer": "https://6566d890783b53000119b89d.caiyicloud.com/reserve/reserve-detail/65e9a34d3a1b0000019f6605",
    "Referrer-Policy": "no-referrer-when-downgrade"
  },
  "body": null,
  "method": "GET"
});

// 响应：
// {
//   "statusCode": 200,
//   "comments": "成功",
//   "mode": 0,
//   "result": {},
//   "data": {
//       "id": "65e9a34d3a1b0000019f6605",
//       "reservationType": "VENUE_RESERVATION",
//       "venueId": "5ef83b79c756b15857d6b2d8",
//       "venueName": "不晚IN TIME LIVEHOUSE（汉阳造店）",
//       "isOpenRealname": true,
//       "isLimitReserveNumber": true,
//       "limitReserveNumber": 2,
//       "isDisplayAvailableNumber": false,
//       "reservationDates": [
//           {
//               "reservationDate": 1709913600000,
//               "availableNumber": 0,
//               "configItems": [
//                   {
//                       "id": "65e9a48b75b5480001a38167",
//                       "limitDimension": "RESERVATION_LIMIT_BY_DATE",
//                       "isEnabled": true,
//                       "isOnsale": true,
//                       "availableNumber": 0,
//                       "configTimeItems": [
//                           {
//                               "startTime": "19:30",
//                               "endTime": "21:30",
//                               "availableNumber": 0,
//                               "isEnabled": true,
//                               "isOverdue": false
//                           }
//                       ]
//                   }
//               ]
//           }
//       ]
//   }
// }



// 抢票成功状态码必须是200
// 可通过以上的请求获取配置
data.then(r => r.json()).then(data => {
  console.log(data)
  const d = data.data.reservationDates[0].configItems[0];
  console.log(d);
  console.log("=============================================")
  console.log(d.configTimeItems[0].startTime, d.configTimeItems[0].endTime)
});