const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-tab");
const sections = document.querySelectorAll("section");
const particlesContainer = document.getElementById("particles");
const glow1 = document.querySelector(".glow-1");
const glow2 = document.querySelector(".glow-2");

const localTime = document.getElementById("localTime");
const timeZoneLabel = document.getElementById("timeZoneLabel");
const availabilityStatus = document.getElementById("availabilityStatus");
const availabilityText = document.getElementById("availabilityText");

const portfolioTimeZone = "Europe/Amsterdam";

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.16,
  }
);

reveals.forEach((item) => observer.observe(item));

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

function createParticles() {
  const particleCount = 28;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 8;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${left}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

window.addEventListener("mousemove", (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  glow1.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
  glow2.style.transform = `translate(-${x * 25}px, -${y * 25}px)`;
});

function updateAmsterdamTime() {
  if (timeZoneLabel) {
    timeZoneLabel.textContent = portfolioTimeZone;
  }

  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: portfolioTimeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const hourFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: portfolioTimeZone,
    hour: "2-digit",
    hour12: false,
  });

  const now = new Date();
  const currentTimeString = timeFormatter.format(now);
  const currentHour = Number(hourFormatter.format(now));

  if (localTime) {
    localTime.textContent = currentTimeString;
  }

  const isAvailable = currentHour >= 8 && currentHour < 17;

  if (availabilityStatus && availabilityText) {
    availabilityStatus.classList.remove("status-open", "status-closed");

    if (isAvailable) {
      availabilityStatus.textContent = "Available now";
      availabilityStatus.classList.add("status-open");
      availabilityText.textContent =
        "It’s currently between 08:00 and 17:00 in my time zone, so I’m usually around to react to contact.";
    } else {
      availabilityStatus.textContent = "Outside contact hours";
      availabilityStatus.classList.add("status-closed");
      availabilityText.textContent =
        "I usually react to contact between 08:00 and 17:00 my local time. You can still message me and I’ll get back to you.";
    }
  }
}

updateAmsterdamTime();
setInterval(updateAmsterdamTime, 1000);
