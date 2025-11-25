import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Mission = () => {
  return (
    <section className="py-16 lg:py-20 mb-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-10">
        <Tabs defaultValue="mission" className="w-full">
          {/* Bigger Tabs */}
          <TabsList className="justify-center gap-4 bg-white/40 rounded-lg">
            <TabsTrigger
              value="mission"
              className="text-base sm:text-lg px-6 py-4 rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-medium"
            >
              Mission
            </TabsTrigger>

            <TabsTrigger
              value="vision"
              className="text-base sm:text-lg px-6 py-4 rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-medium"
            >
              Vision
            </TabsTrigger>
          </TabsList>

          {/* Mission */}
          <TabsContent value="mission">
            <Card className="p-8 sm:p-10 text-center mt-6 rounded-2xl shadow-lg">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                  Our Mission
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-slate-800 leading-relaxed">
                  To empower businesses to make smarter, faster, and more
                  confident decisions using data.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Vision */}
          <TabsContent value="vision">
            <Card className="p-8 sm:p-10 text-center mt-6 rounded-2xl shadow-lg">
              <CardHeader className="space-y-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
                  Our Vision
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-slate-800 leading-relaxed">
                  A world where every business big or small uses data to thrive.
                </CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Mission;
