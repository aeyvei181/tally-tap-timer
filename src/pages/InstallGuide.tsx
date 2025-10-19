import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Share, Plus, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const InstallGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Card className="p-8">
          <div className="text-center mb-6">
            <Smartphone className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl font-bold mb-2">Install on iPhone</h1>
            <p className="text-muted-foreground">
              Add this app to your home screen for easy access
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-2">Open Safari</h3>
                <p className="text-sm text-muted-foreground">
                  Make sure you're viewing this page in Safari (not Chrome or other browsers)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Tap the Share button <Share className="w-4 h-4" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  Find the share icon at the bottom of Safari (it looks like a square with an arrow)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Select "Add to Home Screen" <Plus className="w-4 h-4" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  Scroll down in the share menu and tap "Add to Home Screen"
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-2">Confirm</h3>
                <p className="text-sm text-muted-foreground">
                  Tap "Add" in the top right corner. The app will now appear on your home screen!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-center text-muted-foreground">
              Once installed, you can use the app even when offline! 📱
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
