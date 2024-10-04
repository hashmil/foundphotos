import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Gallery from "./components/Gallery";
import ImageViewer from "./components/ImageViewer";

const App = () => {
  const [currentImage, setCurrentImage] = useState(null);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <Router>
      <div className="container mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">FoundPhotos</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-blue-500 hover:text-blue-700">
                  Gallery
                </Link>
              </li>
              {currentImage && (
                <li>
                  <Link
                    to={`/image/${currentImage._id}`}
                    className="text-blue-500 hover:text-blue-700">
                    View Image
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </header>

        <Switch>
          <Route path="/image/:id">
            <ImageViewer
              images={[currentImage]}
              currentIndex={0}
              onNavigate={() => {}}
            />
          </Route>
          <Route path="/">
            <Gallery images={[]} onImageClick={handleImageClick} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
