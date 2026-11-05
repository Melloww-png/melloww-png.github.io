"use strict";
(() => {
  const imageFiles = {
    "assets/siem.png": "soc-siem-dashboard.png",
    "assets/bank-secured.png": "Bank Secured.png",
    "assets/bank-vulnerable.png": "Bank Vuln.png",
    "assets/firewall.png": "Firewall Simulator.png",
    "assets/forensics.png": "Forensics.png",
    "assets/iot.png": "IoT Azure picture.png",
    "assets/cryptography.png": "Cryptography .png",
    "assets/juice-shop.png": "OWASP JUICE SHOP.png",
    "assets/library.png": "SOLA Algo&Data Structure.png"
  };

  function correctImagePath(path) {
    const filename = imageFiles[path];

    return filename
      ? "Pictures%20for%20the%20website/" +
        encodeURIComponent(filename)
      : path;
  }

  // Fix images used by project cards, evidence tabs and the viewer.
  (window.PORTFOLIO_PROJECTS || []).forEach(project => {
    (project.images || []).forEach(image => {
      image.src = correctImagePath(image.src);
    });
  });

  document.querySelectorAll("img[src]").forEach(image => {
    const currentPath = image.getAttribute("src");
    const correctedPath = correctImagePath(currentPath);

    if (correctedPath !== currentPath) {
      image.src = correctedPath;
    }
  });
})();

