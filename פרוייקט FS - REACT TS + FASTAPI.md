# ClimaBoard  \-  Full-Stack APP

## 1\. מטרת הפרויקט

לבנות אפליקציה בשם **ClimaBoard**  \-  לוח מזג אוויר למטיילים.

המשתמש בוחר שם מטייל (כינוי בלבד), מחפש ערים, צופה במזג אוויר נוכחי ובתחזית, שומר ערים מועדפות, ומשווה בין שתי ערים.

### מה חשוב ללמוד כאן

| שכבה | נושאים מרכזיים |
| ----: | ----: |
| Frontend | React \+ TypeScript, React Router, Hooks, Protected Routes |
| Backend | Python \+ FastAPI, CORS, Routers, Middleware, Validation |
| אינטגרציה | קריאה ל-API חיצוני דרך השרת בלבד |

---

### עבור Auth נשתמש ב:

* דף כניסה פשוט שבו המטייל מזין **כינוי** (שם תצוגה בלבד)  
* שמירת הכינוי ב-localStorage / state בצד הלקוח  
* **Protected Routes** שבודקים האם קיים כינוי  \-  אם לא, מפנים לדף הכניסה  
* זה **לא** אבטחה. זה תרגול ניתוב ו-UX בלבד

---

## 2\. ארכיטקטורה כללית (חובה)

\[React TS App\]  \---\>  \[FastAPI Backend\]  \---\>  \[Open-Meteo API\]  
                     :8000                    (חיצוני)

### כללים

1. הדפדפן **לא** קורא ישירות ל-Open-Meteo.  
2. כל בקשות מזג האוויר והחיפוש עוברות דרך FastAPI.  
3. ה-Frontend מדבר רק עם ה-Backend שלכם.  
4. לכן תצטרכו להגדיר **CORS** בשרת.

---

## 3\. API מזג אוויר חינמי (עליכם להיכנס ולהבין לבד איך לעבוד איתו)

### מומלץ: Open-Meteo

