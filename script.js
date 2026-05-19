const scene = document.getElementById('parallaxScene');
const layers = document.querySelectorAll('.layer');

// Valores de profundidad para cada capa.
// Un número más alto significa que la capa parece estar más lejos y se mueve menos.
const depths = [1.6, 1.4, 1.2, 0.9, 0.7, 0.5, 0.3, 0.1]; // Profundidades para las capas 1-7
const maxTilt = 10; // Ángulo máximo de inclinación en grados

scene.addEventListener('mousemove', (e) => {
    // Obtenemos la posición del ratón relativa a la escena
    const rect = scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculamos el desplazamiento horizontal y vertical como un porcentaje (-0.5 a 0.5)
    const offsetX = (x / rect.width) - 0.5;
    const offsetY = (y / rect.height) - 0.5;

    // Calculamos los ángulos de inclinación (X e Y) basándonos en la posición del ratón
    const tiltX = offsetY * -maxTilt; // Inclinación en el eje X (basada en el ratón Y)
    const tiltY = offsetX * maxTilt;  // Inclinación en el eje Y (basada en el ratón X)

    // Aplicamos la inclinación 3D al contenedor principal
    scene.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    // Calculamos y aplicamos desplazamientos de paralaje individuales a cada capa
    layers.forEach((layer, index) => {
        const depth = depths[index];
        // El desplazamiento de paralaje se basa en la profundidad: más profundo = menos movimiento
        // También se limita sutilmente para crear un efecto controlado
        const moveX = offsetX * (60 * depth);
        const moveY = offsetY * (45 * depth);
        layer.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
    });
});

// Restablecemos la posición inicial al salir del contenedor
scene.addEventListener('mouseleave', () => {
    scene.style.transform = 'rotateX(0deg) rotateY(0deg)';
    layers.forEach((layer) => {
        layer.style.transform = 'translateX(0px) translateY(0px)';
    });
});

window.addEventListener("load", function() {
  const progressText = document.getElementById("load-percentage");
  const progressBar = document.querySelector(".loader-progress");
  const loaderWrapper = document.getElementById("loader-wrapper");
  
  let width = 0;
  
  // Simula el progreso (ajusta el intervalo para que coincida con tu carga real)
  const interval = setInterval(function() {
    if (width >= 100) {
      clearInterval(interval);
      // Oculta la pantalla de carga cuando llega al 100%
      loaderWrapper.style.opacity = "0";
      setTimeout(() => loaderWrapper.style.display = "none", 500);
    } else {
      width++;
      progressBar.style.width = width + "%";
      progressText.textContent = width + "%";
    }
  }, 20); // Velocidad: avanza 1% cada 20 milisegundos
});