(() => {
  const projects = window.PORTFOLIO_PROJECTS;

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const escape = (value = "") =>
    String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[character]));

  let category = "all";
  let toastTimer;

  const external = 'target="_blank" rel="noopener noreferrer"';

  const tags = project => `
    <div class="tags">
      ${project.tags.map(tag => `
        <span class="tag">${escape(tag)}</span>
      `).join("")}
    </div>
  `;

  const link = (project, tab) =>
    `#project/${project.id}${
      tab && tab !== "overview" ? "/" + tab : ""
    }`;

  function renderCards() {
    const query = $("#project-search")
      .value.trim().toLocaleLowerCase();

    const matches = projects.filter(project =>
      (category === "all" || project.category === category) &&
      `${project.title} ${project.summary} ${project.area} ${
        project.tags.join(" ")
      }`.toLocaleLowerCase().includes(query)
    );

    $("#project-list").innerHTML = matches.map(project => {
      const featured = projects.indexOf(project) < 2;

      return `
        <article
          class="project-card ${
            featured ? "featured-card" : "compact-card"
          }"
          data-project="${project.id}">

          ${featured ? `
            <a
              class="card-visual"
              href="${link(project)}"
              tabindex="-1"
              aria-hidden="true">
              <img
                src="${project.images[0].src}"
                alt=""
                width="1379"
                height="727"
                loading="lazy">
              <span class="visual-label">
                Actual project screenshot
              </span>
            </a>
          ` : ""}

          <div class="card-body">
            <div class="card-topline">
              <span class="eyebrow">${escape(project.area)}</span>
              <span class="project-index">
                ${project.number} / 2026
              </span>
            </div>

            <h3>
              <a class="card-title-link" href="${link(project)}">
                ${escape(project.title)}
                <span class="arrow" aria-hidden="true">
                  <svg class="icon" viewBox="0 0 24 24"
                    fill="none" aria-hidden="true">
                    <path d="M5 19 19 5M5 5h14v14"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>
            </h3>

            <p class="card-description">${escape(project.short)}</p>
            ${tags(project)}

            <p class="card-proof">${escape(project.proof)}</p>

            <div class="card-actions">
              <a href="${link(project)}">
                Explore project
                <span aria-hidden="true">
                  <svg class="icon" viewBox="0 0 24 24"
                    fill="none" aria-hidden="true">
                    <path d="M5 19 19 5M5 5h14v14"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                  </svg>
                </span>
              </a>

              ${project.repos.length ? `
                <a href="${project.repos[0].url}" ${external}>
                  ${
                    project.id === "bank-lab"
                      ? "Secured source"
                      : project.id === "portfolio-site"
                        ? "Original source"
                        : "Repository"
                  }
                  <svg class="icon" viewBox="0 0 24 24"
                    fill="none" aria-hidden="true">
                    <path d="M5 19 19 5M5 5h14v14"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                  </svg>
                </a>
              ` : `
                <a href="${link(project, "evidence")}">
                  View evidence
                  <svg class="icon" viewBox="0 0 24 24"
                    fill="none" aria-hidden="true">
                    <path d="M5 19 19 5M5 5h14v14"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                  </svg>
                </a>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");

    $("#result-count").textContent =
      `${matches.length} ${
        matches.length === 1 ? "project" : "projects"
      }${query || category !== "all" ? " found" : ""}`;

    $("#empty-state").hidden = matches.length !== 0;
    $("#project-list").hidden = matches.length === 0;

    $$(".filter").forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  $$(".filter").forEach(button => {
    button.addEventListener("click", () => {
      category = button.dataset.filter;
      renderCards();
    });
  });

  $("#project-search").addEventListener("input", renderCards);

  $("#clear-filters").addEventListener("click", () => {
    category = "all";
    $("#project-search").value = "";
    renderCards();
    $("#project-search").focus();
  });

  function itemMarkup(item) {
    const position = item.indexOf(":");

    return `
      <li>
        ${position > -1 ? `
          <strong>${escape(item.slice(0, position))}</strong>
          ${escape(item.slice(position + 1).trim())}
        ` : escape(item)}
      </li>
    `;
  }

  function groupMarkup(group) {
    if (!group) return "";

    return `
      ${group.items.length ? `
        <ul class="detail-list">
          ${group.items.map(itemMarkup).join("")}
        </ul>
      ` : ""}

      ${group.text ? `<p>${escape(group.text)}</p>` : ""}
    `;
  }

  function resultMarkup(project) {
    return `
      <aside class="result-block">
        <span class="eyebrow">
          ${
            project.id === "soc-siem-simulator"
              ? "Recorded test result"
              : "Project evidence"
          }
        </span>

        <div class="result-value">${escape(project.value)}</div>
        <h3>${escape(project.result)}</h3>
        <p>${escape(project.resultNote)}</p>
      </aside>
    `;
  }

  const bankTable = `
    <table class="evidence-table">
      <thead>
        <tr>
          <th scope="col">Area tested</th>
          <th scope="col">Secured behaviour</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>SQL injection</td>
          <td>Parameterised customer-search queries.</td>
        </tr>
        <tr>
          <td>Access control</td>
          <td>
            Admin-only debt changes and database-backed giveaway eligibility.
          </td>
        </tr>
        <tr>
          <td>Input validation</td>
          <td>Negative transfers and protected profile fields rejected.</td>
        </tr>
        <tr>
          <td>Stored XSS</td>
          <td>Support messages escaped; Content Security Policy added.</td>
        </tr>
        <tr>
          <td>Transport</td>
          <td>HTTPS/TLS enabled for local development testing.</td>
        </tr>
      </tbody>
    </table>
  `;

  function evidenceImage(project, index = 0) {
    const image = project.images[index];

    return `
      <figure class="evidence-figure">
        <button
          type="button"
          class="evidence-image-button"
          data-image-project="${project.id}"
          data-image-index="${index}"
          aria-label="Enlarge evidence image: ${
            escape(image.label || project.title)
          }">

          <img
            src="${image.src}"
            alt="${escape(image.alt)}"
            width="1379"
            height="727"
            loading="lazy">
        </button>

        <figcaption>
          ${escape(image.caption)}
          <span>Click to enlarge.</span>
        </figcaption>
      </figure>
    `;
  }

  function renderProject(project, requestedTab) {
    const next = projects[
      (projects.indexOf(project) + 1) % projects.length
    ];

    const tab = ["overview", "evidence", "code"].includes(requestedTab)
      ? requestedTab
      : "overview";

    $("#project-view").innerHTML = `
      <div class="view-toolbar">
        <a class="text-link" href="#projects">← All projects</a>
        <span class="eyebrow">Project ${project.number} / 11</span>
        <button class="text-link" type="button" data-copy-link>
          Copy project link
        </button>
      </div>

      <div class="project-heading">
        <div>
          <span class="eyebrow">${escape(project.area)} / 2026</span>
          <h1 id="detail-title" tabindex="-1">
            ${escape(project.title)}
          </h1>
          <p class="lead">${escape(project.summary)}</p>
          ${tags(project)}
        </div>

        <div class="detail-facts">
          <div class="fact">
            <span class="eyebrow">Project type</span>
            <span>${escape(project.kind)}</span>
          </div>

          <div class="fact">
            <span class="eyebrow">Focus</span>
            <span>${escape(project.area)}</span>
          </div>

          <div class="fact">
            <span class="eyebrow">Evidence</span>
            <span>${escape(project.proof)}</span>
          </div>

          <p class="scope-note">${escape(project.scope)}</p>
        </div>
      </div>

      <div class="project-tabs"
        role="tablist" aria-label="Project details">

        ${[
          ["overview", "Overview"],
          ["evidence", "Evidence"],
          ["code", "Code & scope"]
        ].map(([id, label]) => `
          <button
            class="project-tab"
            type="button"
            role="tab"
            id="tab-${id}"
            aria-controls="panel-${id}"
            aria-selected="${id === tab}"
            tabindex="${id === tab ? 0 : -1}"
            data-tab="${id}">
            ${label}
          </button>
        `).join("")}
      </div>

      <div
        class="tab-panel"
        id="panel-overview"
        role="tabpanel"
        aria-labelledby="tab-overview"
        tabindex="0"
        ${tab !== "overview" ? "hidden" : ""}>

        <div class="detail-columns">
          <div>
            <h2>What I built</h2>
            ${groupMarkup(project.groups[0])}

            <h2 style="margin-top:32px">Why it matters</h2>
            <p>${escape(project.relevance)}</p>
          </div>

          ${resultMarkup(project)}
        </div>
      </div>

      <div
        class="tab-panel"
        id="panel-evidence"
        role="tabpanel"
        aria-labelledby="tab-evidence"
        tabindex="0"
        ${tab !== "evidence" ? "hidden" : ""}>

        <div class="evidence-heading">
          <div>
            <h2>
              ${
                project.id === "bank-lab"
                  ? "See the difference."
                  : "Look at the evidence."
              }
            </h2>

            <p>
              ${escape(
                project.id === "bank-lab"
                  ? "The negative-transfer test is one example of the wider vulnerability testing and remediation. Switch between the two versions to inspect the recorded behaviour."
                  : project.images.length
                    ? "Screenshots from the actual project, with testing context below. Open an image to inspect the details."
                    : "The concrete example and implementation details below describe the project. Use the source link to inspect the code."
              )}
            </p>
          </div>

          ${project.images.length > 1 ? `
            <div class="evidence-toggle"
              role="group" aria-label="Bank evidence version">

              ${project.images.map((image, index) => `
                <button
                  type="button"
                  data-evidence-index="${index}"
                  aria-pressed="${index === 0}">
                  ${escape(image.label)}
                </button>
              `).join("")}
            </div>
          ` : ""}
        </div>

        <div id="evidence-display">
          ${
            project.images.length
              ? evidenceImage(project)
              : resultMarkup(project)
          }
        </div>

        ${project.id === "bank-lab" ? bankTable : ""}

        <div class="detail-columns" style="margin-top:34px">
          <div>
            <h2>
              ${escape(
                project.groups[1]?.title || "Implementation details"
              )}
            </h2>

            ${groupMarkup(project.groups[1] || project.groups[0])}
          </div>

          <div>
            <h2>Keep the scope in view</h2>
            <p>${escape(project.scope)}</p>
            <p>${escape(project.resultNote)}</p>
          </div>
        </div>
      </div>

      <div
        class="tab-panel"
        id="panel-code"
        role="tabpanel"
        aria-labelledby="tab-code"
        tabindex="0"
        ${tab !== "code" ? "hidden" : ""}>

        <div class="detail-columns">
          <div>
            <h2>Inspect the source.</h2>

            ${project.repos.length ? project.repos.map(repository => `
              <div class="code-link-row">
                <a href="${repository.url}" ${external}>
                  ${escape(
                    repository.label === "View repository"
                      ? project.title + " repository"
                      : repository.label
                  )}

                  <svg class="icon" viewBox="0 0 24 24"
                    fill="none" aria-hidden="true">
                    <path d="M5 19 19 5M5 5h14v14"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
                  </svg>
                </a>

                <p>
                  ${escape(repository.url.replace(
                    "https://github.com/",
                    "github.com/"
                  ))}
                </p>
              </div>
            `).join("") : `
              <p class="missing-repo">
                A project repository is not linked in the current portfolio
                files. The evidence and implementation notes are available here.
              </p>
            `}

            <div class="actions">
              <a class="text-link"
                href="https://github.com/Melloww-png" ${external}>
                GitHub profile
                <svg class="icon" viewBox="0 0 24 24"
                  fill="none" aria-hidden="true">
                  <path d="M5 19 19 5M5 5h14v14"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
                </svg>
              </a>

              <a class="text-link"
                href="mailto:danielclementrich09@gmail.com">
                Ask about this project
                <svg class="icon" viewBox="0 0 24 24"
                  fill="none" aria-hidden="true">
                  <path d="M5 19 19 5M5 5h14v14"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h2>Scope & limitations</h2>
            <p>${escape(project.scope)}</p>
            <p>${escape(project.resultNote)}</p>
            <p>
              Project descriptions and recorded results come from my existing
              portfolio. This site presents the evidence; it does not run the
              security tools or collect live security logs.
            </p>
          </div>
        </div>
      </div>

      <div class="detail-bottom">
        <a class="text-link" href="#projects">← All projects</a>
        <a class="text-link" href="${link(next)}">
          Next: ${escape(next.title)} →
        </a>
      </div>
    `;

    $$(".project-tab").forEach(button => {
      button.addEventListener("click", () => {
        selectTab(button.dataset.tab, project);
      });
    });

    $(".project-tabs").addEventListener("keydown", event => {
      if (![
        "ArrowRight",
        "ArrowLeft",
        "Home",
        "End"
      ].includes(event.key)) return;

      event.preventDefault();

      const buttons = $$(".project-tab");
      let index = buttons.indexOf(document.activeElement);

      if (event.key === "Home") {
        index = 0;
      } else if (event.key === "End") {
        index = buttons.length - 1;
      } else {
        index = (
          index +
          (event.key === "ArrowRight" ? 1 : -1) +
          buttons.length
        ) % buttons.length;
      }

      selectTab(buttons[index].dataset.tab, project);
      buttons[index].focus();
    });

    $$("[data-evidence-index]").forEach(button => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.evidenceIndex);

        $("#evidence-display").innerHTML =
          evidenceImage(project, index);

        $$("[data-evidence-index]").forEach(item => {
          item.setAttribute("aria-pressed", String(item === button));
        });
      });
    });
  }

  function selectTab(tab, project) {
    $$(".project-tab").forEach(button => {
      const active = button.dataset.tab === tab;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    $$(".tab-panel").forEach(panel => {
      panel.hidden = panel.id !== "panel-" + tab;
    });

    history.replaceState(null, "", link(project, tab));
  }

  function route() {
    const hash = location.hash.slice(1) || "home";
    const parts = hash.split("/");
    const legacy = projects.find(project => project.id === hash);

    const isProject =
      parts[0] === "project" || Boolean(legacy);

    const isResume = hash === "resume";

    $("#home-view").hidden = isProject || isResume;
    $("#project-view").hidden = !isProject;
    $("#resume-view").hidden = !isResume;

    $$(".main-nav a").forEach(anchor => {
      anchor.removeAttribute("aria-current");
    });

    if (isProject) {
      const project = legacy ||
        projects.find(item => item.id === parts[1]);

      if (project) {
        renderProject(project, parts[2]);
        document.title = `${project.title} — Daniel Houston`;
      } else {
        $("#project-view").innerHTML = `
          <div class="empty-state">
            <h1 id="detail-title" tabindex="-1">Project not found.</h1>
            <p>Choose a project from the collection.</p>
            <div class="actions">
              <a class="button" href="#projects">Browse projects</a>
            </div>
          </div>
        `;

        document.title = "Project not found — Daniel Houston";
      }

      $('.main-nav a[href="#projects"]')
        .setAttribute("aria-current", "page");

      window.scrollTo({ top: 0, behavior: "instant" });
      $("#detail-title").focus({ preventScroll: true });

    } else if (isResume) {
      document.title = "Resume — Daniel Houston";

      const frame = $(".resume-frame");

      if (frame.getAttribute("src") === "about:blank") {
        frame.src = frame.dataset.src;
      }

      window.scrollTo({ top: 0, behavior: "instant" });
      $("#resume-title").focus({ preventScroll: true });

    } else {
      document.title = "Daniel Houston — Cybersecurity Portfolio";

      const target = [
        "home",
        "projects",
        "about",
        "journey",
        "contact",
        "main"
      ].includes(hash) ? hash : "home";

      const nav = $(`.main-nav a[href="#${target}"]`);

      if (nav) {
        nav.setAttribute("aria-current", "location");
      }

      requestAnimationFrame(() => {
        const section = document.getElementById(target);

        section.scrollIntoView({
          behavior: "instant",
          block: "start"
        });

        const focusTarget = target === "main"
          ? section
          : section.querySelector("h1,h2");

        if (focusTarget) {
          focusTarget.tabIndex = -1;
          focusTarget.focus({ preventScroll: true });
        }
      });
    }
  }

  function toast(message) {
    clearTimeout(toastTimer);

    $("#toast").textContent = message;
    $("#toast").hidden = false;

    toastTimer = setTimeout(() => {
      $("#toast").hidden = true;
    }, 3000);
  }

  async function copy(text, success) {
    try {
      await navigator.clipboard.writeText(text);
      toast(success);
    } catch {
      toast(
        "Copy unavailable here. Select the email address or use your browser’s address bar."
      );
    }
  }

  $("#copy-email").addEventListener("click", () => {
    copy(
      "danielclementrich09@gmail.com",
      "Email address copied."
    );
  });

  document.addEventListener("click", event => {
    if (event.target.closest("[data-copy-link]")) {
      copy(location.href, "Project link copied.");
    }

    const button = event.target.closest("[data-image-project]");

    if (button) {
      const project = projects.find(item =>
        item.id === button.dataset.imageProject
      );

      const image = project.images[
        Number(button.dataset.imageIndex)
      ];

      $("#lightbox-image").src = image.src;
      $("#lightbox-image").alt = image.alt;
      $("#image-caption").textContent = image.caption;
      $("#original-image").href = image.src;

      $("#image-dialog").showModal();
      document.body.classList.add("modal-open");
    }
  });

  $("#close-image").addEventListener("click", () => {
    $("#image-dialog").close();
  });

  $("#image-dialog").addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });

  $("#image-dialog").addEventListener("click", event => {
    if (event.target === $("#image-dialog")) {
      const rectangle = event.target.getBoundingClientRect();

      if (
        event.clientX < rectangle.left ||
        event.clientX > rectangle.right ||
        event.clientY < rectangle.top ||
        event.clientY > rectangle.bottom
      ) {
        event.target.close();
      }
    }
  });

  window.addEventListener("hashchange", route);

  renderCards();
  route();
})();
