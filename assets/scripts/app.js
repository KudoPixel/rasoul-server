document.addEventListener("DOMContentLoaded", function () {
  // --- Server IPs and Info ---
  const serverIpJava = "mc.bighanoonabad.com";
  const bedrockInfo = {
    name: "RasoulCraft", // UPDATED: Name changed
    address: "mc.bighanoonabad.com",
    port: "40072",
  };
  const javaInfo = {
    name: "RasoulCraft",
    address: "mc.bighanoonabad.com",
  };

  // --- Mobile Menu Module ---
  function initMobileMenu() {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }

  // --- Clipboard and Modal Module ---
  function initClipboardAndModal() {
    function showDonateModal() {
      //   if (sessionStorage.getItem("donateModalShown")) return;
      const modal = document.getElementById("donate-modal");
      if (modal) {
        modal.classList.remove("hidden");
        sessionStorage.setItem("donateModalShown", "true");
      }
    }

    function copyToClipboard(text, tooltipElement) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          showTooltip(tooltipElement);
          // Only show donate modal for main IP copy actions
          if (
            tooltipElement.id === "tooltip-hero" ||
            tooltipElement.id === "tooltip-info" ||
            tooltipElement.id === "tooltip-java-address"
          ) {
            setTimeout(showDonateModal, 1500);
          }
        })
        .catch((err) => console.error("Could not copy text: ", err));
    }

    function showTooltip(tooltipElement) {
      if (!tooltipElement) return;
      const tooltipContainer = tooltipElement.parentElement;
      tooltipContainer.classList.add("active");
      setTimeout(() => tooltipContainer.classList.remove("active"), 2500);
    }

    // Main copy buttons
    document
      .getElementById("copyIpBtnHero")
      ?.addEventListener("click", () =>
        copyToClipboard(serverIpJava, document.getElementById("tooltip-hero"))
      );
    document
      .getElementById("copyIpBtnInfo")
      ?.addEventListener("click", () =>
        copyToClipboard(serverIpJava, document.getElementById("tooltip-info"))
      );

    // Java individual copy buttons
    document
      .getElementById("copyJavaName")
      ?.addEventListener("click", () =>
        copyToClipboard(
          javaInfo.name,
          document.getElementById("tooltip-java-name")
        )
      );
    document
      .getElementById("copyJavaAddress")
      ?.addEventListener("click", () =>
        copyToClipboard(
          javaInfo.address,
          document.getElementById("tooltip-java-address")
        )
      );

    // Bedrock individual copy buttons
    document
      .getElementById("copyBedrockName")
      ?.addEventListener("click", () =>
        copyToClipboard(
          bedrockInfo.name,
          document.getElementById("tooltip-bedrock-name")
        )
      );
    document
      .getElementById("copyBedrockAddress")
      ?.addEventListener("click", () =>
        copyToClipboard(
          bedrockInfo.address,
          document.getElementById("tooltip-bedrock-address")
        )
      );
    document
      .getElementById("copyBedrockPort")
      ?.addEventListener("click", () =>
        copyToClipboard(
          bedrockInfo.port,
          document.getElementById("tooltip-bedrock-port")
        )
      );
  }

  // --- Modal Controls Module ---
  function initModalControls() {
    const modal = document.getElementById("donate-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const goToDonateBtn = document.getElementById("go-to-donate");
    if (!modal || !closeModalBtn || !goToDonateBtn) return;
    function closeModal() {
      modal.classList.add("hidden");
    }
    closeModalBtn.addEventListener("click", closeModal);
    goToDonateBtn.addEventListener("click", closeModal);
  }

  // --- Scroll Animation Module ---
  function initScrollAnimations() {
    const sections = document.querySelectorAll(".fade-in-section");
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px", threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
  }

  // --- Server Status Module ---
  function initServerStatus() {
    const apiUrl = `https://api.mcsrvstat.us/2/${serverIpJava}`;
    const statusText = document.getElementById("server-status-text");
    const playerCount = document.getElementById("player-count");
    const statusIndicator = document.getElementById("server-status-indicator");
    if (!statusText || !playerCount || !statusIndicator) return;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.online) {
          statusText.textContent = "آنلاین";
          statusText.className = "font-bold text-green-400";
          statusIndicator.innerHTML =
            '<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>';
          playerCount.textContent = `${data.players.online} / ${data.players.max}`;
        } else {
          statusText.textContent = "آفلاین";
          statusText.className = "font-bold text-red-500";
          statusIndicator.innerHTML =
            '<span class="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>';
          playerCount.textContent = "---";
        }
      })
      .catch((error) => {
        console.error("Error fetching server status:", error);
        statusText.textContent = "خطا";
        statusText.className = "font-bold text-red-500";
        playerCount.textContent = "---";
      });
  }

  // --- YouTube Integration Module ---
  function initYouTubeFeatures() {
    // !!! IMPORTANT: Replace these with your actual Key and Channel ID !!!
    const YOUTUBE_API_KEY = "YOUR_YOUTUBE_API_KEY_HERE";
    const YOUTUBE_CHANNEL_ID = "YOUR_CHANNEL_ID_HERE";

    if (
      YOUTUBE_API_KEY === "YOUR_YOUTUBE_API_KEY_HERE" ||
      YOUTUBE_CHANNEL_ID === "YOUR_CHANNEL_ID_HERE"
    ) {
      document.getElementById("video-placeholder").textContent =
        "کلید API یا شناسه کانال یوتیوب تنظیم نشده است.";
      return;
    }

    const liveStatusBanner = document.getElementById("live-status-banner");
    const videoPlaceholder = document
      .getElementById("latest-video-container")
      .querySelector("#video-placeholder");

    // 1. Check for Live Stream
    const liveApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
    fetch(liveApiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          liveStatusBanner.style.display = "flex";
          liveStatusBanner.href = `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`;
        }
      })
      .catch((err) => console.error("Could not fetch live status", err));

    // 2. Fetch Latest Video
    const latestVideoApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&order=date&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`;
    fetch(latestVideoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          const videoId = data.items[0].id.videoId;
          const iframeContainer = document.createElement("div");
          iframeContainer.className =
            "video-container-16-9 rounded-lg overflow-hidden";

          const iframe = document.createElement("iframe");
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.title = "Latest YouTube Video";
          iframe.setAttribute("frameborder", "0");
          iframe.setAttribute(
            "allow",
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          );
          iframe.setAttribute("allowfullscreen", "");

          iframeContainer.appendChild(iframe);
          videoPlaceholder.innerHTML = ""; // Clear the placeholder text
          videoPlaceholder.appendChild(iframeContainer);
        } else {
          videoPlaceholder.textContent = "ویدیویی پیدا نشد.";
        }
      })
      .catch((err) => {
        console.error("Could not fetch latest video", err);
        videoPlaceholder.textContent = "خطا در بارگذاری ویدیو.";
      });
  }

  // --- Initialize all modules ---
  initMobileMenu();
  initClipboardAndModal();
  initModalControls();
  initScrollAnimations();
  initServerStatus();
  initYouTubeFeatures();
});
