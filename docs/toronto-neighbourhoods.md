# Toronto — Neighbourhood Scraping Map

Each point = center of an 800m radius scrape. Organized by area.
Target: ~100–150 leads per neighbourhood. Skip points with low restaurant density.

---

## 1. Downtown Core
Dense urban. Highest restaurant concentration in the city.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Financial District | 43.6481 | -79.3773 | Lunch spots, business dining |
| Entertainment District | 43.6454 | -79.3928 | Bars, clubs, pre-show dining |
| King West / Fashion District | 43.6448 | -79.4011 | Trendy, upscale |
| Queen West | 43.6486 | -79.4017 | Indie cafes, brunch spots |
| Chinatown | 43.6527 | -79.3975 | Dense, diverse, cheap eats |
| Kensington Market | 43.6541 | -79.4006 | Eclectic, indie, no-chain zone |
| Harbourfront | 43.6386 | -79.3808 | Tourist-facing, waterfront |

---

## 2. West End
Strong restaurant strip culture. High density along Dundas, Queen, College.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Little Italy (College St) | 43.6549 | -79.4194 | Italian, patios, date spots |
| Dufferin Grove | 43.6534 | -79.4320 | Neighbourhood cafes |
| Little Portugal (Dundas W) | 43.6488 | -79.4380 | Portuguese, Latino, emerging |
| Bloordale | 43.6601 | -79.4372 | Up-and-coming, indie spots |
| Ossington | 43.6500 | -79.4267 | Best bar/restaurant strip in city |
| Parkdale | 43.6419 | -79.4477 | Gritty, diverse, Vietnamese |
| Roncesvalles | 43.6486 | -79.4534 | Polish, family restaurants |
| Bloor West Village | 43.6523 | -79.4742 | Suburban strip, good density |
| The Junction | 43.6641 | -79.4742 | Craft beer, artisan, growing |

---

## 3. East End
More residential but strong pockets. Danforth is the spine.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Riverside / Dundas East | 43.6572 | -79.3478 | Emerging, indie cafes |
| Leslieville | 43.6611 | -79.3375 | Brunch mecca, young families |
| Little India (Gerrard St) | 43.6669 | -79.3322 | Indian restaurants, dense strip |
| Riverdale | 43.6703 | -79.3533 | Neighbourhood spots |
| Greektown (Danforth Ave) | 43.6766 | -79.3436 | Greek restaurants, busy strip |
| Woodbine / Upper Beaches | 43.6773 | -79.3163 | Neighbourhood cafes |
| The Beaches | 43.6703 | -79.2955 | Brunch, ice cream, casual |

---

## 4. Midtown
Mix of upscale and neighbourhood. Good independent restaurant density.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Cabbagetown | 43.6631 | -79.3651 | Victorian neighbourhood, bistros |
| Church-Wellesley | 43.6646 | -79.3793 | Village dining, diverse |
| Rosedale | 43.6834 | -79.3798 | Upscale, low density |
| Yorkville | 43.6707 | -79.3939 | High-end dining, boutique |
| The Annex | 43.6699 | -79.4023 | Student area, cafes, casual |
| Summerhill | 43.6851 | -79.3884 | Wine bars, neighbourhood spots |
| Davisville | 43.6987 | -79.3908 | Yonge strip, neighbourhood |
| Yonge & Eglinton | 43.7065 | -79.3986 | Dense midtown hub |
| Forest Hill | 43.6952 | -79.4142 | Wealthy, low density |

---

## 5. North York
Suburban but huge Korean, Japanese, Chinese restaurant clusters.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Yonge & Sheppard | 43.7612 | -79.4103 | Dense condo strip |
| Willowdale | 43.7706 | -79.4007 | Korean BBQ, Japanese |
| North York Centre | 43.7682 | -79.4138 | Busy commercial strip |
| Bayview Village | 43.7638 | -79.3784 | Upscale suburban |
| Lawrence Park | 43.7227 | -79.3969 | Quiet, neighbourhood |

---

## 6. Etobicoke
Suburban west. Lower density but some strong pockets.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Humber Bay | 43.6234 | -79.4842 | Waterfront, condos |
| Mimico | 43.6108 | -79.4977 | Suburban strip |
| Islington Village | 43.6469 | -79.5238 | Suburban hub |
| Etobicoke Centre | 43.6649 | -79.5261 | Commercial strip |
| Long Branch | 43.5964 | -79.5430 | Low density, skip unless needed |

---

## 7. Scarborough
Massive and diverse. Best ethnic food concentration in Toronto — Vietnamese, Tamil, Chinese, South Asian.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Birch Cliff | 43.6929 | -79.2581 | East end residential |
| Wexford / Lawrence E | 43.7494 | -79.2881 | Commercial strip |
| Kennedy Road | 43.7560 | -79.2757 | South Asian dense |
| Scarborough Town Centre | 43.7764 | -79.2568 | Mall area, chains mostly |
| Agincourt | 43.7894 | -79.2681 | Chinese, dense strip |
| Highland Creek | 43.7845 | -79.1807 | Low density, skip |

---

## 8. East York
Between downtown east and Scarborough. Danforth Village is the main strip.

| Neighbourhood | Lat | Lng | Notes |
|---|---|---|---|
| Pape Village | 43.6828 | -79.3417 | Neighbourhood strip |
| Danforth Village | 43.6953 | -79.3198 | Greek, Italian, casual |

---

## Summary

| Area | Points | Priority |
|---|---|---|
| Downtown Core | 7 | ★★★ |
| West End | 9 | ★★★ |
| East End | 7 | ★★★ |
| Midtown | 9 | ★★ |
| North York | 5 | ★★ |
| Etobicoke | 5 | ★ |
| Scarborough | 6 | ★★ |
| East York | 2 | ★★ |
| **Total** | **50** | |

**Recommended scrape order:** Downtown Core → West End → East End → Midtown → Scarborough → North York → East York → Etobicoke

At ~150 leads per neighbourhood point and 50 points, expect 2,000–4,000 total leads after filtering no-website businesses. Realistically closer to 1,500 after deduplication across overlapping radius areas.
