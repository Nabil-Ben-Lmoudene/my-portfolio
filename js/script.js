// ============================================================
// PEGION PORTFOLIO
// PROJECT FILTER + UI/UX GALLERY
// GALLERY NAVIGATION + ZOOM + DRAG/PAN
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  // ==========================================================
  // PROJECT FILTER
  // ==========================================================

  const filterButtons =
    document.querySelectorAll(".toggle-group button");

  const projectCards =
    document.querySelectorAll(".project-card");


  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const filter =
        button.getAttribute("data-filter");


      // Active button
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");


      // Filter cards
      projectCards.forEach(function (card) {

        const category =
          card.getAttribute("data-category");


        if (
          filter === "all" ||
          category === filter
        ) {

          card.style.display = "";

        } else {

          card.style.display = "none";

        }

      });

    });

  });


  // ==========================================================
  // LIGHTBOX
  // ==========================================================

  const lightbox =
    document.getElementById("project-lightbox");

  const lightboxImage =
    document.getElementById("project-lightbox-image");

  const lightboxTitle =
    document.getElementById("project-lightbox-title");

  const lightboxCounter =
    document.getElementById("project-lightbox-counter");

  const btnClose =
    document.getElementById("project-lightbox-close");

  const btnPrev =
    document.getElementById("project-lightbox-prev");

  const btnNext =
    document.getElementById("project-lightbox-next");

  const lightboxStage =
    document.getElementById("project-lightbox-stage");


  // ==========================================================
  // CHECK LIGHTBOX
  // ==========================================================

  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxStage
  ) {

    console.warn(
      "Project lightbox elements were not found."
    );

    return;

  }


  // ==========================================================
  // GALLERY DATA
  // ==========================================================

  let galleryImages = [];

  let currentImage = 0;


  // ==========================================================
  // ZOOM
  // ==========================================================

  let zoom = 1;

  const minZoom = 1;

  const maxZoom = 5;

  const zoomStep = 0.4;


  // ==========================================================
  // IMAGE POSITION
  // ==========================================================

  let imageX = 0;

  let imageY = 0;


  // ==========================================================
  // DRAG
  // ==========================================================

  let dragging = false;

  let dragStartX = 0;

  let dragStartY = 0;

  let startImageX = 0;

  let startImageY = 0;


  // ==========================================================
  // TOUCH
  // ==========================================================

  let touchStartX = 0;

  let touchStartY = 0;

  let touchStartDistance = 0;

  let touchStartZoom = 1;


  // ==========================================================
  // UPDATE ZOOM
  // ==========================================================

  function updateTransform() {

    lightboxImage.style.transform =
      "translate3d(" +
      imageX +
      "px, " +
      imageY +
      "px, 0) scale(" +
      zoom +
      ")";


    // Zoom indicator
    const zoomIndicator =
      document.getElementById("zoom-level");

    if (zoomIndicator) {

      zoomIndicator.textContent =
        Math.round(zoom * 100) + "%";

    }

  }


  // ==========================================================
  // RESET ZOOM
  // ==========================================================

  function resetZoom() {

    zoom = 1;

    imageX = 0;

    imageY = 0;

    lightboxImage.classList.remove(
      "is-dragging"
    );

    updateTransform();

  }


  // ==========================================================
  // CHANGE ZOOM
  // ==========================================================

  function changeZoom(value) {

    zoom = Math.max(
      minZoom,
      Math.min(maxZoom, value)
    );


    if (zoom === 1) {

      imageX = 0;

      imageY = 0;

    }


    updateTransform();

  }


  // ==========================================================
  // ZOOM IN
  // ==========================================================

  function zoomIn() {

    changeZoom(
      zoom + zoomStep
    );

  }


  // ==========================================================
  // ZOOM OUT
  // ==========================================================

  function zoomOut() {

    changeZoom(
      zoom - zoomStep
    );

  }


  // ==========================================================
  // RENDER IMAGE
  // ==========================================================

  function renderImage() {

    if (!galleryImages.length) {
      return;
    }


    lightboxImage.src =
      galleryImages[currentImage];


    lightboxImage.alt =
      lightboxTitle.textContent ||
      "Project image";


    // Counter
    if (lightboxCounter) {

      if (galleryImages.length > 1) {

        lightboxCounter.textContent =
          (currentImage + 1) +
          " / " +
          galleryImages.length;

      } else {

        lightboxCounter.textContent = "";

      }

    }


    // Previous button
    if (btnPrev) {

      btnPrev.style.display =
        galleryImages.length > 1
          ? "flex"
          : "none";

    }


    // Next button
    if (btnNext) {

      btnNext.style.display =
        galleryImages.length > 1
          ? "flex"
          : "none";

    }


    // Every new image starts at 100%
    resetZoom();

  }


  // ==========================================================
  // OPEN LIGHTBOX
  // ==========================================================

  function openLightbox(images, title) {

    if (
      !images ||
      !images.length
    ) {

      console.warn(
        "No gallery images found."
      );

      return;

    }


    galleryImages = images;

    currentImage = 0;


    if (lightboxTitle) {

      lightboxTitle.textContent =
        title || "";

    }


    renderImage();


    lightbox.classList.add("open");


    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";

  }


  // ==========================================================
  // CLOSE LIGHTBOX
  // ==========================================================

  function closeLightbox() {

    lightbox.classList.remove("open");


    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    resetZoom();

  }


  // ==========================================================
  // PREVIOUS IMAGE
  // ==========================================================

  function previousImage() {

    if (
      galleryImages.length <= 1
    ) {

      return;

    }


    currentImage =
      (
        currentImage -
        1 +
        galleryImages.length
      ) %
      galleryImages.length;


    renderImage();

  }


  // ==========================================================
  // NEXT IMAGE
  // ==========================================================

  function nextImage() {

    if (
      galleryImages.length <= 1
    ) {

      return;

    }


    currentImage =
      (
        currentImage +
        1
      ) %
      galleryImages.length;


    renderImage();

  }


  // ==========================================================
  // OPEN CERTIFICATE LIGHTBOX
  // (about.html — reuses the same lightbox/zoom engine
  // as the UI/UX project gallery)
  // ==========================================================

  const certCards =
    document.querySelectorAll(
      ".cert-card[data-lightbox]"
    );

  if (certCards.length) {

    const certImages = [];

    const certTitles = [];

    certCards.forEach(function (card) {

      const image =
        card.querySelector("img");

      if (
        image &&
        image.getAttribute("src")
      ) {

        certImages.push(
          image.getAttribute("src")
        );

        certTitles.push(
          image.getAttribute("alt") ||
          "Certificate"
        );

      }

    });


    certCards.forEach(function (card, index) {

      function openCertLightbox() {

        openLightbox(
          certImages,
          certTitles[index]
        );

        currentImage = index;

        renderImage();

      }


      card.addEventListener(
        "click",
        openCertLightbox
      );


      card.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            openCertLightbox();

          }

        }
      );

    });

  }


  // ==========================================================
  // OPEN UI/UX GALLERY
  // ==========================================================

  const galleryMedia =
    document.querySelectorAll(
      '.project-card[data-category="uiux"] .project-media'
    );


  galleryMedia.forEach(function (media) {

    function openFromMedia() {

      // Get gallery from data-gallery
      const galleryData =
        media.getAttribute(
          "data-gallery"
        );


      let images = [];


      if (galleryData) {

        images =
          galleryData
            .split(",")
            .map(function (image) {

              return image.trim();

            })
            .filter(function (image) {

              return image.length > 0;

            });

      }


      // Fallback: get image from media
      if (!images.length) {

        const image =
          media.querySelector("img");


        if (
          image &&
          image.getAttribute("src")
        ) {

          images.push(
            image.getAttribute("src")
          );

        }

      }


      // Find project title
      const card =
        media.closest(".project-card");


      const titleElement =
        card
          ? card.querySelector(
              ".project-desc"
            )
          : null;


      const title =
        titleElement
          ? titleElement.textContent.trim()
          : "";


      openLightbox(
        images,
        title
      );

    }


    // Mouse click
    media.addEventListener(
      "click",
      function (event) {

        /*
          Don't trigger if a link/button
          is clicked.
        */

        if (
          event.target.closest("a") ||
          event.target.closest("button")
        ) {

          return;

        }


        openFromMedia();

      }
    );


    // Keyboard accessibility
    media.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openFromMedia();

        }

      }
    );

  });


  // ==========================================================
  // CLOSE BUTTON
  // ==========================================================

  if (btnClose) {

    btnClose.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();

        closeLightbox();

      }
    );

  }


  // ==========================================================
  // PREVIOUS
  // ==========================================================

  if (btnPrev) {

    btnPrev.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();

        previousImage();

      }
    );

  }


  // ==========================================================
  // NEXT
  // ==========================================================

  if (btnNext) {

    btnNext.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        event.stopPropagation();

        nextImage();

      }
    );

  }


  // ==========================================================
  // ZOOM CONTROLS
  // ==========================================================

  /*
    Create zoom controls automatically.

    This means you DO NOT need to add
    zoom buttons to your HTML.
  */

  const zoomControls =
    document.createElement("div");

  zoomControls.className =
    "zoom-controls";


  zoomControls.innerHTML = `
    <button
      type="button"
      class="lightbox-zoom-out"
      aria-label="Zoom out"
    >
      −
    </button>

    <span
      class="zoom-level"
      id="zoom-level"
    >
      100%
    </span>

    <button
      type="button"
      class="lightbox-zoom-in"
      aria-label="Zoom in"
    >
      +
    </button>

    <button
      type="button"
      class="lightbox-zoom-reset"
    >
      Reset
    </button>
  `;


  lightbox.appendChild(
    zoomControls
  );


  const zoomInButton =
    zoomControls.querySelector(
      ".lightbox-zoom-in"
    );


  const zoomOutButton =
    zoomControls.querySelector(
      ".lightbox-zoom-out"
    );


  const zoomResetButton =
    zoomControls.querySelector(
      ".lightbox-zoom-reset"
    );


  zoomInButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      zoomIn();

    }
  );


  zoomOutButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      zoomOut();

    }
  );


  zoomResetButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      resetZoom();

    }
  );


  // ==========================================================
  // MOUSE DRAG
  // ==========================================================

  lightboxImage.addEventListener(
    "mousedown",
    function (event) {

      if (zoom <= 1) {

        return;

      }


      event.preventDefault();


      dragging = true;


      dragStartX =
        event.clientX;

      dragStartY =
        event.clientY;


      startImageX =
        imageX;

      startImageY =
        imageY;


      lightboxImage.classList.add(
        "is-dragging"
      );

    }
  );


  // ==========================================================
  // MOUSE MOVE
  // ==========================================================

  document.addEventListener(
    "mousemove",
    function (event) {

      if (!dragging) {

        return;

      }


      imageX =
        startImageX +
        (
          event.clientX -
          dragStartX
        );


      imageY =
        startImageY +
        (
          event.clientY -
          dragStartY
        );


      updateTransform();

    }
  );


  // ==========================================================
  // MOUSE UP
  // ==========================================================

  document.addEventListener(
    "mouseup",
    function () {

      if (!dragging) {

        return;

      }


      dragging = false;


      lightboxImage.classList.remove(
        "is-dragging"
      );

    }
  );


  // ==========================================================
  // MOUSE WHEEL ZOOM
  // ==========================================================

  lightboxStage.addEventListener(
    "wheel",
    function (event) {

      // NOTE: trackpads report Ctrl+wheel for
      // pinch-to-zoom gestures, so we must NOT
      // ignore ctrlKey here — doing so silently
      // disables zoom for anyone using a trackpad.

      event.preventDefault();


      // Trackpad pinch usually sends a bigger,
      // more precise deltaY. Scale the step so
      // pinch feels proportional instead of
      // jumping by a fixed amount every event.

      const delta =
        event.deltaY;

      const dynamicStep =
        Math.min(
          Math.abs(delta) * 0.01,
          0.5
        ) ||
        zoomStep;


      if (delta < 0) {

        changeZoom(
          zoom + dynamicStep
        );

      } else {

        changeZoom(
          zoom - dynamicStep
        );

      }

    },
    {
      passive: false
    }
  );


  // ==========================================================
  // DOUBLE CLICK
  // ==========================================================

  lightboxImage.addEventListener(
    "dblclick",
    function (event) {

      event.preventDefault();


      if (zoom === 1) {

        changeZoom(2);

      } else {

        resetZoom();

      }

    }
  );


  // ==========================================================
  // TOUCH START
  // ==========================================================

  lightboxImage.addEventListener(
    "touchstart",
    function (event) {

      if (
        event.touches.length === 1
      ) {

        touchStartX =
          event.touches[0].clientX;

        touchStartY =
          event.touches[0].clientY;


        startImageX =
          imageX;

        startImageY =
          imageY;

      }


      if (
        event.touches.length === 2
      ) {

        const x =
          event.touches[0].clientX -
          event.touches[1].clientX;

        const y =
          event.touches[0].clientY -
          event.touches[1].clientY;


        touchStartDistance =
          Math.sqrt(
            x * x +
            y * y
          );


        touchStartZoom =
          zoom;

      }

    },
    {
      passive: true
    }
  );


  // ==========================================================
  // TOUCH MOVE
  // ==========================================================

  lightboxImage.addEventListener(
    "touchmove",
    function (event) {

      // One finger = drag
      if (
        event.touches.length === 1 &&
        zoom > 1
      ) {

        event.preventDefault();


        const moveX =
          event.touches[0].clientX -
          touchStartX;


        const moveY =
          event.touches[0].clientY -
          touchStartY;


        imageX =
          startImageX +
          moveX;


        imageY =
          startImageY +
          moveY;


        updateTransform();

      }


      // Two fingers = pinch zoom
      if (
        event.touches.length === 2
      ) {

        event.preventDefault();


        const x =
          event.touches[0].clientX -
          event.touches[1].clientX;


        const y =
          event.touches[0].clientY -
          event.touches[1].clientY;


        const distance =
          Math.sqrt(
            x * x +
            y * y
          );


        if (
          touchStartDistance > 0
        ) {

          const scale =
            distance /
            touchStartDistance;


          changeZoom(
            touchStartZoom *
            scale
          );

        }

      }

    },
    {
      passive: false
    }
  );


  // ==========================================================
  // CLOSE BY CLICKING BACKGROUND
  // ==========================================================

  lightbox.addEventListener(
    "click",
    function (event) {

      if (
        event.target === lightbox
      ) {

        closeLightbox();

      }

    }
  );


  // ==========================================================
  // KEYBOARD
  // ==========================================================

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        !lightbox.classList.contains("open")
      ) {

        return;

      }


      // ESC
      if (
        event.key === "Escape"
      ) {

        closeLightbox();

        return;

      }


      // Previous
      if (
        event.key === "ArrowLeft"
      ) {

        previousImage();

        return;

      }


      // Next
      if (
        event.key === "ArrowRight"
      ) {

        nextImage();

        return;

      }


      // Zoom in
      if (
        event.key === "+" ||
        event.key === "="
      ) {

        zoomIn();

        return;

      }


      // Zoom out
      if (
        event.key === "-"
      ) {

        zoomOut();

        return;

      }


      // Reset
      if (
        event.key === "0"
      ) {

        resetZoom();

      }

    }
  );


  // ==========================================================
  // PREVENT DEFAULT IMAGE DRAG
  // ==========================================================

  lightboxImage.addEventListener(
    "dragstart",
    function (event) {

      event.preventDefault();

    }
  );


  // ==========================================================
  // FINISH
  // ==========================================================

  console.log(
    "Pegeon project gallery loaded successfully."
  );

});