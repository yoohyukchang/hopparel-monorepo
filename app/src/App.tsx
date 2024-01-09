import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
