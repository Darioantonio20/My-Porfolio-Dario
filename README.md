# Portfolio Personal - Dario Antonio

Un portfolio personal moderno y responsivo construido con Next.js, TypeScript y Tailwind CSS.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones
- **Totalmente Responsivo**: Optimizado para todos los dispositivos
- **TypeScript**: Código tipado para mayor seguridad y mantenibilidad
- **Componentes Reutilizables**: Arquitectura modular y escalable
- **SEO Optimizado**: Metadatos y estructura semántica
- **Accesible**: Cumple con estándares de accesibilidad web

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **React** - Biblioteca de interfaz de usuario
- **Three.js** - Gráficos 3D (para futuras animaciones)

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI básicos
│   │   └── Button.tsx    # Botón reutilizable
│   ├── layout/           # Componentes de layout
│   │   ├── Header.tsx    # Navegación principal
│   │   └── Footer.tsx    # Pie de página
│   └── sections/         # Secciones del portfolio
│       ├── Hero.tsx      # Sección de bienvenida
│       ├── About.tsx     # Sobre mí
│       ├── Projects.tsx  # Proyectos
│       └── Contact.tsx   # Formulario de contacto
├── data/                 # Datos estáticos
│   └── projects.ts       # Información de proyectos
├── lib/                  # Utilidades y helpers
│   └── utils.ts          # Funciones utilitarias
├── types/                # Definiciones de tipos TypeScript
│   └── index.ts          # Interfaces y tipos
└── styles/               # Estilos globales
    └── globals.css       # CSS global
```

## 🎨 Secciones del Portfolio

1. **Hero**: Presentación personal con llamadas a la acción
2. **Sobre Mí**: Información personal, habilidades y experiencia
3. **Proyectos**: Galería de proyectos con tecnologías utilizadas
4. **Contacto**: Formulario de contacto e información de contacto

## 🚀 Instalación y Uso

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd My-Portfolio-Dario
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
```bash
npm run dev
   ```

4. **Construir para producción**
   ```bash
   npm run build
   ```

5. **Iniciar en producción**
   ```bash
   npm start
   ```

## 📝 Personalización

### Cambiar Información Personal

1. **Datos personales**: Edita los componentes en `src/components/sections/`
2. **Proyectos**: Modifica `src/data/projects.ts`
3. **Contacto**: Actualiza la información en `src/components/sections/Contact.tsx`
4. **Metadatos**: Cambia la información en `src/app/layout.tsx`

### Estilos

- Los estilos principales están en `src/styles/globals.css`
- Utiliza Tailwind CSS para modificaciones rápidas
- Los componentes tienen clases CSS personalizables

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Verificación de código

## 📱 Responsive Design

El portfolio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1280px+)

## 🎯 Próximas Mejoras

- [ ] Animaciones con Framer Motion
- [ ] Modo oscuro
- [ ] Blog integrado
- [ ] Animaciones 3D con Three.js
- [ ] Internacionalización (i18n)
- [ ] Integración con CMS

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Dario Antonio** - Desarrollador Front-end

- 📧 Email: tu-email@ejemplo.com
- 🌐 Portfolio: [tu-portfolio.com](https://tu-portfolio.com)
- 💼 LinkedIn: [linkedin.com/in/tu-perfil](https://linkedin.com/in/tu-perfil)
- 🐙 GitHub: [github.com/tu-usuario](https://github.com/tu-usuario)

---

¡Gracias por visitar mi portfolio! 🚀