| משאב | קישור |
| :---- | :---- |
| אתר ראשי | [https://open-meteo.com/](https://open-meteo.com/) |
| תיעוד Forecast API | [https://open-meteo.com/en/docs](https://open-meteo.com/en/docs) |
| תיעוד Geocoding API (חיפוש ערים) | [https://open-meteo.com/en/docs/geocoding-api](https://open-meteo.com/en/docs/geocoding-api) |
| תנאי שימוש | [https://open-meteo.com/en/terms](https://open-meteo.com/en/terms) |

### למה Open-Meteo

* חינמי לשימוש לא-מסחרי  
* **לא דורש API Key**  
* מתאים לתרגול קריאת תיעוד אמיתי  
* כולל חיפוש ערים (Geocoding) \+ תחזית

### מה אתם צריכים להבין מהתיעוד

* איך מחפשים עיר לפי שם ומקבלים latitude / longitude  
* איך מבקשים מזג אוויר נוכחי ותחזית יומית  
* אילו פרמטרים חובה ב-query  
* מה המשמעות של weather\_code (קודי WMO)  
* מגבלות שימוש הוגן (fair use)

### חובת ייחוס (Attribution)

לפי תנאי Open-Meteo יש להציג קרדיט באפליקציה (למשל בפוטר):  
**Weather data by Open-Meteo.com**

---

## 4\. דרישות Backend  \-  Python \+ FastAPI

### 4.1 טכנולוגיות חובה

* Python  
* FastAPI  
* Uvicorn  
* Pydantic (validation דרך מודלים)  
* ספריית HTTP לקריאות החוצה (מומלץ requests)  
* מבנה עם APIRouter (לא כל האפליקציה בקובץ אחד)

### 4.2 יכולות שרת חובה

1. **CORS**  \-  לאפשר ל-Frontend (למשל http://localhost:5173) לגשת ל-API  
2. **Routers**  \-  לפחות הפרדה לוגית, למשל:  
   * נתיבי ערים / חיפוש  
   * נתיבי מזג אוויר  
   * נתיבי מועדפים  
3. **Middleware מותאם אישית**  \-  לפחות אחד, למשל:  
   * מדידת זמן תגובה לכל בקשה  
   * או לוגים בסיסיים של method \+ path \+ status  
4. **Validation**  \-  כל קלט (query / path / body) חייב לעבור ולידציה עם Pydantic / טיפוסי FastAPI  
5. **טיפול בשגיאות**  \-  תשובות ברורות ללקוח (לא stack trace גולמי למשתמש)  
6. **קריאות ל-Open-Meteo**  \-  השרת קורא ל-API החיצוני ומחזיר ללקוח מבנה נוח

### 4.3 ישויות / יכולות עסקיות מינימליות בשרת

השרת חייב לספק לפחות את היכולות הבאות (אתם מתכננים את ה-URLs והחוזה):

| יכולת | תיאור |
| :---- | ----- |
| Health | בדיקה שהשרת חי |
| חיפוש ערים | לפי מחרוזת חיפוש → רשימת ערים עם קואורדינטות |
| מזג נוכחי | לפי lat/lon → טמפרטורה, תחושה, רוח, קוד מזג וכו' |
| תחזית | לפי lat/lon → תחזית לכמה ימים |
| השוואה | השוואת שתי נקודות (שתי ערים) בבקשה אחת או בשתי קריאות מאוגדות בשרת |
| מועדפים | CRUD בסיסי של ערים שמורות |
| אתב"ש | מקבל טקסט באורך לא ידוע ומחזיר אותו באתב"ש \- עליכם לתמוך בעברית ואנגלית בלבד. (אין קשר כלל לאנדפוינטים הכתובים מעלה או למערכת כלל) |

### 4.4 אחסון מועדפים (בלי DB \- מי שרוצה יכול להוסיף בסוף)

מותר אחד מהבאים:

* שמירה בזיכרון (dict/list)  \-  מתאפס בהפעלה מחדש של השרת  
* או קובץ JSON מקומי

כל רשומת מועדף יכולה להיות משויכת ל-explorerName (הכינוי מהלקוח) כמחרוזת רגילה.  
**זו לא אבטחה**  \-  רק כדי שכל מטייל יראה את הרשימה שלו בתרגול.

### 4.5 דוגמאות לולידציה שחובה לחשוב עליהן

* מחרוזת חיפוש: אורך מינימלי / מקסימלי  
* latitude / longitude: טווחים חוקיים  
* מספר ימי תחזית: טווח סביר (לפי מה ש-Open-Meteo מאפשר)  
* explorerName: אורך, תווים מותרים  
* מניעת body ריק / שדות חסרים ב-POST

### 4.6 מבנה תיקיות מומלץ (לא חובה אחד לאחד)

backend/  
  app/  
    main.py  
    routers/  
    schemas/  
    services/      \# קריאות ל-Open-Meteo  
    middleware/  
    data/          \# אם משתמשים ב-JSON  
  requirements.txt  
  README.md

---

## 5\. דרישות Frontend  \-  React \+ TypeScript

### 5.1 טכנולוגיות חובה

* Vite \+ React \+ TypeScript  
* React Router  
* Hooks: useState, useEffect, useRef  
* React Router hooks: useParams, useNavigate  
* Protected Routes  
* קריאות ל-API של השרת שלכם (fetch או axios  \-  לבחירתכם)

### 5.2 שימוש חובה ב-Hooks / Router (תנאי הערכה)

| כלי | שימוש מינימלי נדרש בפרויקט |
| ----: | ----: |
| useState | מצב טפסים, loading, error, נתונים שהתקבלו |
| useEffect | טעינת נתונים בעליית מסך / בשינוי פרמטרים; cleanup כשצריך |
| useRef | לפחות מקרה אחד אמיתי (למשל focus אוטומטי לשדה חיפוש, או מניעת race condition בחיפוש מהיר) |
| useParams | מסך פרטי עיר לפי פרמטר בנתיב |
| useNavigate / \<Navigate /\> | מעבר בין מסכים \+ הפניה מ-Protected Route |
| Protected Routes | הגנה על אזור האפליקציה הפנימי לפי קיום כינוי מטייל |
| Layout \+ Outlet | מעטפת משותפת (Nav / Footer) לדפים המוגנים |

### 5.3 מסכים מינימליים

1. **Welcome / Enter**  
   * קלט כינוי מטייל  
   * שמירה מקומית  
   * מעבר לאזור האפליקציה  
2. **Dashboard**  
   * ברכה לפי הכינוי (לדוגמא: שלום MOMO)  
   * תצוגת מזג נוכחי לעיר ברירת מחדל / עיר אחרונה שנבחרה  
   * קיצורי דרך לחיפוש / מועדפים / השוואה  
3. **Search**  
   * חיפוש ערים  
   * רשימת תוצאות  
   * מעבר למסך עיר  
4. **City Details** (/app/city/... עם useParams)  
   * מזג נוכחי  
   * תחזית לכמה ימים  
   * כפתור הוספה/הסרה ממועדפים  
5. **Favorites**  
   * רשימת ערים שמורות מהשרת  
   * מעבר לעיר / מחיקה  
6. **Compare**  
   * בחירת שתי ערים  
   * הצגת השוואה ויזואלית ברורה (טמפרטורה, רוח, מזג...)  
7. **Not Found**  
   * דף 404 לנתיב לא קיים

### 5.4 UX חובה

* מצבי Loading  
* מצבי Error ברורים (שרת נפל / עיר לא נמצאה / ולידציה נכשלה)  
* Empty state (אין מועדפים / אין תוצאות חיפוש)  
* UI קריא בעברית  
* רספונסיבי סביר (דסקטופ \+ מובייל)  
* כפתור יציאה שמנקה את הכינוי ומחזיר ל-Welcome

### 5.5 מבנה תיקיות מומלץ

frontend/  
  src/  
    pages/  
    components/  
    routes/  
    services/     \# קריאות ל-Backend בלבד  
    types/  
    hooks/  
    App.tsx  
    main.tsx  
  package.json  
  README.md  
  …  
---

## 6\. Protected Routes  \-  הגדרה לפרויקט הזה

### רעיון

* נתיבים ציבוריים: / (כניסת מטייל)  
* נתיבים מוגנים: כל מה שתחת /app/...

### כלל

אם אין כינוי שמור → אסור להציג את תוכן /app → הפניה ל-/.

---

## 7\. תרחישי קצה שחובה לטפל בהם

* חיפוש עם פחות מ-N תווים  
* עיר שלא קיימת / 0 תוצאות  
* קואורדינטות לא חוקיות  
* Open-Meteo לא זמין / timeout  
* ניסיון כניסה ל-URL מוגן בלי כינוי  
* מחיקת מועדף שלא קיים  
* הקלדה מהירה בחיפוש (לא להציג תוצאה ישנה מעל חדשה  \-  מומלץ לתרגל עם useRef / ביטול בקשה)

---

## 8\. קישורים לתיעוד רשמי  \-  Python / FastAPI

### רענון Python

| נושא | קישור |
| ----: | ----: |
| Tutorial רשמי | [https://docs.python.org/3/tutorial/](https://docs.python.org/3/tutorial/) |
| מבני נתונים | [https://docs.python.org/3/tutorial/datastructures.html](https://docs.python.org/3/tutorial/datastructures.html) |
| מודולים | [https://docs.python.org/3/tutorial/modules.html](https://docs.python.org/3/tutorial/modules.html) |
| Input/Output \+ JSON | [https://docs.python.org/3/tutorial/inputoutput.html](https://docs.python.org/3/tutorial/inputoutput.html) |
| Virtual environments | [https://docs.python.org/3/tutorial/venv.html](https://docs.python.org/3/tutorial/venv.html) |
| Typing | [https://docs.python.org/3/library/typing.html](https://docs.python.org/3/library/typing.html) |
| json | [https://docs.python.org/3/library/json.html](https://docs.python.org/3/library/json.html) |

### FastAPI

| נושא | קישור |
| ----: | ----: |
| בית FastAPI | [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/) |
| Tutorial ראשי | [https://fastapi.tiangolo.com/tutorial/](https://fastapi.tiangolo.com/tutorial/) |
| First Steps | [https://fastapi.tiangolo.com/tutorial/first-steps/](https://fastapi.tiangolo.com/tutorial/first-steps/) |
| Path Parameters | [https://fastapi.tiangolo.com/tutorial/path-params/](https://fastapi.tiangolo.com/tutorial/path-params/) |
| Query Parameters | [https://fastapi.tiangolo.com/tutorial/query-params/](https://fastapi.tiangolo.com/tutorial/query-params/) |
| Request Body \+ Pydantic | [https://fastapi.tiangolo.com/tutorial/body/](https://fastapi.tiangolo.com/tutorial/body/) |
| Response Model | [https://fastapi.tiangolo.com/tutorial/response-model/](https://fastapi.tiangolo.com/tutorial/response-model/) |
| Bigger Applications / APIRouter | [https://fastapi.tiangolo.com/tutorial/bigger-applications/](https://fastapi.tiangolo.com/tutorial/bigger-applications/) |
| CORS | [https://fastapi.tiangolo.com/tutorial/cors/](https://fastapi.tiangolo.com/tutorial/cors/) |
| Middleware | [https://fastapi.tiangolo.com/tutorial/middleware/](https://fastapi.tiangolo.com/tutorial/middleware/) |
| Handling Errors | [https://fastapi.tiangolo.com/tutorial/handling-errors/](https://fastapi.tiangolo.com/tutorial/handling-errors/) |
| Dependencies (כללי, בלי Auth) | [https://fastapi.tiangolo.com/tutorial/dependencies/](https://fastapi.tiangolo.com/tutorial/dependencies/) |

### כלים נלווים

| נושא | קישור |
| ----- | ----- |
| Pydantic | [https://docs.pydantic.dev/latest/](https://docs.pydantic.dev/latest/) |
| requests | [https://pypi.org/project/requests/](https://pypi.org/project/requests/) |
| Uvicorn | [https://www.uvicorn.org/](https://www.uvicorn.org/) |

---

## 9\. קישורים לתיעוד רשמי  \-  React / Router / TS

| נושא | קישור |
| ----: | ----: |
| React Learn | [https://react.dev/learn](https://react.dev/learn) |
| TypeScript ב-React | [https://react.dev/learn/typescript](https://react.dev/learn/typescript) |
| useState | [https://react.dev/reference/react/useState](https://react.dev/reference/react/useState) |
| useEffect | [https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect) |
| Synchronizing with Effects | [https://react.dev/learn/synchronizing-with-effects](https://react.dev/learn/synchronizing-with-effects) |
| useRef | [https://react.dev/reference/react/useRef](https://react.dev/reference/react/useRef) |
| Vite Guide | [https://vite.dev/guide/](https://vite.dev/guide/) |
| React Router  \-  Home | [https://reactrouter.com/](https://reactrouter.com/) |
| Declarative Routing | [https://reactrouter.com/start/declarative/routing](https://reactrouter.com/start/declarative/routing) |
| useParams | [https://reactrouter.com/api/hooks/useParams](https://reactrouter.com/api/hooks/useParams) |
| useNavigate | [https://reactrouter.com/api/hooks/useNavigate](https://reactrouter.com/api/hooks/useNavigate) |
| TypeScript Handbook | [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html) |

---

## 10\. מה להגיש

1. ריפו / תיקייה עם frontend/ ו-backend/  
2. README.md ראשי עם:  
   * איך להקים סביבה (venv, התקנות)  
   * איך להריץ Backend  
   * איך להריץ Frontend  
   * אילו endpoints יש אצלכם  
3. קובץ תלויות (requirements.txt, package.json)  
4. האפליקציה עובדת end-to-end מול Open-Meteo דרך השרת

---

## 11\. טיפים לפני שמתחילים

1. התחילו מקריאת Open-Meteo Docs  \-  Forecast \+ Geocoding.  
2. הריצו FastAPI מינימלי עם /health ו-CORS.  
3. רק אז חברו React.  
4. אל תבנו Auth "כי ראיתם ביוטיוב"  \-  זה מחוץ לסקופ.  
5. אם משהו לא ברור בתיעוד  \-  זה חלק מהמשימה. למדו לקרוא Docs.

בהצלחה. תבנו, תתקעו, תקראו תיעוד, ותפתרו.

