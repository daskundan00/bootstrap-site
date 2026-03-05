
// Bootstrap Dark/Light Mode Toggle
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-bs-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}

// Load theme on startup
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  document.documentElement.setAttribute("data-bs-theme", saved || "dark");

  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login Successful!");
    });
  }

  // TODO LIST
  const list = document.getElementById("todo-list");
  const addBtn = document.getElementById("addTaskBtn");
  const taskField = document.getElementById("task");

  function renderTasks() {
    if (!list) return;
    list.innerHTML = "";
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.forEach((task, index) => {
      const div = document.createElement("div");
      div.className = "todo-item";
      div.innerHTML = `
        <span>${task}</span>
        <button class="btn btn-danger btn-sm">Remove</button>
      `;
      div.querySelector("button").onclick = () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      };
      list.appendChild(div);
    });
  }

  if (addBtn) {
    addBtn.onclick = () => {
      const val = taskField.value.trim();
      if (!val) return alert("Enter a task!");
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push(val);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskField.value = "";
      renderTasks();
    };
    renderTasks();
  }

  // WEATHER
  const weatherBtn = document.getElementById("getWeatherBtn");
  if (weatherBtn) {
    weatherBtn.onclick = async () => {
      const city = document.getElementById("city").value.trim();
      if (!city) return alert("Enter a city name!");

      const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        document.getElementById("weather-result").innerHTML = `
          <div class="card p-3 mt-3">
            <h4>${data.name}</h4>
            <p>Temp: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
          </div>
        `;
      } catch (err) {
        alert(err.message);
      }
    };
  }
});
