
// Simple interactivity: theme toggle and small animations
const themeToggle = document.getElementById('themeToggle');
themeToggle && themeToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? 'Mode clair' : 'Mode sombre';
});
// --- Liste des PDF ---
const pdfFiles = [
  { file: "projects/p1.pdf", title: "Installation du serveur Apache sur Ubuntu" },
  { file: "projects/p2.pdf", title: "Configuration d'un Serveur DNS avec Bind9" },
  { file: "projects/p3.pdf", title: "Configuration LDAP Unix" },
  { file: "projects/p4.pdf", title: "Configuration d’un partage NFS sur Ubuntu" },
  { file: "projects/p5.pdf", title: "Configuration de Samba + Unix"},
  { file: "projects/p6.pdf", title: "Mise en œuvre des déploiements distribués d’AD DS" },
  { file: "projects/p7.pdf", title: "Network Information Service NIS" },
  { file: "projects/p8.pdf", title: "Cluster de Basculement Hyper-V" },
  { file: "projects/p9.pdf", title: "Système de fichier distribué DFS" },
  { file: "projects/p10.pdf", title: "Network Load Balancing NLB" }
];

const slidesContainer = document.getElementById("slidesContainer");

// --- Génération des slides avec PDF.js ---
pdfFiles.forEach(async pdf => {
  const slide = document.createElement("div");
  slide.className = "pdf-slide";
  slide.innerHTML = `<h3>${pdf.title}</h3>`;

  const canvas = document.createElement("canvas");
  slide.appendChild(canvas);

  const link = document.createElement("a");
  link.href = pdf.file;
  link.target = "_blank";
  link.className = "btn";
  link.textContent = "Ouvrir PDF";
  slide.appendChild(link);

  slidesContainer.appendChild(slide);

  // --- Charger la première page du PDF ---
  const loadingTask = pdfjsLib.getDocument(pdf.file);
  const pdfDoc = await loadingTask.promise;
  const page = await pdfDoc.getPage(1);
  const viewport = page.getViewport({ scale: 1.2 });
  const context = canvas.getContext("2d");
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  await page.render({ canvasContext: context, viewport: viewport }).promise;
});

// --- Carousel navigation ---
let currentIndex = 0;
const totalSlides = pdfFiles.length;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function updateSlidePosition() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlidePosition();
});



