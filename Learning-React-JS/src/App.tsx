import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

export default function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      {showAlert && <Alert onClose={() => setShowAlert(false)}>Hello World!</Alert> }
      
      <Button color="success" onClick={() => setShowAlert(true)}>
        Ez Button
      </Button>
    </div>
  );
}
