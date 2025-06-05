
import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Button 
        className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg font-medium"
        onClick={() => {
          // No action performed
        }}
      >
        Click Here
      </Button>
    </div>
  );
}

export default App;
