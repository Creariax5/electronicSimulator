# Three.js Interactive Cube Grid

An interactive 3D application built with Three.js that allows users to create, manipulate, and simulate conductor/energy interactions in a grid of cubes.

Link to test: https://electronic-simulator.vercel.app/
![image](https://github.com/user-attachments/assets/4eeb3e3a-168c-449e-b758-0d9f1d9bde1e)

## Features

- **Interactive Grid System**: Create and manipulate cubes in a 3D space
- **Multiple Materials**: Choose between different materials including:
  - Building blocks
  - Conductors (with multiple states)
  - Energy sources
- **Energy Propagation**: Simulate energy flow through conductor blocks
- **Advanced Controls**:
  - Left click to delete cubes
  - Right click to place cubes
  - Mouse wheel to zoom in/out
  - Middle mouse button to pan the camera
- **Save/Load System**: Save your creations and load them later

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (version 8.0.0 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd three-js-cubes
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Controls

### Camera Controls
- **Zoom**: Mouse wheel up/down
- **Pan**: Hold middle mouse button and drag

### Building Controls
- **Delete Cube**: Left click
- **Place Cube**: Right click
- **Select Material**: Use number keys
  - `&`: Building material
  - `é`: Conductor material
  - `"`: Energy source

## Project Structure

- `main.js`: Entry point and main rendering loop
- `controls.js`: Camera control implementation
- `materials.js`: Material definitions and selection system
- `cubes.js`: Cube grid initialization
- `interactions.js`: User interaction handling
- `updateCubes.js`: Cube state update logic
- `raycaster.js`: Mouse interaction implementation

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- [Three.js](https://threejs.org/) - 3D graphics library
- [Vite](https://vitejs.dev/) - Frontend build tool

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
