document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("nameInput");
    const button = document.getElementById("searchBtn");
    const resultsDiv = document.getElementById("results");
  
    button.addEventListener("click", searchGuest);
  
    function searchGuest() {
      resultsDiv.innerHTML = "";
      const value = input.value.trim();
  
      if (!value) {
        resultsDiv.textContent = "Please enter your name.";
        return;
      }
  
      const parts = value.split(/\s+/);
  
      if (parts.length < 2) {
        resultsDiv.textContent = "Please enter both first and last name.";
        return;
      } else if (parts.length > 2) {
        resultsDiv.textContent = "Please enter only your first and last name.";
        return;
      }
  
      const [firstInput, lastInput] = parts.map(s => s.toLowerCase());
  
      const matches = guests.filter(g => 
        g.first.toLowerCase() === firstInput &&
        g.last.toLowerCase() === lastInput
      );

      var sameTable = {};
    //   if (matches.length === 1) {
    //     const sameTable = guests.filter(g => g.table === guest.table)
    //   }
  
      if (matches.length === 0) {
        resultsDiv.textContent = "No matching guest found. Please check the spelling.";
      } else if (matches.length === 1) {
        const guest = matches[0];
        sameTable = guests.filter(g => g.table === guest.table);
        // Build a nice list of all guests at the same table
        let friendsList = "<class='friends-list'>";
        sameTable.forEach(g => {
            // Show full name with middle initial if available
            friendsList += `${g.first} ${g.middle ? g.middle + " " : ""}${g.last}<br>`;
        });
        // friendsList += "<br>";
        resultsDiv.innerHTML = `
            <div class="result-final">
            Welcome ${guest.first} ${guest.middle ? guest.middle + " " : ""}${guest.last}!<br>
            You are assigned to <strong>Table ${guest.table}</strong>.<br><br>
            Here are the guests seated at your table:<br>
            ${friendsList}
            </div>
        `;
      } else {
        resultsDiv.innerHTML = "<p>Multiple matches found. Please select your name:</p>";
        matches.forEach(guest => {
          const card = document.createElement("div");
          card.className = "result-card";
          card.textContent = `${guest.first} ${guest.middle ? guest.middle + " " : ""}${guest.last}`;
          card.addEventListener("click", () => {
            sameTable = guests.filter(g => g.table === guest.table);
            // Build a nice list of all guests at the same table
            let friendsList = "<class='friends-list'>";
            sameTable.forEach(g => {
                // Show full name with middle initial if available
                friendsList += `${g.first} ${g.middle ? g.middle + " " : ""}${g.last}<br>`;
            });
            // friendsList += "<br>";
            resultsDiv.innerHTML = `
                <div class="result-final">
                Welcome ${guest.first} ${guest.middle ? guest.middle + " " : ""}${guest.last}!<br>
                You are assigned to <strong>Table ${guest.table}</strong>.<br><br>
                Here are the guests seated at your table:<br>
                ${friendsList}
                </div>
            `;
          });
          resultsDiv.appendChild(card);
        });
      }
    }
  
    // Initialize particles.js (starry night)
    particlesJS("particles-js", {
      particles: {
        number: { value: 200, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: .5, direction: "right", straight: true}
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: false }, onclick: { enable: false } }
      },
      retina_detect: true
    });
  });  