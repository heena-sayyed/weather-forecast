# 🌦️ Weather Forecast App

A simple, responsive weather forecast application built with **React** and the **OpenWeatherMap API**.
Provides real-time weather updates for any searched city.

---

## 🚀 Features

✔️ **Search Weather by City Name**
✔️ **Displays Weather Details:**

* Current Temperature
* Min/Max Temperature
* Weather Description (e.g., Sunny, Cloudy, Rainy)
* Wind Speed

✔️ **Search History:**

* Automatically stores searched cities
* Click on any past city to re-fetch its weather
* Ability to remove cities from history
* Toggle button to show/hide history list

✔️ **Smart UI/UX:**

* **Default City:** Shows **Berlin's weather** on first load
* **Error Handling:** Clear, friendly message for invalid city:
  `"Please enter a valid city name"`
  (Displayed on-screen, no pop-up alerts)
* Weather card remains visible even when errors occur
* Prevents duplicate cities in history (case-insensitive e.g., "London" = "london")
* **Mobile & Desktop Responsive Design**

---

## 🛠️ Tech Stack

* **React (Vite)** — Frontend Framework
* **React Bootstrap** — UI Components
* **LESS** — Custom Styling
* **OpenWeatherMap API** — Weather Data

---

## 📦 Getting Started

1. **Clone the Repository:**

```bash
git clone https://github.com/heena-sayyed/weather-forecast.git
cd weather-forecast
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Get Your Free API Key:**

* Register at: [https://openweathermap.org/](https://openweathermap.org/)
* Copy your API key.

4. **Create a `.env` File in the Project Root:**

```
VITE_WEATHER_API_KEY=your_api_key_here
```

⚠️ **Note:** This file is listed in `.gitignore`, so your key won't be pushed to GitHub.

5. **Run the App in Development Mode:**

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Production Build:

```bash
npm run build
npm run preview
```

---

## 📝 Extra Notes:

* Search history avoids duplicate entries (case insensitive).
* City names displayed with the first letter capitalized.
* Weather card always remains on the page — even if an error occurs.
* You can delete individual cities from the history list.
* **"Search History"** button toggles to **"Close Search History"**.

---

## 🚧 Possible Future Improvements:

* 5-Day Weather Forecast View
* Option to limit or clear search history
* Dark/Light Theme Toggle
* TypeScript Integration for Type Safety

---

## 👩‍💻 Author

**Heena Sayyed**
GitHub: [heena-sayyed/weather-forecast](https://github.com/heena-sayyed/weather-forecast)

---

## 🔑 API Key Reminder:

```
VITE_WEATHER_API_KEY=your_actual_api_key
```

✔️ `.env` is ignored by Git thanks to `.gitignore` — so your secret stays safe!

---

## 📜 License

For learning and personal use only.
