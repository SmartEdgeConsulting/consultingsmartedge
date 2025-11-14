import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Mission = () => {
  return (
    <div className="flex flex-col w-full max-w-lg mx-auto gap-6">
      <Tabs defaultValue="mission" className="text-base sm:text-lg">
        <TabsList >
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="vision">Vision</TabsTrigger>
        </TabsList>
        <TabsContent value="mission" >
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-800">
                To empower businesses to make smarter, faster, and more
                confident decisions using data.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="vision">
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription className="text-sm sm:text-base text-slate-800">
                A world where every business — big or small — uses data to
                thrive.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Mission;
